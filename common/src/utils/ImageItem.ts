// import {ImageFrame} from './ImageFrame';
import {APPLICATION_VERSION} from "./AppUtil";

export class ImageItem {
    public     filename: string | undefined = undefined; // filename only, e.g. 'walk-01.png' (must be unique?? v0.2.0 likely, v0.3.0 TBD)
    public fullpath: string | undefined = undefined; // path from pwd, e.g. './mage/walking/walk-01.png' (must be unique!!)
    public filetype: string | undefined = undefined; // detected file type
    public src: string | undefined = undefined; // base64, data uri
    public width: number | undefined = undefined;
    public height: number | undefined = undefined;
    public frames: any[] = []; // used for animated GIF sources, length === 1 for other images
    public populateFrameDataComplete: boolean | undefined = undefined; // the ImageItem is ready for use
    public isEmpty: boolean = true; // used to indicate all fields are === undefined

    static PREAMBLE_TEMPLATE = 'data:image/xxx;base64,';
    static PREAMBLE_LENGTH = ImageItem.PREAMBLE_TEMPLATE.length;

    public static get EMPTY_IMAGE_ITEM() : ImageItem { return ImageItem.getEmptyImageItem()}

    private static DefaultImageItems = {
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
            frames: [],
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
            frames: [],
            populateFrameDataComplete: false,
            filterAppliedAliasHash:false,
            filterAppliedTrimRect: false,
            filterAppliedPaddingInner: false,
            isEmpty: false,
        },
    };

    static getEmptyImageItem(version?: APPLICATION_VERSION) : ImageItem {
        const result : ImageItem = Object.assign({}, (ImageItem.DefaultImageItems)[version ?? APPLICATION_VERSION.CURRENT]);
        const keys = Object.getOwnPropertyNames(result);

        keys.forEach((key) => {
            const k = key as keyof ImageItem;

            switch(key) {
                case 'frames':
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    result[k] = [];
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
}

export interface Images {
    [key: string]: ImageItem;
}
