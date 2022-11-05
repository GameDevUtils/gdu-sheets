// import * as ImageUtil_ImageParser from "./ImageUtil._base";
import {NdArray} from "ndarray";
import {Buffer} from "buffer";
import DecodeGIF from "decode-gif";
import {LogUtil} from "./LogUtil";
import {ImageFormat, ImageProps, ImageUtil_ImageParser, MESSAGE_TYPE} from "..";
import {ReadStream} from "fs";

export class ImageUtil_GIF extends ImageUtil_ImageParser {

    constructor(data?: Blob | ReadStream | Buffer | Uint8Array | string) {
        super(ImageFormat.GIF, data);
    }

    public parseImageData(data: NdArray) : any {
        const result = ImageProps.EMPTY_IMAGE_PROPS;
        let img;

        try {
            img = DecodeGIF(data.data as Buffer);
        } catch (e) {
            img = undefined;
            LogUtil.LogMessage(MESSAGE_TYPE.WARN, 'Unable to parse image GIF data.\n', e);
        }

        if(img) {
            result.width = img.width;
            result.height = img.height;
            result.frames = [];
            result.gamma = 0;

            if(!result.frames || result.frames.length === 0) {
                result.frames = [];
                img.frames.forEach((frame) => {
                    const imageFrame = ImageUtil_ImageParser.buildImageFrame(new Uint8Array(frame.data), result.width, result.height);
                    result.frames.push(imageFrame);
                });
            }

            result.isValid = true;
        }

        return result;
    }
}
