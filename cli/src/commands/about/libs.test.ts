import LibsCommandModule from './libs';
import {Arguments} from "yargs";
import { LIBS } from 'gdu-common';

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
        expect(mockConsole).toHaveBeenCalledWith(LIBS);
    });
});
