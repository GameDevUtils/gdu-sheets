// import Edit from './edit-project';
import {Arguments, Argv} from "yargs";
import EditCommandModule from "./edit";

describe("edit command", () => {

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

    test("should process edit commands.", () => {
        const edit = new EditCommandModule();
        const argv  = {
            _: ["edit", "proj1"],
            $0: "sheets",
            "path": "./build/sheets.js",
            "images": [
                "../_assets/sprites/BMP/sheet.bmp",
                "../favicon260.png"]
        } as Arguments<{}>;


        expect(edit.command).toBe("edit <path> [images..]");
        edit.handler(argv);
        expect(edit.handlerResult.hasNoError).toBe(true);
        expect(edit.handlerResult.hasError).toBe(false);
        expect(edit.handlerResult.command).toBe("edit");
        // expect(mockConsole).toHaveBeenCalledTimes(1);
    });

});
