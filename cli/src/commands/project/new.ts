import { Arguments } from 'yargs';
import 'colors';
import ArgsUtil, {ValidatedResult} from "../_helpers/ArgsUtil";
import ExtCommandModule from '../_helpers/ExtCommandModule';

export default class NewProjectCommandModule extends ExtCommandModule {
    constructor() {
        super();
        this._command = "new <path> [images..]";
        this._describe = "create a new project";
        this._builder = undefined;
        this._handlerResult = new ValidatedResult();
    }

    handler(args: Arguments): void {
        this.handlerResult = ArgsUtil.Validate(args, "new", true, true);
        if (this.handlerResult.hasNoError) {
            // console.error(result);
            // console.error(args);
        }
    }

    static get helpText(): string {
        return `
Create a new project file with the default options, 
or specify options and values to override the defaults. 
This command also provides a means to specify images to
be included within the project, using a glob pattern.

Examples:
  gdu-sheets new ~/Documents/myProject.fpsheet
  gdu-sheets new proj2 fighter.gif mage.gif ranger.gif
  gdu-sheets new proj3 **/*.png --force-square
  gdu-sheets new proj4 **/[BCR]at.jpg
`;
    }

}

