import Project from "../../objs/Project";
import LogHelper from "../LogHelper";
import {
    CallbackStatusTypes,
    GuillotinePackerHeuristics,
    ShelfPackerHeuristics,
    SortByTypes,
    SpritePackerTypes
} from "../Types";
import PackerHelper from "../PackerHelper";
import BasePacker from "./BasePacker";
import SortHelper from "../SortHelper";
import Rectangle from "../../objs/Rectangle";
import ParserHelper from "../ParserHelper";
import BmpParser from "../frameParsers/BmpParser";

export default class ShelfPacker extends BasePacker {

    public GetPackerType(): SpritePackerTypes {
        return "Shelf";
    }

    public GetDefaultSortBy(): SortByTypes {
        return "HEIGHT_DESC"; // "AREA_DESC";
    }

    public GetHeuristic(project: Project): ShelfPackerHeuristics {
        let heuristic: ShelfPackerHeuristics;

        if(project.options.packerHeuristics !== "InferFromSort") {
            return project.options.packerHeuristics as ShelfPackerHeuristics ?? "FirstFit";
        }

        // TODO: implement NextFit | FirstFit
        switch(project.options.sortBy ?? this.GetDefaultSortBy()) {
            case "WIDTH":
                heuristic = "WorstWidth";
                break;
            case "WIDTH_DESC":
                heuristic = "BestWidth";
                break;
            case "HEIGHT":
                heuristic = "WorstHeight";
                break;
            case "HEIGHT_DESC":
                heuristic = "BestHeight";
                break;
            case "AREA":
            case "PERIMETER":
                heuristic =  "WorstArea";
                break;
            case "AREA_DESC":
            case "PERIMETER_DESC":
            default:
                heuristic = "BestArea";
                break;
        }

        return heuristic;
    }

    public static get BIG_NUMBER() : number { return Number.MAX_SAFE_INTEGER; }

    protected pack_shelfHeight: number = 0;

//     protected pack_currentX: number = 0;
//     protected pack_currentY: number = 0;
//     protected pack_maxX: number = 0;
//     protected pack_maxY: number = 0;

    protected OnInit(project: Project): boolean {
        return true;
    }

    protected pack_currentX: number = 0;
    protected pack_currentY: number = 0;

    protected OnPack(project: Project): boolean {
        const frames = BasePacker.ExtractFrames(project);
        const options = project.options;
        const padding = Math.max(options.shapePadding ?? 0, options.borderPadding ?? 0);

        this.pack_complete = false;

        while (!this.pack_complete) {
            let breakFromForLoop = false;
            const paddedCanvas =
                Rectangle.Inflate(Rectangle.Create(0, 0, this.pack_width, this.pack_height), -padding);

            this.pack_currentX = this.pack_currentY = this.pack_shelfHeight = this.pack_framesProcessed = 0;
let index = 0;
            for (const frame of frames) {
                frame.spriteRect.x = this.pack_currentX + padding;
                frame.spriteRect.y = this.pack_currentY + padding;

                if (!paddedCanvas.Contains(frame.spriteRect)) {
// LogHelper.LogMessage("DEBUG", "paddedCanvas did not contain sprite.");
                    this.pack_currentX = 0;
                    this.pack_currentY += this.pack_shelfHeight;
                    // this.pack_shelfHeight = frame.spriteRect.height + padding * 2;
                    frame.spriteRect.x = this.pack_currentX + padding;
                    frame.spriteRect.y = this.pack_currentY + padding;
                }

                this.pack_currentX += frame.spriteRect.width + padding * 2;
                this.pack_shelfHeight = Math.max(this.pack_shelfHeight, frame.spriteRect.height + padding * 2);

                this.pack_framesProcessed++;

// LogHelper.LogMessage("DEBUG", `shelfHeight: ${this.pack_shelfHeight}; frame[${index++}]: ${JSON.stringify(frame.spriteRect, null, 2)}`);
                if (!paddedCanvas.Contains(frame.spriteRect)) {
                    LogHelper.LogMessage("DEBUG", `OOPS: Newly-placed sprite does not fit! Need to DoResize()... ${this.pack_width}x${this.pack_height}`);
                    if (!this.DoResize(project, this.pack_width + BasePacker.GROW_BY, this.pack_height + BasePacker.GROW_BY)) {
                        this.pack_complete = true;
                    }
                    LogHelper.LogMessage("DEBUG", `breakFromForLoop: ${breakFromForLoop};`);
                    breakFromForLoop = true;
                    break;
                }

                // if (this.pack_currentY > this.pack_height) {
                //     // TODO: resize and restart loop
                // }
            }
            if (!breakFromForLoop) {
                break;
            }
        }

        this.DoProgressCallback(1.0, project);
        const valid = this.ValidatePlacements(project);
        LogHelper.LogMessage("DEBUG", valid ? "All sprites placed." : "Some sprites could not be placed.")
        this.DoCompleteCallback(valid, project);

        // if (frames[0].spriteRect.bottom <= this.pack_height) {
        //     this.DoCompleteCallback(true, project);
        // } else {
        //     this.DoCompleteCallback(false, project);
        // }

        return !!this.pack_success;

        // const maxCanvasSize = Rectangle.Create(0, 0, options.width, options.height, false);
        // const prevCanvasSize = Rectangle.Create(0, 0, this.pack_width, this.pack_height, false);
        // while (!this.pack_complete) {
        //     const prevCanvasSize = Rectangle.Create(0, 0, this.pack_width, this.pack_height, false);
        //     const fitsConstraints =
        //         this.pack_width <= options.width &&
        //         this.pack_height <= options.height;
            
        //     let breakForLoop = false;

        //     if (fitsConstraints) {
        //         const spritePadding: number = (project.options.shapePadding || 0) + (project.options.innerPadding || 0);
        //         const framesToProcessCount: number = frames.length;
        //         let framesProcessed: number = 0;

        //         this.pack_shelfHeight = 0;
        //         for (const frame of frames) {
        //             if (frame.spriteRect.height > this.pack_shelfHeight) {
        //                 this.pack_shelfHeight = frame.spriteRect.height;
        //                 if (this.pack_currentY + this.pack_shelfHeight < options.height) {
        //                     frame.spriteRect.x = this.pack_currentX;
        //                     frame.spriteRect.y = this.pack_currentY;
        //                     this.pack_currentX += frame.spriteRect.width;
        //                     if (this.pack_currentX > this.pack_width) {
        //                         this.pack_currentY += this.pack_shelfHeight;
        //                         this.pack_currentX = 0;
        //                         frame.spriteRect.x = this.pack_currentX;
        //                         frame.spriteRect.y = this.pack_currentY;
                                
        //                         if (frame.spriteRect.bottom > this.pack_height) {

        //                         }
        //                     }
        //                 } else {
        //                     let newWidth  = this.pack_width  + BasePacker.GROW_BY;
        //                     let newHeight = this.pack_height + BasePacker.GROW_BY;
        //                     if (this.DoResize(project, newWidth, newHeight)) {
        //                         breakForLoop = true;
        //                         break;
        //                     } else {
        //                         LogHelper.LogMessage("ERROR", "Unable to resize the canvas. Pacing failed.");
        //                     }
        //                     breakForLoop = true;
        //                     break;
        //                     if (prevCanvasSize.width === this.pack_width && prevCanvasSize.height = this.pack_height) {
        //                         break;
        //                     }
        //                     prevCanvasSize.width = this.pack_width;
        //                     prevCanvasSize.height = this.pack_height;

        //                 }
        //             }
        //         }
        //     } else {
        //         // DEAD CODE?
        //         this.DoCompleteCallback(false, project);
        //         break;
        //     }
        //}

        // this.DoCompleteCallback(true, project);
        // return true;
    }

    protected OnResize(project: Project, oldWidth: number, oldHeight: number, newWidth: number, newHeight: number, changed: boolean): boolean {
        // this.pack_complete = !changed;
        return changed;
    }

    protected OnProgressCallback(progress: number, project: Project): boolean {
        // TODO: implement??
        return true;
    }

    protected OnCompleteCallback(success: boolean, project: Project): void {
        this.pack_success = success;
    }

    private static _registerParser = (() => {
        PackerHelper.RegisterPacker(new ShelfPacker());
    })();

}