import {Arguments} from 'yargs';
import ArgsUtil, {ValidatedResult} from "../_helpers/ArgsUtil";
import ExtCommandModule from "../_helpers/ExtCommandModule";

export default class AddImagesCommand extends ExtCommandModule {
    constructor() {
        super();
        this._command = "add <path> <images..>";
        this._describe = "add image(s) to project";
        this._builder = undefined;
        this._handlerResult = new ValidatedResult();

        this.handler = (args: Arguments) => {
            super.handler(args);
            this.handlerResult = ArgsUtil.Validate(args,"add", true, true);
        }
    }

    static get helpText(): string {
        return `
Add images to an existing project by specifying 
images to be included within the project, using a 
glob pattern. Also supported is overriding existing
options and values. 

Examples:
  sheets add proj1 fighter.gif mage.gif ranger.gif
  sheets add proj2 **/*.png --force-square
  sheets add ~/proj3.fpsheet **/[BCR]at.jpg
`;
    }

}
