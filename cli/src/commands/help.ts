import {Arguments} from 'yargs';
import 'colors';
import path from 'path';
import ArgsUtil, {ValidatedResult} from "./args-util";
import ExtCommandModule from "./helpers/ExtCommandModule";
import NewProjectCommandModule from "./new-project";
import EditProjectCommandModule from "./edit-project";
import AddImagesCommandModule from "./add-images";
import RemoveImagesCommandModule from "./remove-images";
import PublishProjectCommand from "./publish-project";
import AboutDeveloperCommandModule from "./about-developer";
import AboutLicenseCommandModule from "./about-license";
import AboutLibsCommandModule from "./about-libs";

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
        }
        let output = '';

        switch(this.handlerResult.command) {
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
            case 'author':
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
                output = 'unknown command [' + this.handlerResult.command + ']';
                break;
        }
        // console.log(output);
    }

    static get helpText(): string {
        return `help text method for help`;
    }

    // _handlerResult: ValidatedResult;
    // get handlerResult() : ValidatedResult { return this._handlerResult; };
    // set handlerResult(value) { this._handlerResult = value; };

}
