import LicenseCommandModule from './license';
import {Arguments} from "yargs";

describe("license command", () => {
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

    test("should display license text", () => {
        const license = new LicenseCommandModule();
        const args  = {
            _: ["license"],
            $0: "gdu-sheets",
            "path": "abcdef",
            // "path": "./build/index.js",
            // "images": [
            //     "../public/logo192.png",
            //     "../public/favicon260.png",
            //     "../public/android-chrome-192x192.png",
            //     "../public/mstile-150x150.png"]
        } as Arguments<{}>;

        expect(license.command).toBe("license");
        license.handler(args);
        expect(license.handlerResult.command).toBe("license");
        //expect(mockConsole).toHaveBeenCalledTimes(1);
        expect(mockConsole).toHaveBeenCalledWith(`
MIT License

Copyright (c) 2016-${new Date().getFullYear()} Joseph B. Hall (@groundh0g)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`)
    });
});
