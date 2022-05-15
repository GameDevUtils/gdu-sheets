import {Arguments /*, CommandModule*/} from 'yargs';
import 'colors';
import ArgsUtil, {ValidatedResult} from "../_helpers/ArgsUtil";
import ExtCommandModule from '../_helpers/ExtCommandModule';

export default class RemoveImagesCommand extends ExtCommandModule {
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
  sheets remove proj1 fighter.gif mage.gif ranger.gif
  sheets remove proj2 **/*.png --force-square
  sheets remove ~/proj3.fpsheet **/[BCR]at.jpg
`;
    }

}
