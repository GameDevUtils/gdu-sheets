import {IBaseParser} from "./BaseParser";
import ImageItem from "../../objs/ImageItem";
import {ImageFormatTypes} from "../Types";

export default class SvgParser implements IBaseParser {
    getImageFormat(): ImageFormatTypes {
        return "SVG";
    }

    parseImageData(src: string, path?: string): ImageItem {
        return ImageItem.Empty;
    }
}