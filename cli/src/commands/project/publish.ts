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
Publish an existing project, optionally overriding the 
project settings, adding new images, and specifying an 
output. Publishing a project generates the sheet and 
atlas as separate files in the file system or a ZIP file.

Examples:
  gdu-sheets publish proj1.sheets
  gdu-sheets publish proj2.sheets assets.zip
`;
    }

}
