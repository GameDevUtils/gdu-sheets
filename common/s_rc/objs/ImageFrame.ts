
export default class ImageFrame {

    public left: number | undefined = 0;
    public top: number | undefined = 0;
    public width: number | undefined = 0;
    public height: number | undefined = 0;
    public data: Uint8Array | undefined = undefined;
    public gamma: number | undefined = 0;
    public hashSHA256: string | undefined = '';
    public hashMD5: string | undefined = '';
    public filterAppliedAliasHash:boolean | undefined = false;
    public filterAppliedTrimRect: boolean | undefined = false;
    public filterAppliedPaddingInner: boolean | undefined = false;
    public isDuplicate: boolean | undefined = false;
    public isEmpty: boolean = false;

    public static get Empty() : ImageFrame { return { isEmpty: true } as ImageFrame; }

}
