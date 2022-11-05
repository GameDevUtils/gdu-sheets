import {ReadStream} from 'fs';
import {Buffer} from "buffer";
import {NdArray} from "ndarray";
import {FileParts} from "..";
import {MESSAGE_TYPE} from "..";
import {LogUtil} from "./LogUtil";
import {v4 as UUID} from 'uuid';
import {createHash} from 'crypto';
import {ImageFrame} from "./ImageFrame";
import {ImageFormat} from "./enums/ImageFormat";

export abstract class ImageUtil_ImageParser {

    /* // eslint-disable-next-line @typescript-eslint/no-unused-vars */
    protected constructor(imageFormat: ImageFormat, data?: Blob | ReadStream | Buffer | Uint8Array | string) { // , array?: NdArray) {
        const keys = Object.keys(ImageFormat);
        const index = keys.indexOf(ImageFormat[imageFormat]);

        this._preamble = ImageUtil_ImageParser.PREAMBLE_TEMPLATE.substring(ImageUtil_ImageParser.PREAMBLE_LENGTH).replace(/xxx/g, (keys[index] as string).toLowerCase());
        this._imageFormat = imageFormat;
    }

    public static get PREAMBLE_TEMPLATE() : string { return 'data:image/xxx;base64,'; }
    public static get PREAMBLE_LENGTH() : number { return this.PREAMBLE_TEMPLATE.length; }

    protected _preamble: string;
    protected _preambleLength = ImageUtil_ImageParser.PREAMBLE_LENGTH;

    protected _imageFormat: ImageFormat;
    public get ImageFormat(): ImageFormat { return this._imageFormat; }
    // protected abstract get ImageFormat(): ImageFormat

    public static buildImageFrame(data: Uint8Array, width: number = 0, height: number = 0, gamma = 0) : any {
        const hashSHA256 = createHash('sha256');
        const hashMD5 = createHash('md5');
        const imageFrame: any = { };

        if (!!width && !!height && !!data.length) {
            imageFrame.width = width;
            imageFrame.height = height;
            imageFrame.gamma = gamma;
            imageFrame.data = data;
            imageFrame.guid = UUID();
            imageFrame.hashSHA256 = hashSHA256.update(imageFrame.data).digest('hex');
            imageFrame.hashMD5 = hashMD5.update(imageFrame.data).digest('hex');
            imageFrame.isDuplicate = undefined;
            imageFrame.isValid = true;
        } else {
            LogUtil.LogMessage(MESSAGE_TYPE.WARN, 'Cannot process empty image frame.');
        }

        return imageFrame;
    }

    public buildImageItem(self: ImageUtil_ImageParser, fileparts: FileParts, fileData: NdArray) : any {
        const result: any = {
            isEmpty: true,
        };

        if(fileparts.isValid && fileparts.filename && fileparts.filetype && fileparts.pathfull && fileparts.pathonly) {
            const imageProps = self.parseImageData(fileData);

            if (imageProps && imageProps.width && imageProps.height) {
                result.filename = fileparts.filename as string;
                result.fullpath = fileparts.pathfull as string;
                result.filetype = fileparts.filetype as string;

                result.src = ImageUtil_ImageParser.PREAMBLE_TEMPLATE.replace('xxx', fileparts.filetype.toLowerCase());
                result.src += Buffer.from(fileData.data as Uint8Array).toString('base64');

                result.frames = [];
                for (let i = 0; i < imageProps.frames.length; i++) {
                    const frame = ImageFrame.EMPTY_IMAGE_FRAME;
                    frame.width = imageProps.frames[i].width;
                    frame.height = imageProps.frames[i].height;
                    frame.gamma = imageProps.frames[i].gamma;
                    frame.data = imageProps.frames[i].data;
                    frame.filterAppliedAliasHash = false;
                    frame.filterAppliedPaddingInner = false;
                    frame.filterAppliedTrimRect = false;
                    frame.isValid = true;
                    result.frames.push(frame);
                }
                result.populateFrameDataComplete = true;
                result.isEmpty = false;
            } else {
                LogUtil.LogMessage(MESSAGE_TYPE.ERROR, `Invalid width or height for '${fileparts.filename}' - [${imageProps.width}, ${imageProps.height}].`);
            }
        }

        return result;
    }

    // implement in subclass
    protected abstract parseImageData(data: NdArray) : any;

}