import Project from "../objs/Project";
import {CallbackStatusTypes} from "./Types";
import BasePacker from "./spritePackers/BasePacker";

export type Packers = { [key: string]: BasePacker };

export default class PackerHelper {

    // public static async PackSprites(packer: BasePacker, project: Project) : Promise<CallbackStatusTypes>  {
    //     return packer.DoPack(project);
    // }

    public static RegisteredPackers: Packers = {} as Packers;
    public static RegisterPacker(packer: BasePacker) : void {
        const key = packer.GetPackerType();
        if(key) {
            if (!PackerHelper.RegisteredPackers[key]) {
                PackerHelper.RegisteredPackers[key] = packer;
            }
        }
    }
}
