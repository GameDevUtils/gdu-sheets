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

    static setFlowValues = (self: any, commandName: string, readFirst: boolean = false, cullImages: boolean = false, packImages: boolean = false) => {
        self.commandName = commandName;
        self.readFirst = readFirst;
        self._cullImages = cullImages;
        self._packImages = packImages;
    };

    handler(args: Arguments): void {
        PublishProjectCommand.setFlowValues(this, 'publish', true, false, true);
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
