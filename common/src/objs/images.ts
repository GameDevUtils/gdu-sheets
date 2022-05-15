import {ImageFormat} from './projects';

export type ImageProps = {
    width: number;
    height: number;
    frames: ImageFrame[];
    gamma: number;
    isValid: boolean;
};

export type ImageFrame = {
    filename: string | undefined,
    filetype: string | undefined,
    filepath: string | undefined,
    width: number;
    height: number;
    data: Uint8Array | undefined;
    gamma: number | undefined;
    hashSHA256: string | undefined;
    hashMD5: string | undefined;
    guid: string | undefined;
    filterAppliedAliasHash: boolean | undefined,    // filter state
    filterAppliedTrimRect: boolean | undefined,     // filter state
    filterAppliedPaddingInner: boolean | undefined, // filter state
    isDuplicate: boolean | undefined;
    isValid: boolean;
};

export type ImageItem = {
    filename: string | undefined, // filename only, e.g. 'walk-01.png' (must be unique?? v0.2.0 likely, v0.3.0 TBD)
    fullpath: string | undefined, // path from pwd, e.g. './mage/walking/walk-01.png' (must be unique!!)
    filetype: ImageFormat | undefined, // detected file type
    src: string | undefined, // base64, data uri
    frames: ImageFrame[] | undefined, // used for animated GIF sources
    populateFrameDataComplete: boolean | undefined, // the ImageItem is ready for use
    isEmpty: boolean, // used to indicate all fields are === undefined
}
