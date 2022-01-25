import {Arguments /*, CommandModule*/} from 'yargs';
import 'colors';
import ArgsUtil, {ValidatedResult} from "./args-util";
import ExtCommandModule from './helpers/ExtCommandModule';

export default class PublishProjectCommand extends ExtCommandModule {
    constructor() {
        super();
        this._command = "publish <path> [outpath]";
        this._describe = "generate game assets";
        this._builder = undefined;
        this._handlerResult = new ValidatedResult();
    }

    handler(args: Arguments): void {

        this.handlerResult = ArgsUtil.Validate(args,"publish", true, false);
        const numErrors = this.handlerResult.errors.length;
        if(this.handlerResult.hasNoError) {
            // console.error(result);
            // console.error(args);
        } else if(this.handlerResult.errors[0].startsWith("Path not found")) {
            this.handlerResult.errors.push("No project file specified. Nothing to do.");
            if(args.output) {
                console.error("The '--output' option was specified. The project name will be ignored.".yellow);
            }
        }

        // TODO: handle other errors or warnings here
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
