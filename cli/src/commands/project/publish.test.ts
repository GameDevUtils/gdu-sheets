import PublishProjectCommand from './publish';
import {Arguments} from "yargs";
import "path";
import 'colors';

describe("publish project command", () => {

    const IMAGES = [
        "../public/logo192.png",
        "../public/favicon260.png",
        "../public/android-chrome-192x192.png",
        "../public/mstile-150x150.png"];

    let mockConsole : jest.MockedFunction<any>;

    beforeAll(() => {
        mockConsole = jest.spyOn(console, 'error');
    });

    beforeEach(() => {
        mockConsole.mockReset();
    });

    afterAll(() => {
        mockConsole.mockRestore();
    });

    test("should process publish commands.", () => {
        const publish = new PublishProjectCommand();
        const args  = {
            _: ["publish"],
            $0: "sheets",
            "path": "./build/sheets.js",
            "images": IMAGES
        } as Arguments<{}>;

        expect(publish.command).toBe("publish <path> [outpath]");
        publish.handler(args);
        expect(publish.handlerResult.command).toBe("publish");
        // expect(mockConsole).toHaveBeenCalledTimes(1);
    });

    test("should handle bad paths.", () => {
        const publish = new PublishProjectCommand();
        const args  = {
            _: ["publish"],
            $0: "sheets",
            "path": "./noSuchFile.here",
            "images": IMAGES
        } as Arguments<{}>;

        expect(publish.command).toBe("publish <path> [outpath]");
        publish.handler(args);
        expect(publish.handlerResult.command).toBe("publish");
        expect(publish.handlerResult.hasError).toBe(true);
        // expect(mockConsole).toHaveBeenCalledTimes(1);
    });

    test("should handle output warning.", () => {
        const publish = new PublishProjectCommand();
        const args  = {
            _: ["publish", "foo.txt bar.txt --output"],
            $0: "sheets",
            "path": "./build/sheets.js",
            "images": IMAGES,
        } as Arguments<{}>;

        expect(publish.command).toBe("publish <path> [outpath]");
        publish.handler(args);

// console.debug(publish.handlerResult);

        expect(publish.handlerResult.command).toBe("publish");
        expect(publish.handlerResult.hasError).toBe(false);
        expect(publish.handlerResult.hasNoError).toBe(true);
        // expect(mockConsole).toHaveBeenCalledTimes(1);
        // // expect(mockConsole).toHaveBeenCalledWith("The '--output' option was specified. The project name will be ignored.".yellow)
    });

});
