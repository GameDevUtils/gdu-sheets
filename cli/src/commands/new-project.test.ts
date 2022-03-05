import NewProjectCommandModule from './new-project';
import {Arguments} from "yargs";

describe("new command", () => {

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

    test("should process new commands.", () => {
        const newProj = new NewProjectCommandModule();
        const args  = {
            _: ["new"],
            $0: "gdu-sheets",
            "path": "./build/index.js",
            "images": [
                "../public/logo192.png",
                "../public/favicon260.png",
                "../public/android-chrome-192x192.png",
                "../public/mstile-150x150.png"]
        } as Arguments<{}>;

        expect(newProj.command).toBe("new <path> [images..]");
        newProj.handler(args);
        expect(newProj.handlerResult.command).toBe("new");
        // expect(mockConsole).toHaveBeenCalledTimes(1);
    });

});
