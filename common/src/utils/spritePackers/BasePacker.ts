import ImageFrame from "../../objs/ImageFrame";
import {ISpritePacker} from "./ISpritePacker";
import {AllHeuristics, CallbackStatusTypes, SortByTypes, SpritePackerTypes} from "../Types";
import Project from "../../objs/Project";
import LogHelper from "../LogHelper";
import BaseParser from "../frameParsers/BaseParser";
import ParserHelper from "../ParserHelper";
import ProjectOptions from "../../objs/ProjectOptions";
import MathHelper from "../MathHelper";
import Rectangle from "../../objs/Rectangle";
import SortHelper from "../SortHelper";

export type FrameHashesType = { [key: string]: ImageFrame[] };

export default abstract class BasePacker implements ISpritePacker {

    // values used for the current packing task
    public pack_width: number = 0;
    public pack_height: number = 0;
    public pack_allowRotate: boolean = false;
    public pack_paddingBorder: number = 0;
    public pack_paddingShape: number = 0;
    public pack_useAllFrames: boolean = false;
    public pack_heuristic: AllHeuristics = "InferFromSort";
    public pack_frameCount: number = 0;
    public pack_framesProcessed: number = 0;
    public pack_frameHashes: FrameHashesType = {} as FrameHashesType;
    public pack_start: number = Date.now();
    public pack_end: number | undefined = undefined;
    public pack_duration: number | undefined = undefined;
    public pack_success: boolean | undefined = undefined;
    public pack_complete: boolean | undefined = undefined;

    public abstract GetPackerType(): SpritePackerTypes;
    public abstract GetDefaultSortBy(): SortByTypes;
    public abstract GetHeuristic(project: Project): AllHeuristics;

    public static get GROW_BY() : number { return 8; }

    public DoInit(project: Project, width?: number, height?: number) : boolean {

        this.pack_width = width || 1;
        this.pack_height = height || 1;
        this.pack_framesProcessed = 0;
        this.pack_end = undefined;
        this.pack_duration = undefined;
        this.pack_success = undefined;
        this.pack_complete = undefined;

        if (!width || !height) {

            LogHelper.Clear();

            // TODO: add checks for the following; ideally, implement without modifying the project options object
            // [ ] is sprite rotation supported in CSS? WARN / CORRECT
            // [ ] does the selected heuristic negate the benefits of the selected packer? WARN ONLY
            // [X] Trim with Threshold of 255? WARN / CORRECT
            // [X] FixedSize with ForceSquare, when not square? WARN / CORRECT
            // [X] FixedSize with PowerOfTwo, when not power of two? WARN / CORRECT

            const options = Object.assign({}, project.options);
            // TODO: implement as described
            if(options.trimMode === "Trim" && options.trimThreshold === 255) {
                LogHelper.LogMessage("WARN", "TrimMode enabled, but with a trim threshold of 255.");
                LogHelper.LogMessage("WARN", "All sprites would be eliminated. Using a trim threshold of 1 instead.");
                options.trimThreshold = 1;
            }

            // TODO: implement as described
            if(options.forceSquare === "Yes" && options.sizeMode == "Fixed Size" && options.width != options.height) {
                LogHelper.LogMessage("WARN", `Force Square is enabled with Fixed Size, but width and height don't match at ${options.width}x${options.height}.`);
                const newSize = Math.max(options.width, options.height);
                LogHelper.LogMessage("WARN", `Resizing would fail. Using a size of ${newSize}x${newSize} instead.`);
                options.width = options.height = newSize;
            }

            // TODO: implement as described
            if(options.sizeMode === "Fixed Size" && options.constraint === "Power of Two" && (!MathHelper.IsPowerOfTwo(options.width) || !MathHelper.IsPowerOfTwo(options.height))) {
                LogHelper.LogMessage("WARN", `Power of Two constraint is enabled with Fixed Size, but the width or height are not powers of two at ${options.width}x${options.height}.`);
                const newWidth = MathHelper.RoundUpToPowerOfTwo(project.options.width - 1);
                const newHeight = MathHelper.RoundUpToPowerOfTwo(project.options.height - 1);
                LogHelper.LogMessage("WARN", `Resizing would fail. Using a size of ${newWidth}x${newHeight} instead.`);
                options.width = newWidth;
                options.height = newHeight;
            }

            this.pack_start = Date.now();
            this.pack_allowRotate = project.options.allowRotate === "Yes";
            this.pack_paddingBorder = project.options.borderPadding ?? 0;
            this.pack_paddingShape = (project.options.shapePadding ?? 0) + (project.options.innerPadding ?? 0);
            this.pack_useAllFrames = project.options.animatedGif === "Extract Frames";
            this.pack_heuristic = this.GetHeuristic(project);
            this.pack_frameCount = 0;
            this.pack_frameHashes = {} as FrameHashesType;

            let areaOfFrames = 0; // only useful when sizeMode is "Max Size"
            for (const key in project.images) {
                const image = project.images[key];
                if (!image.frames?.length) {
                    const filetype = image.filetype?.toUpperCase();
                    const imageFormat: string | undefined = filetype === "JPEG" ? "JPG" : filetype;
                    if (imageFormat) {
                        image.frames = [] as ImageFrame[];
                        const parser = ParserHelper.RegisteredParsers[imageFormat];
                        parser?.PopulateFrames(image, undefined, project);
                        for (const frame of image.frames) {
                            this.ApplyTrimFilter(frame, project.options);
                            this.ApplyInnerPaddingFilter(frame, project.options);
                            this.ApplyAliasSpritesFilter(frame, project.options, this.pack_frameHashes);
                        }
                    }
                }
                if (image.frames?.length) {
                    for (const frame of image.frames) {
                        if (frame?.spriteRect.width && frame?.spriteRect.height) {
                            areaOfFrames += (frame.spriteRect.width + this.pack_paddingShape * 2) * (frame.spriteRect.height + this.pack_paddingShape * 2);
                            this.pack_frameCount++;
                        }
                        if (!this.pack_useAllFrames) { break; }
                    }
                }
            }

            // let areaOfFrames = 0; // only useful when sizeMode is "Max Size"
            // for (const key in project.images) {
            //     const image = project.images[key];
            //     if (image) {
            //         if (!image.frames || !image.frames.length) {
            //             const filetype = image.filetype?.toUpperCase();
            //             const imageFormat: string | undefined = filetype === "JPEG" ? "JPG" : filetype;
            //             if (imageFormat) {
            //                 image.frames = [] as ImageFrame[];
            //                 const parser: BaseParser = ParserHelper.RegisteredParsers[imageFormat];
            //                 if (parser) {
            //                     parser.PopulateFrames(image, undefined, project);
            //                     image.frames.forEach((frame, index, array) => {
            //                         this.ApplyTrimFilter(frame, project.options);
            //                         this.ApplyInnerPaddingFilter(frame, project.options);
            //                         this.ApplyAliasSpritesFilter(frame, project.options, this.pack_frameHashes);
            //                     });
            //                 }
            //             }
            //         }
            //         if (image.frames) {
            //             for (let i = 0; i < image.frames.length; i++) {
            //                 const frame = image.frames[i];
            //                 if (frame && frame.spriteRect.width && frame.spriteRect.height) {
            //                     areaOfFrames += (frame.spriteRect.width + this.pack_paddingShape * 2) * (frame.spriteRect.height + this.pack_paddingShape * 2);
            //                     this.pack_frameCount++;
            //                 }
            //                 if (!this.pack_useAllFrames) { break; }
            //             }
            //         }
            //     }
            // }

            if(project.options.sizeMode === "Fixed Size") {
                this.pack_width = project.options.width;
                this.pack_height = project.options.height;
            } else {
                this.DoInitialSizeBestGuess(project, 8, 8, areaOfFrames);
            }

            LogHelper.LogMessage("LOG", `Packing ${this.pack_frameCount} frames using the ${this.GetPackerType()} sprite packer ...`);
        } else {
            // LogHelper.LogMessage("DEBUG", `Packing restarted due to canvas resize to ${this.pack_width}x${this.pack_height}...`);
        }

        // DEAD CODE
        if(this.pack_width > project.options.width || this.pack_height > project.options.height) {
            LogHelper.LogMessage("ERROR", `Packing canceled due to canvas overflow at ${this.pack_width}x${this.pack_height}.`);
            this.DoCompleteCallback(false, project);
            return false;
        }

        return this.OnInit(project);
    }

    public ApplyTrimFilter(frame: ImageFrame, options: ProjectOptions) : void {
        if(options.trimMode === "Trim") {
            const threshold: number = options.trimThreshold === 255 ? 1 : (options.trimThreshold ?? 1);
            // TODO: implement
        }
        frame.filterAppliedTrimRect = true;
    }

    public ApplyInnerPaddingFilter(frame: ImageFrame, options: ProjectOptions) : void {
        let innerPadding: number = options.innerPadding ?? 0;
        if(innerPadding > 0) {
            // TODO: implement
        }
        frame.filterAppliedPaddingInner = true;
    }

    public ApplyAliasSpritesFilter(frame: ImageFrame, options: ProjectOptions, frameHashes: FrameHashesType) {
        if(options.aliasSprites === "Yes") {
            const bigHash: string = 'bigHash:' + (frame.hashSHA256 ?? '[sha256]') + (frame.hashMD5 ?? '[md5]');
            if(Object.getOwnPropertyNames(frameHashes).indexOf(bigHash) >= 0) {
                frame.isDuplicate = true;
            } else {
                frame.isDuplicate = false;
                frameHashes[bigHash] = [] as ImageFrame[];
            }
            frameHashes[bigHash].push(frame);
        }
        frame.filterAppliedAliasHash = true;
    }

    // This should make the packing faster by avoiding pointless resizing. We'll see.
    protected DoInitialSizeBestGuess(project: Project, width: number, height: number, targetArea: number): void {
        const options = project.options;
        const padding: number = Math.max(options.shapePadding || 0, options.borderPadding || 0);

        let resizeResult: boolean = true;
        let canvasRect: Rectangle = Rectangle.Inflate(Rectangle.Create(0,0,this.pack_width, this.pack_height), -padding);
        let fitsArea: boolean = targetArea <= canvasRect.width * canvasRect.height;
        let canGrowMore: boolean = (
            options.width > this.pack_width ||
            options.height > this.pack_height
        );

        LogHelper.LogMessage("DEBUG", `DoInitialSizeBestGuess(): ${JSON.stringify({resizeResult, canvasRect, fitsArea, canGrowMore}, null, 2)}`)
        let didGrow = true;
        while (resizeResult && !fitsArea && didGrow && canGrowMore) {
            const canvasRectPrevious = Rectangle.Inflate(Rectangle.Create(0,0,this.pack_width, this.pack_height), -padding);
            resizeResult = this.DoResize(project, this.pack_width + BasePacker.GROW_BY, this.pack_height + BasePacker.GROW_BY);
            canvasRect = Rectangle.Inflate(Rectangle.Create(0, 0, this.pack_width, this.pack_height), -padding);
            fitsArea = targetArea <= canvasRect.area;
            didGrow = canvasRect.area > canvasRectPrevious.area;
            canGrowMore = (
                options.width > this.pack_width ||
                options.height > this.pack_height
            );
            LogHelper.LogMessage("DEBUG", `DoInitialSizeBestGuess(): ${JSON.stringify({resizeResult, canvasRectPrevious, canvasRect, fitsArea, canGrowMore}, null, 2)}`)
        }

        LogHelper.LogMessage("DEBUG", `${this.pack_width}x${this.pack_height} <<<`);
    }

    public DoPack(project: Project): CallbackStatusTypes {
        if (this.DoInit(project)) {
            if (this.OnPack(project)) {
                if (this.DoRender(project)) {
                    this.DoCompleteCallback(true, project);
                    return "Completed";
                }
                // DEAD CODE
                this.DoCompleteCallback(false, project);
                return "Failed";
            }
            this.DoCompleteCallback(false, project);
            return "Failed";
        }
        // DEAD CODE
        this.DoCompleteCallback(false, project);
        return "Failed";
    }

    public DoRender(project: Project) : boolean {
        // TODO: render ...

        return true;
    }

    protected DoResize(project: Project, minWidth: number, minHeight: number): boolean {
        const wOrig = this.pack_width;
        const hOrig = this.pack_height;
        const options = project.options;

        minWidth = minWidth || (this.pack_width + BasePacker.GROW_BY);
        minHeight = minHeight || (this.pack_height + BasePacker.GROW_BY);

        if (options.sizeMode === "Fixed Size") {
            this.pack_width = options.width ?? this.pack_width + BasePacker.GROW_BY;
            this.pack_height = options.height ?? this.pack_height + BasePacker.GROW_BY;
        } else {
            const hOpts = options.height;
            const wOpts = options.width;

            if (this.pack_width >= this.pack_height && hOrig < hOpts) {
                // increase height
                this.pack_height = minHeight;
                if (project.options.constraint === "Power of Two") {
                    this.pack_height = Math.min(hOpts, MathHelper.RoundUpToPowerOfTwo(this.pack_height));
                }

                if (options.forceSquare === "Yes") {
                    this.pack_width = Math.min(wOpts, this.pack_height);
                }
            } else if (this.pack_height >= this.pack_width && wOrig < wOpts) {
                // increase width
                this.pack_width = minWidth;
                if (options.constraint === "Power of Two") {
                    this.pack_width = Math.min(wOpts, MathHelper.RoundUpToPowerOfTwo(this.pack_width));
                }

                if (options.forceSquare === "Yes") {
                    this.pack_height = Math.min(hOpts, this.pack_width);
                }
            } else {
                if (this.pack_height >= hOpts) {
                    this.pack_width = minWidth;
                } else if (this.pack_width >= wOpts) {
                    this.pack_height = minHeight;
                } else if(this.pack_height < hOpts || this.pack_height < wOpts) {
                    this.pack_width = minWidth;
                    this.pack_height = minHeight;
                } else {
                    this.DoCompleteCallback(false, project);
                }
            }
        }

        const changed = wOrig != this.pack_width || hOrig != this.pack_height;
        if(changed) {
            LogHelper.LogMessage("DEBUG", `Resized canvas to ${this.pack_width}x${this.pack_height}.`);
        } else {
            LogHelper.LogMessage("WARN", `Canvas is full at ${this.pack_width}x${this.pack_height} with ${this.pack_framesProcessed} frames placed.`);
        }

        return this.OnResize(project, wOrig, hOrig, this.pack_width, this.pack_height, changed) || changed;
    }

    protected DoProgressCallback(progress: number, project: Project): boolean {
        return this.OnProgressCallback(progress, project);
    }

    protected secondsFormat = Intl.NumberFormat('en-US', {
        minimumIntegerDigits: 1,
        minimumFractionDigits: 2
    });

    protected DoCompleteCallback(success: boolean, project: Project): void {
        this.pack_complete = true;
        this.pack_success = success;
        this.OnCompleteCallback(success, project);

        // TODO: actually create/draw the canvas image
        // project.canvas = base64 of sheet png, with sprites
        // seeAlso: this.DoRender() ... maybe w shouldn't render in the On/DoComplete event

        this.pack_end = Date.now();
        this.pack_duration = (this.pack_end - this.pack_start) / 1000.0;
        LogHelper.LogMessage("LOG", `Processed ${this.pack_framesProcessed} frames in ${this.secondsFormat.format(this.pack_duration)} seconds ...`);
        if(success) {
            LogHelper.LogMessage("LOG", 'There were no errors.');
        } else {
            LogHelper.LogMessage("ERROR", 'There was a problem processing some frames.');
        }
    }

    public CalcOccupancy(project: Project) : number
    {
        const rects = BasePacker.ExtractFrameSpriteRects(project);
        let usedSurfaceArea: number = 0;
        for(let rect of rects) {
            usedSurfaceArea += rect.width * rect.height;
        }

        return usedSurfaceArea / (this.pack_width * this.pack_height);
    }

    public static ExtractFrameSpriteRects(project: Project) : Rectangle[] {
        const rects = [] as Rectangle[];
        for(let imgKey of Object.getOwnPropertyNames(project.images)) {
            const frames = project.images[imgKey].frames;
            if(frames) {
                for (let frame of frames) {
                    if(frame.spriteRect) {
                        rects.push(frame.spriteRect);
                    }
                    if (project.options.animatedGif !== "Extract Frames") { break; }
                }
            }
        }
        return rects;
    }

    public ValidatePlacements(project: Project): boolean {
        const rects = BasePacker.ExtractFrameSpriteRects(project);
        // let result = true;

        const padding = Math.max(this.pack_paddingBorder, this.pack_paddingShape);
        const paddedCanvas =
            Rectangle.Inflate(Rectangle.Create(0, 0, this.pack_width, this.pack_height), -padding);

        for(let i = 0; i < rects.length; i++) {
            const rect = rects[i];
            const fitsCanvas = paddedCanvas.Contains(rect);

            if (!fitsCanvas || rect.isEmpty) {
                LogHelper.LogMessage("DEBUG", `rects[${i}] does not fit canvas !!! \nRect: ${JSON.stringify(rects[i], null, 2)}, \nCanvas: ${JSON.stringify(paddedCanvas, null, 2)}`);
                return false;
            }
        }

        // check for collisions with peers
        for (let i = 0; i < rects.length; i++) {
            const rect = rects[i];
            for (let i2 = 0; i2 < rects.length; i2++) {
                if (i2 !== i && rects[i2].Intersects(rect)) {
                    LogHelper.LogMessage("DEBUG", `rects[${i}] intersects rects[${i2}] !!! ${JSON.stringify(rects[i], null, 2)}, ${JSON.stringify(rects[i2], null, 2)}`);
                    return false;
                }
            }
        }

        return true;
    }

    public static ExtractFrames(project: Project) : ImageFrame[] {
        const keys: string[] = SortHelper.SortByMethods[project.options.sortBy ?? "AREA_DESC"](project);
        const result = [] as ImageFrame[];
        // for(let imgKey of Object.getOwnPropertyNames(project.images)) {
        for(let key of keys) {
            const frames = project.images[key].frames;
            if(frames) {
                for (let frame of frames) {
                    if(!frame.spriteRect.isEmpty) {
                        result.push(frame);
                    }
                    if (project.options.animatedGif !== "Extract Frames") { break; }
                }
            }
        }
        return result;
    }

    protected abstract OnInit(project: Project): boolean;
    protected abstract OnPack(project: Project): boolean;
    protected abstract OnPack(project: Project): boolean;
    protected abstract OnResize(project: Project, oldWidth: number, oldHeight: number, newWidth: number, newHeight: number, changed: boolean): boolean;
    protected abstract OnProgressCallback(progress: number, project: Project): boolean;
    protected abstract OnCompleteCallback(success: boolean, project: Project): void;

}