import 'colors';
import CommandModuleEx from "./CommandModuleEx";
import {ValidatedResult} from "../utils/ArgsUtil";
import {Arguments} from "yargs";

export default class EditProjectCommand extends CommandModuleEx {
    constructor() {
        super();
        this._command = "edit <path> [images..]";
        this._describe = "modify a project";
        this._builder = undefined;
        this._handlerResult = new ValidatedResult();
    }

    static setFlowValues = (self: any, commandName: string, readFirst: boolean = false, cullImages: boolean = false, packImages: boolean = false) => {
        self.commandName = commandName;
        self.readFirst = readFirst;
        self._cullImages = cullImages;
        self._packImages = packImages;
    };

    handler(args: Arguments): void {
        EditProjectCommand.setFlowValues(this, 'edit', true);
        super.handler(args);
    }

    static get helpText(): string {
        return `
Edit an existing project file, specifying options and 
values to override the defaults. This command also 
provides a means to specify images to be included 
within the project, using a glob pattern.

Examples:
  sheets edit proj1.sheets --include-2x
  sheets edit proj2.sheets fighter.gif mage.gif ranger.gif
  sheets edit proj3.sheets "**/*.png" --force-square
  sheets edit ~/Documents/proj4.sheets "**/[BCR]at.jpg"
`;
    }

}
