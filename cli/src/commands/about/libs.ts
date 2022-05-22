import {Arguments /*, CommandModule*/} from 'yargs';
import ArgsUtil, {ValidatedResult} from "../_helpers/ArgsUtil";
import ExtCommandModule from '../_helpers/ExtCommandModule';
import {LIBS} from "gdu-common/build/objs/content";

export default class AboutLibsCommand extends ExtCommandModule {
    constructor() {
        super();
        this._command = "libs";
        this._describe = "open source dependency list";
        this._builder = undefined;
        this._handlerResult = new ValidatedResult();

        this.handler = (args: Arguments) => {
            this.handlerResult = ArgsUtil.Validate(args,"libs", false, false);
            if(this.handlerResult.hasNoError) {
                console.log(LIBS);
            }
        }
    }

    static get helpText(): string {
        return `help text method for libs`;
    }

}
