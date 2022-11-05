import {NdArray} from "ndarray";
import ImageFrame from "./ImageFrame";

export default class ImageItem {

    public filename: string | undefined = undefined;
    public filetype: string | undefined = undefined;
    public fullpath: string | undefined = undefined;
    public width: number | undefined = 0;
    public height: number | undefined = 0;
    public gamma: number | undefined = 0;
    public src: string | undefined = '';
    public guid: string | undefined = '';
    public frames: ImageFrame[] | undefined = [] as ImageFrame[];
    public populateFrameDataComplete: boolean | undefined = false;
    public isEmpty: boolean = false;

    public static get Empty() : ImageItem { return { isEmpty: true } as ImageItem; }

}
