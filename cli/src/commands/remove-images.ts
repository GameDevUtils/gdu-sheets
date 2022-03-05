import {Arguments /*, CommandModule*/} from 'yargs';
import 'colors';
import ArgsUtil, {ValidatedResult} from "./args-util";
import ExtCommandModule from './helpers/ExtCommandModule';

export default class RemoveCommandModule extends ExtCommandModule {
    constructor() {
        super();
        this._command = "remove <path> [images..]";
        this._describe = "remove image(s) from project";
        this._builder = undefined;
        this._handlerResult = new ValidatedResult();
    }

    handler(args: Arguments): void {
        this.handlerResult = ArgsUtil.Validate(args,"remove", true, true);
        if(this.handlerResult.hasNoError) {
            // console.error(result);
            // console.error(args);
        }
    }

    static get helpText(): string {
        return `
Remove images from an existing project by 
specifying images to be removed using a 
glob pattern. Also suported is overriding 
existing options and values. 

Examples:
  gdu-sheets add proj1 fighter.gif mage.gif ranger.gif
  gdu-sheets add proj2 --force-square **/*.png
  gdu-sheets add ~/proj3.fpsheet **/[BCR]at.jpg
`;
    }

}
