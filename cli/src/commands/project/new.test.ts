import NewProjectCommandModule from './new';
import {Arguments} from "yargs";
import {SortBy} from "gdu-common";

describe("new command", () => {

    test.only("scratch", () => {
        const strings: string[] = [];
        const numbers: number[] = [];
        Object.keys(SortBy).forEach((key) => {
            if(isNaN(parseInt(key))) {
                strings.push(key);
            } else {
                numbers.push(parseInt(key));
            }

            console.log(strings);
            console.log(numbers);
        });
    });

    const IMAGES = [
        "../_assets/sprites/PNG/Characters/platformChar_happy.png",
        "../_assets/sprites/PNG/Characters/platformChar_climb2.png",
        "../_assets/sprites/PNG/Characters/platformChar_duck.png",
        "../_assets/sprites/PNG/Characters/platformChar_walk1.png",
        "../_assets/sprites/PNG/Characters/platformChar_walk2.png",
    ]

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
        const commandModule = new NewProjectCommandModule();
        const args  = {
            _: ["new"],
            $0: "sheets",
            "path": "../_assets/projects/test-new-with-images.sheets",
            "images": IMAGES,
            "console": true,
        } as Arguments<{}>;

        expect(commandModule.command).toBe("new <path> [images..]");
        commandModule.handler(args);
        expect(commandModule.handlerResult.command).toBe("new");
        // expect(mockConsole).toHaveBeenCalledTimes(1);
    });

});
