import fs from 'fs';
import path from 'path';
import LogHelper from "../LogHelper";
import ImageFrame from "../../objs/ImageFrame";
import ImageItem from "../../objs/ImageItem";
import ParserHelper from "../ParserHelper";
import JpgParser from "./JpgParser";
import PackerTestHelper from '../spritePackers/_PackerTestHelper';

describe("JpgParser", () => {

    beforeAll(() => LogHelper.OutputModule = console );
    afterAll(() => LogHelper.OutputModule = undefined );

    test("Reads valid JPG", () => {
        const filename = path.resolve(__dirname, '../../_assets/joehall-logo.jpg');
        const parser = new JpgParser();
        const buffer = fs.readFileSync(filename);
        const base64 = buffer.toString("base64");
        const image = parser.ParseImageData(base64, filename);

        expect(image.width).toEqual(256);
        expect(image.height).toEqual(256);
    });

    test("Reads valid JPG; populates frames w/ buffer", () => {
        const filename = path.resolve(__dirname, '../../_assets/joehall-logo.jpg');
        const parser = new JpgParser();
        const buffer = fs.readFileSync(filename);
        const base64 = buffer.toString("base64");
        const image = parser.ParseImageData(base64, filename);

        expect(image.width).toEqual(256);
        expect(image.height).toEqual(256);
        expect(image.frames?.length).toEqual(1);
    });

    test("Reads valid JPG; populates frames w/o buffer", () => {
        const filename = path.resolve(__dirname, '../../_assets/joehall-logo.jpg');
        const parser = new JpgParser();
        const buffer = fs.readFileSync(filename);
        const base64 = buffer.toString("base64");
        const image = parser.ParseImageData(base64, filename);
        image.frames = [] as ImageFrame[];

        parser.PopulateFrames(image);

        expect(image.width).toEqual(256);
        expect(image.height).toEqual(256);
        expect(image.frames?.length).toEqual(1);
    });

    test("Cannot read invalid JPG", () => {
        const filename = path.resolve(__dirname, '../../_assets/joehall-logo-bad.jpg');
        const parser = new JpgParser();
        const buffer = fs.readFileSync(filename);
        const base64 = buffer.toString("base64");
        const image = parser.ParseImageData(base64, filename);

        expect(image.width).toEqual(undefined);
        expect(image.height).toEqual(undefined);
    });

    test("Cannot read invalid JPG or its frames", () => {
        const filename = path.resolve(__dirname, '../../_assets/joehall-logo-bad.jpg');
        const parser = new JpgParser();
        const buffer = fs.readFileSync(filename);
        const base64 = buffer.toString("base64");
        const image = parser.ParseImageData(base64, filename);
        image.src = base64;

        parser.PopulateFrames(image);

        expect(image.width).toEqual(undefined);
        expect(image.height).toEqual(undefined);
    });

    test("Handles parsing ImageItem.Empty", () => {
        const parser = new JpgParser();
        const image = ImageItem.Empty;

        parser.PopulateFrames(image);

        expect(image.width).toEqual(0);
        expect(image.height).toEqual(0);
        expect(image.frames?.length).toEqual(0);
    });

    test("Parses empty or missing src data", () => {
        const project = PackerTestHelper.makeProject(1);
        const parser = new JpgParser();

        let image: ImageItem = ImageItem.Empty;
        for (let key in project.images) {
            image = project.images[key];
            break;
        }

        expect(image).toBeDefined();

        image.src = undefined;
        parser.PopulateFrames(image);

        expect(image.width).toEqual(32);
        expect(image.height).toEqual(32);
    });

    // TODO: ensure ParserHelper's registry doesn't need priming
    test("Handles parsing ImageItem.Empty", () => {
        const parser1 = new JpgParser(); // TODO: kill this line
        const parser2 = ParserHelper.RegisteredParsers["JPG"];

        expect(parser2).toStrictEqual(parser1);
    });

});