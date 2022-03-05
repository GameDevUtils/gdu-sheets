// import Options from './options';
import {Arguments, Argv} from "yargs";
import Options from './options';
import NewProjectCommandModule from "./new-project";
import * as yargs from "yargs";

describe("options", () => {

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

    // test("new-project", () => {
    //     let t = new NewProjectCommandModule.
    // });

    test("placeholder, empty test", () => {
        expect(true).toBe(true);
    });
    // test("should process remove commands.", () => {
    //     const args  = {
    //         _: ["remove"],
    //         $0: "gdu-sheets",
    //         "path": "./build/index.js",
    //         "images": [
    //             "../public/logo192.png",
    //             "../public/favicon260.png",
    //             "../public/android-chrome-192x192.png",
    //             "../public/mstile-150x150.png"]
    //     } as Arguments<{}>;
    //
    //     const argv = Options.AppendOptions(yargs.argv) || yargs.argv;
    //
    //     // Options.AppendOptions(argv);
    //     expect(argv.command).toBe("new <path> [images..]");
    //     // opts.handler(args);
    //     // expect(newProj.handlerResult.command).toBe("new");
    //     // // expect(mockConsole).toHaveBeenCalledTimes(1);
    //     //
    //     //
    //     //
    //     // const result = Options.AppendOptions(args);
    //     //
    //     const ver = argv.then((result : yargs.Argv) => {
    //         return result.version();
    //     });
    //     expect(ver).toBe("v0.3.0");
    // });

});
