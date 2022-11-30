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
        };
    });

    // beforeAll(() => {
    //     LogHelper.OutputModule = console;
    // });
    //
    // afterAll(() => {
    //     LogHelper.OutputModule = undefined;
    // });

    test("BasicPacker packs fewer sprites successfully", async () => {
        const options = new ProjectOptions();
        options.width = options.height = 1024;
        options.sortBy = "AREA_DESC";
        testOptions.spriteCount = 4;

        await PackerTestHelper.testPackerPacksFewerSpritesSuccessfully(new BasicPacker(), options, testOptions);
    });

    test("BasicPacker handles failure in OnInit()", async () => {
        const options = new ProjectOptions();
        options.width = options.height = 64;
        options.sizeMode = "Fixed Size";
        testOptions.spriteCount = 7;
        testOptions.expectedValidate = false;
        testOptions.expectedSuccess = false;
        testOptions.expectedCatchMsg = "Sprite packing aborted, OnPack.";

        await PackerTestHelper.testPackerHandlesOnInitFailure(new BasicPacker(), options, testOptions);
    });

    test("BasicPacker handles many sprites successfully", async () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 64;
        options.sortBy = "AREA_DESC";
        testOptions.spriteCount = 28;

        await PackerTestHelper.testPackerHandlesManySpritesSuccessfully(new BasicPacker(), options, testOptions);
    });

    test("BasicPacker packs many more sprites successfully", async () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 128;
        options.sortBy = "AREA_DESC";
        testOptions.spriteCount = 56;

        await PackerTestHelper.testPackerHandlesManyMoreSpritesSuccessfully(new BasicPacker(), options, testOptions);
    });

    test("BasicPacker fails to pack sprites", async () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 64;
        options.sortBy = "AREA_DESC";
        testOptions.spriteCount = 57;
        testOptions.expectedValidate = false;
        testOptions.expectedSuccess = false;
        testOptions.expectedCatchMsg = "Sprite packing aborted, OnPack.";

        await PackerTestHelper.testPackerFailsToPackSprites(new BasicPacker(), options, testOptions);
    });

    // exact fit of sprites to canvas 32x32  into 1024x32, no padding (no trim)
    test("BasicPacker packs sprites successfully without padding", async () => {
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

    // TODO: verify list of packers and parsers.
    // console.log(`ParserHelper.RegisteredParsers: ${Object.getOwnPropertyNames(ParserHelper.RegisteredParsers)}`);
    // console.log(`PackerHelper.RegisteredPackers: ${Object.getOwnPropertyNames(PackerHelper.RegisteredPackers)}`);

});

