import BaseParser, {IBaseParser} from './BaseParser';
import {NdArray} from "ndarray";
import * as BMP from "bmp-js";
import {Buffer} from "buffer";
import LogHelper from "../LogHelper";
import ImageItem from "../../objs/ImageItem";
import {v4 as UUID} from "uuid";
import PathHelper from "../PathHelper";
import {ImageFormatTypes} from "../Types";

export default class BmpParser implements IBaseParser {
    getImageFormat(): ImageFormatTypes {
        return "BMP";
    }

    parseImageData(src: string, path?: string): ImageItem {
        const result = new ImageItem();

        if(!!src && !!src.length) {
            const buffer = new Buffer(src, 'base64');

            try {
                const img = BMP.decode(buffer);
                if(!!img) {
                    if(!!path && !!path.length) {
                        const fileParts = PathHelper.ParsePath(path);
                        result.filename = fileParts.filename;
                        result.filetype = fileParts.filetype;
                        result.fullpath = path;
                    }
                    result.width = img.width;
                    result.height = img.height;
                    result.gamma = 0;
                    result.src = src;
                    result.guid = UUID();

                    BaseParser.AddImageFrame(result, img.data.buffer as Uint8Array);
                    result.populateFrameDataComplete = true;
                    result.isEmpty = false;
                }
            } catch(e) {
                LogHelper.LogMessage("WARN", `Unable to parse image ${this.getImageFormat()} data.\n`, e);
            }
        }

        return result;
    }
}