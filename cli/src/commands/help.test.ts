import HelpCommandModule from './help';

import NewProjectCommand from "./project/new";
import EditProjectCommand from "./project/edit";
import AddImagesCommand from "./image/add";
import RemoveImagesCommand from "./image/remove";
import PublishProjectCommand from "./project/publish";
import AboutDeveloperCommand from "./about/developer";
import AboutLicenseCommand from "./about/license";
import AboutLibsCommand from "./about/libs";

import {Arguments} from "yargs";
import "path";
import 'colors';

describe("help command", () => {
    let mockConsole : jest.MockedFunction<any>;

    const IMAGES = [
        "../public/logo192.png",
        "../public/favicon260.png",
        "../public/android-chrome-192x192.png",
        "../public/mstile-150x150.png"];

    beforeAll(() => {
        mockConsole = jest.spyOn(console, 'log');//.mockImplementation();
    });

    beforeEach(() => {
        mockConsole.mockReset();
    });

    afterAll(() => {
        mockConsole.mockRestore();
    });

    test("should display help options when no module specified", () => {
        testHelpForModule('');
    });

    test("should display help module help text", () => {
        testHelpForModule("help", HelpCommandModule.helpText);
    });

    test("should display new project help text", () => {
        testHelpForModule("new", NewProjectCommand.helpText);
    });

    test("should display edit project help text", () => {
        testHelpForModule("edit", EditProjectCommand.helpText);
    });

    test("should display add images help text", () => {
        testHelpForModule("add", AddImagesCommand.helpText);
    });

    test("should display remove images help text", () => {
        testHelpForModule("remove", RemoveImagesCommand.helpText);
    });

    test("should display publish project help text", () => {
        testHelpForModule("publish", PublishProjectCommand.helpText);
    });

    test("should display about developer help text", () => {
        testHelpForModule("developer", AboutDeveloperCommand.helpText);
    });

    test("should display about license help text", () => {
        testHelpForModule("license", AboutLicenseCommand.helpText);
    });

    test("should display about libraries help text", () => {
        testHelpForModule("libs", AboutLibsCommand.helpText);
    });

    const FAKE_COMMAND = 'not-found';
    test("should display error when unknown module is specified", () => {
        testHelpForModule(FAKE_COMMAND, `unknown command [${FAKE_COMMAND}]`);
    });

    const testHelpForModule = (name?: string | undefined, description?: string | undefined) => {
        const help = new HelpCommandModule();
        const args = {
            _: `help ${name}`.trim().split(' '),
            $0: "gdu-sheets",
            "path": "./build/index.js",
            "images": IMAGES
        } as Arguments<{}>;

        expect(help.command).toBe('help <module>');
        help.handler(args);
        expect(help.handlerResult.command).toBe('help');
        if(name === FAKE_COMMAND) {
            expect(help.handlerResult.commandArgs.length).toBe(2);
            expect(help.handlerResult.commandArgs[1]).toBe(name);
            expect(mockConsole).toHaveBeenCalledTimes(3);
            expect(mockConsole).toHaveBeenNthCalledWith(3, `${description}`);
        } else if(name && description) {
            expect(help.handlerResult.commandArgs.length).toBe(2);
            expect(help.handlerResult.commandArgs[1]).toBe(name);
            expect(mockConsole).toHaveBeenCalledTimes(3);
            expect(mockConsole).toHaveBeenNthCalledWith(3, `${description}`);
        } else {
            expect(help.handlerResult.commandArgs.length).toBe(1);
            expect(mockConsole).toHaveBeenCalledTimes(2);
        }

        expect(mockConsole).toHaveBeenNthCalledWith(1, `Use '${"gdu-sheets help".green}' for a list of commands.`);
        expect(mockConsole).toHaveBeenNthCalledWith(2, `Use '${"gdu-sheets help --show-hidden".green}' for a list of all options.`);
    }
});
