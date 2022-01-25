import yargs, {Arguments, Argv /*, CommandBuilder*/} from 'yargs';
import SheetOptions from './options';

import NewProjectCommand from './new-project';
import EditProjectCommand from './edit-project';
import PublishProjectCommand from './publish-project';
import AddImagesCommand from './add-images';
import RemoveImagesCommand from './remove-images';

import AboutAuthorCommand from './author';
import HelpCommand from './help';
import AboutLicenseCommand from './license';
import AboutLibrariesCommand from './libs';
// import UsageCommand from './usage';

import ExtCommandModule from './helpers/ExtCommandModule';

import 'colors';
// import {ValidatedResult} from "./args-util";

export default class SheetsCommandModule extends ExtCommandModule {
    constructor() {
        super();
        this._command = "<cmd>";
        this._describe = "create, modify, and publish sprite sheets";
        this._builder = (args) : Argv<{}> => {
            SheetOptions.AppendOptions(args);

            args.command(new NewProjectCommand());
            args.command(new EditProjectCommand());
            args.command(new AddImagesCommand());
            args.command(new RemoveImagesCommand());
            args.command(new PublishProjectCommand());

            args.command(new AboutAuthorCommand());
            args.command(new AboutLicenseCommand());
            args.command(new AboutLibrariesCommand());

            args.command(new HelpCommand());
            //args.command(new UsageCommand());

            return args;
        };

        this.handler = (args: Arguments) => {
            const cmd: string = "" || (args && args["command"]) as string;
            if (cmd.length) {
                console.error(`Unknown command, '${cmd}'.`.red);
            }
            yargs.showHidden(true).showHelp();
        }
    }

    // _handlerResult: ValidatedResult;
    // get handlerResult() : ValidatedResult { return this._handlerResult; };
    // set handlerResult(value) { this._handlerResult = value; };

}
