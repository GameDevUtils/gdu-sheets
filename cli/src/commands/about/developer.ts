import {Arguments /*, CommandModule*/} from 'yargs';
import {DEVELOPER} from "gdu-common/build/objs/content";
import CommandModuleEx from "../project/CommandModuleEx";
import ArgsUtil, {ValidatedResult} from "../utils/ArgsUtil";

export default class AboutDeveloperCommand extends CommandModuleEx {
    constructor() {
        super();
        this._command = "developer";
        this._describe = "about the developer";
        this._builder = undefined;
        this._handlerResult = new ValidatedResult();
    }

    static setFlowValues = (self: any, commandName: string, readFirst: boolean = false, cullImages: boolean = false, packImages: boolean = false) => {
        self.commandName = commandName;
        self.readFirst = readFirst;
        self._cullImages = cullImages;
        self._packImages = packImages;
    };

    handler = (args: Arguments) => {
        AboutDeveloperCommand.setFlowValues(this, 'developer');
        this.handlerResult = ArgsUtil.Validate(args,"developer", false, false);
        if(this.handlerResult.hasNoError) {
            console.log(DEVELOPER);
        }
    };

    static get helpText(): string {
        return `help text method for developer`;
    }
}
