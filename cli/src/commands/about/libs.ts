import {Arguments /*, CommandModule*/} from 'yargs';
import {LIBS} from "gdu-common";
import CommandModuleEx from "../project/CommandModuleEx";
import ArgsUtil, {ValidatedResult} from "../utils/ArgsUtil";

export default class AboutLibsCommand extends CommandModuleEx {
    constructor() {
        super();
        this._command = "libs";
        this._describe = "open source dependency list";
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
        AboutLibsCommand.setFlowValues(this, 'libs');
        this.handlerResult = ArgsUtil.Validate(args, "libs", false, false);
        if (this.handlerResult.hasNoError) {
            console.log(LIBS);
        }
    };

    static get helpText(): string {
        return `help text method for libs`;
    }

}
