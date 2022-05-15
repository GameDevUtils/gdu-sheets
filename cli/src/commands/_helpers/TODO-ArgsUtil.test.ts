import ArgsUtil, {ValidatedResult} from "./ArgsUtil";
// import ExtCommandModule from "./helpers/ExtCommandModule";
// import AddImagesCommand from './add-images';
import /*yargs,*/ {Arguments} from "yargs";

describe("args-utils", () => {

    const IMAGES = [
        "../docs/apple-touch-icon.png",
        "../docs/favicon-32x32.png",
        "../docs/android-chrome-192x192.png"]
        //"../docs/mstile-150x150.png"]

    test("should add images to the project", () => {
        const args  = {
            _: ["add"],
            $0: "sheets",
            "path": "./build/sheets.js",
            "images": IMAGES
        } as Arguments<{}>;

        const result = ArgsUtil.Validate(args, "add", true, true );

        expect(result.hasNoError).toBe(true);
        expect(result._errors.length).toBe(0);
        expect(result._command).toBe("add");
        expect(result.images.length).toBe(3);
    });

    test("should report error when command is missing", () => {
        const args  = {
            _: ["add"],
            $0: "sheets",
            "path": "./build/sheets.js",
            "images": IMAGES
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
            $0: "heets",
            // "path": "./build/index.js",
            "images": IMAGES
        } as Arguments<{}>;

        const result = ArgsUtil.Validate(args, "add", true, true );

        expect(result.command).toBe("add");
        expect(result.hasError).toBe(true);
        expect(result._errors.length).toBe(1);
        expect(result._errors[0]).toBe("Missing path value.");
    });

    test("should report error when path is not found", () => {
        const args  = {
            _: ["add", "foo.png bar.gif baz.jpg"],
            $0: "sheets",
            "path": "../../../build/sheets.js",
            "images": IMAGES
        } as Arguments<{}>;

        const result = ArgsUtil.Validate(args, "add", true, true );

        expect(result.hasError).toBe(true);
        expect(result._errors.length).toBe(1);
        expect(result._errors[0]).toBe("Path not found, '../../../build/sheets.js'.");
    });

    test("should report error when missing images for add command", () => {
        const args  = {
            _: ["add"],
            $0: "sheets",
            "path": "./build/sheets.js",
            "images": IMAGES
            //"../docs/mstile-150x150.png"]
        } as Arguments<{}>;

        const result = ArgsUtil.Validate(args, "add", true, false );

        expect(result.hasError).toBe(true);
        expect(result._errors.length).toBe(1);
        expect(result._errors[0]).toBe("Missing images.");
    });

    test("should report error when missing images for remove command", () => {
        const args  = {
            _: ["remove"],
            $0: "sheets",
            "path": "./build/sheets.js",
            "images": IMAGES
        } as Arguments<{}>;

        const result = ArgsUtil.Validate(args, "remove", true, false );

        expect(result.hasError).toBe(true);
        expect(result._errors.length).toBe(1);
        expect(result._errors[0]).toBe("Missing images.");
    });
});
