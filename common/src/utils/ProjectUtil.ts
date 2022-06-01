import {AppUtil, APPLICATION_VERSION} from "./AppUtil";
import {
    AnimatedGif,
    Constraint,
    DataFormat,
    DefaultProjectOptions,
    ImageFormat,
    Project,
    ProjectOptions, SizeMode, SortBy,
    SpriteNameInAtlas, SpritePacker, TrimMode, YesNo
} from "../objs/projects";
import {ImageFrame, ImageItem} from "../objs/images";
import {LogUtil} from "./LogUtil";
import {MESSAGE_TYPE} from "../objs/messages";
import {ImageUtil} from "./ImageUtil";
import ImageUtil_ImageParser from "./ImageUtil._base";
import ImageUtil_BMP from "./ImageUtil._bmp";
import ImageUtil_GIF from "./ImageUtil._gif";
import ImageUtil_JPG from "./ImageUtil._jpg";
import ImageUtil_PNG from "./ImageUtil._png";
import {FileUtil} from "./FileUtil";
import ndarray from "ndarray";
import {Buffer} from "buffer";
import {FileParts} from "..";

export interface Images {
    [key: string]: ImageItem;
}

export interface Args {
    [key: string]: string | number | boolean | undefined;
}

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
            options: ProjectUtil.EMPTY_OPTIONS,
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

    // result.images = ProjectUtil.mergeProjectImages(target, source, version);

    // static mergeImageFrames(target?: ImageFrame[], source?: ImageFrame[], version?: APPLICATION_VERSION) : ImageFrame[] {
    //     const result : ImageFrame[] = [];
    //
    //     (target ?? source ?? []).forEach((frame, index) => {
    //         const newFrame = ImageUtil_ImageParser.EMPTY_IMAGE_FRAME;
    //         const keys = Object.getOwnPropertyNames(frame); // ?? ProjectUtil.getDefaultOptions(version));
    //
    //         keys.forEach((key) => {
    //             const k = key as keyof ImageFrame;
    //             const tValue = target ? target[index][k] : undefined;
    //             const sValue = source ? source[index][k] : undefined;
    //
    //             // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //             // @ts-ignore
    //             newFrame[k] = tValue ?? sValue ?? undefined;
    //         });
    //         result.push(newFrame);
    //     });
    //
    //     return result;
    // }
    //
    // // static mergeProjectImageFrames(target?: Project, source?: Project, version?: APPLICATION_VERSION) : Images {
    // //     return ProjectUtil.mergeImageFrames(target?.images?.frames, source?.images, version);
    // // }

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
                // const imageItem : ImageItem = target ? target[k] : (source ? source[k] : { });

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
        const defaults = ProjectUtil.getDefaultOptions(version ?? APPLICATION_VERSION.CURRENT);
        const result = ProjectUtil.EMPTY_OPTIONS;
        const keys = Object.getOwnPropertyNames(target ?? source ?? defaults); // ?? ProjectUtil.getDefaultOptions(version));

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
        return ProjectUtil.mergeOptions(target ? target.options : undefined, source ? source.options : undefined, version);
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
                    // @ts-ignore
                    result[k] = (target ?? source ?? defaults)[k];
                    break;
            }
        });

        // result.options = ProjectUtil.mergeProjectOptions(target, source, version);
        result.isEmpty = !(target?.isEmpty === false || source?.isEmpty === false || (target ?? source === undefined));

        return result;
    }

    public static serialize = (project: Project, version?: APPLICATION_VERSION) : string => {
        const imageFrames : { [key: string]: ImageFrame[] } = { };
        let result = '';

        try {
            LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, 'serializing project');

            if(project.images) {
                LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, '  preserving frames ...');
                Object.keys(project.images).forEach((key) => {
                    imageFrames[key] = project.images[key].frames;
                    project.images[key].frames = [];
                    project.images[key].populateFrameDataComplete = false;
                });
            }

            LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, '  serializing the data ...');
            result = JSON.stringify(project, null, 2);
            // result = JSON.stringify(project,(key, value) => {
            //     return value === undefined ? null : value;
            // });

            if(project.images) {
                LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, '  restoring frames ...')
                Object.keys(project.images).forEach((key) => {
                    project.images[key].frames = imageFrames[key]; // ?? [];
                });
            }
        } catch(err) {
            /* istanbul ignore next */
            LogUtil.LogMessage(MESSAGE_TYPE.ERROR, 'There was an error serializing the project.', err);
        }

        return result;
    }

    public static deserialize(data: string, version: APPLICATION_VERSION) : Project {
        let result = ProjectUtil.getDefaultProject(version);
        // let result = ProjectUtil.getEmptyProject(version);
        try {
            result = JSON.parse(data);
            // result = ProjectUtil.mergeProjects(ProjectUtil.getEmptyProject(version), JSON.parse(data), version);
            result = ProjectUtil.mergeProjects(result, ProjectUtil.getDefaultProject(version), version);
            // result = ProjectUtil.mergeProjects(JSON.parse(data, (key, value) => {
            //     return value === null ? 'undefined' : value;
            //     // return value;
            // }), result);
// console.error(data);
        } catch (err) {
            LogUtil.LogMessage(MESSAGE_TYPE.ERROR, 'There was an error parsing the project file.', err);
        }
        return result;
    }

    public static stringToImageFormat = (value: string, defValue: ImageFormat = ImageFormat.PNG) : ImageFormat => {
        let result = defValue;
        switch(value?.toUpperCase()) {
            case 'BMP': result = ImageFormat.BMP; break;
            case 'GIF': result = ImageFormat.GIF; break;
            case 'JPG': result = ImageFormat.JPG; break;
            case 'PNG': result = ImageFormat.PNG; break;
        }
        return result;
    };

    public static stringToDataFormat = (value: string, defValue: DataFormat = DataFormat.XML) : DataFormat => {
        let result = defValue;
        switch(value?.toUpperCase()) {
            case 'CSS': result = DataFormat.CSS; break;
            case 'JSON': result = DataFormat.JSON; break;
            case 'XML': result = DataFormat.XML; break;
        }
        return result;
    };

    public static stringToSpriteNameInAtlas = (value: string, defValue: SpriteNameInAtlas = SpriteNameInAtlas.StripExtension) : SpriteNameInAtlas => {
        let result = defValue;
        switch(value?.toUpperCase()) {
            case 'KEEPEXTENSION': result = SpriteNameInAtlas.KeepExtension; break;
            case 'STRIPEXTENSION': result = SpriteNameInAtlas.StripExtension; break;
        }
        return result;
    };

    public static stringToSpritePacker = (value: string, defValue: SpritePacker = SpritePacker.JoeRects) : SpritePacker => {
        let result = defValue;
        switch(value?.toUpperCase()) {
            case 'BASIC': result = SpritePacker.Basic; break;
            case 'JOERECTS': result = SpritePacker.JoeRects; break;
        }
        return result;
    };

    public static stringToSortBy = (value: string, defValue: SortBy = SortBy.AREA_DESC) : SortBy => {
        let result = defValue;
        switch(value?.toUpperCase()) {
            case 'AREA': result = SortBy.AREA; break;
            case 'HEIGHT': result = SortBy.HEIGHT; break;
            case 'LONGER_SIDE': result = SortBy.LONGER_SIDE; break;
            case 'NAME': result = SortBy.NAME; break;
            case 'PATH': result = SortBy.PATH; break;
            case 'PERIMETER': result = SortBy.PERIMETER; break;
            case 'SHORTER_SIDE': result = SortBy.SHORTER_SIDE; break;
            case 'SIDE_DIFF': result = SortBy.SIDE_DIFF; break;
            case 'SIDE_RATIO': result = SortBy.SIDE_RATIO; break;
            case 'WIDTH': result = SortBy.WIDTH; break;
            // ================================================
            case 'AREA_DESC': result = SortBy.AREA_DESC; break;
            case 'HEIGHT_DESC': result = SortBy.HEIGHT_DESC; break;
            case 'LONGER_SIDE_DESC': result = SortBy.LONGER_SIDE_DESC; break;
            case 'NAME_DESC': result = SortBy.NAME_DESC; break;
            case 'PATH_DESC': result = SortBy.PATH_DESC; break;
            case 'PERIMETER_DESC': result = SortBy.PERIMETER_DESC; break;
            case 'SHORTER_SIDE_DESC': result = SortBy.SHORTER_SIDE_DESC; break;
            case 'SIDE_DIFF_DESC': result = SortBy.SIDE_DIFF_DESC; break;
            case 'SIDE_RATIO_DESC': result = SortBy.SIDE_RATIO_DESC; break;
            case 'WIDTH_DESC': result = SortBy.WIDTH_DESC; break;
        }
        return result;
    };

    public static booleanToYesNo = (value: boolean | undefined, defValue: YesNo = YesNo.NO) : YesNo => {
        let result = defValue;
        switch(value) {
            case undefined: result = defValue; break;
            case false: result = YesNo.NO; break;
            case true: result = YesNo.YES; break;
        }
        return result;
    };

    public static stringToSizeMode = (value: string, defValue: SizeMode = SizeMode.MaxSize) : SizeMode => {
        let result = defValue;
        switch(value?.toUpperCase()) {
            case 'FIXEDSIZE': result = SizeMode.FixedSize; break;
            case 'MAXSIZE': result = SizeMode.MaxSize; break;
        }
        return result;
    };

    public static stringToConstraint = (value: string, defValue: Constraint = Constraint.PowerOfTwo) : Constraint => {
        let result = defValue;
        switch(value?.toUpperCase()) {
            case 'ANYSIZE': result = Constraint.AnySize; break;
            case 'POWEROFTWO': result = Constraint.PowerOfTwo; break;
        }
        return result;
    };

    public static stringToTrimMode = (value: string, defValue: TrimMode = TrimMode.None) : TrimMode => {
        let result = defValue;
        switch(value?.toUpperCase()) {
            case 'NONE': result = TrimMode.None; break;
            case 'TRIM': result = TrimMode.Trim; break;
        }
        return result;
    };

    public static stringToAnimatedGif = (value: string, defValue: AnimatedGif = AnimatedGif.UseFirstFrame) : AnimatedGif => {
        let result = defValue;
        switch(value?.toUpperCase()) {
            case 'EXTRACTFRAMES': result = AnimatedGif.ExtractFrames; break;
            case 'USEFIRSTFRAME': result = AnimatedGif.UseFirstFrame; break;
        }
        return result;
    };

    public static populateImageFrames = (project: Project) : Project => {
        const keys = Object.keys(project.images);
        for(const key of keys) {
            const imageItem = project.images[key];
            if(imageItem) {
                let imageParser: ImageUtil_ImageParser | undefined= undefined;
                if(imageItem.src && imageItem.filetype && imageItem.fullpath) {
                    switch(imageItem.filetype) {
                        case ImageFormat.BMP:
                            imageParser = new ImageUtil_BMP(ImageFormat.BMP, imageItem.src);
                            break;
                        case ImageFormat.GIF:
                            imageParser = new ImageUtil_GIF(ImageFormat.GIF, imageItem.src);
                            break;
                        case ImageFormat.JPG:
                            // case 'jpeg':
                            imageParser = new ImageUtil_JPG(ImageFormat.JPG, imageItem.src);
                            break;
                        case ImageFormat.PNG:
                            imageParser = new ImageUtil_PNG(ImageFormat.PNG, imageItem.src);
                            break;
                    }
                    if(imageParser) {
                        const imageItemWithFrames = imageParser.buildImageItem(
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
        project.options.imageFormat = ProjectUtil.stringToImageFormat(args.imageFormat as string, project.options.imageFormat);
        project.options.dataFormat = ProjectUtil.stringToDataFormat(args.dataFormat as string, project.options.dataFormat);
        project.options.nameInSheet = ProjectUtil.stringToSpriteNameInAtlas(args.nameInSheet as string, project.options.nameInSheet);

        project.options.spritePacker = ProjectUtil.stringToSpritePacker(args.spritePacker as string, project.options.spritePacker);
        project.options.sortBy = ProjectUtil.stringToSortBy(args.sortBy as string, project.options.sortBy);
        project.options.allowRotate = ProjectUtil.booleanToYesNo(args.allowRotate as boolean, project.options.allowRotate);

        project.options.width = args.width as number ?? project.options.width;
        project.options.height = args.height as number ?? project.options.height;
        project.options.sizeMode = ProjectUtil.stringToSizeMode(args.sizeMode as string, project.options.sizeMode);
        project.options.constraint = ProjectUtil.stringToConstraint(args.constraint as string, project.options.constraint);
        project.options.forceSquare = ProjectUtil.booleanToYesNo(args.forceSquare as boolean, project.options.forceSquare);
        project.options.includeAt2x = ProjectUtil.booleanToYesNo(args.include2x as boolean, project.options.includeAt2x);

        project.options.borderPadding = args.borderPadding as number ?? project.options.borderPadding;
        project.options.shapePadding = args.shapePadding as number ?? project.options.shapePadding;
        project.options.innerPadding = args.innerPadding as number ?? project.options.innerPadding;

        project.options.cleanAlpha = ProjectUtil.booleanToYesNo(args.cleanAlpha as boolean, project.options.cleanAlpha);
        project.options.colorMask = ProjectUtil.booleanToYesNo(args.colorMask as boolean, project.options.colorMask);
        project.options.aliasSprites = ProjectUtil.booleanToYesNo(args.aliasSprites as boolean, project.options.aliasSprites);
        project.options.debugMode = ProjectUtil.booleanToYesNo(args.debugMode as boolean, project.options.debugMode);
        project.options.trimMode = ProjectUtil.stringToTrimMode(args.trimMode as string, project.options.trimMode);
        project.options.trimThreshold = args.trimThreshold as number ?? project.options.trimThreshold;

        project.options.animatedGif = ProjectUtil.stringToAnimatedGif(args.animatedGif as string, project.options.animatedGif);
        project.options.compressProject = ProjectUtil.booleanToYesNo(args.compressProject as boolean, project.options.compressProject);

        return project;
    };

    public static mergeSingleImageIntoProject = (project: Project, fullpath: string, buffer: Buffer) => {
        const imageItem = ImageUtil.EMPTY_IMAGE_ITEM;
        const fileParts = FileUtil.getFileParts(fullpath);
        imageItem.filename = fileParts.filename;
        imageItem.fullpath = fileParts.pathfull;
        const filetype = fileParts.filetype;
        if(filetype) {
            imageItem.filetype = ProjectUtil.stringToImageFormat(filetype);
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
