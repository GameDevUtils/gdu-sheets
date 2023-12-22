import Project from "../../objs/Project";
import ImageItem from "../../objs/ImageItem";
import BasicPacker from "./BasicPacker";
import ImageFrame from "../../objs/ImageFrame";
import Rectangle from "../../objs/Rectangle";
import BasePacker from "./BasePacker";
import LogHelper, {LogTo} from "../LogHelper";
import {createHash, Hash} from "crypto";
import PackerTestHelper, {TestOptions} from "./_PackerTestHelper";
import ProjectOptions from "../../objs/ProjectOptions";
import {SortByTypes, SpritePackerTypes} from "../Types";

describe("BasicPacker", () => {

    let testOptions: TestOptions;

    beforeAll(() => {
        // PackerTestHelper.InitParsers();
    });

    beforeEach(() => {
        testOptions = {
            spriteCount: 1,
            packerType: "Basic",
            defaultSortBy: "HEIGHT_DESC",
            expectedHeuristics: "BasicDefault",
            expectedSuccess: true,
            expectedValidate: true,
            expectedThenMsg: "Completed",
            expectedCatchMsg: "Failed",
            expectedWarnings: [],
        };
    });

    test("packs fewer sprites successfully", async () => {
        const options = new ProjectOptions();
        options.width = options.height = 1024;
        options.sortBy = "AREA_DESC";
        testOptions.spriteCount = 4;

        await PackerTestHelper.testPackerPacksFewerSpritesSuccessfully(new BasicPacker(), options, testOptions);
    });

    test("handles failure in OnInit()", async () => {
        const options = new ProjectOptions();
        options.width = options.height = 64;
        options.sizeMode = "Fixed Size";
        testOptions.spriteCount = 7;
        testOptions.expectedValidate = false;
        testOptions.expectedSuccess = false;
        testOptions.expectedCatchMsg = "Failed";

        await PackerTestHelper.testPackerHandlesOnInitFailure(new BasicPacker(), options, testOptions);
    });

    test("handles many sprites successfully", async () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 64;
        // TODO: should work with padding as well?
        options.innerPadding = options.borderPadding = options.shapePadding = 0
        options.sortBy = "AREA_DESC";
        testOptions.spriteCount = 28;

        await PackerTestHelper.testPackerHandlesManySpritesSuccessfully(new BasicPacker(), options, testOptions);
    });

    test("packs many more sprites successfully", async () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 128;
        options.innerPadding = options.borderPadding = options.shapePadding = 0
        options.sortBy = "AREA_DESC";
        testOptions.spriteCount = 64;

        await PackerTestHelper.testPackerHandlesManyMoreSpritesSuccessfully(new BasicPacker(), options, testOptions);
    });

    test("fails to pack sprites", async () => {
        const options = new ProjectOptions();
        options.width = 32;
        options.height = 32;
        options.sortBy = "AREA_DESC";
        testOptions.spriteCount = 2;
        testOptions.expectedValidate = false;
        testOptions.expectedSuccess = false;
        testOptions.expectedCatchMsg = "Failed";

        await PackerTestHelper.testPackerFailsToPackSprites(new BasicPacker(), options, testOptions);
    });

    // exact fit of sprites to canvas 32x32  into 1024x32, no padding (no trim)
    test("packs sprites successfully without padding", async () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 32;
        options.sortBy = "AREA_DESC";
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        testOptions.spriteCount = 32;
        testOptions.expectedValidate = true;
        testOptions.expectedSuccess = true;
        testOptions.expectedThenMsg = "Completed";

        await PackerTestHelper.testPackerPacksSpritesWithoutPadding(new BasicPacker(), options, testOptions);
    });



    // exact fit of sprites to canvas 32x32  into 1024x32, no padding (no trim)
    test("packs sprites successfully horizontally without padding", async () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 32; // TODO: higher power of two
        options.sortBy = "AREA_DESC";
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        testOptions.spriteCount = 32;
        testOptions.expectedValidate = true;
        testOptions.expectedSuccess = true;
        testOptions.expectedThenMsg = "Completed";

        await PackerTestHelper.testPackerPacksSpritesWithoutPadding(new BasicPacker(), options, testOptions);
    });

    // exact fit of sprites to canvas 32x32  into 32x1024, no padding (no trim)
    test("packs sprites successfully vertically without padding", () => {
        const options = new ProjectOptions();
        options.width = 32; // TODO: higher power of two
        options.height = 1024;
        options.sortBy = "AREA_DESC";
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        testOptions.spriteCount = 32;
        testOptions.expectedValidate = true;
        testOptions.expectedSuccess = true;
        testOptions.expectedThenMsg = "Completed";

        PackerTestHelper.testPackerPacksSpritesWithoutPadding(new BasicPacker(), options, testOptions);
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

        await PackerTestHelper.testPackerPacksSpritesWithoutPadding(new BasicPacker(), options, testOptions);
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

        PackerTestHelper.testPackerPacksSpritesWithoutPadding(new BasicPacker(), options, testOptions);
    });


    // TODO: verify list of packers and parsers.
    // console.log(`ParserHelper.RegisteredParsers: ${Object.getOwnPropertyNames(ParserHelper.RegisteredParsers)}`);
    // console.log(`PackerHelper.RegisteredPackers: ${Object.getOwnPropertyNames(PackerHelper.RegisteredPackers)}`);

});

