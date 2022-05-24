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

    static setFlowValues = (self: any, commandName: string, readFirst: boolean = false, cullImages: boolean = false, packImages: boolean = false) => {
        self.commandName = commandName;
        self.readFirst = readFirst;
        self._cullImages = cullImages;
        self._packImages = packImages;
    };

    handler(args: Arguments): void {
        NewProjectCommandModule.setFlowValues(this, 'new');
        super.handler(args);
    }

    static get helpText(): string {
        return `
Create a new project file with the default options, 
or specify options and values to override the defaults. 
This command also provides a means to specify images to
be included within the project, using a glob pattern.

Examples:
  sheets new ~/Documents/myProject.sheets
  sheets new proj2 fighter.gif mage.gif ranger.gif
  sheets new proj3 "**/*.png" --force-square
  sheets new proj4 "**/[BCR]at.jpg"
`;
    }

}

