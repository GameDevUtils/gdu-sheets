import fs from 'fs';
import path from 'path';

import Project from "../../objs/Project";
// import ImageItem from "../../objs/ImageItem";
// import ImageFrame from "../../objs/ImageFrame";
import Rectangle from "../../objs/Rectangle";
import {createHash, Hash} from "crypto";
import BasePacker from "./BasePacker";
// import BasicPacker from "./BasicPacker";
import ProjectOptions from "../../objs/ProjectOptions";
import {SortByTypes, SpritePackerTypes} from "../Types";
import BmpParser from "../frameParsers/BmpParser";
// import BaseParser from "../frameParsers/BaseParser";
import ParserHelper from "../ParserHelper";
import GifParser from "../frameParsers/GifParser";
import PngParser from "../frameParsers/PngParser";
import JpgParser from "../frameParsers/JpgParser";
import BaseParser from "../frameParsers/BaseParser";

export type TestOptions = {
    spriteCount: number,
    packerType: SpritePackerTypes,
    defaultSortBy: SortByTypes,
    expectedHeuristics: string,
    expectedSuccess: boolean,
    expectedValidate: boolean,
    expectedThenMsg: string,
    expectedCatchMsg: string,
    expectedWarnings: string[] | undefined,
};

export default class PackerTestHelper {

    // static IMAGE_DATA: string[] = [];

    static LoadImageData(filepath: string): string {
        try {
            const filename = path.resolve(__dirname, filepath);
            const buffer = fs.readFileSync(filename);
            const base64 = buffer.toString("base64");
            return `data:image/${filepath.slice(-3)};base64,${base64}`;
        } catch (ex) {
            console.error(`ex: ${JSON.stringify(ex, null, 2)}`);
        }
        return '';
    }

    static {
    }

    static makeImageItemName(index: number) : string {
        const HashSHA256: Hash = createHash('sha256');
        return 'img' + HashSHA256.update(index.toString(10)).digest('hex');
    };

    static makeProject(spriteCount: number): Project {
        const project = new Project();
        // PackerTestHelper.InitParsers();

        ParserHelper.RegisterParser(new BmpParser());
        ParserHelper.RegisterParser(new GifParser());
        ParserHelper.RegisterParser(new PngParser());
        ParserHelper.RegisterParser(new JpgParser());
        const imageSrc: string[] = [];
        imageSrc.push(PackerTestHelper.LoadImageData('../../_assets/circle-32x32.png'));
        imageSrc.push(PackerTestHelper.LoadImageData('../../_assets/circle-32x32.gif'));
        imageSrc.push(PackerTestHelper.LoadImageData('../../_assets/circle-32x32.jpg'));
        imageSrc.push(PackerTestHelper.LoadImageData('../../_assets/circle-32x32.bmp'));

        for (let i = 0; i < spriteCount; i++) {
            const src = imageSrc[i % imageSrc.length];
// console.log(`src.length: ${src?.length}`);
            const ext = src.slice(11, 14);

            const name = PackerTestHelper.makeImageItemName(i);
            const image = ParserHelper.RegisteredParsers[ext.toUpperCase()].ParseImageData(src, `./${name}.${ext}`);

            project.images[name] = image;
        }

        // make sure there weren't any images[name] collisions
        expect(Object.getOwnPropertyNames(project.images).length).toEqual(spriteCount);

        return project;
    };

    static testPackerDetectBadConfig(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : void {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);
        project.options = projectOptions;

        expect(packer.DoPack(project)).toEqual(testOptions.expectedThenMsg);
        expect(packer.GetPackerType()).toEqual(testOptions.packerType);
        expect(packer.GetDefaultSortBy()).toEqual(testOptions.defaultSortBy);
        expect(packer.GetHeuristic(project)).toEqual(testOptions.expectedHeuristics);
        expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
        expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
    };

    static testPackerWithMissingImageFramesFails(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : void {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);
        project.options = projectOptions;

        // clear frames to trigger error path in BasicPacker
        const imageTypes = ["png", "gif", "jpg", "bmp"];
        let index = 0;
        for (let key in project.images) {
            project.images[key].frames = [];
            project.images[key].filetype = imageTypes[index % imageTypes.length];
            index++;
        }

        // expect(packer.DoPack(project)).toEqual(testOptions.expectedThenMsg);
        expect(packer.DoPack(project)).toEqual(testOptions.expectedCatchMsg);
        expect(packer.GetPackerType()).toEqual(testOptions.packerType);
        expect(packer.GetDefaultSortBy()).toEqual(testOptions.defaultSortBy);
        expect(packer.GetHeuristic(project)).toEqual(testOptions.expectedHeuristics);
        expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
        expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
    };

    static testPackerWithMissingImageFramesSucceeds(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : void {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);
        project.options = projectOptions;

        // clear frames to trigger error path in BasicPacker
        const imageTypes = ["png", "gif", "jpg", "bmp"];
        let index = 0;
        for (let key in project.images) {
            project.images[key].frames = [];
            project.images[key].filetype = imageTypes[index % imageTypes.length];
            index++;
        }

        expect(packer.DoPack(project)).toEqual(testOptions.expectedThenMsg);
        // expect(packer.DoPack(project)).toEqual(testOptions.expectedCatchMsg);
        expect(packer.GetPackerType()).toEqual(testOptions.packerType);
        expect(packer.GetDefaultSortBy()).toEqual(testOptions.defaultSortBy);
        expect(packer.GetHeuristic(project)).toEqual(testOptions.expectedHeuristics);
        expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
        expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
    };

    static testPackerPacksSpritesSuccessfully(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : void {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);
        project.options = projectOptions;

        expect(packer.DoPack(project)).toEqual(testOptions.expectedThenMsg);
        expect(packer.GetPackerType()).toEqual(testOptions.packerType);
        expect(packer.GetDefaultSortBy()).toEqual(testOptions.defaultSortBy);
        expect(packer.GetHeuristic(project)).toEqual(testOptions.expectedHeuristics);
// console.log(JSON.stringify(packer, null, 2));
        expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
        expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
    };

    static testPackerFailsToPackSprites(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : void {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);
        project.options = projectOptions;

        expect(packer.DoPack(project)).toEqual(testOptions.expectedCatchMsg);
console.log("testPackerFailsToPackSprites(): ", JSON.stringify(project, null, 2));
// console.log(JSON.stringify(packer, null, 2));
        expect(packer.GetPackerType()).toEqual(testOptions.packerType);
        expect(packer.GetDefaultSortBy()).toEqual(testOptions.defaultSortBy);
        expect(packer.GetHeuristic(project)).toEqual(testOptions.expectedHeuristics);
        expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
        expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
    };

    // TODO: Needed? See previous method
    static testPackerPacksFewerSpritesSuccessfully(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : void {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);
        project.options = projectOptions;

        expect(packer.DoPack(project)).toEqual(testOptions.expectedThenMsg);
        expect(packer.GetPackerType()).toEqual(testOptions.packerType);
        expect(packer.GetDefaultSortBy()).toEqual(testOptions.defaultSortBy);
        expect(packer.GetHeuristic(project)).toEqual(testOptions.expectedHeuristics);
console.log(JSON.stringify(packer, null, 2));
        expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
        expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
    };

    static testPackerHandlesOnInitFailure(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : void {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);
        project.options = projectOptions;

        expect(packer.DoPack(project)).toEqual(testOptions.expectedCatchMsg);
        // TODO: fix bug, Validate should fail on failed pack
        expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
        // TODO: fix bug, BasePacker should populate pack_success on fail
        expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
    };

    static testPackerHandlesManySpritesSuccessfully(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : void {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);
        project.options = projectOptions;

        expect(packer.DoPack(project)).toEqual(testOptions.expectedThenMsg);
        expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
        expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
    };

    static testPackerHandlesManyMoreSpritesSuccessfully(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : void {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);
        project.options = projectOptions;

        expect(packer.DoPack(project)).toEqual(testOptions.expectedThenMsg);
        expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
        expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
    };

    // static async testPackerFailsToPackSprites(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : Promise<void> {
    //     const project = PackerTestHelper.makeProject(testOptions.spriteCount);
    //     project.options = projectOptions;

    //     return await packer.DoPack(project)
    //         .then((res) => {
    //             // expect(res).toEqual(testOptions.expectedThenMsg);
    //         }).catch((msg) => {
    //             expect(msg).toEqual(testOptions.expectedCatchMsg);
    //         })
    //         .finally(() => {
    //             expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
    //             expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
    //         });
    // };

    static testPackerPacksSpritesWithoutPadding(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : void {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);
        project.options = projectOptions;

        expect(packer.DoPack(project)).toEqual(testOptions.expectedThenMsg);
        expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
        expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
    };

    static testPackerPacksSpritesWithoutPaddingAllHeuristics(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : void {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);
        project.options = projectOptions;

        expect(packer.DoPack(project)).toEqual(testOptions.expectedThenMsg);
        expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
        expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
    };

    static testPackerPacksSpritesWithoutPaddingHavingAnEmptySprite(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : void {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);

        // make first image frame an empty rectangle
        const images = project?.images;
        for (const key in images) {
            const image = images[key];
            if (image && image.frames && image.frames.length) {
                image.frames[0].spriteRect = Rectangle.Empty;
            }
        }

        project.options = projectOptions;
        expect(packer.DoPack(project)).toEqual(testOptions.expectedThenMsg);
        expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
        expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
    };

}