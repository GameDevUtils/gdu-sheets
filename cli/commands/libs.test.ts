import LibsCommandModule from './libs';
import {Arguments} from "yargs";

describe("libs command", () => {
    let mockConsole : jest.MockedFunction<any>;

    beforeAll(() => {
        mockConsole = jest.spyOn(console, 'log');
    });

    beforeEach(() => {
        mockConsole.mockReset();
    });

    afterAll(() => {
        mockConsole.mockRestore();
    });

    test("should display open source text", () => {
        const libs = new LibsCommandModule();
        const args  = {
            _: ["libs"],
            $0: "gdu-sheets",
            "path": "abcdef",
            // "path": "./build/index.js",
            "images": [
                "../public/logo192.png",
                "../public/favicon260.png",
                "../public/android-chrome-192x192.png",
                "../public/mstile-150x150.png"]
        } as Arguments<{}>;

        expect(libs.command).toBe("libs");
        libs.handler(args);
        expect(libs.handlerResult.command).toBe("libs");
        expect(mockConsole).toHaveBeenCalledTimes(1);
        expect(mockConsole).toHaveBeenCalledWith(`
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
    });
});
