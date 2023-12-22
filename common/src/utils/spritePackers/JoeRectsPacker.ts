import BasePacker from "./BasePacker";
import PackerHelper from "../PackerHelper";
import {
    CallbackStatusTypes,
    GuillotinePackerHeuristics,
    JoeRectsPackerHeuristics,
    SortByTypes,
    SpritePackerTypes
} from "../Types";
import Project from "../../objs/Project";
import Rectangle from "../../objs/Rectangle";
import SortHelper from "../SortHelper";
import LogHelper from "../LogHelper";
import assert from "assert";

type PackScores = { score1: number, score2: number };

export default class JoeRectsPacker extends BasePacker {

    public GetPackerType(): SpritePackerTypes {
        return "JoeRects";
    }

    public GetDefaultSortBy(): SortByTypes {
        return "AREA_DESC";
    }

    public GetHeuristic(project: Project): JoeRectsPackerHeuristics {
        let heuristic: JoeRectsPackerHeuristics;

        if(project.options.packerHeuristics !== "InferFromSort") {
            return project.options.packerHeuristics as JoeRectsPackerHeuristics ?? "BestArea";
        }

        // TODO: implement BottomLeftRule and ContactPointRule
        switch(project.options.sortBy ?? this.GetDefaultSortBy()) {
            case "SHORTER_SIDE":
            case "LONGER_SIDE_DESC": // TODO: is this right ??
                heuristic = "BestShortSide";
                break;
            case "LONGER_SIDE":
            case "SHORTER_SIDE_DESC": // TODO: is this right ??
                heuristic = "BestLongSide";
                break;
            case "AREA":
            case "AREA_DESC":
            case "PERIMETER":
            case "PERIMETER_DESC":
            default:
                heuristic = "BestArea";
                break;
        }

        return heuristic;
    }

    public static get BIG_NUMBER() : number { return Number.MAX_SAFE_INTEGER; }

    public pack_freeRects: Rectangle[] = [] as Rectangle[];
    public pack_newFreeRects: Rectangle[] = [] as Rectangle[];
    public pack_usedRects: Rectangle[] = [] as Rectangle[];

    protected OnInit(project: Project): boolean {
        return true;
    }

    protected OnPack(project: Project): boolean {
        // // this.pack_heuristic = "BestShortSide" | "BestLongSide" | "BestArea" [| "BottomLeftRule" | "ContactPointRule"]

        let wasMaxSize: boolean = false;
        const frames = BasePacker.ExtractFrames(project); // TODO: optimize by extracting once?

        while (!this.pack_complete) {
            const fitsConstraints =
                this.pack_width <= project.options.width &&
                this.pack_height <= project.options.height;

            if (fitsConstraints) { // this.pack_framesProcessed === 0) {
                this.pack_freeRects = [] as Rectangle[];
                this.pack_newFreeRects = [] as Rectangle[];
                this.pack_usedRects = [] as Rectangle[];

                const padding = Math.max(this.pack_paddingBorder, this.pack_paddingShape);
                const paddedCanvas =
                    Rectangle.Inflate(Rectangle.Create(0, 0, this.pack_width, this.pack_height), -padding);
                this.pack_freeRects.push(paddedCanvas);
            // } else {
            //     // DEAD CODE?
            //     this.DoCompleteCallback(false, project);
            //     break;
            }

            const isMaxSize = this.pack_width >= project.options.width && this.pack_height >= project.options.height;
            // if(isMaxSize && wasMaxSize) {
            //     LogHelper.LogMessage("WARN", `Processed the same data twice for ${this.pack_width}x${this.pack_height}. Exiting.`);
            //     this.DoCompleteCallback(false, project);
            //     return !!this.pack_success;
            // }
            wasMaxSize = isMaxSize;

            const spritePadding: number = (project.options.shapePadding || 0) + (project.options.innerPadding || 0);
            const framesToProcessCount: number = frames.length;
            let framesProcessed: number = 0;
            let breakForLoop: boolean = false;

            for(let frame of frames) {
                const paddedRect = Rectangle.Inflate(frame.spriteRect, spritePadding);
                paddedRect.x += spritePadding;
                paddedRect.y += spritePadding;
                const rect = this._placeByHeuristic(project, paddedRect);
                framesProcessed++;
                if(!rect.isEmpty) {
                    frame.spriteRect = Rectangle.Inflate(rect, -spritePadding);
                } else {
                    let newWidth  = this.pack_width  + BasePacker.GROW_BY; //  /* Math.max(self.width,  frame.rectSprite.x + frame.rectSprite.width ) */ + self.paddingBorder * 2;
                    let newHeight = this.pack_height + BasePacker.GROW_BY; //  /* Math.max(self.height, frame.rectSprite.y + frame.rectSprite.height) */ + self.paddingBorder * 2;

                    if(this.DoResize(project, newWidth, newHeight)) {
                        // DEAD CODE?
                        // exit loop and start over
                        if(!this.DoInit(project, this.pack_width, this.pack_height)) {
                            this.DoCompleteCallback(false, project);
                            return !!this.pack_success;
                        }
                        LogHelper.LogMessage("WARN", `Restarting packer after resize to ${this.pack_width}x${this.pack_height}.`)
                        breakForLoop = true;
                        break;
                    } else {
                        // DEAD CODE?
                        // we have a problem; won't fit; stop trying
                        LogHelper.LogMessage("ERROR", `Image ${frame.spriteRect.width}x${frame.spriteRect.height} won't fit within the specified constraints ${project.options.width}x${project.options.height}.`);
                        this.DoCompleteCallback(false, project);
                        return !!this.pack_success;
                    }
                }

                const progress: number = framesProcessed / (framesToProcessCount || 1);
                // // DEAD CODE?
                // if(!this.DoProgressCallback(progress, project)) {
                //     this.DoCompleteCallback(false, project);
                //     return !!this.pack_success;
                // }
                this.DoProgressCallback(progress, project)
            }
            if(!breakForLoop) {
                this.DoCompleteCallback(true, project);
                break;
                // return !!this.pack_success;
            }
        }

        // DEAD CODE?
        this.DoCompleteCallback(true, project);
        return !!this.pack_success;
    }

    private _placeRect(project: Project, rect: Rectangle) : void {
        for(let i = 0; i < this.pack_freeRects.length;)
        {
            if (this._splitFreeRect(this.pack_freeRects[i], rect))
            {
                this.pack_freeRects[i] = this.pack_freeRects[this.pack_freeRects.length - 1];
                this.pack_freeRects.pop();
            }
            else {
                i++;
            }
        }

        this._pruneFreeRects();

        this.pack_usedRects.push(rect);
    }

    private _placeByHeuristic(project: Project, rect: Rectangle) : Rectangle {
        const scores: PackScores = { score1: JoeRectsPacker.BIG_NUMBER, score2: JoeRectsPacker.BIG_NUMBER };
        // const padding = Math.max(project.options.shapePadding || 0, project.options.innerPadding || 0);
        // // const paddedWidth  = rect.width  + padding * 2;
        // // const paddedHeight = rect.height + padding * 2;
        // // let result: Rectangle = Rectangle.Create(0, 0, paddedWidth, paddedHeight);
        let result: Rectangle = Rectangle.Empty;

        switch(this.GetHeuristic(project)) {
            case "BestShortSide": // short side of a free rectangle
                result = this._placeByBestShortSideFit(result, scores);
                break;
            case "BestLongSide":      // long side of free rectangle
                result = this._placeByBestLongSideFit(result, scores);
                break;
            case "BottomLeftRule":       // "Tetris" placement
                result = this._placeByBottomLeftRule(result, scores);
                break;
            case "ContactPointRule":     // rectangle touches other rects as much as possible
                result = this._placeByContactPointRule(result, scores);
                break;
            case "BestArea": // smallest free rect
            default:
                result = this._placeByBestAreaFit(rect, scores, project.options.allowRotate === "Yes");
                break;
        }

        if (!result.isEmpty) {
            rect.x = result.x;
            rect.y = result.y;
            // assert(rect.width === result.width);
            // assert(rect.height === result.height);
            rect.width = result.width;
            rect.height = result.height;
            rect.rotated = result.rotated;
    
            this._placeRect(project, rect);


            // TODO: verify this  is needed ...
            let rectsToProcess = this.pack_freeRects.length;
            for(var i = 0; i < rectsToProcess; i++) {
                if (this._splitFreeRect(this.pack_freeRects[i], result)) {
                    this.pack_freeRects.splice(i,1);
                    i = 0;
                    i--;
                    rectsToProcess--;
                }
            }
            this._pruneFreeRects();



            // // TODO: verify this is needed ...
            // const padding = Math.max(project.options.shapePadding || 0, project.options.innerPadding || 0);
            // Rectangle.Inflate(result, -padding);
            // // result.x += padding;
            // // result.y += padding;
            // // result.width  -= padding * 2;
            // // result.height -= padding * 2;

        }



// TODO: what was this?
if (!result.isEmpty) {
    let rectsToProcess = this.pack_freeRects.length;
    for(var i = 0; i < rectsToProcess; i++) {
        if (this._splitFreeRect(this.pack_freeRects[i], result)) {
            this.pack_freeRects.splice(i,1);
            i = 0;
            i--;
            rectsToProcess--;
        }
    }
    this._pruneFreeRects();
}

// TODO: what was this?
const padding = Math.max(project.options.shapePadding || 0, project.options.innerPadding || 0);
result.x += padding;
result.y += padding;
result.width  -= padding * 2;
result.height -= padding * 2;

        return rect;
    }

    private _pruneFreeRects() : void {
        for(var i = 0; i < this.pack_freeRects.length; i++) {
            // for(var j = i+1; j < this.pack_newFreeRects.length;) { // j++) {
            for(var j = 0; j < this.pack_newFreeRects.length;) { // j++) {
                // TODO: make sure the contains check isn't inverted
                if (this.pack_freeRects[i].isEmpty || this.pack_freeRects[i].Contains(this.pack_newFreeRects[j])) {
                // if (/* this.pack_freeRects[i].isEmpty || */ this.pack_newFreeRects[j].ContainedIn(this.pack_freeRects[i])) {
                    this.pack_newFreeRects[j] = this.pack_newFreeRects[this.pack_newFreeRects.length - 1] as Rectangle;
                    this.pack_newFreeRects.pop();
                    // this.pack_freeRects.splice(i,1);
                    // i--;
                    // break;
                }
                else {
                    // TODO: make sure the contains check isn't inverted
                    // // if (this.pack_freeRects[j].isEmpty || this.pack_freeRects[j].ContainedIn(this.pack_freeRects[i])) {
                    //     this.pack_freeRects.splice(j,1);
                    //     assert(!this.pack_freeRects[j].ContainedIn(this.pack_freeRects[i]));
                    //     j++;
                    // // }

                    // since new free rects keep decreasing in size, the new free rect
                    // can never contain an older free rect
                    // assert(!this.pack_freeRects[i].ContainedIn(this.pack_newFreeRects[j]));
                    assert(!this.pack_newFreeRects[j].Contains(this.pack_freeRects[i]));
                    j++;
                }
            }
        }
        // Merge new and old free rectangles to the group of old free rectangles.
        this.pack_freeRects = this.pack_freeRects.concat(this.pack_newFreeRects);
        this.pack_newFreeRects = [] as Rectangle[];

        // for(let i = 0; i < this.pack_freeRects.length; ++i)
        // {
        //     for (let j = i + 1; j < this.pack_freeRects.length; j++)
        //     {
        //         assert(!this.pack_freeRects[i].ContainedIn(this.pack_freeRects[j]));
        //         assert(!this.pack_freeRects[j].ContainedIn(this.pack_freeRects[i]));
        //     }
        // }
    }

    private _newFreeRectsLastSize: number = 0;
    private _splitFreeRect(freeRect: Rectangle, usedRect: Rectangle) : boolean {

        // no overlap between rectangles
        if (usedRect.x >= freeRect.right || usedRect.right <= freeRect.x || usedRect.y >= freeRect.bottom || usedRect.bottom <= freeRect.y) {
            return false;
        }

        // We add up to four new free rectangles to the free rectangles list below.
        // Keep track of them to avoid testing them against each other. They cannot
        // intersect / overlap.
        this._newFreeRectsLastSize = this.pack_newFreeRects.length;
        let rectsWereProcessed: boolean = false;

        // if (usedRect.x < freeRect.right && usedRect.right > freeRect.x) {
        if (usedRect.x < freeRect.right && usedRect.right > freeRect.x) {

            // New node at the top side of the used node.
            if (usedRect.y >= freeRect.y && usedRect.y < freeRect.bottom) {
                const newRect = Rectangle.Copy(freeRect);
                newRect.height = usedRect.y - newRect.y;
                this._insertNewFreeRectangle(newRect);
                rectsWereProcessed = true;
            }

            // New node at the bottom side of the used node.
            if (usedRect.bottom < freeRect.bottom) {
                const newRect = Rectangle.Copy(freeRect);
                newRect.y = usedRect.bottom;
                newRect.height = freeRect.bottom - usedRect.bottom;
                this._insertNewFreeRectangle(newRect);
                rectsWereProcessed = true;
            }
        }

        if (usedRect.y < freeRect.bottom && usedRect.bottom > freeRect.y) {

            // New node at the left side of the used node.
            if (usedRect.x >= freeRect.x && usedRect.x < freeRect.right) {
                const newRect = Rectangle.Copy(freeRect);
                newRect.width = usedRect.x - newRect.x;
                this._insertNewFreeRectangle(newRect);
                rectsWereProcessed = true;
            }

            // New node at the right side of the used node.
            if (usedRect.right <= freeRect.right) {
                const newRect = Rectangle.Copy(freeRect);
                newRect.x = usedRect.right;
                newRect.width = freeRect.right - usedRect.right;
                this._insertNewFreeRectangle(newRect);
                rectsWereProcessed = true;
            }
        }

        return true; // rectsWereProcessed;
    }

    private _insertNewFreeRectangle(newFreeRect: Rectangle) : void {

        if (newFreeRect.isEmpty) { return; }
        // assert(!newFreeRect.isEmpty);

        for(let i = 0; i < this._newFreeRectsLastSize;)
        {
            // This new free rectangle is already accounted for?
            if (this.pack_newFreeRects[i].Contains(newFreeRect)) {
            // if (newFreeRect.ContainedIn(this.pack_newFreeRects[i])) {
                return;
            }

            // Does this new free rectangle obsolete a previous new free rectangle?
            if (newFreeRect.Contains(this.pack_newFreeRects[i]))
            {
                // Remove i'th new free rectangle, but do so by retaining the order
                // of the older vs newest free rectangles that we may still be placing
                // in calling function SplitFreeNode().
                this.pack_newFreeRects[i] = this.pack_newFreeRects[--this._newFreeRectsLastSize];
                this.pack_newFreeRects[this._newFreeRectsLastSize] = this.pack_newFreeRects[this.pack_newFreeRects.length - 1];
                this.pack_newFreeRects.pop();
            }
            else {
                i++;
            }
        }

        this.pack_newFreeRects.push(newFreeRect);
        // TODO: is this new logic valid?
        this._newFreeRectsLastSize = this.pack_newFreeRects.length;
    }

    private _placeByBestAreaFit(rect: Rectangle, scores: PackScores, allowRotate: boolean) : Rectangle {

        const result: Rectangle = Rectangle.Empty;
        let bestAreaFit: number = JoeRectsPacker.BIG_NUMBER;
        let bestShortSideFit: number = JoeRectsPacker.BIG_NUMBER;

        // TODO: is this OK? untested.
        // TODO: DEAD CODE?
        if(rect.isEmpty) {
            return rect;
        }

        // let processedRect: boolean = false;
        for(let freeRect of this.pack_freeRects) {
            // processedRect = false;
            const areaFit: number =
                freeRect.width * freeRect.height -
                rect.width * rect.height;

            if(freeRect.width >= rect.width && freeRect.height >= rect.height) {
                const leftoverHoriz: number = Math.abs(freeRect.width - rect.width);
                const leftoverVert: number = Math.abs(freeRect.height - rect.height);
                const shortSideFit: number = Math.min(leftoverHoriz, leftoverVert);

                // const favorTop: boolean = (this.pack_height >= this.pack_width && freeRect.y < result.y);
                // const favorLeft: boolean = (this.pack_height <= this.pack_width && freeRect.x < result.x);

                // if (areaFit < bestAreaFit || (areaFit == bestAreaFit && (shortSideFit < bestShortSideFit || favorTop || favorLeft))) {
                if (areaFit < bestAreaFit || (areaFit == bestAreaFit && shortSideFit < bestShortSideFit)) {
                    rect.x = result.x = freeRect.x;
                    rect.y = result.y = freeRect.y;
                    rect.width = result.width = rect.width; // TODO: really?
                    rect.height = result.height = rect.height; // TODO: really?
                    rect.rotated = result.rotated = false;
                    bestShortSideFit = shortSideFit;
                    bestAreaFit = areaFit;
                    // processedRect = true;
                }
            }

            if(this.pack_allowRotate && freeRect.width >= rect.height && freeRect.height >= rect.width) {
                const leftoverHoriz: number = Math.abs(freeRect.width - rect.height);
                const leftoverVert: number = Math.abs(freeRect.height - rect.width);
                const shortSideFit: number = Math.min(leftoverHoriz, leftoverVert);

                if (areaFit < bestAreaFit || (areaFit == bestAreaFit && shortSideFit < bestShortSideFit)) {
                    rect.x = result.x = freeRect.x;
                    rect.y = result.y = freeRect.y;
                    rect.width = result.width = rect.height;
                    rect.height = result.height = rect.width;
                    rect.rotated = result.rotated = true;
                    bestShortSideFit = shortSideFit;
                    bestAreaFit = areaFit;
                    // processedRect = true;
                }
            }

            // if(!processedRect) { break; }
        }

        scores.score1 = bestAreaFit;
        scores.score2 = bestShortSideFit;

        // if(!processedRect) {
        //     console.log(`Rect won't fit: ${JSON.stringify(rect, null, 3)}`)
        //     LogHelper.LogMessage("WARN", `Rect won't fit: ${JSON.stringify(rect)}`);
        // }
        return bestAreaFit === JoeRectsPacker.BIG_NUMBER ? Rectangle.Empty : rect;
        // return rect;
    }

    private _placeByBestShortSideFit(rect: Rectangle, scores: PackScores) : Rectangle {
        const result: Rectangle = Rectangle.Empty;
        let bestShortSideFit: number = JoeRectsPacker.BIG_NUMBER;
        let bestLongSideFit: number = JoeRectsPacker.BIG_NUMBER;

        // TODO: is this OK? untested.
        if(rect.isEmpty) {
            return rect;
        }

        for(let freeRect of this.pack_freeRects) {
            if(freeRect.width >= rect.width && freeRect.height >= rect.height) {
                const leftoverHoriz: number = Math.abs(freeRect.width - rect.width);
                const leftoverVert: number = Math.abs(freeRect.height - rect.height);
                const shortSideFit: number = Math.min(leftoverHoriz, leftoverVert);
                const longSideFit: number = Math.max(leftoverHoriz, leftoverVert);


                // if (shortSideFit < bestShortSideFit || (shortSideFit == bestShortSideFit && longSideFit < bestLongSideFit)) {
                //     rect.x = result.x = freeRect.x;
                //     rect.y = result.y = freeRect.y;
                //     rect.width = result.width = rect.width; // TODO: really?
                //     rect.height = result.height = rect.height; // TODO: really?
                //     rect.rotated = result.rotated = false;
                //     bestShortSideFit = shortSideFit;
                //     bestLongSideFit = longSideFit;
                // }

                if (shortSideFit < bestShortSideFit) {
                    rect.x = result.x = freeRect.x;
                    rect.y = result.y = freeRect.y;
                    // rect.width = result.width = rect.width; // TODO: really?
                    // rect.height = result.height = rect.height; // TODO: really?
                    result.width = rect.width;
                    result.height = rect.height;
                    rect.rotated = result.rotated = false;
                    bestShortSideFit = shortSideFit;
                    bestLongSideFit = longSideFit;
                }
                // if (shortSideFit == bestShortSideFit && longSideFit < bestLongSideFit) {
                //     rect.x = result.x = freeRect.x;
                //     rect.y = result.y = freeRect.y;
                //     rect.width = result.width = rect.width; // TODO: really?
                //     rect.height = result.height = rect.height; // TODO: really?
                //     rect.rotated = result.rotated = false;
                //     bestShortSideFit = shortSideFit;
                //     bestLongSideFit = longSideFit;
                // }
            }

            if(this.pack_allowRotate && freeRect.width >= rect.height && freeRect.height >= rect.width) {
                const leftoverHoriz: number = Math.abs(freeRect.width - rect.height);
                const leftoverVert: number = Math.abs(freeRect.height - rect.width);
                const shortSideFit: number = Math.min(leftoverHoriz, leftoverVert);
                const longSideFit: number = Math.max(leftoverHoriz, leftoverVert);

                if (shortSideFit < bestShortSideFit || (shortSideFit == bestShortSideFit && longSideFit < bestLongSideFit)) {
                    rect.x = result.x = freeRect.x;
                    rect.y = result.y = freeRect.y;
                    rect.width = result.width = rect.height;
                    rect.height = result.height = rect.width;
                    rect.rotated = result.rotated = true;
                    bestShortSideFit = shortSideFit;
                    bestLongSideFit = longSideFit;
                }
            }
        }

        scores.score1 = bestShortSideFit;
        scores.score2 = bestLongSideFit;

        // TODO: compare bestLongSideFit as well ??
        return (
            bestShortSideFit === JoeRectsPacker.BIG_NUMBER &&
            bestLongSideFit === JoeRectsPacker.BIG_NUMBER
            ? Rectangle.Empty : rect);
    }

    private _placeByBestLongSideFit(rect: Rectangle, scores: PackScores) : Rectangle {
        const result: Rectangle = Rectangle.Empty;
        let bestShortSideFit: number = JoeRectsPacker.BIG_NUMBER;
        let bestLongSideFit: number = JoeRectsPacker.BIG_NUMBER;

        // TODO: is this OK? untested.
        if(rect.isEmpty) {
            return rect;
        }

        for(let freeRect of this.pack_freeRects) {
            if(freeRect.width >= rect.width && freeRect.height >= rect.height) {
                const leftoverHoriz: number = Math.abs(freeRect.width - rect.width);
                const leftoverVert: number = Math.abs(freeRect.height - rect.height);
                const shortSideFit: number = Math.min(leftoverHoriz, leftoverVert);
                const longSideFit: number = Math.max(leftoverHoriz, leftoverVert);


                if (longSideFit < bestLongSideFit || (longSideFit == bestLongSideFit && shortSideFit < bestShortSideFit)) {
                    rect.x = result.x = freeRect.x;
                    rect.y = result.y = freeRect.y;
                    rect.width = result.width = rect.width; // TODO: really?
                    rect.height = result.height = rect.height; // TODO: really?
                    rect.rotated = result.rotated = false;
                    bestShortSideFit = shortSideFit;
                    bestLongSideFit = longSideFit;
                }
            }

            if(this.pack_allowRotate && freeRect.width >= rect.height && freeRect.height >= rect.width) {
                const leftoverHoriz: number = Math.abs(freeRect.width - rect.height);
                const leftoverVert: number = Math.abs(freeRect.height - rect.width);
                const shortSideFit: number = Math.min(leftoverHoriz, leftoverVert);
                const longSideFit: number = Math.max(leftoverHoriz, leftoverVert);

                if (longSideFit < bestLongSideFit || (longSideFit == bestLongSideFit && shortSideFit < bestShortSideFit)) {
                    rect.x = result.x = freeRect.x;
                    rect.y = result.y = freeRect.y;
                    rect.width = result.width = rect.height;
                    rect.height = result.height = rect.width;
                    rect.rotated = result.rotated = true;
                    bestShortSideFit = shortSideFit;
                    bestLongSideFit = longSideFit;
                }
            }
        }

        scores.score1 = bestShortSideFit;
        scores.score2 = bestLongSideFit;

        // TODO: compare bestShortSideFit as well ??
        return (
            bestLongSideFit === JoeRectsPacker.BIG_NUMBER &&
            bestShortSideFit === JoeRectsPacker.BIG_NUMBER
            ? Rectangle.Empty : rect);
    }

    private _placeByBottomLeftRule(rect: Rectangle, scores: PackScores) : Rectangle {
        return Rectangle.Empty;
    }

    /// Returns 0 if the two intervals i1 and i2 are disjoint, or the length of their overlap otherwise.
    private _calcCommonIntervalLength(i1start: number, i1end: number, i2start: number, i2end: number) {
        if (i1end < i2start || i2end < i1start)
            return 0;

        return Math.min(i1end, i2end) - Math.max(i1start, i2start);
    }

    private _calcContactPointScoreNode(x: number, y: number, width: number, height: number) {

        let score: number = 0;

        if (x == 0 || x + width == this.pack_width)
            score += height;
        if (y == 0 || y + height == this.pack_height)
            score += width;

        for (let usedRect of this.pack_usedRects) {
            if (usedRect.x == x + width || usedRect.x + usedRect.width == x)
                score += this._calcCommonIntervalLength(usedRect.y, usedRect.y + usedRect.height, y, y + height);
            if (usedRect.y == y + height || usedRect.y + usedRect.height == y)
                score += this._calcCommonIntervalLength(usedRect.x, usedRect.x + usedRect.width, x, x + width);
        }

        return score;
    }

    private _placeByContactPointRule(rect: Rectangle, scores: PackScores) : Rectangle {
        const result: Rectangle = Rectangle.Empty;

        let bestContactScore: number = -1;

        for(let freeRect of this.pack_freeRects) {
            // Try to place the rectangle in upright orientation.
            if (freeRect.width >= rect.width && freeRect.height >= rect.height)
            {
                let score = this._calcContactPointScoreNode(freeRect.x, freeRect.y, rect.width, rect.height);

                if (score > bestContactScore)
                {
                    rect.x = result.x = freeRect.x;
                    rect.y = result.y = freeRect.y;
                    rect.width = result.width = rect.width; // TODO: really?
                    rect.height = result.height = rect.height; // TODO: really?
                    rect.rotated = result.rotated = false;
                    bestContactScore = score;
                }
            }
            if (this.pack_allowRotate && freeRect.width >= rect.height && freeRect.height >= rect.width)
            {
                let score = this._calcContactPointScoreNode(freeRect.x, freeRect.y, rect.height, rect.width);

                if (score > bestContactScore)
                {
                    rect.x = result.x = freeRect.x;
                    rect.y = result.y = freeRect.y;
                    rect.width = result.width = rect.height;
                    rect.height = result.height = rect.width;
                    rect.rotated = result.rotated = true;
                    bestContactScore = score;
                }
            }
        }
        return (bestContactScore === -1) ? Rectangle.Empty : result;
    }

    protected OnResize(project: Project, oldWidth: number, oldHeight: number, newWidth: number, newHeight: number, changed: boolean): boolean {
        // TODO: implement
        return changed;
    }

    protected OnProgressCallback(progress: number): boolean {
        // TODO: implement
        return true;
    }

    protected OnCompleteCallback(success: boolean): void {
        // TODO: implement
    }

    private static _registerParser = (() => {
        PackerHelper.RegisterPacker(new JoeRectsPacker());
    })();

}