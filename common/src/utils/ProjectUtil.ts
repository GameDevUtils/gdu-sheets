import AppUtil, {APPLICATION_VERSION} from "./AppUtil";
import {DefaultProjectOptions, Project, ProjectOptions} from "../objs/projects";
import {ImageFrame, ImageItem} from "../objs/images";
import LogUtil from "./LogUtil";
import {MESSAGE_TYPE} from "../objs/messages";
import ImageUtil_PNG from "./ImageUtil._png";
import ImageUtil from "./ImageUtil";
import ImageUtil_ImageParser from "./ImageUtil._base";

export interface Images {
    [key: string]: ImageItem;
}

export default class ProjectUtil {

    static getDefaultProject(version?: APPLICATION_VERSION) : Project {
        return {
            application: AppUtil.APPLICATION_NAME(version ?? APPLICATION_VERSION.CURRENT),
            version: AppUtil.APPLICATION_VERSION(version ?? APPLICATION_VERSION.CURRENT),
            url: AppUtil.APPLICATION_URL(version ?? APPLICATION_VERSION.CURRENT),
            options: ProjectUtil.getDefaultOptions(version ?? APPLICATION_VERSION.CURRENT),
            images: { },
            isEmpty: false,
        } as Project;
    }

    static getEmptyProject(version?: APPLICATION_VERSION) : Project {
        return {
            application: AppUtil.APPLICATION_NAME(version ?? APPLICATION_VERSION.CURRENT),
            version: AppUtil.APPLICATION_VERSION(version ?? APPLICATION_VERSION.CURRENT),
            url: AppUtil.APPLICATION_URL(version ?? APPLICATION_VERSION.CURRENT),
            options: ProjectUtil.EMPTY_OPTIONS,
            images: { },
            isEmpty: true,
        } as Project;
    }

    static get DEFAULT_PROJECT() : Project { return ProjectUtil.getDefaultProject(); }

    static get EMPTY_PROJECT() : Project { return ProjectUtil.getEmptyProject(); }

    // -------------------------------------------------------------------

    static getDefaultOptions(version?: APPLICATION_VERSION) : ProjectOptions {
        return Object.assign({}, DefaultProjectOptions[version ?? APPLICATION_VERSION.CURRENT]);
    }

    static get DEFAULT_OPTIONS() : ProjectOptions { return ProjectUtil.getDefaultOptions(); }

    static getEmptyOptions(version?: APPLICATION_VERSION) : ProjectOptions {
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

    static get EMPTY_OPTIONS() : ProjectOptions { return ProjectUtil.getEmptyOptions(); }

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

    static mergeImages(target?: Images, source?: Images, version?: APPLICATION_VERSION) : Images {
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

    static mergeProjectImages(target?: Project, source?: Project, version?: APPLICATION_VERSION) : Images {
        return ProjectUtil.mergeImages(target?.images, source?.images, version);
    }

    static mergeOptions(target?: ProjectOptions, source?: ProjectOptions, version?: APPLICATION_VERSION) : ProjectOptions {
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

    static mergeProjectOptions(target?: Project, source?: Project, version?: APPLICATION_VERSION) : ProjectOptions {
        return ProjectUtil.mergeOptions(target ? target.options : undefined, source ? source.options : undefined, version);
    }

    static mergeProjects(target?: Project, source?: Project, version?: APPLICATION_VERSION) : Project {
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

    static serialize = (project: Project, version?: APPLICATION_VERSION) : string => {
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
            result = JSON.stringify(project);
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

    static deserialize(data: string, version: APPLICATION_VERSION) : Project {
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
        } catch (err) {
            LogUtil.LogMessage(MESSAGE_TYPE.ERROR, 'There was an error parsing the project file.', err);
        }
        return result;
    }
}
