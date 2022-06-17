import {PNG, PNGWithMetadata} from 'pngjs';
import {ImageUtil_ImageParser} from "./ImageUtil._base";
import {ImageProps} from "../objs/images";
import {NdArray} from "ndarray";
import {Buffer} from "buffer";
import {LogUtil} from "./LogUtil";
import {MESSAGE_TYPE} from "../objs/messages";

export class ImageUtil_PNG extends ImageUtil_ImageParser {
    public parseImageData(data: NdArray) : ImageProps {
        const result = ImageUtil_ImageParser.EMPTY_IMAGE_PROPS;

        try {
            let img: PNGWithMetadata | undefined = undefined;
            try {
                img = PNG.sync.read(Buffer.from(data.data as Uint8Array));
            } catch (e) {
                LogUtil.LogMessage(MESSAGE_TYPE.WARN, 'Unable to parse image PNG data.\n', e);
            }

            if (img) {
                result.width = img.width;
                result.height = img.height;
                result.gamma = 0;

                const imageFrame = ImageUtil_ImageParser.buildImageFrame(img.data, img.width, img.height);
                if (!result.frames || result.frames.length === 0) {
                    imageFrame.isValid = true;
                    result.frames = [];
                    result.frames.push(imageFrame);
                }

                result.isValid = true;
            }
        } catch(e) {
            // TODO: add LogUtil output ??
        }

        return result;
    }
}
