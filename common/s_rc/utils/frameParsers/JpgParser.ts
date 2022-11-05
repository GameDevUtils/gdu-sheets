import * as JPG from 'jpeg-js';
import BaseParser, {IBaseParser} from "./BaseParser";
import ImageItem from "../../objs/ImageItem";
import {Buffer} from "buffer";
import PathHelper from "../PathHelper";
import {v4 as UUID} from "uuid";
import LogHelper, {MESSAGE_TYPE} from "../LogHelper";
import {ImageFormatTypes} from "../Types";

export default class JpgParser implements IBaseParser {
    getImageFormat(): ImageFormatTypes {
        return "JPG";
    }

    parseImageData(src: string, path?: string): ImageItem {
        const result = new ImageItem();

        if(!!src && !!src.length) {
            const buffer = new Buffer(src, 'base64');

            try {
                const img = JPG.decode(buffer, {useTArray: true});
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
                LogHelper.LogMessage(MESSAGE_TYPE.WARN, `Unable to parse image ${this.getImageFormat()} data.\n`, e);
            }
        }

        return result;
    }
}