import {ImageFrame} from "../objs/images";
import { SortBy } from "../objs/projects";
import {PackMode} from "./PackUtil";

export type SortOptions = {
    packMode: PackMode,
    primarySortModeOverride?: SortBy,
    secondarySortMode?: SortBy,
};

type PackModeKeys =  'BASIC' | 'GUILLOTINE' | 'SKYLINE' | 'JOE_RECTS';
type FromPackModeKeys = { [key in PackModeKeys]: SortBy };

export default class SortUtil {

    static get PRIMARY_SORT_OPTIONS() : FromPackModeKeys {
        return {
            "BASIC": SortBy.AREA_DESC,
            "GUILLOTINE": SortBy.AREA_DESC,
            "SKYLINE": SortBy.AREA_DESC,
            "JOE_RECTS": SortBy.AREA_DESC,
        } as FromPackModeKeys;
    }

    static sort(data: ImageFrame[][], options: SortOptions) : ImageFrame[] {
        let sortedData: ImageFrame[] = [];

        data.forEach((imageFrames) => {
            imageFrames.forEach((imageFrame) => {
                sortedData.push(imageFrame);
            });
        });

        sortedData = sortedData.sort((a, b) => {
            const primarySortMode =
                options.primarySortModeOverride ??
                SortUtil.PRIMARY_SORT_OPTIONS[PackMode[options.packMode] as PackModeKeys]; // ?? SortBy.AREA_DESC;
            const secondarySortMode = options.secondarySortMode;

            let result = this._internalCompareFrames(primarySortMode, a, b);
            if (result === 0 && secondarySortMode !== undefined && secondarySortMode !== primarySortMode) {
                result = this._internalCompareFrames(secondarySortMode, a, b);
            }

            return result;
        })

        return sortedData;
    }

    protected static _internalCompareFrames = (sortMode: SortBy, a: ImageFrame, b: ImageFrame ) : number => {
        let result = 0;

        switch(sortMode) {
            case SortBy.AREA:
                result = a.width * a.height - b.width * b.height;
                break;
            case SortBy.AREA_DESC:
                result = b.width * b.height - a.width * a.height;
                break;
            case SortBy.HEIGHT:
                result = a.height - b.height;
                break;
            case SortBy.HEIGHT_DESC:
                result = b.height - a.height;
                break;
            case SortBy.NAME:
                if (typeof(a.filename) === 'string' && typeof(b.filename) === 'string') {
                    result = a.filename > b.filename ? 1 : a.filename === b.filename ? 0 : -1;
                }
                break;
            case SortBy.NAME_DESC:
                if (typeof(a.filename) === 'string' && typeof(b.filename) === 'string') {
                    result = b.filename > a.filename ? 1 : b.filename === a.filename ? 0 : -1;
                }
                break;
            case SortBy.WIDTH:
                result = a.width - b.width;
                break;
            case SortBy.WIDTH_DESC:
                result = b.width - a.width;
                break;
            case SortBy.SHORTER_SIDE:
                result = Math.min(a.width, b.height) - Math.min(b.width, b.height);
                break;
            case SortBy.SHORTER_SIDE_DESC:
                result = Math.min(b.width, b.height) - Math.min(a.width, a.height);
                break;
            case SortBy.LONGER_SIDE:
                result = Math.max(a.width, a.height) - Math.max(b.width, b.height);
                break;
            case SortBy.LONGER_SIDE_DESC:
                result = Math.max(b.width, b.height) - Math.max(a.width, a.height);
                break;
            case SortBy.PERIMETER:
                result = (2 * a.width + 2 * a.height) - (2 * b.width + 2 * b.height);
                break;
            case SortBy.PERIMETER_DESC:
                result = (2 * b.width + 2 * b.height) - (2 * a.width + 2 * a.height);
                break;
            case SortBy.SIDE_DIFF:
                result = Math.abs(a.width - a.height) - Math.abs(b.width - b.height);
                break;
            case SortBy.SIDE_DIFF_DESC:
                result = Math.abs(b.width - b.height) - Math.abs(a.width - a.height);
                break;
            case SortBy.SIDE_RATIO:
                result = (!a.height || !b.height) ? 0 : (a.width / a.height - b.width / b.height);
                break;
            case SortBy.SIDE_RATIO_DESC:
                result = (!a.height || !b.height) ? 0 : (b.width / b.height - a.width / a.height);
                break;
        }

        return result;
    }
}