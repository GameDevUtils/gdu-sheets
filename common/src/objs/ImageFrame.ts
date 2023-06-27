import Rectangle from "./Rectangle";

export default class ImageFrame {
    // [x: string]: never[];

    // public left: number = 0;
    // public top: number = 0;
    // public width: number = 0;
    // public height: number = 0;
    public spriteRect: Rectangle = Rectangle.Empty;
    public data: Uint8Array = new Uint8Array();
    public dataSrc: Uint8Array = new Uint8Array();
    public gamma: number = 0;
    public hashSHA256: string = '';
    public hashMD5: string = '';
    public filterAppliedAliasHash:boolean = false;
    public filterAppliedTrimRect: boolean = false;
    public filterAppliedPaddingInner: boolean = false;
    public isDuplicate: boolean = false;
    public isEmpty: boolean = false;

    public static get Empty() : ImageFrame { return { isEmpty: true } as ImageFrame; }

}
