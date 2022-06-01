import LicenseCommandModule from './license';
import {Arguments} from "yargs";
import {LICENSE} from 'gdu-common';


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
        expect(mockConsole).toHaveBeenCalledWith(LICENSE);
    });
});
