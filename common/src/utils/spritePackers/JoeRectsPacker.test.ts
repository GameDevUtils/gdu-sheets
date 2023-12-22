import Project from "../../objs/Project";
import ImageItem from "../../objs/ImageItem";
import ImageFrame from "../../objs/ImageFrame";
import Rectangle from "../../objs/Rectangle";
import BasePacker from "./BasePacker";
import LogHelper, {LogTo} from "../LogHelper";
import {createHash, Hash} from "crypto";
import PackerTestHelper, {TestOptions} from "./_PackerTestHelper";
import ProjectOptions from "../../objs/ProjectOptions";
import {AllHeuristics, JoeRectsPackerHeuristics, joeRectsPackerHeuristics, sortByTypes, SortByTypes, SpritePackerTypes} from "../Types";
import JoeRectsPacker from "./JoeRectsPacker";

describe("JoeRectsPacker", () => {

    let testOptions: TestOptions;

    beforeAll(() => {
        // PackerTestHelper.InitParsers();
    });

    beforeEach(() => {
        testOptions = {
            spriteCount: 1,
            packerType: "JoeRects",
            defaultSortBy: "AREA_DESC",
            expectedHeuristics: "BestArea",
            expectedSuccess: true,
            expectedValidate: true,
            expectedThenMsg: "Completed",
            expectedCatchMsg: "Failed",
            expectedWarnings: [],
        };
    });

    // beforeAll(() => {
    //     LogHelper.OutputModule = console;
    // });
    //
    // afterAll(() => {
    //     LogHelper.OutputModule = undefined;
    // });

    test.skip("packs fewer sprites successfully", () => {
        const options = new ProjectOptions();
        options.width = options.height = 1024;
        options.sortBy = "AREA_DESC";
        testOptions.spriteCount = 4;

        PackerTestHelper.testPackerPacksFewerSpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    });

    test("handles failure in OnInit()", () => {
        const options = new ProjectOptions();
        options.width = options.height = 64;
        options.sizeMode = "Fixed Size";
        testOptions.spriteCount = 7;
        testOptions.expectedValidate = false;
        testOptions.expectedSuccess = false;
        testOptions.expectedCatchMsg = "Failed";

        PackerTestHelper.testPackerHandlesOnInitFailure(new JoeRectsPacker(), options, testOptions);
    });

    test.skip("handles many sprites successfully", () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 64;
        options.sortBy = "AREA_DESC";
        testOptions.spriteCount = 28;

        PackerTestHelper.testPackerHandlesManySpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    });

    test("packs many more sprites successfully", () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 64;
        options.sortBy = "AREA_DESC";
        options.innerPadding = options.borderPadding = options.shapePadding = 0;
        testOptions.spriteCount = 64;

        PackerTestHelper.testPackerHandlesManyMoreSpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    });

    test("fails to pack sprites", () => {
        const options = new ProjectOptions();
        options.width = 32;
        options.height = 32;
        options.sortBy = "AREA_DESC";
        testOptions.spriteCount = 2;
        testOptions.expectedValidate = false;
        testOptions.expectedSuccess = false;
        testOptions.expectedCatchMsg = "Failed";

        PackerTestHelper.testPackerFailsToPackSprites(new JoeRectsPacker(), options, testOptions);
    });

    // exact fit of sprites to canvas 32x32  into 1024x32, no padding (no trim)
    test("packs sprites successfully horizontally without padding", () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 32; // TODO: higher power of two
        options.sortBy = "AREA_DESC";
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        testOptions.spriteCount = 32;
        testOptions.expectedValidate = true;
        testOptions.expectedSuccess = true;
        testOptions.expectedThenMsg = "Completed";

        PackerTestHelper.testPackerPacksSpritesWithoutPadding(new JoeRectsPacker(), options, testOptions);
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

        PackerTestHelper.testPackerPacksSpritesWithoutPadding(new JoeRectsPacker(), options, testOptions);
    });

    // exact fit of sprites to canvas 32x32  into 1024x64, no padding (no trim)
    test("packs sprites successfully horizontally without padding, 1024x64", () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 64;
        options.sortBy = "AREA_DESC";
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        testOptions.spriteCount = 64;
        testOptions.expectedValidate = true;
        testOptions.expectedSuccess = true;
        testOptions.expectedThenMsg = "Completed";

        PackerTestHelper.testPackerPacksSpritesWithoutPadding(new JoeRectsPacker(), options, testOptions);
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

        PackerTestHelper.testPackerPacksSpritesWithoutPadding(new JoeRectsPacker(), options, testOptions);
    });

    // exact fit of sprites to canvas 32x32  into 1024x32, no padding (no trim)
    test("packs sprites successfully without padding, all JoeRectsPackerHeuristics", () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 32;
        options.sortBy = "AREA_DESC";
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        testOptions.spriteCount = 32;
        testOptions.expectedValidate = true;
        testOptions.expectedSuccess = true;
        testOptions.expectedThenMsg = "Completed";

        for (let heuristic in joeRectsPackerHeuristics) {
            options.packerHeuristics = heuristic as JoeRectsPackerHeuristics;
            PackerTestHelper.testPackerPacksSpritesWithoutPaddingAllHeuristics(new JoeRectsPacker(), options, testOptions);
        }

        // TODO: skip these until implemented, unless you like failing tests
        const unimplementedSorts = [
            "LONGER_SIDE",
            "LONGER_SIDE_DESC",
            "SHORTER_SIDE",
            "SHORTER_SIDE_DESC",
        ];

        options.packerHeuristics = "InferFromSort";
        for (let sortBy of sortByTypes) {
            options.sortBy = sortBy;
            if (unimplementedSorts.indexOf(sortBy) >= 0) { continue; }
            PackerTestHelper.testPackerPacksSpritesWithoutPaddingAllHeuristics(new JoeRectsPacker(), options, testOptions);
        }
    });

    // exact fit of sprites to canvas 32x32  into 1024x32, no padding (no trim)
    test("fails to pack empty sprites", () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 32;
        options.sortBy = "AREA_DESC";
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        testOptions.spriteCount = 32;
        testOptions.expectedValidate = false;
        testOptions.expectedSuccess = false;
        testOptions.expectedThenMsg = "Failed";

        PackerTestHelper.testPackerPacksSpritesWithoutPaddingHavingAnEmptySprite(new JoeRectsPacker(), options, testOptions);
    });

    // give the algorithms room to play
    test("packs sprites with plenty of room to grow", () => {
        const options = new ProjectOptions();
        options.width = 2048;
        options.height = 2048;
        options.sortBy = "AREA_DESC";
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        testOptions.spriteCount = 32;
        testOptions.expectedValidate = true;
        testOptions.expectedSuccess = true;
        testOptions.expectedThenMsg = "Completed";

        PackerTestHelper.testPackerHandlesManySpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    });




    test("packs fewer sprites successfully, with allowRotate", () => {
        const options = new ProjectOptions();
        options.width = options.height = 1024;
        options.sortBy = "AREA_DESC";
        options.allowRotate = "Yes";
        testOptions.spriteCount = 4;

        PackerTestHelper.testPackerPacksFewerSpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    });

    test.skip("packs fewer sprites successfully, with undefined sortBy value", () => {
        const options = new ProjectOptions();
        options.width = options.height = 1024;
        options.sortBy = undefined;
        options.allowRotate = "Yes";
        testOptions.spriteCount = 4;
        testOptions.expectedHeuristics = "BestArea";

        PackerTestHelper.testPackerPacksFewerSpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    });

    test.skip("packs fewer sprites successfully, with SHORTER_SIDE sortBy value", () => {
        const options = new ProjectOptions();
        options.width = options.height = 1024;
        options.sortBy = "SHORTER_SIDE";
        options.allowRotate = "No"; // "Yes";
        testOptions.spriteCount = 4;
        testOptions.expectedHeuristics = "BestShortSide";

        PackerTestHelper.testPackerPacksFewerSpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    });

    test.skip("packs fewer sprites successfully, with LONGER_SIDE_DESC sortBy value", () => {
        const options = new ProjectOptions();
        options.width = options.height = 1024;
        options.sortBy = "LONGER_SIDE_DESC";
        options.allowRotate = "Yes";
        testOptions.spriteCount = 4;
        testOptions.expectedHeuristics = "BestShortSide";

        PackerTestHelper.testPackerPacksFewerSpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    });

    test.skip("packs fewer sprites successfully, with LONGER_SIDE sortBy value", () => {
        const options = new ProjectOptions();
        options.width = options.height = 1024;
        options.sortBy = "LONGER_SIDE";
        options.allowRotate = "Yes";
        testOptions.spriteCount = 4;
        testOptions.expectedHeuristics = "BestLongSide";

        PackerTestHelper.testPackerPacksFewerSpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    });

    test.skip("packs fewer sprites successfully, with SHORTER_SIDE_DESC sortBy value", () => {
        const options = new ProjectOptions();
        options.width = options.height = 1024;
        options.sortBy = "SHORTER_SIDE_DESC";
        options.allowRotate = "Yes";
        testOptions.spriteCount = 4;
        testOptions.expectedHeuristics = "BestLongSide";

        PackerTestHelper.testPackerPacksFewerSpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    });

    test.skip("packs fewer sprites successfully, with undefined packerHeurtistics value", () => {
        const options = new ProjectOptions();
        options.width = options.height = 1024;
        // options.sortBy = undefined;
        options.sortBy = "AREA_DESC";
        options.packerHeuristics = "InferFromSort";
        options.allowRotate = "Yes";
        testOptions.spriteCount = 4;
        testOptions.expectedHeuristics = "BestArea";

        PackerTestHelper.testPackerPacksFewerSpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    });

    


    test.skip("packs fewer sprites successfully, with BottomLeftRule packerHeurtistics value", () => {
        const options = new ProjectOptions();
        options.width = options.height = 1024;
        options.packerHeuristics = "BottomLeftRule";
        options.sortBy = undefined;
        options.allowRotate = "Yes";
        testOptions.spriteCount = 4;
        testOptions.expectedHeuristics = "BottomLeftRule";

        PackerTestHelper.testPackerPacksFewerSpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    });

    test.skip("packs fewer sprites successfully, with ContactPointRule packerHeurtistics value", () => {
        const options = new ProjectOptions();
        options.width = options.height = 1024;
        options.sortBy = "AREA_DESC";
        options.allowRotate = "Yes";
        testOptions.spriteCount = 4;

        options.packerHeuristics = "ContactPointRule";
        options.sortBy = undefined;
        testOptions.expectedHeuristics = "ContactPointRule";
        PackerTestHelper.testPackerPacksFewerSpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    });

    test.skip("packs fewer sprites successfully, with undefined packerHeurtistics and sortBy values", () => {
        const options = new ProjectOptions();
        options.width = options.height = 1024;
        options.allowRotate = "Yes";
        testOptions.spriteCount = 4;

        // options.sortBy = "AREA_DESC";
        // options.packerHeuristics = "ContactPointRule";
        options.sortBy = undefined;
        // force undefined heuristics
        options.packerHeuristics = undefined as any as AllHeuristics;

        // let optionsAsAny = options as any;
        // optionsAsAny.packerHeuristics = undefined;
        PackerTestHelper.testPackerPacksFewerSpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    });

    // TODO: verify list of packers and parsers.
    // console.log(`ParserHelper.RegisteredParsers: ${Object.getOwnPropertyNames(ParserHelper.RegisteredParsers)}`);
    // console.log(`PackerHelper.RegisteredPackers: ${Object.getOwnPropertyNames(PackerHelper.RegisteredPackers)}`);

    
});

