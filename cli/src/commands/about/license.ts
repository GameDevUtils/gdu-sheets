import {Arguments} from 'yargs';
import {LICENSE} from "gdu-common";
import CommandModuleEx from "../project/CommandModuleEx";
import ArgsUtil, {ValidatedResult} from "../utils/ArgsUtil";

export default class AboutLicenseCommand extends CommandModuleEx {
    constructor() {
        super();
        this._command = "license";
        this._describe = "display license text";
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
        AboutLicenseCommand.setFlowValues(this, 'license')
        this.handlerResult = ArgsUtil.Validate(args,"license", false, false);
        if(this.handlerResult.hasNoError) {
            console.log(LICENSE);
        }
    }

    static get helpText(): string {
        return `help text method for license`;
    }
}
