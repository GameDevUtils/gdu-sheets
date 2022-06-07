import RemoveCommandModule from './remove';
import {Arguments} from "yargs";

describe("remove image(s) command", () => {

    // const IMAGES = [
    //     "../_assets/sprites/PNG/Characters/platformChar_happy.png",
    //     "../_assets/sprites/PNG/Characters/platformChar_climb2.png",
    //     "../_assets/sprites/PNG/Characters/platformChar_duck.png",
    //     "../_assets/sprites/PNG/Characters/platformChar_walk1.png",
    //     "../_assets/sprites/PNG/Characters/platformChar_walk2.png",
    // ]

    let mockConsoleLog : jest.MockedFunction<any>;
    let mockConsoleDebug : jest.MockedFunction<any>;
    let mockConsoleWarn : jest.MockedFunction<any>;
    // let mockConsoleError : jest.MockedFunction<any>;

    beforeAll(() => {
        mockConsoleLog = jest.spyOn(console, 'log');
        mockConsoleDebug = jest.spyOn(console, 'debug');
        mockConsoleWarn = jest.spyOn(console, 'warn');
        // mockConsoleError = jest.spyOn(console, 'error');
    });

    beforeEach(() => {
        mockConsoleLog.mockReset();
        mockConsoleDebug.mockReset();
        mockConsoleWarn.mockReset();
        // mockConsoleError.mockReset();
    });

    afterAll(() => {
        mockConsoleLog.mockRestore();
        mockConsoleDebug.mockRestore();
        mockConsoleWarn.mockRestore();
        // mockConsoleError.mockRestore();
    });

    test("should process remove commands.", () => {
        const remove = new RemoveCommandModule();
        const args  = {
            _: ["remove"],
            $0: "sheets",
            "path": "../_assets/projects/test-new-with-images.sheets",
            "images": [
                "../_assets/sprites/PNG/Characters/platformChar_walk1.png",
                "../_assets/sprites/PNG/Characters/platformChar_walk2.png",
            ],
            console: true,
            "removeByFullPath": true,
        } as Arguments<{}>;

        expect(remove.command).toEqual("remove <path> [images..]");
        // expect(mockConsoleError).toHaveBeenCalledTimes(0);
        remove.handler(args);
        expect(remove.handlerResult.command).toEqual("remove");
        expect(remove.handlerResult.images.length).toEqual(2);
        // expect(mockConsoleError).toHaveBeenCalledTimes(2);
    });

});
