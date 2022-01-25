import {Arguments /*, CommandModule*/} from 'yargs';
import ArgsUtil, {ValidatedResult} from "./args-util";
import ExtCommandModule from './helpers/ExtCommandModule';

export default class LibCommandModule extends ExtCommandModule {
    constructor() {
        super();
        this._command = "libs";
        this._describe = "open source dependency list";
        this._builder = undefined;
        this._handlerResult = new ValidatedResult();

        this.handler = (args: Arguments) => {
            this.handlerResult = ArgsUtil.Validate(args,"libs", false, false);
            if(this.handlerResult.hasNoError) {
                console.log(`
The following open source and public domain projects helped make this 
application possible.

 * base64 - a base64 encoder / decoder, compatible with atob() and btoa()
 * Blob - W3C Blob interface for browsers that do not support it
 * Bootstrap - a framework for faster and easier web development
 * crypto-js - an implementation of SHA256 and MD5 hashing
 * FileSaver - W3C FileSaver interface for browsers that do not support it
 * GitHub Pages - websites for you and your projects
 * Jekyll Bootstrap - The definitive Jekyll blogging framework
 * jQuery - a fast, small, and feature-rich JavaScript library
 * json2 - JSON feature for browsers that do not support it
 * jszip - create, read, and edit .zip files with Javascript
 * libgif.js - a modified version of @buzzfeed's & @shachaf's GIF parser
 * libgifparser.js - my lib, based on @buzzfeed's SuperGIF
 * object-keys.js - Object.keys for browsers that do not support it
 * string-helpers.js - contains, endsWith, ... for browsers without support
 * UUID - a JavaScript module to create GUIDs
 * MaxRectsBinPack.cpp - my JavaScript port of C++ source by Jukka Jylänki
`);
            }
        }
    }

    static get helpText(): string {
        return `help text method for libs`;
    }

}
