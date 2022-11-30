import fs from 'fs';
import path from 'path';
import LogHelper from "../LogHelper";
import ImageFrame from "../../objs/ImageFrame";
import ImageItem from "../../objs/ImageItem";
import ParserHelper from "../ParserHelper";
import GifParser from "./GifParser";
import Project from "../../objs/Project";

describe( "GifParser", () => {

    beforeAll(() => LogHelper.OutputModule = console );
    afterAll(() => LogHelper.OutputModule = undefined );

    test("Reads valid GIF", () => {
        const filename = path.resolve(__dirname, '../../_assets/joehall-logo.gif');
        const parser = new GifParser();
        const buffer = fs.readFileSync(filename);
        const base64 = buffer.toString("base64");
        const image = parser.ParseImageData(base64, filename);

        expect(image.width).toEqual(256);
        expect(image.height).toEqual(256);
    });

    test("Reads valid GIF; populates frames w/ buffer", () => {
        const filename = path.resolve(__dirname, '../../_assets/joehall-logo.gif');
        const parser = new GifParser();
        const buffer = fs.readFileSync(filename);
        const base64 = buffer.toString("base64");
        const image = parser.ParseImageData(base64, filename);

        expect(image.width).toEqual(256);
        expect(image.height).toEqual(256);
        expect(image.frames?.length).toEqual(1);
    });

    test("Reads valid GIF; populates frames w/o buffer", () => {
        const filename = path.resolve(__dirname, '../../_assets/joehall-logo.gif');
        const parser = new GifParser();
        const buffer = fs.readFileSync(filename);
        const base64 = buffer.toString("base64");
        const image = parser.ParseImageData(base64, filename);
        image.frames = [] as ImageFrame[];

        parser.PopulateFrames(image);

        expect(image.width).toEqual(256);
        expect(image.height).toEqual(256);
        expect(image.frames?.length).toEqual(1);
    });

    test("Cannot read invalid GIF", () => {
        const filename = path.resolve(__dirname, '../../_assets/joehall-logo-bad.GIF');
        const parser = new GifParser();
        const buffer = fs.readFileSync(filename);
        const base64 = buffer.toString("base64");
        const image = parser.ParseImageData(base64, filename);

        expect(image.width).toEqual(undefined);
        expect(image.height).toEqual(undefined);
    });

    test("Cannot read invalid GIF or its frames", () => {
        const filename = path.resolve(__dirname, '../../_assets/joehall-logo-bad.GIF');
        const parser = new GifParser();
        const buffer = fs.readFileSync(filename);
        const base64 = buffer.toString("base64");
        const image = parser.ParseImageData(base64, filename);
        image.src = base64;

        parser.PopulateFrames(image);

        expect(image.width).toEqual(undefined);
        expect(image.height).toEqual(undefined);
    });

    test("Handles parsing ImageItem.Empty", () => {
        const parser = new GifParser();
        const image = ImageItem.Empty;

        parser.PopulateFrames(image);

        expect(image.width).toEqual(0);
        expect(image.height).toEqual(0);
        expect(image.frames?.length).toEqual(0);
    });

    // TODO: ensure ParserHelper's registry doesn't need priming
    test("Handles parsing ImageItem.Empty", () => {
        const parser1 = new GifParser(); // TODO: kill this line
        const parser2 = ParserHelper.RegisteredParsers["GIF"];

        expect(parser2).toStrictEqual(undefined);
    });

    test("Reads valid GIF; populates multiple frames w/ buffer", () => {
        const filename = path.resolve(__dirname, '../../_assets/mario-animated.gif');
        const parser = new GifParser();
        const buffer = fs.readFileSync(filename);
        const base64 = buffer.toString("base64");
        const project = new Project();

        project.options.animatedGif = "Extract Frames";
        const image = parser.ParseImageData(base64, filename, project);


        expect(image.width).toEqual(400);
        expect(image.height).toEqual(400);
        expect(image.frames?.length).toEqual(8);
    });

});