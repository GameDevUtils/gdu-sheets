import Project from "../../objs/Project";
import ImageItem from "../../objs/ImageItem";
import ImageFrame from "../../objs/ImageFrame";
import Rectangle from "../../objs/Rectangle";
import BasePacker from "./BasePacker";
import LogHelper, {LogTo} from "../LogHelper";
import {createHash, Hash} from "crypto";
import PackerTestHelper, {TestOptions} from "./_PackerTestHelper";
import ProjectOptions from "../../objs/ProjectOptions";
import {SortByTypes, SpritePackerTypes} from "../Types";
import JoeRectsPacker from "./JoeRectsPacker";

describe("JoeRectsPacker", () => {

    let testOptions: TestOptions;

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
        };
    });

    // beforeAll(() => {
    //     LogHelper.OutputModule = console;
    // });
    //
    // afterAll(() => {
    //     LogHelper.OutputModule = undefined;
    // });

    test("JoeRectsPacker packs fewer sprites successfully", async () => {
        const options = new ProjectOptions();
        options.width = options.height = 1024;
        options.sortBy = "AREA_DESC";
        testOptions.spriteCount = 4;

        await PackerTestHelper.testPackerPacksFewerSpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    });

    test("JoeRectsPacker handles failure in OnInit()", async () => {
        const options = new ProjectOptions();
        options.width = options.height = 64;
        options.sizeMode = "Fixed Size";
        testOptions.spriteCount = 7;
        testOptions.expectedValidate = false;
        testOptions.expectedSuccess = false;
        testOptions.expectedCatchMsg = "Sprite packing aborted, OnPack.";

        await PackerTestHelper.testPackerHandlesOnInitFailure(new JoeRectsPacker(), options, testOptions);
    });

    test("JoeRectsPacker handles many sprites successfully", async () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 64;
        options.sortBy = "AREA_DESC";
        testOptions.spriteCount = 28;

        await PackerTestHelper.testPackerHandlesManySpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    });

    test("JoeRectsPacker packs many more sprites successfully", async () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 64;
        options.sortBy = "AREA_DESC";
        options.innerPadding = options.borderPadding = options.shapePadding = 0;
        testOptions.spriteCount = 64;

        await PackerTestHelper.testPackerHandlesManyMoreSpritesSuccessfully(new JoeRectsPacker(), options, testOptions);
    });

    test("JoeRectsPacker fails to pack sprites", async () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 64;
        options.sortBy = "AREA_DESC";
        testOptions.spriteCount = 65;
        testOptions.expectedValidate = false;
        testOptions.expectedSuccess = false;
        testOptions.expectedCatchMsg = "Sprite packing aborted, OnPack.";

        await PackerTestHelper.testPackerFailsToPackSprites(new JoeRectsPacker(), options, testOptions);
    });

    // exact fit of sprites to canvas 32x32  into 1024x32, no padding (no trim)
    test("JoeRectsPacker packs sprites successfully without padding", async () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 32;
        options.sortBy = "AREA_DESC";
        options.innerPadding = options.shapePadding = options.borderPadding = 0;
        testOptions.spriteCount = 32;
        testOptions.expectedValidate = true;
        testOptions.expectedSuccess = true;
        testOptions.expectedThenMsg = "Completed";

        await PackerTestHelper.testPackerPacksSpritesWithoutPadding(new JoeRectsPacker(), options, testOptions);
    });

    // TODO: verify list of packers and parsers.
    // console.log(`ParserHelper.RegisteredParsers: ${Object.getOwnPropertyNames(ParserHelper.RegisteredParsers)}`);
    // console.log(`PackerHelper.RegisteredPackers: ${Object.getOwnPropertyNames(PackerHelper.RegisteredPackers)}`);

});

