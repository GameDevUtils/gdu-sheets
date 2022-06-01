import NewProjectCommandModule from './new';
import {Arguments} from "yargs";

describe("new command", () => {

    const IMAGES = [
        "../_assets/sprites/PNG/Characters/platformChar_happy.png",
        "../_assets/sprites/PNG/Characters/platformChar_climb2.png",
        "../_assets/sprites/PNG/Characters/platformChar_duck.png",
        "../_assets/sprites/PNG/Characters/platformChar_walk1.png",
        "../_assets/sprites/PNG/Characters/platformChar_walk2.png",
    ]

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

    test("should process new commands.", () => {
        const commandModule = new NewProjectCommandModule();
        const args  = {
            _: ["new"],
            $0: "sheets",
            "path": "../_assets/projects/test-with-images.sheets",
            "images": IMAGES,
            "console": true,
        } as Arguments<{}>;

        expect(commandModule.command).toBe("new <path> [images..]");
        commandModule.handler(args);
        expect(commandModule.handlerResult.command).toBe("new");
        expect(mockConsole).toHaveBeenCalledTimes(1);
    });

});
