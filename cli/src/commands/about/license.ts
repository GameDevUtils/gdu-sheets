import {Arguments /*, CommandModule*/} from 'yargs';
import ArgsUtil, {ValidatedResult} from "../_helpers/ArgsUtil";
import ExtCommandModule from '../_helpers/ExtCommandModule';
import {LICENSE} from "gdu-common/build/objs/content";

export default class AboutLicenseCommand extends ExtCommandModule {
    constructor() {
        super();
        this._command = "license";
        this._describe = "display license text";
        this._builder = undefined;
        this._handlerResult = new ValidatedResult();
    }

    handler(args: Arguments):void {
        this.handlerResult = ArgsUtil.Validate(args,"license", false, false);
        if(this.handlerResult.hasNoError) {
            console.log(LICENSE);
        }
    }

    static get helpText(): string {
        return `help text method for license`;
    }
}
