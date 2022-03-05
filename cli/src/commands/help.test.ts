import HelpCommandModule from './help';
import {Arguments} from "yargs";
import "path";
import 'colors';

describe("add images command", () => {
    let mockConsole : jest.MockedFunction<any>;

    beforeAll(() => {
        mockConsole = jest.spyOn(console, 'log');//.mockImplementation();
    });

    beforeEach(() => {
        mockConsole.mockReset();
    });

    afterAll(() => {
        mockConsole.mockRestore();
    });

    test.only("should display help options", () => {
        const help = new HelpCommandModule();
        const args = {
            _: ["help"],
            $0: "gdu-sheets",
            "path": "abcdef",
            // "path": "./build/index.js",
            "images": [
                "../public/logo192.png",
                "../public/favicon260.png",
                "../public/android-chrome-192x192.png",
                "../public/mstile-150x150.png"]
        } as Arguments<{}>;


        expect(help.command).toBe("help <module>");
        help.handler(args);
        expect(help.handlerResult.command).toBe("help");

        expect(mockConsole).toHaveBeenCalledTimes(2);
        expect(mockConsole).toHaveBeenNthCalledWith(1, `Use '${"gdu-sheets help".green}' for a list of commands.`);
        expect(mockConsole).toHaveBeenNthCalledWith(2, `Use '${"gdu-sheets help --show-hidden".green}' for a list of all options.`);

        // expect(mockConsole).toHaveBeenLastCalledWith([
        //     [`Use 'gdu-sheets help' for a list of commands.`],
        //     [`Use 'gdu-sheets help --show-hidden' for a list of all options.`]
        // ]);
        // // expect(mockConsole).toHaveBeenLastCalledWith(`Use 'gdu-sheets help' for a list of commands.`);
        // // expect(mockConsole).toHaveBeenLastCalledWith(`Use 'gdu-sheets help --show-hidden' for a list of all options.`);
    });

});
