import Project from "../../objs/Project";
import LogHelper from "../LogHelper";
import {BasicPackerHeuristics, CallbackStatusTypes, SortByTypes, SpritePackerTypes} from "../Types";
import PackerHelper from "../PackerHelper";
import BasePacker from "./BasePacker";
import SortHelper from "../SortHelper";
import Rectangle from "../../objs/Rectangle";

export default class BasicPacker extends BasePacker {

    public GetPackerType(): SpritePackerTypes {
        return "Basic"; // this is really a ShelfPacker variant, right?
    }

    public GetDefaultSortBy(): SortByTypes {
        return "HEIGHT_DESC"; // "AREA_DESC";
    }

    public GetHeuristic(project: Project): BasicPackerHeuristics {
        return "BasicDefault";
    }

    public pack_currentX: number = 0;
    public pack_currentY: number = 0;
    public pack_maxX: number = 0;
    public pack_maxY: number = 0;

    protected OnInit(project: Project): boolean {
        // TODO: implement
        return true;
    }

    protected OnPack(project: Project): boolean {

        const keys: string[] = SortHelper.SortByMethods[project.options.sortBy ?? this.GetDefaultSortBy() ?? "AREA_DESC"](project);

        while (!this.pack_complete) {
            let breakOuterLoop = false;

            if (this.pack_framesProcessed === 0) {
                // first call
                this.pack_currentX = this.pack_paddingBorder + this.pack_paddingShape;
                this.pack_currentY = this.pack_paddingBorder + this.pack_paddingShape;
                this.pack_maxX = this.pack_paddingBorder + this.pack_paddingShape;
                this.pack_maxY = this.pack_paddingBorder + this.pack_paddingShape;
            }

            for (let key of keys) {
                const image = project.images[key];

                for (let i = 0; image.frames && i < image.frames.length; i++) {
                    const frame = image.frames[i];
                    const fitsWidth = this.pack_currentX + (frame.spriteRect.width + this.pack_paddingShape) <= this.pack_width - this.pack_paddingBorder * 2;
                    const fitsHeight = this.pack_currentY + (frame.spriteRect.height + this.pack_paddingShape) <= this.pack_height - this.pack_paddingBorder * 2;
                    const fitsOnNextRow =
                        (this.pack_maxY + frame.spriteRect.height + this.pack_paddingShape * 2) <= (this.pack_height - this.pack_paddingBorder * 2) &&
                        ((frame.spriteRect.width ?? 1) + this.pack_paddingShape) <= (this.pack_width - this.pack_paddingBorder * 2);

                    if (fitsWidth && fitsHeight) {
                        // place at current loc
                        // nothing to do, that's the default behavior
                    } else if (!fitsWidth && fitsOnNextRow) {
                        // place on next row
                        this.pack_currentX = this.pack_paddingBorder + this.pack_paddingShape;
                        this.pack_currentY = this.pack_maxY;
                    } else { // if(!fitsWidth && !fitsOnNextRow) {
                        if (this.DoResize(project, this.pack_currentX + frame.spriteRect.width + this.pack_paddingBorder, this.pack_maxY + frame.spriteRect.height + this.pack_paddingBorder)) {
                            // exit loop and start over
                            if(!this.DoInit(project, this.pack_width, this.pack_height)) {
                                this.DoCompleteCallback(false, project);
                                return false;
                            }
                            breakOuterLoop = true;
                            break;
                        } else {
                            // we have a problem; won't fit; stop trying
                            LogHelper.LogMessage("ERROR", `Image '${image.fullpath}' won't fit within the specified constraints. ${project.options.width ?? 1024}x${project.options.height ?? 1024}`);
                            this.DoCompleteCallback(false, project);
                            return false;
                        }
                    }

                    // TODO: replace this.pack_paddingShape * 2 with Max(paddingShape, paddingInner) * 2 ????
                    this.pack_maxX = Math.max(this.pack_maxX, this.pack_currentX + frame.spriteRect.width + this.pack_paddingShape * 2);
                    this.pack_maxY = Math.max(this.pack_maxY, this.pack_currentY + frame.spriteRect.height + this.pack_paddingShape * 2);
                    // if(frame.spriteRect === undefined) { frame.spriteRect = Rectangle.Create(this.pack_currentX,this.pack_currentY, frame.spriteRect.width, frame.height ?? 1); }
                    // TODO: double assignment ????
                    frame.spriteRect.x = frame.spriteRect.x = this.pack_currentX;
                    frame.spriteRect.y = frame.spriteRect.y = this.pack_currentY;

                    // TODO: replace this.pack_paddingShape * 2 with Max(paddingShape, paddingInner) * 2 ????
                    this.pack_currentX += frame.spriteRect.width + this.pack_paddingShape * 2;
                    this.pack_framesProcessed++;

                    if (!this.pack_useAllFrames) { break; }
                }

                const progress: number = this.pack_framesProcessed / (this.pack_frameCount || this.pack_framesProcessed || 1);
                if(!this.DoProgressCallback(progress, project)) {
                    this.DoCompleteCallback(false, project);
                    return false;
                }

                if(breakOuterLoop) { break; }
            }

            if(breakOuterLoop) {
                breakOuterLoop = false;
            } else {
                // if we made it this far, we're done.
                this.DoCompleteCallback(true, project);
                return true;
            }
        }
        return !!this.pack_success;
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
        PackerHelper.RegisterPacker(new BasicPacker());
    })();

}