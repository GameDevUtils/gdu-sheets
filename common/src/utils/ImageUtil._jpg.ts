import JPG from 'jpeg-js';
import {ImageUtil_ImageParser} from "./ImageUtil._base";
import {ImageProps} from "../objs/images";
import {NdArray} from "ndarray";
import {Buffer} from "buffer";
import {LogUtil} from "./LogUtil";
import {MESSAGE_TYPE} from "../objs/messages";

export class ImageUtil_JPG extends ImageUtil_ImageParser {
    public parseImageData(data: NdArray) : ImageProps {
        const result = ImageUtil_ImageParser.EMPTY_IMAGE_PROPS;
        let img;

        try {
            img = JPG.decode(data.data as Buffer, {useTArray: true});
        } catch(e) {
            img = undefined;
            LogUtil.LogMessage(MESSAGE_TYPE.WARN, 'Unable to parse image JPG data.\n', e);
        }

        if(img) {
            result.width = img.width;
            result.height = img.height;
            result.gamma = 0;

            // @ts-ignore
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
