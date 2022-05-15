import {Arguments} from 'yargs';
import 'colors';
import path from 'path';
import ArgsUtil, {ValidatedResult} from "./_helpers/ArgsUtil";
import ExtCommandModule from "./_helpers/ExtCommandModule";
import NewProjectCommandModule from "./project/new";
import EditProjectCommandModule from "./project/edit";
import AddImagesCommandModule from "./image/add";
import RemoveImagesCommandModule from "./image/remove";
import PublishProjectCommand from "./project/publish";
import AboutDeveloperCommandModule from "./about/developer";
import AboutLicenseCommandModule from "./about/license";
import AboutLibsCommandModule from "./about/libs";

export default class HelpCommandModule extends ExtCommandModule{
    constructor() {
        super();
        this._command = "help <module>";
        this._describe = "display help text";
        this._builder = undefined;
        this._handlerResult = new ValidatedResult();
    }

    handler(args: Arguments): void {
        this.handlerResult = ArgsUtil.Validate(args,"help", false, false);
        if(this.handlerResult.hasNoError) {
            let cmd = path.basename(args.$0) + ' help';
            console.log(`Use '${cmd.green}' for a list of commands.`);
            cmd += ' --show-hidden';
            console.log(`Use '${cmd.green}' for a list of all options.`);
// console.log(`--- args = `, args);
// console.log(`--- args.module = `, args.module);
// console.log(`--- command = `, this.handlerResult.command);
//             if(this.handlerResult.commandArgs.length > 1) {
            if (this.handlerResult.helpModule) {
                let output = undefined;
// console.log(`--- before "help ${this.handlerResult.commandArgs[1]}" commnd`);

// console.log(`--- args = `, args);
// console.log(`--- before "help ${this.handlerResult.module}" commnd`);

//                 switch(this.handlerResult.commandArgs[1]) {
                switch(this.handlerResult.helpModule) {
                    case 'new':
                        output = NewProjectCommandModule.helpText;
                        break;
                    case 'edit':
                        output = EditProjectCommandModule.helpText;
                        break;
                    case 'add':
                        output = AddImagesCommandModule.helpText;
                        break;
                    case 'remove':
                        output = RemoveImagesCommandModule.helpText;
                        break;
                    case 'publish':
                        output = PublishProjectCommand.helpText;
                        break;
                    case 'developer':
                        output = AboutDeveloperCommandModule.helpText;
                        break;
                    case 'license':
                        output = AboutLicenseCommandModule.helpText;
                        break;
                    case 'libs':
                        output = AboutLibsCommandModule.helpText;
                        break;
                    case 'help':
                        output = HelpCommandModule.helpText;
                        break;
                    default:
                        output = 'unknown command [' + this.handlerResult.commandArgs[1] + ']';
                        break;
                }

                if(output) {
                    console.log(output);
                }
            }
        }
    }

    static get helpText(): string {
        return `help text method for help`;
    }

    // _handlerResult: ValidatedResult;
    // get handlerResult() : ValidatedResult { return this._handlerResult; };
    // set handlerResult(value) { this._handlerResult = value; };

}
