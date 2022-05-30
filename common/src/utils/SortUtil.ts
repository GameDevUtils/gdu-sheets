import {ImageFrame} from "../objs/images";
import {Project, SortBy} from "../objs/projects";
import {PackMode} from "./PackUtil";
import {Images} from "./ProjectUtil";

export type SortOptions = {
    packMode: PackMode,
    primarySortModeOverride?: SortBy,
    secondarySortMode?: SortBy,
};

type PackModeKeys =  'BASIC' | 'GUILLOTINE' | 'SKYLINE' | 'JOE_RECTS';
type FromPackModeKeys = { [key in PackModeKeys]: SortBy };

interface ISortableFrame {
    filename: string;
    fullpath: string;
    guid: string;
    frame: ImageFrame;
}


export class SortUtil {

    static get PRIMARY_SORT_OPTIONS() : FromPackModeKeys {
        return {
            "BASIC": SortBy.HEIGHT_DESC,
            "GUILLOTINE": SortBy.AREA_DESC,
            "SKYLINE": SortBy.HEIGHT_DESC,
            "JOE_RECTS": SortBy.AREA_DESC,
        } as FromPackModeKeys;
    }

    static sort(project: Project, options: SortOptions) : ISortableFrame[] {
        const sortableFrames: ISortableFrame[] = [];

        const imageKeys = Object.keys(project.images);
        imageKeys.forEach((imageKey, index) => {
            const imgKey = imageKey as keyof Images;
            const image = project.images[imgKey];

            if(image && image.frames.length) {
                image.frames.forEach((frame, indexFrame) => {
                    sortableFrames.push({
                        filename: image.filename,
                        fullpath: image.fullpath,
                        guid: frame.guid,
                        frame: frame,
                    } as ISortableFrame);
                });
            }
        });

        return sortableFrames.sort((a, b) => {
            const primarySortMode =
                options.primarySortModeOverride ??
                SortUtil.PRIMARY_SORT_OPTIONS[PackMode[options.packMode] as PackModeKeys]; // ?? SortBy.AREA_DESC;
            const secondarySortMode = options.secondarySortMode;

            let result = this._internalCompareFrames(primarySortMode, a, b);
            if (result === 0 && secondarySortMode !== undefined && secondarySortMode !== primarySortMode) {
                result = this._internalCompareFrames(secondarySortMode, a, b);
            }

            return result;
        });
    }

    protected static _internalCompareFrames = (sortMode: SortBy, a: ISortableFrame, b: ISortableFrame ) : number => {
        let result = 0;

        switch(sortMode) {
            case SortBy.AREA:
                result = a.frame.width * a.frame.height - b.frame.width * b.frame.height;
                break;
            case SortBy.AREA_DESC:
                result = b.frame.width * b.frame.height - a.frame.width * a.frame.height;
                break;
            case SortBy.HEIGHT:
                result = a.frame.height - b.frame.height;
                break;
            case SortBy.HEIGHT_DESC:
                result = b.frame.height - a.frame.height;
                break;
            case SortBy.NAME:
                result = a.filename > b.filename ? 1 : a.filename === b.filename ? 0 : -1;
                break;
            case SortBy.NAME_DESC:
                result = b.filename > a.filename ? 1 : b.filename === a.filename ? 0 : -1;
                break;
            case SortBy.PATH:
                result = a.fullpath > b.fullpath ? 1 : a.fullpath === b.fullpath ? 0 : -1;
                break;
            case SortBy.PATH_DESC:
                result = b.fullpath > a.fullpath ? 1 : b.fullpath === a.fullpath ? 0 : -1;
                break;
            case SortBy.WIDTH:
                result = a.frame.width - b.frame.width;
                break;
            case SortBy.WIDTH_DESC:
                result = b.frame.width - a.frame.width;
                break;
            case SortBy.SHORTER_SIDE:
                result = Math.min(a.frame.width, b.frame.height) - Math.min(b.frame.width, b.frame.height);
                break;
            case SortBy.SHORTER_SIDE_DESC:
                result = Math.min(b.frame.width, b.frame.height) - Math.min(a.frame.width, a.frame.height);
                break;
            case SortBy.LONGER_SIDE:
                result = Math.max(a.frame.width, a.frame.height) - Math.max(b.frame.width, b.frame.height);
                break;
            case SortBy.LONGER_SIDE_DESC:
                result = Math.max(b.frame.width, b.frame.height) - Math.max(a.frame.width, a.frame.height);
                break;
            case SortBy.PERIMETER:
                result = (2 * a.frame.width + 2 * a.frame.height) - (2 * b.frame.width + 2 * b.frame.height);
                break;
            case SortBy.PERIMETER_DESC:
                result = (2 * b.frame.width + 2 * b.frame.height) - (2 * a.frame.width + 2 * a.frame.height);
                break;
            case SortBy.SIDE_DIFF:
                result = Math.abs(a.frame.width - a.frame.height) - Math.abs(b.frame.width - b.frame.height);
                break;
            case SortBy.SIDE_DIFF_DESC:
                result = Math.abs(b.frame.width - b.frame.height) - Math.abs(a.frame.width - a.frame.height);
                break;
            case SortBy.SIDE_RATIO:
                result = (!a.frame.height || !b.frame.height) ? 0 : (a.frame.width / a.frame.height - b.frame.width / b.frame.height);
                break;
            case SortBy.SIDE_RATIO_DESC:
                result = (!a.frame.height || !b.frame.height) ? 0 : (b.frame.width / b.frame.height - a.frame.width / a.frame.height);
                break;
        }

        return result;
    }
}