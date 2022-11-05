import {ISpritePacker} from "./ISpritePacker";
import {CallbackStatusTypes, SpritePackerTypes} from "../Types";
import Project from "../../objs/Project";

export default abstract class BasePacker implements ISpritePacker {
    abstract doInit(): void;
    abstract doPack(): void;

    doResize(minWidth: number, minHeight: number): boolean {
        return false;
    }

    abstract getPackerType(): SpritePackerTypes;
    abstract packSprites(project: Project, progress?: (float) => boolean): Promise<CallbackStatusTypes>;
}