import AboutDeveloperCommandModule from "./developer";
import {Arguments} from "yargs";
import { DEVELOPER } from 'gdu-common';

describe("developer command", () => {
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

    test("should display developer bio.", () => {
        const author = new AboutDeveloperCommandModule();
        const args  = {
            _: ["developer"],
            $0: "gdu-sheets",
            "path": "./build/index.js",
            "images": [
                "../public/logo192.png",
                "../public/favicon260.png",
                "../public/android-chrome-192x192.png",
                "../public/mstile-150x150.png"]
        } as Arguments<{}>;


        expect(author.command).toBe("developer");
        author.handler(args);
        expect(author.handlerResult.command).toBe("developer");
        expect(mockConsole).toHaveBeenCalledTimes(1);
        expect(mockConsole).toHaveBeenCalledWith(DEVELOPER);
    });

});
