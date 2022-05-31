import {ReadStream} from 'fs';
import 'ndarray';
import {Buffer} from "buffer";
import ndarray, {NdArray} from "ndarray";
import {ImageFormat} from "../objs/projects";
import {ImageFrame, ImageItem, ImageProps} from "../objs/images";
import {FileParts} from "../objs/files";
import {MESSAGE_TYPE} from "../objs/messages";
import {LogUtil} from "./LogUtil";
import {v4 as UUID} from 'uuid';
import {createHash} from 'crypto';

export default abstract class ImageUtil_ImageParser {

    static get EMPTY_IMAGE_PROPS() : ImageProps
    {
        return {
            width: 0,
            height: 0,
            frames: [],
            gamma: 0,
            isValid: false,
        } as ImageProps;
    }

    static get EMPTY_IMAGE_FRAME() : ImageFrame {
        return {
            // filename: undefined,
            // filetype: undefined,
            // filepath: undefined,
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
        };
    }

    static get PREAMBLE_TEMPLATE() : string { return 'data:image/xxx;base64,'; }
    static get PREAMBLE_LENGTH() : number { return this.PREAMBLE_TEMPLATE.length; }

    _preamble: string;
    _preambleLength = ImageUtil_ImageParser.PREAMBLE_LENGTH;

    _imageFormat: ImageFormat;
    get ImageFormat(): ImageFormat { return this._imageFormat; }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    public constructor(imageFormat: ImageFormat, data?: Blob | ReadStream | Buffer | Uint8Array | string) { // , array?: NdArray) {
        const keys = Object.keys(ImageFormat);
        // const vals = Object.values(ImageFormat);
        const index = keys.indexOf(ImageFormat[imageFormat]);
        // const key = keys[index];

        this._preamble = ImageUtil_ImageParser.PREAMBLE_TEMPLATE.substring(ImageUtil_ImageParser.PREAMBLE_LENGTH).replace(/xxx/g, (keys[index] as string).toLowerCase());
        this._imageFormat = imageFormat;
    }

    public static buildImageFrame(data: Uint8Array, width: number, height: number, gamma = 0) : ImageFrame {
        const hashSHA256 = createHash('sha256');
        const hashMD5 = createHash('md5');
        const imageFrame = ImageUtil_ImageParser.EMPTY_IMAGE_FRAME;

        if(!!width && !!height && !!data.length ) {
            imageFrame.width = width; // ?? 0;
            imageFrame.height = height; // ?? 0;
            imageFrame.gamma = gamma; // ?? 0;
            imageFrame.data = data;
            imageFrame.guid = UUID();
            imageFrame.hashSHA256 = hashSHA256.update(imageFrame.data).digest('hex');
            imageFrame.hashMD5 = hashMD5.update(imageFrame.data).digest('hex');
            imageFrame.isDuplicate = undefined;
            imageFrame.isValid = true;
        // } else {
        //     LogUtil.LogMessage(MESSAGE_TYPE.WARN, 'Cannot process empty image frame.');
        }

        return imageFrame;
    }

    public buildImageItem(fileparts: FileParts, fileData: NdArray) : ImageItem | undefined {
        const result = {
            isEmpty: true,
        } as ImageItem;

        if(fileparts.isValid && fileparts.filename && fileparts.filetype && fileparts.pathfull && fileparts.pathonly) {
            const imageProps = this.parseImageData(fileData);

            if(!!imageProps && !!imageProps.width && !!imageProps.height) {
                const keys = Object.keys(ImageFormat);
                const index = keys.indexOf(fileparts.filetype.toUpperCase());
                if(index >= 0) {
                // if(index < 0) {
                //     LogUtil.LogMessage(MESSAGE_TYPE.WARN, `Unknown image type '${fileparts?.filetype?.toUpperCase()}'.`);
                // } else {
                    const vals = Object.values(ImageFormat);
                    result.filename = fileparts.filename as string;
                    result.fullpath = fileparts.pathfull as string;
                    result.filetype = vals[index] as ImageFormat;

                    if(result.filetype === this.ImageFormat) {
                    // // if(result.filetype !== this.ImageFormat) {
                    // //     LogUtil.LogMessage(MESSAGE_TYPE.WARN, `File type mismatch. Expected '${ImageFormat[this.ImageFormat]}', received '${ImageFormat[result.filetype]}'.`);
                    // //     result.fullpath = result.filename = result.filetype = undefined;
                    // // } else {
                    //     result.width = imageProps.width; // ?? 0;
                    //     result.height = imageProps.height; // ?? 0;

                        result.src = ImageUtil_ImageParser.PREAMBLE_TEMPLATE.replace('xxx', keys[index].toLowerCase());
                        result.src += Buffer.from(fileData.data as Uint8Array).toString('base64');

                        // const hashSHA256 = createHash('sha256');
                        // const hashMD5 = createHash('md5');
                        // result.guid = /* result.guid ?? */ UUID();
                        // result.hashSHA256 = hashSHA256.update(result.src).digest('hex');
                        // result.hashMD5 = hashMD5.update(result.src).digest('hex');

                        result.frames = [] as ImageFrame[];
                        for(const frame of imageProps.frames) {
                            result.frames.push(frame);
                        }
                        result.populateFrameDataComplete = true;
                        // result.frames = imageProps.frames;

                        result.populateFrameDataComplete = false;
                        // result.filterAppliedAliasHash = false;
                        // result.filterAppliedTrimRect = false;
                        // result.filterAppliedPaddingInner = false;

                        result.isEmpty = false;
                    }

                }
            } else {
                LogUtil.LogMessage(MESSAGE_TYPE.ERROR, `Invalid width or height for '${fileparts.filename}' - [${imageProps.width}, ${imageProps.height}].`);
            }
        }

        return result;
    }

    // implement in subclass
    protected abstract parseImageData(data: NdArray) : ImageProps;

}