import {Arguments /*, CommandModule*/} from 'yargs';
import ArgsUtil, {ValidatedResult} from "../_helpers/ArgsUtil";
import ExtCommandModule from "../_helpers/ExtCommandModule";
import { DEVELOPER } from 'gdu-common';

export default class AboutDeveloperCommand extends ExtCommandModule {
    constructor() {
        super();
        this._command = "developer";
        this._describe = "about the developer";
        this._builder = undefined;
        this._handlerResult = new ValidatedResult();

        this.handler = (args: Arguments) => {
            this.handlerResult = ArgsUtil.Validate(args,"developer", false, false);
            if(this.handlerResult.hasNoError) {
                console.log(DEVELOPER);
            }
        }
    }

    static get helpText(): string {
        return `help text method for developer`;
    }

}
