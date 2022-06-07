import ArgsUtil from "./ArgsUtil";
import {Arguments} from "yargs";
import {LogUtil, MESSAGE_TYPE} from "gdu-common";
import RemoveImagesCommand from "../image/remove";

describe.skip("args-utils", () => {

    const IMAGES = [
        "../_assets/sprites/PNG/Characters/platformChar_happy.png",
        "../_assets/sprites/PNG/Characters/platformChar_climb2.png",
        "../_assets/sprites/PNG/Characters/platformChar_duck.png",
        "../_assets/sprites/PNG/Characters/platformChar_walk1.png",
        "../_assets/sprites/PNG/Characters/platformChar_walk2.png",
    ]

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
        expect(result.images.length).toBe(5);
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

    test("manages images", () => {
        const args  = {
            _: ["add"],
            $0: "sheets",
            "path": "./build/sheets.js",
            "images": IMAGES
        } as Arguments<{}>;

        const result = ArgsUtil.Validate(args, "fake-cmd", true, true );
        expect(result._images.length).toEqual(5);

        result.clearImages();
        expect(result._images.length).toEqual(0);

        result.setImages(IMAGES);
        expect(result._images.length).toEqual(5);
    });

    test("handles missing images on path", () => {
        const args  = {
            _: ["add"],
            $0: "sheets",
            "path": "./build/sheets.js",
            "images": IMAGES,
        } as Arguments<{}>;

        const result = ArgsUtil.Validate(args, "add", true, true );
        result.clearImages();
        result.addImage("foo.jpg");

        expect(result.images.length).toEqual(1);
        // expect(LogUtil._messages.length).toEqual(1);
        // expect(LogUtil._messages[0]).toContain(MESSAGE_TYPE[MESSAGE_TYPE.ERROR]);
    });

    test("should report error when path is missing", () => {
        const args  = {
            _: ["add"],
            $0: "sheets",
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
            "path": "../build/sheets.js",
            "images": IMAGES
        } as Arguments<{}>;

        const result = ArgsUtil.Validate(args, "add", true, true );

        expect(result.hasError).toBe(true);
        expect(result._errors.length).toBe(1);
        expect(result._errors[0]).toBe("Path not found, '../build/sheets.js'.");
    });

    test("should report error when path is not found", () => {
        const args  = {
            _: ["add", "foo.png bar.gif baz.jpg"],
            $0: "sheets",
            "path": "proj1.sheets",
            "images": ["foo.png", "bar.gif", "baz.jpg"]
        } as Arguments<{}>;

        const result = ArgsUtil.Validate(args, "add", true, true );

        expect(result.hasError).toBe(true);
        expect(result._errors.length).toBe(1);
        expect(result._errors[0]).toBe("Path not found, 'proj1.sheets'.");
    });

    test("should report error when missing images for add command", () => {
        const args  = {
            _: ["add"],
            $0: "sheets",
            "path": "./build/sheets.js",
            "images": IMAGES
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

    test("should cull by full path for remove command", () => {
        const remove = new RemoveImagesCommand();
        const args  = {
            _: ["remove"],
            $0: "sheets",
            "path": "../_assets/projects/test-new-with-images.sheets",
            "images": [
                "../_assets/sprites/PNG/Characters/platformChar_walk1.png",
                "../_assets/sprites/PNG/Characters/platformChar_walk2.png",
            ], // IMAGES,
            console: true,
            "removeByFullPath": true,
        } as Arguments<{}>;

        const result = ArgsUtil.Validate(args, "remove", true, true );
        remove.handler(args);

        expect(result.hasError).toBe(false);
    });

    test("should cull by filename for remove command", () => {
        const remove = new RemoveImagesCommand();
        const args  = {
            _: ["remove"],
            $0: "sheets",
            "path": "../_assets/projects/test-new-with-images.sheets",
            "images": [
                "../_assets/sprites/PNG/Characters/platformChar_walk1.png",
                "../_assets/sprites/PNG/Characters/platformChar_walk2.png",
            ],
            console: true,
            "removeByFilename": true,
        } as Arguments<{}>;

        const result = ArgsUtil.Validate(args, "remove", true, true );
        remove.handler(args);

        expect(result.hasError).toBe(false);
    });

});
