import {Arguments} from 'yargs';
import 'colors';
import ArgsUtil, {ValidatedResult} from "../_helpers/ArgsUtil";
import ExtCommandModule from '../_helpers/ExtCommandModule';
import ProjectUtil from "gdu-common/build/utils/ProjectUtil";
import {
    AnimatedGif,
    Constraint,
    DataFormat,
    ImageFormat,
    Project,
    SizeMode,
    SortBy,
    SpriteNameInAtlas,
    SpritePacker,
    TrimMode,
    YesNo
} from "gdu-common/build/objs/projects";
import * as fs from "fs";
import ImageUtil from "gdu-common/build/utils/ImageUtil";
import {Buffer} from "buffer";
import FileUtil from "gdu-common/build/utils/FileUtil";
import LogUtil from "gdu-common/build/utils/LogUtil";
import {MESSAGE_TYPE} from "gdu-common/build/objs/messages";

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
            // console.log(args);
            // console.log(this.handlerResult);

            LogUtil.LogLevel = args.logLevel as MESSAGE_TYPE;

            const project = ProjectUtil.EMPTY_PROJECT;
            NewProjectCommandModule.mergeArgsIntoProject(project, args);
            NewProjectCommandModule.mergeImagesIntoProject(project, this.handlerResult._images);

            // TODO: implement fs.write logic as separate function
            // TODO: implement compression
            const projectJson = ProjectUtil.serialize(project);
            if(args.console) {
                console.log(projectJson);
            } else {
                const exists = fs.existsSync(args.path as string);
                const save = !exists || args.overwrite
                if(save) {
                    fs.writeFileSync(args.path as string, Buffer.from(projectJson), { flag: 'w' });
                } else {
                    LogUtil.LogMessage(MESSAGE_TYPE.WARN, `File exists, '${args.path as string}'. Specify '--overwrite' to replace.`);
                }
            }
        }
    }

    static mergeArgsIntoProject = (project: Project, args: Arguments) => {
        project.options.name = project.options.name ?? args.name as string;
        project.options.imageFormat = project.options.imageFormat ?? args.imageFormat as ImageFormat;
        project.options.dataFormat = project.options.dataFormat ?? args.dataFormat as DataFormat;
        project.options.nameInSheet = project.options.nameInSheet ?? args.nameInSheet as SpriteNameInAtlas;

        project.options.spritePacker = project.options.spritePacker ?? args.spritePacker as SpritePacker;
        project.options.sortBy = project.options.sortBy ?? args.sortBy as SortBy;
        project.options.allowRotate = project.options.allowRotate ?? (args.allowRotate ? YesNo.YES : YesNo.NO);

        project.options.width = project.options.width ?? args.width as number;
        project.options.height = project.options.height ?? args.height as number;
        project.options.sizeMode = project.options.sizeMode ?? args.sizeMode as SizeMode;
        project.options.constraint = project.options.constraint ?? args.constraint as Constraint;
        project.options.forceSquare = project.options.forceSquare ?? (args.forceSquare ? YesNo.YES : YesNo.NO);
        project.options.includeAt2x = project.options.includeAt2x ?? (args.include2x ? YesNo.YES : YesNo.NO);

        project.options.borderPadding = project.options.borderPadding ?? args.borderPadding as number;
        project.options.shapePadding = project.options.shapePadding ?? args.shapePadding as number;
        project.options.innerPadding = project.options.innerPadding ?? args.innerPadding as number;

        project.options.cleanAlpha = project.options.cleanAlpha ?? (args.cleanAlpha ? YesNo.YES : YesNo.NO);
        project.options.colorMask = project.options.colorMask ?? (args.colorMask ? YesNo.YES : YesNo.NO);
        project.options.aliasSprites = project.options.aliasSprites ?? (args.aliasSprites ? YesNo.YES : YesNo.NO);
        project.options.debugMode = project.options.debugMode ?? (args.debugMode ? YesNo.YES : YesNo.NO);
        project.options.trimMode = project.options.trimMode ?? args.trimMode as TrimMode;
        project.options.trimThreshold = project.options.trimThreshold ?? args.trimThreshold as number;

        project.options.animatedGif = project.options.animatedGif ?? args.animatedGif as AnimatedGif;
        project.options.compressProject = project.options.compressProject ?? (args.compressProject ? YesNo.YES : YesNo.NO);

        return project;
    }

    static mergeImagesIntoProject = (project: Project, images: string[]) => {
        if(images && images.length) {
            images.forEach((path) => {
                if(fs.existsSync(path)) {
                    const imageItem = ImageUtil.EMPTY_IMAGE_ITEM;
                    const fileParts = FileUtil.getFileParts(path);
                    imageItem.filename = fileParts?.filename;
                    imageItem.filetype = fileParts?.filetype as unknown as ImageFormat;
                    imageItem.fullpath = fileParts?.pathfull;
                    imageItem.src =
                        ImageUtil.PREAMBLE_TEMPLATE.replace(/xxx/g, (fileParts?.filetype ?? 'png').toLocaleLowerCase()) +
                        Buffer.from(fs.readFileSync(path)).toString('base64');
                    imageItem.frames = [];
                    imageItem.populateFrameDataComplete = false;
                    imageItem.isEmpty = false;
                    project.images[path] = imageItem;
                }
            });
        }
    }

    static get helpText(): string {
        return `
Create a new project file with the default options, 
or specify options and values to override the defaults. 
This command also provides a means to specify images to
be included within the project, using a glob pattern.

Examples:
  sheets new ~/Documents/myProject.fpsheet
  sheets new proj2 fighter.gif mage.gif ranger.gif
  sheets new proj3 **/*.png --force-square
  sheets new proj4 **/[BCR]at.jpg
`;
    }

}

