import Project from "../../objs/Project";
import ImageItem from "../../objs/ImageItem";
import ImageFrame from "../../objs/ImageFrame";
import Rectangle from "../../objs/Rectangle";
import BasePacker from "./BasePacker";
import LogHelper, {LogTo} from "../LogHelper";
import {createHash, Hash} from "crypto";
import PackerTestHelper, {TestOptions} from "./_PackerTestHelper";
import ProjectOptions from "../../objs/ProjectOptions";
import {ShelfPackerHeuristics, shelfPackerHeuristics, sortByTypes, SortByTypes, SpritePackerTypes} from "../Types";
import ShelfPacker from "./ShelfPacker";
import { option } from "yargs";

describe("ShelfPacker", () => {

    let testOptions: TestOptions;

    beforeAll(() => {
        // PackerTestHelper.InitParsers();
    });

    beforeEach(() => {
        testOptions = {
            spriteCount: 1,
            packerType: "Shelf",
            defaultSortBy: "HEIGHT_DESC",
            expectedHeuristics: "BestArea",
            expectedSuccess: true,
            expectedValidate: true,
            expectedThenMsg: "Completed",
            expectedCatchMsg: "Failed",
            expectedWarnings: [],
        };
    });

    beforeAll(() => {
        LogHelper.OutputModule = console;
    });
    
    afterAll(() => {
        LogHelper.OutputModule = undefined;
    });

    test("packs one sprite successfully", async () => {
        const options = new ProjectOptions();
        options.width = options.height = 32;
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        options.sortBy = "HEIGHT_DESC";
        options.packerHeuristics = "InferFromSort"; // "BestHeight";
        testOptions.spriteCount = 1;
        testOptions.expectedHeuristics = "BestHeight";

        await PackerTestHelper.testPackerPacksSpritesSuccessfully(new ShelfPacker(), options, testOptions);
    });

    test("fails to pack two sprites", async () => {
        const options = new ProjectOptions();
        options.width = options.height = 32;
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        options.sortBy = "HEIGHT_DESC";
        options.packerHeuristics = "InferFromSort"; // "BestHeight";
        testOptions.expectedCatchMsg = "Failed";
        testOptions.expectedValidate = false;
        testOptions.expectedSuccess = false;
        testOptions.spriteCount = 2;
        testOptions.expectedHeuristics = "BestHeight";

        await PackerTestHelper.testPackerFailsToPackSprites(new ShelfPacker(), options, testOptions);
    });

    test("packs two sprites successfully, horizontally", async () => {
        const options = new ProjectOptions();
        options.width = 64;
        options.height = 32;
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        options.sortBy = "HEIGHT_DESC";
        options.packerHeuristics = "InferFromSort"; // "BestHeight";
        testOptions.spriteCount = 2;
        testOptions.expectedHeuristics = "BestHeight";

        await PackerTestHelper.testPackerPacksSpritesSuccessfully(new ShelfPacker(), options, testOptions);
    });

    test("packs two sprites successfully, vertically", async () => {
        const options = new ProjectOptions();
        options.width = 32;
        options.height = 64;
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        options.sortBy = "HEIGHT_DESC";
        options.packerHeuristics = "InferFromSort"; // "BestHeight";
        testOptions.spriteCount = 2;
        testOptions.expectedHeuristics = "BestHeight";

        await PackerTestHelper.testPackerPacksSpritesSuccessfully(new ShelfPacker(), options, testOptions);
    });







    test("packs 32 sprites successfully, horizontally, Fixed Size", async () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 32;
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        options.sortBy = "HEIGHT_DESC";
        options.packerHeuristics = "InferFromSort"; // "BestHeight";
        options.sizeMode = "Fixed Size";
        testOptions.spriteCount = 32;
        testOptions.expectedHeuristics = "BestHeight";

        await PackerTestHelper.testPackerPacksSpritesSuccessfully(new ShelfPacker(), options, testOptions);
    });

    test("packs 32 sprites successfully, vertically, Fixed Size", async () => {
        const options = new ProjectOptions();
        options.width = 32;
        options.height = 1024;
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        options.sortBy = "HEIGHT_DESC";
        options.packerHeuristics = "InferFromSort"; // "BestHeight";
        options.sizeMode = "Fixed Size";
        testOptions.spriteCount = 32;
        testOptions.expectedHeuristics = "BestHeight";

        await PackerTestHelper.testPackerPacksSpritesSuccessfully(new ShelfPacker(), options, testOptions);
    });

    test("packs 32 sprites successfully, horizontally, Max Size", async () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 32;
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        options.sortBy = "HEIGHT_DESC";
        options.packerHeuristics = "InferFromSort"; // "BestHeight";
        options.sizeMode = "Max Size";
        testOptions.spriteCount = 32;
        testOptions.expectedHeuristics = "BestHeight";

        await PackerTestHelper.testPackerPacksSpritesSuccessfully(new ShelfPacker(), options, testOptions);
    });

    test("packs 32 sprites successfully, vertically, Max Size", async () => {
        const options = new ProjectOptions();
        options.width = 32;
        options.height = 1024;
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        options.sortBy = "HEIGHT_DESC";
        options.packerHeuristics = "InferFromSort"; // "BestHeight";
        options.sizeMode = "Max Size";
        testOptions.spriteCount = 32;
        testOptions.expectedHeuristics = "BestHeight";

        await PackerTestHelper.testPackerPacksSpritesSuccessfully(new ShelfPacker(), options, testOptions);
    });


    // exact fit of sprites to canvas 32x32  into 1024x64, no padding (no trim)
    test("packs sprites successfully horizontally without padding, 1024x64", async () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 64;
        options.sortBy = "AREA_DESC";
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        testOptions.spriteCount = 64;
        testOptions.expectedValidate = true;
        testOptions.expectedSuccess = true;
        testOptions.expectedThenMsg = "Completed";

        await PackerTestHelper.testPackerPacksSpritesWithoutPadding(new ShelfPacker(), options, testOptions);
    });

    // exact fit of sprites to canvas 32x32  into 64x1024, no padding (no trim)
    test("packs sprites successfully vertically without padding, 64x1024", () => {
        const options = new ProjectOptions();
        options.width = 64;
        options.height = 1024;
        options.sortBy = "AREA_DESC";
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        testOptions.spriteCount = 64;
        testOptions.expectedValidate = true;
        testOptions.expectedSuccess = true;
        testOptions.expectedThenMsg = "Completed";

        PackerTestHelper.testPackerPacksSpritesWithoutPadding(new ShelfPacker(), options, testOptions);
    });



    // test("handles failure in OnInit()", async () => {
    //     const options = new ProjectOptions();
    //     options.width = options.height = 64;
    //     options.sizeMode = "Fixed Size";
    //     testOptions.spriteCount = 7;
    //     testOptions.expectedValidate = false;
    //     testOptions.expectedSuccess = false;
    //     testOptions.expectedCatchMsg = "Failed";

    //     await PackerTestHelper.testPackerHandlesOnInitFailure(new JoeRectsPacker(), options, testOptions);
    // });

    // test("handles many sprites successfully", async () => {
    //     const options = new ProjectOptions();
    //     options.width = 1024;
    //     options.height = 64;
    //     options.sortBy = "AREA_DESC";
    //     testOptions.spriteCount = 28;

    //     await PackerTestHelper.testPackerHandlesManySpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    // });

    // test("packs many more sprites successfully", async () => {
    //     const options = new ProjectOptions();
    //     options.width = 1024;
    //     options.height = 64;
    //     options.sortBy = "AREA_DESC";
    //     options.innerPadding = options.borderPadding = options.shapePadding = 0;
    //     testOptions.spriteCount = 64;

    //     await PackerTestHelper.testPackerHandlesManyMoreSpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    // });

    // test("fails to pack sprites", async () => {
    //     const options = new ProjectOptions();
    //     options.width = 32;
    //     options.height = 32;
    //     options.sortBy = "AREA_DESC";
    //     testOptions.spriteCount = 2;
    //     testOptions.expectedValidate = false;
    //     testOptions.expectedSuccess = false;
    //     testOptions.expectedCatchMsg = "Failed";

    //     await PackerTestHelper.testPackerFailsToPackSprites(new JoeRectsPacker(), options, testOptions);
    // });

    // // exact fit of sprites to canvas 32x32  into 1024x32, no padding (no trim)
    // test("packs sprites successfully horizontally without padding", async () => {
    //     const options = new ProjectOptions();
    //     options.width = 1024;
    //     options.height = 32;
    //     options.sortBy = "AREA_DESC";
    //     options.innerPadding = options.shapePadding = options.borderPadding = 0;
    //     testOptions.spriteCount = 32;
    //     testOptions.expectedValidate = true;
    //     testOptions.expectedSuccess = true;
    //     testOptions.expectedThenMsg = "Completed";

    //     await PackerTestHelper.testPackerPacksSpritesWithoutPadding(new JoeRectsPacker(), options, testOptions);
    // });

    // // TODO: exact fit of sprites to canvas 32x32  into 32x1024, no padding (no trim)
    // test("packs sprites successfully vertically without padding", () => {
    //     const options = new ProjectOptions();
    //     options.width = 128; // TODO: 32
    //     options.height = 1024;
    //     options.sortBy = "AREA_DESC";
    //     options.innerPadding = options.shapePadding = options.borderPadding = 0;
    //     testOptions.spriteCount = 32;
    //     testOptions.expectedValidate = true;
    //     testOptions.expectedSuccess = true;
    //     testOptions.expectedThenMsg = "Completed";

    //     PackerTestHelper.testPackerPacksSpritesWithoutPadding(new JoeRectsPacker(), options, testOptions).then(() => { });
    // });

    // // exact fit of sprites to canvas 32x32  into 1024x32, no padding (no trim)
    // test("packs sprites successfully without padding, all JoeRectsPackerHeuristics", async () => {
    //     const options = new ProjectOptions();
    //     options.width = 1024;
    //     options.height = 32;
    //     options.sortBy = "AREA_DESC";
    //     options.innerPadding = options.shapePadding = options.borderPadding = 0;
    //     testOptions.spriteCount = 32;
    //     testOptions.expectedValidate = true;
    //     testOptions.expectedSuccess = true;
    //     testOptions.expectedThenMsg = "Completed";

    //     for (let heuristic in joeRectsPackerHeuristics) {
    //         options.packerHeuristics = heuristic as JoeRectsPackerHeuristics;
    //         await PackerTestHelper.testPackerPacksSpritesWithoutPaddingAllHeuristics(new JoeRectsPacker(), options, testOptions);
    //     }

    //     // TODO: skip these until implemented, unless you like failing tests
    //     const unimplementedSorts = [
    //         "LONGER_SIDE",
    //         "LONGER_SIDE_DESC",
    //         "SHORTER_SIDE",
    //         "SHORTER_SIDE_DESC",
    //     ];

    //     options.packerHeuristics = "InferFromSort";
    //     for (let sortBy of sortByTypes) {
    //         options.sortBy = sortBy;
    //         if (unimplementedSorts.indexOf(sortBy) >= 0) { continue; }
    //         await PackerTestHelper.testPackerPacksSpritesWithoutPaddingAllHeuristics(new JoeRectsPacker(), options, testOptions);
    //     }
    // });

    // // exact fit of sprites to canvas 32x32  into 1024x32, no padding (no trim)
    // test("fails to pack empty sprites", async () => {
    //     const options = new ProjectOptions();
    //     options.width = 1024;
    //     options.height = 32;
    //     options.sortBy = "AREA_DESC";
    //     options.innerPadding = options.shapePadding = options.borderPadding = 0;
    //     testOptions.spriteCount = 32;
    //     testOptions.expectedValidate = false;
    //     testOptions.expectedSuccess = true; // technically packed, but will fail validation
    //     testOptions.expectedThenMsg = "Completed";

    //     await PackerTestHelper.testPackerPacksSpritesWithoutPaddingHavingAnEmptySprite(new JoeRectsPacker(), options, testOptions);
    // });

    // // give the algorithms room to play
    // test("packs sprites with plenty of room to grow", () => {
    //     const options = new ProjectOptions();
    //     options.width = 2048;
    //     options.height = 2048;
    //     options.sortBy = "AREA_DESC";
    //     options.innerPadding = options.shapePadding = options.borderPadding = 0;
    //     testOptions.spriteCount = 32;
    //     testOptions.expectedValidate = true;
    //     testOptions.expectedSuccess = true;
    //     testOptions.expectedThenMsg = "Completed";

    //     PackerTestHelper.testPackerHandlesManySpritesSuccessfully(new JoeRectsPacker(), options, testOptions).then(() => { });
    // });

    // TODO: verify list of packers and parsers.
    // console.log(`ParserHelper.RegisteredParsers: ${Object.getOwnPropertyNames(ParserHelper.RegisteredParsers)}`);
    // console.log(`PackerHelper.RegisteredPackers: ${Object.getOwnPropertyNames(PackerHelper.RegisteredPackers)}`);

});

