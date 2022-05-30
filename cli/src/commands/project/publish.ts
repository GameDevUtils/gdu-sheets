import 'colors';
import CommandModuleEx from "./CommandModuleEx";
import {ValidatedResult} from "../utils/ArgsUtil";
import {Arguments} from "yargs";

export default class PublishProjectCommand extends CommandModuleEx {
    constructor() {
        super();
        this._command = "publish <path> [outpath]";
        this._describe = "generate game assets";
        this._builder = undefined;
        this._handlerResult = new ValidatedResult();
    }

    handler(args: Arguments): void {
        CommandModuleEx.setFlowValues(this, 'publish', true, false, true, true);
        super.handler(args);
    }

    static get helpText(): string {
        return `
Publish an existing project, optionally overriding 
the project settings, adding new images, and 
specifying an output (file or stdout). 

Examples:
  gdu-sheets publish proj1
  gdu-sheets publish proj2 --compress-project --output
  gdu-sheets add ~/proj3.fpsheet proj3
`;
    }

}
