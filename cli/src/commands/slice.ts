import {Arguments /*, CommandModule*/} from 'yargs';
//import {DEVELOPER} from "gdu-common";
import CommandModuleEx from "./project/CommandModuleEx";
import ArgsUtil, {ValidatedResult} from "./utils/ArgsUtil";
import SliceLogic from "./slice-logic";

export default class SliceCommand extends CommandModuleEx {
    constructor() {
        super();
        this._command = "slice <image> <dest> <numcols> <rownames..>";
        this._describe = "split sheet into sprites";
        this._builder = undefined;
        this._handlerResult = new ValidatedResult();
    }

    handler(args: Arguments<any>): void {
        CommandModuleEx.setFlowValues(this, 'slice', false, false);
        super.handler(args);

        console.log(`Splitting '${args.image}' ...`);
        SliceLogic.Slice(args.image as string, args.numcols as number, args.rownames as string[]);
    };

    static get helpText(): string {
        return `help text method for slice`;
    }
}