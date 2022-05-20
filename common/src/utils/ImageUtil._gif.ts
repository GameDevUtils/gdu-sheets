import ImageUtil_ImageParser from "./ImageUtil._base";
import {ImageProps} from "../objs/images";
import {NdArray} from "ndarray";
import {Buffer} from "buffer";
import DecodeGIF from "decode-gif";
import LogUtil from "./LogUtil";
import {MESSAGE_TYPE} from "../objs/messages";

export default class ImageUtil_GIF extends ImageUtil_ImageParser {

    public parseImageData(data: NdArray) : ImageProps {
        const result = ImageUtil_ImageParser.EMPTY_IMAGE_PROPS;
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
