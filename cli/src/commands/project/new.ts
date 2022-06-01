import 'colors';
import CommandModuleEx from "./CommandModuleEx";
import {ValidatedResult} from "../utils/ArgsUtil";
import {Arguments} from "yargs";

export default class NewProjectCommandModule extends CommandModuleEx {
    constructor() {
        super();
        this._command = "new <path> [images..]";
        this._describe = "create a new project";
        this._builder = undefined;
        this._handlerResult = new ValidatedResult();
    }

    handler(args: Arguments): void {
        CommandModuleEx.setFlowValues(this, 'new');
        super.handler(args);
    }

    static get helpText(): string {
        return `
Create a new project file with the default options, or specify options 
and values to override the defaults. This command also provides a means 
to specify images to be included within the project, using a glob pattern.

Examples:
  sheets new ~/Documents/myProject.sheets
  sheets new proj2.sheets fighter.gif mage.gif ranger.gif
  sheets new proj3.sheets "**/*.png" --force-square
  sheets new proj4.sheets "**/[BCR]at.jpg"
  sheets new proj5.sheets "**/hero-walk-?.gif" "**/hero-climb-?.gif"
`;
    }

}

