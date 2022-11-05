import Project from "../../objs/Project";
import LogHelper from "../LogHelper";
import {CallbackStatusTypes, SpritePackerTypes} from "../Types";
import PackerHelper from "../PackerHelper";
import BasePacker from "./BasePacker";

export default class BasicPacker extends BasePacker {

    constructor() {
        super();
        PackerHelper.RegisterPacker(this);
    }

    public doInit(): void {
        // TODO: implement
    }

    public doPack(): void {
    }

    public doResize(minWidth: number, minHeight: number): boolean {
        return super.doResize(minWidth, minHeight);
    }

    public getPackerType(): SpritePackerTypes {
        return "Basic";
    }

    public async packSprites(project: Project, progress?: (float) => boolean): Promise<CallbackStatusTypes> {
        let canceled = false;
        try {
            // TODO: process image frames
            // TODO: call progress callback regularly
            // TODO: cancel when progress returns false
        } catch(e) {
            LogHelper.LogMessage("ERROR", `There was an error while applying the '${this.getPackerType()}' packer.`, e);
            return Promise.reject("Failed");
        }
        return canceled ? Promise.reject("Canceled") : Promise.resolve("Completed");
    }
}