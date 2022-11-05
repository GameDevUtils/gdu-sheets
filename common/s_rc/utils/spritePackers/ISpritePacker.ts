import Project from "../../objs/Project";
import {CallbackStatusTypes, SpritePackerTypes} from "../Types";

export interface ISpritePacker {
    packSprites(project: Project, progress?: (float) => boolean) : Promise<CallbackStatusTypes>;
    getPackerType() : SpritePackerTypes;

    doInit() : void;
    doPack() : void;
    doResize(minWidth: number, minHeight: number) : boolean;
}
