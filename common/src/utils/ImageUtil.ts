import {APPLICATION_VERSION} from "./AppUtil";
import {ImageFrame, ImageItem} from "../objs/images";

const DefaultImageItems = {
    "0.2.0": {
        filename: undefined,
        filetype: undefined,
        fullpath: undefined,
        width: undefined,
        height: undefined,
        src: undefined,
        guid: undefined,
        hashSHA256: undefined,
        hashMD5: undefined,
        // frameCount: 0,
        frames: [] as ImageFrame[],
        populateFrameDataComplete: false,
        filterAppliedAliasHash:false,
        filterAppliedTrimRect: false,
        filterAppliedPaddingInner: false,
        isEmpty: false,
    },
    "0.3.0": {
        filename: undefined,
        filetype: undefined,
        fullpath: undefined,
        width: undefined,
        height: undefined,
        src: undefined,
        guid: undefined,
        hashSHA256: undefined,
        hashMD5: undefined,
        // frameCount: 0,
        frames: [] as ImageFrame[],
        populateFrameDataComplete: false,
        filterAppliedAliasHash:false,
        filterAppliedTrimRect: false,
        filterAppliedPaddingInner: false,
        isEmpty: false,
    },
};

export class ImageUtil {

    static get EMPTY_IMAGE_FRAME() : ImageFrame {
        return {
            width: 0,
            height: 0,
            data: undefined,
            gamma: undefined,
            hashSHA256: undefined,
            hashMD5: undefined,
            guid: undefined,
            filterAppliedAliasHash: undefined,    // filter state
            filterAppliedTrimRect: undefined,     // filter state
            filterAppliedPaddingInner: undefined, // filter state
            isDuplicate: undefined,
            isValid: false
        } as ImageFrame;
    }

    static getEmptyImageItem(version?: APPLICATION_VERSION) : ImageItem {
        const result : ImageItem = Object.assign({}, DefaultImageItems[version ?? APPLICATION_VERSION.CURRENT]);
        const keys = Object.getOwnPropertyNames(result);

        keys.forEach((key) => {
            const k = key as keyof ImageItem;

            switch(key) {
                case 'frames':
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    result[k] = [] as ImageFrame[];
                    break;
                case 'populateFrameDataComplete':
                case 'filterAppliedAliasHash':
                case 'filterAppliedTrimRect':
                case 'filterAppliedPaddingInner':
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    result[k] = false;
                    break;
                default:
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    result[k] = undefined;
                    break;
            }
        });

        result.isEmpty = true;
        return result;
    }

    static get EMPTY_IMAGE_ITEM() : ImageItem { return ImageUtil.getEmptyImageItem()}

    static PREAMBLE_TEMPLATE = 'data:image/xxx;base64,';
    static PREAMBLE_LENGTH = ImageUtil.PREAMBLE_TEMPLATE.length;

    // static createImageItem(filename: string, data: string | Blob, version?: APPLICATION_VERSION) : ImageItem {
    //     const result = ImageUtil.getEmptyImageItem(version);
    //
    //     if(filename && filename.includes('.')) {
    //         const parts = filename.split('.');
    //         if(parts.length > 1) {
    //             const extension = parts[parts.length - 1].toUpperCase();
    //             const keys = Object.keys(ImageFormat);
    //             const vals = Object.values(ImageFormat);
    //             const filetypeKey = keys.indexOf(extension);
    //
    //             result.filename = filename;
    //             result.filetype = vals[filetypeKey] as ImageFormat;
    //             // result.width = result.height = 0;
    //             if(typeof data === 'string') {
    //                 result.src = data;
    //
    //                 // // ====================================
    //                 // // === Decode base64 to binary example
    //                 // // ====================================
    //                 // if(result.src.indexOf(`data:image/${(vals[filetypeKey] as string).toLowerCase()};base64,`) === 0) {
    //                 //     const buffer = Buffer.from(result.src.substring(ImageUtil.PREAMBLE_LENGTH), 'base64').toString('binary');
    //                 // }
    //                 // // ====================================
    //
    //             } else { // Blob
    //                 // data.
    //                 // encode blob
    //                 // result.src = data;
    //                 result.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAAGVn0euAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RDlGNDlFRDcyOUExMUU2QjZCRDg4RUExNzYxN0U3MCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RDlGNDlFRTcyOUExMUU2QjZCRDg4RUExNzYxN0U3MCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjlEOUY0OUVCNzI5QTExRTZCNkJEODhFQTE3NjE3RTcwIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjlEOUY0OUVDNzI5QTExRTZCNkJEODhFQTE3NjE3RTcwIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+bLjEvgAAFXBJREFUeNpi/P//PwMp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';
    //             }
    //             // result.guid = result.guid || UUID();
    //             // result.frameCount = 0;
    //             result.frames = [];
    //             result.isEmpty = false;
    //         } else {
    //             LogUtil.LogMessage(MESSAGE_TYPE.ERROR, `Invalid filename, '${filename}'. Missing extension or name.`);
    //         }
    //     } else {
    //         LogUtil.LogMessage(MESSAGE_TYPE.ERROR, `'Invalid filename, '${filename}'. Missing extension.'`);
    //     }
    //
    //     return result;
    // }
}
