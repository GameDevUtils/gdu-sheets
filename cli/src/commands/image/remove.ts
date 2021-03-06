import 'colors';
import CommandModuleEx from "../project/CommandModuleEx";
import {ValidatedResult} from "../utils/ArgsUtil";
import {Arguments} from "yargs";

export default class RemoveImagesCommand extends CommandModuleEx {
    constructor() {
        super();
        this._command = "remove <path> <images..>";
        this._describe = "remove image(s) from project";
        this._builder = undefined;
        this._handlerResult = new ValidatedResult();
    }

    handler(args: Arguments): void {
        CommandModuleEx.setFlowValues(this, 'remove', true, true);
        super.handler(args);
    }

    static get helpText(): string {
        return `
Remove images from an existing project by specifying 
images to be removed using a glob pattern. Also 
supported is overriding existing options and values.

Examples:
  sheets remove proj1 fighter.gif mage.gif ranger.gif
  sheets remove proj2 **/*.png --force-square
  sheets remove ~/proj3.fpsheet **/[BCR]at.jpg
`;
    }

}
