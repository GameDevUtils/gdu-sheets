export class ImageFrame {
    // filename: string | undefined,
    // filetype: string | undefined,
    // filepath: string | undefined,
    public width: number = 0;
    public height: number = 0;
    public data: Uint8Array | undefined = undefined;
    public gamma: number | undefined = undefined;
    public hashSHA256: string | undefined = undefined;
    public hashMD5: string | undefined = undefined;
    public guid: string | undefined = undefined;
    public filterAppliedAliasHash: boolean | undefined = false;
    public filterAppliedTrimRect: boolean | undefined = false;
    public filterAppliedPaddingInner: boolean | undefined = false;
    public isDuplicate: boolean | undefined = undefined;
    public isValid: boolean = false;

    static get EMPTY_IMAGE_FRAME() : ImageFrame {
        return {
            width: 0,
            height: 0,
            data: undefined,
            gamma: 0,
            hashSHA256: undefined,
            hashMD5: undefined,
            guid: undefined,
            filterAppliedAliasHash: false,
            filterAppliedTrimRect: false,
            filterAppliedPaddingInner: false,
            isDuplicate: undefined,
            isValid: false,
        } as ImageFrame;
    }

}
