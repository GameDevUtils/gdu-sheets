import BMP from 'bmp-js';
import ImageUtil_ImageParser from "./ImageUtil._base";
import {ImageProps} from "../objs/images";
import {NdArray} from "ndarray";
import {Buffer} from "buffer";
import LogUtil from "./LogUtil";
import {MESSAGE_TYPE} from "../objs/messages";

export default class ImageUtil_BMP extends ImageUtil_ImageParser {

    public parseImageData(data: NdArray) : ImageProps {
        const result = ImageUtil_ImageParser.EMPTY_IMAGEPROPS;
        let img;

        try {
            img = BMP.decode(data.data as Buffer);
        } catch (e) {
            img = undefined;
            LogUtil.LogMessage(MESSAGE_TYPE.WARN, 'Unable to parse image BMP data.\n', e);
        }

        if(img) {
            result.width = img.width;
            result.height = img.height;
            result.gamma = 0;

            const imageFrame = ImageUtil_ImageParser.buildImageFrame(img.data.valueOf(), img.width, img.height);
            if(!result.frames || result.frames.length === 0) {
                result.frames = [];
                result.frames.push(imageFrame);
            }

            result.isValid = true;
        }

        return result;
    }


}