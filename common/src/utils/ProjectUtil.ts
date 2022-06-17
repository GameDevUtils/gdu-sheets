import {APPLICATION_VERSION, AppUtil} from "./AppUtil";
import {
    AnimatedGif,
    Constraint,
    DataFormat,
    DefaultProjectOptions,
    ImageFormat,
    Project,
    ProjectOptions,
    SizeMode,
    SortBy,
    SpriteNameInAtlas,
    SpritePacker,
    TrimMode,
    YesNo
} from "../objs/projects";
import {ImageFrame, ImageItem} from "../objs/images";
import {LogUtil} from "./LogUtil";
import {MESSAGE_TYPE} from "../objs/messages";
import {ImageUtil} from "./ImageUtil";
import {ImageUtil_ImageParser} from "./ImageUtil._base";
import {ImageUtil_BMP} from "./ImageUtil._bmp";
import {ImageUtil_GIF} from "./ImageUtil._gif";
import {ImageUtil_JPG} from "./ImageUtil._jpg";
import {ImageUtil_PNG} from "./ImageUtil._png";
import {FileUtil} from "./FileUtil";
import {Buffer} from "buffer";

export interface Images {
    [key: string]: ImageItem;
}

export interface Args {
    [key: string]: string | number | boolean | undefined;
}

export type SerializableProjectOptions = {
    name: string,
    imageFormat: string,
    dataFormat: string,
    nameInSheet: string,
    spritePacker: string,
    sortBy: string,
    allowRotate: string,
    width: number,
    height: number,
    sizeMode: string,
    constraint: string,
    forceSquare: string,
    includeAt2x: string,
    borderPadding: number,
    shapePadding: number,
    innerPadding: number,
    cleanAlpha: string,
    colorMask: string,
    aliasSprites: string,
    debugMode: string,
    trimMode: string,
    trimThreshold: number,
    animatedGif: string,
    compressProject: string,
};

export class ProjectUtil {

    public static getDefaultProject(version?: APPLICATION_VERSION) : Project {
        return {
            application: AppUtil.APPLICATION_NAME(version ?? APPLICATION_VERSION.CURRENT),
            version: AppUtil.APPLICATION_VERSION(version ?? APPLICATION_VERSION.CURRENT),
            url: AppUtil.APPLICATION_URL(version ?? APPLICATION_VERSION.CURRENT),
            options: ProjectUtil.getDefaultOptions(version ?? APPLICATION_VERSION.CURRENT),
            images: { },
            isEmpty: false,
        } as Project;
    }

    public static getEmptyProject(version?: APPLICATION_VERSION) : Project {
        return {
            application: AppUtil.APPLICATION_NAME(version ?? APPLICATION_VERSION.CURRENT),
            version: AppUtil.APPLICATION_VERSION(version ?? APPLICATION_VERSION.CURRENT),
            url: AppUtil.APPLICATION_URL(version ?? APPLICATION_VERSION.CURRENT),
            options: ProjectUtil.getEmptyOptions(version ?? APPLICATION_VERSION.CURRENT),
            images: { },
            isEmpty: true,
        } as Project;
    }

    public static get DEFAULT_PROJECT() : Project { return ProjectUtil.getDefaultProject(); }

    public static get EMPTY_PROJECT() : Project { return ProjectUtil.getEmptyProject(); }

    // -------------------------------------------------------------------

    public static getDefaultOptions(version?: APPLICATION_VERSION) : ProjectOptions {
        return Object.assign({}, DefaultProjectOptions[version ?? APPLICATION_VERSION.CURRENT]);
    }

    public static get DEFAULT_OPTIONS() : ProjectOptions { return ProjectUtil.getDefaultOptions(); }

    public static getEmptyOptions(version?: APPLICATION_VERSION) : ProjectOptions {
        const result = Object.assign({}, DefaultProjectOptions[version ?? APPLICATION_VERSION.CURRENT]);
        const keys = Object.getOwnPropertyNames(result); // ?? ProjectUtil.getDefaultOptions(version));

        keys.forEach((key) => {
            const k = key as keyof ProjectOptions;

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            result[k] = undefined;
        });

        return result;
    }

    public static get EMPTY_OPTIONS() : ProjectOptions { return ProjectUtil.getEmptyOptions(); }

    public static mergeImages(target?: Images, source?: Images, version?: APPLICATION_VERSION) : Images {
        const result : Images = { };
        // const imageItems = target ?? source ?? undefined;
        if(target ?? source) {
            const empty = ImageUtil.getEmptyImageItem(version);

            // get complete list of keys from both source and target objects
            const keysTarget = Object.getOwnPropertyNames(target ?? { });
            const keysSource = Object.getOwnPropertyNames(source ?? { });
            const keys = keysTarget.concat(keysSource.filter((key) => {
                return keysTarget.indexOf(key) < 0;
            }));

            keys.forEach((key) => {
                const k = key as keyof Images;
                // @ts-ignore
                let imageItem : ImageItem = ImageUtil.getEmptyImageItem(version);

                if(target && target[k]) {
                    imageItem = target[k];
                } else if(source && source[k]) {
                    imageItem = source[k];
                }

                const newImageItem = ImageUtil.getEmptyImageItem(version);
                const imgKeys = Object.getOwnPropertyNames(newImageItem);
                imgKeys.forEach((imgKey) => {
                    const k2 = imgKey as keyof ImageItem;
                    if (imgKey !== 'frames') {
                        switch(imgKey) {
                            case 'populateFrameDataComplete':
                            case 'filterAppliedAliasHash':
                            case 'filterAppliedPaddingInner':
                            case 'filterAppliedTrimRect':
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                newImageItem[k2] = false;
                                break;
                            case 'isEmpty':
                                if (imageItem && imageItem.hasOwnProperty(imgKey)) {
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    newImageItem[k2] = !!imageItem[k2];
                                }
                                break;
                            default:
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                newImageItem[k2] = imageItem && imageItem.hasOwnProperty(imgKey) ? imageItem[k2] : undefined;
                        }
                    }
                });
                result[k] = newImageItem;
            });
        }

        return result;
    }

    public static mergeProjectImages(target?: Project, source?: Project, version?: APPLICATION_VERSION) : Images {
        return ProjectUtil.mergeImages(target?.images, source?.images, version);
    }

    public static mergeOptions(target?: ProjectOptions, source?: ProjectOptions, version?: APPLICATION_VERSION) : ProjectOptions {
        const defaults = ProjectUtil.getDefaultOptions(version);
        const result = ProjectUtil.getEmptyOptions(version);
        const keys = Object.getOwnPropertyNames(target ?? source ?? defaults);

        keys.forEach((key) => {
            const k = key as keyof ProjectOptions;
            const tValue = target ? target[k] : undefined;
            const sValue = source ? source[k] : undefined;

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            result[k] = tValue ?? sValue ?? defaults[k];
        });

        return result;
    }

    public static mergeProjectOptions(target?: Project, source?: Project, version?: APPLICATION_VERSION) : ProjectOptions {
        return ProjectUtil.mergeOptions(target ? target.options as ProjectOptions : undefined, source ? source.options as ProjectOptions: undefined, version);
    }

    public static mergeProjects(target?: Project, source?: Project, version?: APPLICATION_VERSION) : Project {
        const defaults = ProjectUtil.getDefaultProject(version ?? APPLICATION_VERSION.CURRENT);
        const result = ProjectUtil.getEmptyProject(version);
        const keys = Object.getOwnPropertyNames(target ?? source ?? defaults); // ?? ProjectUtil.getDefaultProject(version));

        keys.forEach((key) => {
            const k = key as keyof Project;

            switch(key) {
                case 'options':
                    result.options = ProjectUtil.mergeProjectOptions(target, source, version);
                    break;
                case 'images':
                    result.images = ProjectUtil.mergeProjectImages(target, source, version);
                    break;
                default:
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    result[k] = (target ?? source ?? defaults)[k];
                    break;
            }
        });

        result.isEmpty = !(target?.isEmpty === false || source?.isEmpty === false || (target ?? source === undefined));

        return result;
    }



    public static serializableProjectOptions(options: ProjectOptions, version: APPLICATION_VERSION = APPLICATION_VERSION.CURRENT) : SerializableProjectOptions {
        return {
            name: options.name as string,
            imageFormat: ProjectUtil.sanitizeEnum(ImageFormat, options.imageFormat, version),
            dataFormat: ProjectUtil.sanitizeEnum(DataFormat, options.dataFormat, version),
            nameInSheet: ProjectUtil.sanitizeEnum(SpriteNameInAtlas, options.nameInSheet, version),
            spritePacker: ProjectUtil.sanitizeEnum(SpritePacker, options.spritePacker, version),
            sortBy: ProjectUtil.sanitizeEnum(SortBy, options.sortBy, version),
            allowRotate: ProjectUtil.sanitizeEnum(YesNo, options.allowRotate, version),
            width: options.width as number,
            height: options.height as number,
            sizeMode: ProjectUtil.sanitizeEnum(SizeMode, options.sizeMode, version),
            constraint: ProjectUtil.sanitizeEnum(Constraint, options.constraint, version),
            forceSquare: ProjectUtil.sanitizeEnum(YesNo, options.forceSquare, version),
            includeAt2x: ProjectUtil.sanitizeEnum(YesNo, options.includeAt2x, version),
            borderPadding: options.borderPadding as number,
            shapePadding: options.shapePadding as number,
            innerPadding: options.innerPadding as number,
            cleanAlpha: ProjectUtil.sanitizeEnum(YesNo, options.cleanAlpha, version),
            colorMask: ProjectUtil.sanitizeEnum(YesNo, options.colorMask, version),
            aliasSprites: ProjectUtil.sanitizeEnum(YesNo, options.aliasSprites, version),
            debugMode: ProjectUtil.sanitizeEnum(YesNo, options.debugMode, version),
            trimMode: ProjectUtil.sanitizeEnum(TrimMode, options.trimMode, version),
            trimThreshold: options.trimThreshold as number,
            animatedGif: ProjectUtil.sanitizeEnum(AnimatedGif, options.animatedGif, version),
            compressProject: ProjectUtil.sanitizeEnum(YesNo, options.compressProject, version),
        };
    }

    public static sanitizeEnum<Enum>(e : Enum, value: any, version: APPLICATION_VERSION = APPLICATION_VERSION.CURRENT): string {
        let result: string = '';

        for(const item in e) {
            if(isNaN(parseInt(item))) {
                if(value as unknown as string == item) {
                    result = item;
                }
            } else {
                if(value as unknown as string == item) {
                    result = e[item] as unknown as string;
                }
            }
        }

        if(version === APPLICATION_VERSION.V0_2_0) {
            switch (result) {
                case 'UseFirstFrame':
                    result = 'Use First Frame';
                    break;
                case 'ExtractFrames':
                    result = 'Extract Frames';
                    break;
                case 'AnySize':
                    result = 'Any Size';
                    break;
                case 'PowerOfTwo':
                    result = 'Power of Two';
                    break;
                case 'FixedSize':
                    result = 'Fixed Size';
                    break;
                case 'MaxSize':
                    result = 'Max Size';
                    break;
                case 'KeepExtension':
                    result = 'Keep Extension';
                    break;
                case 'StripExtension':
                    result = 'Strip Extension';
                    break;
                case 'YES':
                    result = 'Yes';
                    break;
                case 'NO':
                    result = 'No';
                    break;
            }
        }

        return result;
    };

    public static serialize(project: Project, version: APPLICATION_VERSION = APPLICATION_VERSION.CURRENT) : string {
        let result = '';

        try {
            LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, 'serializing project');

            if(project.images) {
                LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, '  preserving frames ...');
            }

            LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, '  preserving options ...');
            const savedOptions = project.options;
            // @ts-ignore
            project.options = ProjectUtil.serializableProjectOptions(project.options, version);

            LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, '  serializing the data ...');
            result = JSON.stringify(project, null, 2);

            if(project.images) {
                LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, '  restoring frames ...')
            }
            project.options = savedOptions;
        } catch(err) {
            /* istanbul ignore next */
            LogUtil.LogMessage(MESSAGE_TYPE.ERROR, 'There was an error serializing the project.', err);
        }

        return result;
    }

    public static deserialize(data: string, version: APPLICATION_VERSION) : Project {
        let result = ProjectUtil.getEmptyProject();

        try {
            result = ProjectUtil.mergeProjects(JSON.parse(data), ProjectUtil.getDefaultProject(version), version);
            result = ProjectUtil.populateImageFrames(result);
        } catch (err) {
            LogUtil.LogMessage(MESSAGE_TYPE.ERROR, 'There was an error parsing the project file.', err);
        }

        return result;
    }

    public static populateImageFrames = (project: Project) : Project => {
        const keys = Object.getOwnPropertyNames(project.images);
        for(const key of keys) {
            const imageItem = project.images[key];
            if(imageItem) {
                let imageParser: ImageUtil_ImageParser | undefined= undefined;
                if(imageItem.src && imageItem.filetype && imageItem.fullpath) {
                    switch(imageItem.filetype.toLowerCase()) {
                        case 'bmp':
                            imageParser = new ImageUtil_BMP(ImageFormat.BMP, imageItem.src);
                            break;
                        case 'gif':
                            imageParser = new ImageUtil_GIF(ImageFormat.GIF, imageItem.src);
                            break;
                        case 'jpg':
                            imageParser = new ImageUtil_JPG(ImageFormat.JPG, imageItem.src);
                            break;
                        case 'png':
                            imageParser = new ImageUtil_PNG(ImageFormat.PNG, imageItem.src);
                            break;
                    }
                    if(imageParser) {
                        const imageItemWithFrames = imageParser.buildImageItem(
                            imageParser,
                            FileUtil.getFileParts(imageItem.fullpath),
                            FileUtil.getFileBytes(imageItem.src, imageItem.filetype)
                        );

                        if(imageItemWithFrames) {
                            imageItem.frames = [] as ImageFrame[];
                            for (let i = 0; i < imageItemWithFrames.frames.length; i++) {
                                const frame = imageItemWithFrames.frames[i];
                                imageItem.frames.push(frame); // ?? ImageUtil.EMPTY_IMAGE_FRAME);
                            }
                            imageItem.populateFrameDataComplete = true;
                            project.images[key] = imageItem;
                        }
                    }
                }
            }
        }
        return project;
    };

    public static mergeArgsIntoProject = (project: Project, args: Args) => {
        project.options.name = args.name as string ?? project.options.name;
        project.options.imageFormat = ProjectUtil.sanitizeEnum(ImageFormat, args.imageFormat ?? project.options.imageFormat);
        project.options.dataFormat = ProjectUtil.sanitizeEnum(DataFormat, args.dataFormat ?? project.options.dataFormat);
        project.options.nameInSheet = ProjectUtil.sanitizeEnum(SpriteNameInAtlas, args.nameInSheet ?? project.options.nameInSheet);

        project.options.spritePacker = ProjectUtil.sanitizeEnum(SpritePacker, args.spritePacker ?? project.options.spritePacker);
        project.options.sortBy = ProjectUtil.sanitizeEnum(SortBy, args.sortBy ?? project.options.sortBy as SortBy);
        project.options.allowRotate = ProjectUtil.sanitizeEnum(YesNo, args.allowRotate ?? project.options.allowRotate);

        project.options.width = args.width as number ?? project.options.width;
        project.options.height = args.height as number ?? project.options.height;
        project.options.sizeMode = ProjectUtil.sanitizeEnum(SizeMode, args.sizeMode ?? project.options.sizeMode);
        project.options.constraint = ProjectUtil.sanitizeEnum(Constraint, args.constraint ?? project.options.constraint);
        project.options.forceSquare = ProjectUtil.sanitizeEnum(YesNo, args.forceSquare ?? project.options.forceSquare);
        project.options.includeAt2x = ProjectUtil.sanitizeEnum(YesNo, args.include2x ?? project.options.includeAt2x);

        project.options.borderPadding = args.borderPadding as number ?? project.options.borderPadding;
        project.options.shapePadding = args.shapePadding as number ?? project.options.shapePadding;
        project.options.innerPadding = args.innerPadding as number ?? project.options.innerPadding;

        project.options.cleanAlpha = ProjectUtil.sanitizeEnum(YesNo, args.cleanAlpha ?? project.options.cleanAlpha);
        project.options.colorMask = ProjectUtil.sanitizeEnum(YesNo, args.colorMask ?? project.options.colorMask);
        project.options.aliasSprites = ProjectUtil.sanitizeEnum(YesNo, args.aliasSprites ?? project.options.aliasSprites);
        project.options.debugMode = ProjectUtil.sanitizeEnum(YesNo, args.debugMode ?? project.options.debugMode);

        project.options.trimMode = ProjectUtil.sanitizeEnum(TrimMode, args.trimMode ?? project.options.trimMode);
        project.options.trimThreshold = args.trimThreshold as number ?? project.options.trimThreshold;

        project.options.animatedGif = ProjectUtil.sanitizeEnum(AnimatedGif, args.animatedGif ?? project.options.animatedGif);
        project.options.compressProject = ProjectUtil.sanitizeEnum(YesNo, args.compressProject ?? project.options.compressProject);

        return project;
    };

    public static mergeSingleImageIntoProject = (project: Project, fullpath: string, buffer: Buffer) => {
        const imageItem = ImageUtil.EMPTY_IMAGE_ITEM;
        const fileParts = FileUtil.getFileParts(fullpath);

        imageItem.filename = fileParts.filename;
        imageItem.fullpath = fileParts.pathfull;
        const filetype = fileParts.filetype;

        if(filetype) {
            // imageItem.filetype = ProjectUtil.sanitizeEnum(ImageFormat, filetype).toLowerCase();
            imageItem.filetype = filetype.toUpperCase();
            imageItem.src =
                ImageUtil.PREAMBLE_TEMPLATE.replace(/xxx/g, (filetype).toLocaleLowerCase()) +
                // Buffer.from(fs.readFileSync(fullpath)).toString('base64');
                buffer.toString('base64');
        }
        imageItem.frames = [] as ImageFrame[];
        imageItem.populateFrameDataComplete = false;
        imageItem.isEmpty = false;
        project.images[fullpath] = imageItem;
    }
}
