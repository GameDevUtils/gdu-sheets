import RemoveCommandModule from './remove';
import {Arguments} from "yargs";

describe("remove image(s) command", () => {

    const IMAGES = [
        "../public/logo192.png",
        "../public/favicon260.png",
        "../public/android-chrome-192x192.png",
        "../public/mstile-150x150.png"];

    // let mockConsole : jest.MockedFunction<any>;
    //
    // beforeAll(() => {
    //     mockConsole = jest.spyOn(console, 'log');
    // });
    //
    // beforeEach(() => {
    //     mockConsole.mockReset();
    // });
    //
    // afterAll(() => {
    //     mockConsole.mockRestore();
    // });

    test("should process remove commands.", () => {
        const remove = new RemoveCommandModule();
        const args  = {
            _: ["remove"],
            $0: "gdu-sheets",
            "path": "./build/index.js",
            "images": [
                "../public/logo192.png",
                "../public/favicon260.png",
                "../public/android-chrome-192x192.png",
                "../public/mstile-150x150.png"]
        } as Arguments<{}>;

        expect(remove.command).toBe("remove <path> [images..]");
        remove.handler(args);
        expect(remove.handlerResult.command).toBe("remove");
        // expect(mockConsole).toHaveBeenCalledTimes(1);
    });

});
