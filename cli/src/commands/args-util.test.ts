import ArgsUtil, {ValidatedResult} from "./args-util";
// import ExtCommandModule from "./helpers/ExtCommandModule";
// import AddImagesCommand from './add-images';
import /*yargs,*/ {Arguments} from "yargs";

describe("args-utils", () => {
    test("should add images to the project", () => {
        const args  = {
            _: ["add"],
            $0: "gdu-sheets",
            "path": "./build/index.js",
            "images": [
            "../public/logo192.png",
            "../public/favicon260.png",
            "../public/android-chrome-192x192.png",
            "../public/mstile-150x150.png"]
        } as Arguments<{}>;

        const result = ArgsUtil.Validate(args, "add", true, true );

        expect(result.hasNoError).toBe(true);
        expect(result._errors.length).toBe(0);
        expect(result._command).toBe("add");
        expect(result.images.length).toBe(4);
    });

    test("should report error when command is missing", () => {
        const args  = {
            _: ["add"],
            $0: "gdu-sheets",
            "path": "./build/index.js",
            "images": [
            "../public/logo192.png",
            "../public/favicon260.png",
            "../public/android-chrome-192x192.png",
            "../public/mstile-150x150.png"]
        } as Arguments<{}>;

        const result = ArgsUtil.Validate(args, "fake-cmd", true, true );

        expect(result.command).toBe("");
        expect(result.hasError).toBe(true);
        expect(result._errors.length).toBe(1);
        expect(result._errors[0]).toBe("Missing command, 'fake-cmd'.");
    });

    test("should report error when path is missing", () => {
        const args  = {
            _: ["add"],
            $0: "gdu-sheets",
            // "path": "./build/index.js",
            "images": [
            "../public/logo192.png",
            "../public/favicon260.png",
            "../public/android-chrome-192x192.png",
            "../public/mstile-150x150.png"]
        } as Arguments<{}>;

        const result = ArgsUtil.Validate(args, "add", true, true );

        expect(result.command).toBe("add");
        expect(result.hasError).toBe(true);
        expect(result._errors.length).toBe(1);
        expect(result._errors[0]).toBe("Missing path value.");
    });

    test("should report error when path is not found", () => {
        const args  = {
            _: ["add"],
            $0: "gdu-sheets",
            "path": "../../../build/index.js",
            "images": [
            "../public/logo192.png",
            "../public/favicon260.png",
            "../public/android-chrome-192x192.png",
            "../public/mstile-150x150.png"]
        } as Arguments<{}>;

        const result = ArgsUtil.Validate(args, "add", true, true );

        expect(result.hasError).toBe(true);
        expect(result._errors.length).toBe(1);
        expect(result._errors[0]).toBe("Path not found, '../../../build/index.js'.");
    });

    test("should report error when missing images for add command", () => {
        const args  = {
            _: ["add"],
            $0: "gdu-sheets",
            "path": "./build/index.js",
            "images": [
            "../public/logo192.png",
            "../public/favicon260.png",
            "../public/android-chrome-192x192.png",
            "../public/mstile-150x150.png"]
        } as Arguments<{}>;

        const result = ArgsUtil.Validate(args, "add", true, false );

        expect(result.hasError).toBe(true);
        expect(result._errors.length).toBe(1);
        expect(result._errors[0]).toBe("Missing images.");
    });

    test("should report error when missing images for remove command", () => {
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

        const result = ArgsUtil.Validate(args, "remove", true, false );

        expect(result.hasError).toBe(true);
        expect(result._errors.length).toBe(1);
        expect(result._errors[0]).toBe("Missing images.");
    });
});
