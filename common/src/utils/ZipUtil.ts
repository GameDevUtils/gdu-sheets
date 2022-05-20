// `import JSZip from 'jszip';
// import LogUtil from "./LogUtil";
// import {MESSAGE_TYPE} from "../objs/messages";
//
// // // class JSZipEx extends JSZip {
// // //     protected _zip : JSZip | undefined;
// // //
// // //     constructor() {
// // //         super();
// // //         this._zip = new JSZip();
// // //     }
// // //
// // //     createZip = () : JSZipEx => {
// // //         return new JSZipEx();
// // //     }
// // //
// // //     addFile = (filename: string, data: string | Uint8Array, options:) : JSZipEx => {
// // //         this.file(filename, data);
// // //         return this;
// // //     }
// // // }
//
// export default class ZipUtil {
//     static compress = (filename: string, data: string, mode?: string) : Blob | undefined => {
//         const zip = new JSZip();
//         zip.file(filename, data);
//
//         let result: Blob | undefined = undefined;
//         if(JSZip.support.blob) {
//             LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, `Generating compressed blob for '${filename}'.`);
//             (async () => {
//                 await zip.generateAsync({type: "blob"})
//                     .then((blob) => {
//                         result = blob;
//                     });
//             })();
//         } else {
//             LogUtil.LogMessage(MESSAGE_TYPE.ERROR, `Blob type not supported for compression. `);
//         }
//         return result;
//     }
// }`