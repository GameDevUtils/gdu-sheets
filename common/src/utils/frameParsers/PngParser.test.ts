import fs from 'fs';
import path from 'path';
import LogHelper from "../LogHelper";
import ImageFrame from "../../objs/ImageFrame";
import ImageItem from "../../objs/ImageItem";
import ParserHelper from "../ParserHelper";
import PngParser from "./PngParser";

describe("PngParser", () => {

    beforeAll(() => LogHelper.OutputModule = console );
    afterAll(() => LogHelper.OutputModule = undefined );

    test("Reads valid PNG", () => {
        const filename = path.resolve(__dirname, '../../_assets/joehall-logo.png');
        const parser = new PngParser();
        const buffer = fs.readFileSync(filename);
        const base64 = buffer.toString("base64");
        const image = parser.ParseImageData(base64, filename);

        expect(image.width).toEqual(256);
        expect(image.height).toEqual(256);
    });

    test("Reads valid PNG; populates frames w/ buffer", () => {
        const filename = path.resolve(__dirname, '../../_assets/joehall-logo.png');
        const parser = new PngParser();
        const buffer = fs.readFileSync(filename);
        const base64 = buffer.toString("base64");
        const image = parser.ParseImageData(base64, filename);

        expect(image.width).toEqual(256);
        expect(image.height).toEqual(256);
        expect(image.frames?.length).toEqual(1);
    });

    test("Reads valid PNG; populates frames w/o buffer", () => {
        const filename = path.resolve(__dirname, '../../_assets/joehall-logo.png');
        const parser = new PngParser();
        const buffer = fs.readFileSync(filename);
        const base64 = buffer.toString("base64");
        const image = parser.ParseImageData(base64, filename);
        image.frames = [] as ImageFrame[];

        parser.PopulateFrames(image);

        expect(image.width).toEqual(256);
        expect(image.height).toEqual(256);
        expect(image.frames?.length).toEqual(1);
    });

    test("Cannot read invalid PNG", () => {
        const filename = path.resolve(__dirname, '../../_assets/joehall-logo-bad.png');
        const parser = new PngParser();
        const buffer = fs.readFileSync(filename);
        const base64 = buffer.toString("base64");
        const image = parser.ParseImageData(base64, filename);

        expect(image.width).toEqual(undefined);
        expect(image.height).toEqual(undefined);
    });

    test("Cannot read invalid PNG or its frames", () => {
        const filename = path.resolve(__dirname, '../../_assets/joehall-logo-bad.png');
        const parser = new PngParser();
        const buffer = fs.readFileSync(filename);
        const base64 = buffer.toString("base64");
        const image = parser.ParseImageData(base64, filename);
        image.src = base64;

        parser.PopulateFrames(image);

        expect(image.width).toEqual(undefined);
        expect(image.height).toEqual(undefined);
    });

    test("Handles parsing ImageItem.Empty", () => {
        const parser = new PngParser();
        const image = ImageItem.Empty;

        parser.PopulateFrames(image);

        expect(image.width).toEqual(0);
        expect(image.height).toEqual(0);
        expect(image.frames?.length).toEqual(0);
    });

    // TODO: ensure ParserHelper's registry doesn't need priming
    test("Handles parsing ImageItem.Empty", () => {
        const parser1 = new PngParser(); // TODO: kill this line
        const parser2 = ParserHelper.RegisteredParsers["PNG"];

        expect(parser2).toStrictEqual(parser1);
    });

});