import {FileParts, ImageItem} from '..';
import {LogUtil} from './LogUtil';
import {MESSAGE_TYPE} from '..';
import {Buffer} from 'buffer';
import ndarray, {NdArray} from 'ndarray';
// import {ImageUtil} from './ImageUtil';

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

    static getFileParts(path: string) : FileParts {
        const fileparts = FileUtil.EMPTY_FILEPARTS;

        if(path && path.length && path.lastIndexOf('.') > 0) {
            fileparts.isValid = false;

            fileparts.filename = path.substring(path.includes('/') ? path.lastIndexOf('/') + 1 : 0);
            fileparts.fileonly = fileparts.filename.substring(0, fileparts.filename.lastIndexOf('.'));
            fileparts.filetype = fileparts.filename.substring(fileparts.filename.lastIndexOf('.') + 1);
            fileparts.pathfull = path;
            fileparts.pathonly = path.substring(0, path.lastIndexOf('/'));

            // TODO: determine root of asset's path ?? e.g. /x/y/{pwd}/toons/image.png -> ./toons/image.png ??

            fileparts.isValid = true;
        } else {
            LogUtil.LogMessage(MESSAGE_TYPE.WARN, `Invalid path or filename '${fileparts.pathfull}'.`);
        }

        return fileparts;
    }

    static getFileBytes(data: Uint8Array | string, imageFormat: string) : NdArray {
        const preamble = ImageItem.PREAMBLE_TEMPLATE.replace(/xxx/g, imageFormat.toLowerCase());

        let result: NdArray;

        if(typeof data === 'string') {
            if (preamble && data.indexOf(preamble) === 0) {
                LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, 'Processing image data as dataUrl string.');
                result = ndarray(Buffer.from(data.substring(preamble.length), 'base64').valueOf() as Uint8Array);
            } else {
                LogUtil.LogMessage(MESSAGE_TYPE.WARN, 'Invalid dataUrl.');
                result = ndarray([]);
            }
        } else {
            LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, 'Processing image data as Uint8Array.');
            result = ndarray(data as Uint8Array);
        }

        return result;
    }

}
