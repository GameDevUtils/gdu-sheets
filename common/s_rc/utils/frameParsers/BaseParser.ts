import {NdArray} from "ndarray";
import {createHash} from "crypto";
import {v4 as UUID} from "uuid";
import {Buffer} from "buffer";
import {FileParts} from "../PathHelper";
import LogHelper from "../LogHelper";
import Project from '../../objs/Project';
import ImageItem from "../../objs/ImageItem";
import ImageFrame from "../../objs/ImageFrame";
import {ImageFormatTypes} from "../Types";

export const PREAMBLE_TEMPLATE = 'data:image/xxx;base64,';

export interface IBaseParser {
    parseImageData(src: string, path?: string) : ImageItem;
    getImageFormat() : ImageFormatTypes;
}

export default abstract class BaseParser implements IBaseParser {

    public abstract parseImageData(src: string, path?: string): ImageItem;
    public abstract getImageFormat(): ImageFormatTypes;

    public doResize(minWidth: number, minHeight: number) {
        return false;
    }


    public static BuildImageItem(parser: IBaseParser, src: string, path?: string) : ImageItem {
        return parser.parseImageData(src, path);
    }

    public static AddImageFrame(imageItem: ImageItem, data: Uint8Array) : void {
        const result = new ImageFrame();

        if(!!imageItem && !imageItem.isEmpty) {
            const width = imageItem.width;
            const height = imageItem.height;

            if(!!width && !!height && !!data && !!data.length) {
                const hashSHA256 = createHash('sha256');
                const hashMD5 = createHash('md5');
                result.width = width;
                result.height = height;
                result.gamma = imageItem.gamma ?? 0; // TODO: populate from the one parser that supports it
                result.data = data;
                result.hashSHA256 = hashSHA256.update(data).digest('hex');
                result.hashMD5 = hashMD5.update(data).digest('hex');
                result.filterAppliedAliasHash = true;
                result.filterAppliedTrimRect = false;
                result.filterAppliedPaddingInner = false;
                result.isDuplicate = false;
                imageItem.frames.push(result);
            } else {
                LogHelper.LogMessage("WARN", 'Cannot process empty image frame.');
            }
        }
    }
}