import {Arguments/*, CommandModule*/} from 'yargs';
import 'colors';
import ArgsUtil, {ValidatedResult} from "./args-util";
import ExtCommandModule from './helpers/ExtCommandModule';

export default class EditCommandModule extends ExtCommandModule {
    constructor() {
        super();
        this._command = "edit <path> [images..]";
        this._describe = "modify a project";
        this._builder = undefined;
        this._handlerResult = new ValidatedResult();

        this.handler = (args: Arguments) => {
            this.handlerResult = ArgsUtil.Validate(args,"edit", true, true);
        }
    }

    static get helpText(): string {
        return `
Edit an existing project file, specifying options and 
values to override the defaults. This command also 
provides a means to specify images to be included 
within the project, using a glob pattern.

Examples:
  gdu-sheets edit proj1 --include-2x
  gdu-sheets edit proj2 fighter.gif mage.gif ranger.gif
  gdu-sheets edit proj3 --force-square **/*.png
  gdu-sheets edit ~/Documents/proj4.fpsheet **/[BCR]at.jpg
`;
    }

}
