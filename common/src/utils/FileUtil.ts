import {FileParts} from '../objs/files';
import LogUtil from "./LogUtil";
import {MESSAGE_TYPE} from "../objs/messages";
import {ImageFormat} from "../objs/projects";
import {Buffer} from "buffer";
import ndarray, {NdArray} from "ndarray";

export class FileUtil {
    static get EMPTY_FILEPARTS() : FileParts
    {
        return {
            filename: undefined,
            fileonly: undefined,
            filetype: undefined,
            pathfull: undefined,
            pathonly: undefined,
            isValid: false,
        } as FileParts;
    }

    static getFileParts(path: string) : FileParts | undefined {
        const fileparts = FileUtil.EMPTY_FILEPARTS;
// console.log(`path = '${path}'`)
        if(path && path.length && path.lastIndexOf('.') > 0) {
            fileparts.isValid = false;

            fileparts.filename = path.substring(path.includes('/') ? path.lastIndexOf('/') + 1 : 0);
            fileparts.fileonly = fileparts.filename.substring(0, fileparts.filename.lastIndexOf('.'));
            fileparts.filetype = fileparts.filename.substring(fileparts.filename.lastIndexOf('.') + 1);

            // const hasPath = path.includes('/');
            fileparts.pathfull = path;
            fileparts.pathonly = path.substring(0, path.lastIndexOf('/'));
            // TODO: determine root of asset's path ?? e.g. /x/y/{pwd}/toons/image.png -> ./toons/image.png ??

            const index = Object.values(ImageFormat).indexOf(fileparts.filetype.toUpperCase())
            const key = Object.keys(ImageFormat)[index];
            if(key) {
                fileparts.isValid = true;
                LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, `Successfully extracted fileparts from '${path}'.`);
                return fileparts;
                // } else {
                //     LogUtil.LogMessage(MESSAGE_TYPE.WARN, `Unknown image type '${fileparts.filetype}'.`);
            }
        } else {
            LogUtil.LogMessage(MESSAGE_TYPE.WARN, `Invalid path or filename '${fileparts.pathfull}'.`);
        }

        return undefined;
    }

    static getFileBytes(data?: Uint8Array | string, preamble?: string) : NdArray | undefined {
        const array : Uint8Array | undefined = data as Uint8Array;

        let result: NdArray | undefined = undefined;

        if(typeof data === 'string') {
            if (preamble && data.indexOf(preamble) === 0) {
                LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, 'Processing image data as dataUrl string.')
                result = ndarray(Buffer.from(data.substring(preamble.length), 'base64').valueOf() as Uint8Array);
            } else {
                LogUtil.LogMessage(MESSAGE_TYPE.WARN, 'Invalid dataUrl.')
            }
        } else if(array && array.length != undefined) {
            LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, 'Processing image data as Uint8Array.')
            result = ndarray(array);
        }

        return result;
    }

}
