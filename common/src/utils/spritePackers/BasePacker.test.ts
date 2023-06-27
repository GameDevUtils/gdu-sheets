// import Project from "../../objs/Project";
// import ImageItem from "../../objs/ImageItem";
// import ImageFrame from "../../objs/ImageFrame";
// import Rectangle from "../../objs/Rectangle";
// import {createHash, Hash} from "crypto";
import LogHelper from "../LogHelper";
import ProjectOptions from "../../objs/ProjectOptions";
import PackerTestHelper, {TestOptions} from "./_PackerTestHelper";
import BasicPacker from "./BasicPacker";
import { option } from "yargs";

describe("BasePacker", () => {

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
            expectedWarnings: [],
        };
        // LogHelper.Clear();
        mockConsoleWarn.mockReset();
    });

    let mockConsoleWarn : jest.MockedFunction<any>;

    beforeAll(() => {
        mockConsoleWarn = jest.spyOn(LogHelper, 'LogMessage');
    });

    afterAll(() => {
        mockConsoleWarn.mockRestore();
    });

    test("detects bad config - trim 255", async () => {
        const options = new ProjectOptions();
        options.width = options.height = 1024;
        options.sortBy = "AREA_DESC";
        options.trimMode = "Trim";
        options.trimThreshold = 255;
        testOptions.spriteCount = 1;
        testOptions.expectedValidate = true;
        testOptions.expectedWarnings = [
            "TrimMode enabled, but with a trim threshold of 255.",
            "All sprites would be eliminated. Using a trim threshold of 1 instead.",
        ];

        PackerTestHelper.testPackerDetectBadConfig(new BasicPacker(), options, testOptions);

        expect(mockConsoleWarn).toHaveBeenCalledWith("WARN", testOptions.expectedWarnings[0]);
        expect(mockConsoleWarn).toHaveBeenCalledWith("WARN", testOptions.expectedWarnings[1]);

    });

    test("detects bad config - forceSquare, fixedSize", async () => {
        const options = new ProjectOptions();
        options.width = options.height = 1024;
        options.sortBy = "AREA_DESC";
        options.sizeMode = "Fixed Size";
        options.forceSquare = "Yes";
        options.width = 2048;
        options.height = 1024;
        testOptions.spriteCount = 1;
        testOptions.expectedValidate = true;
        testOptions.expectedWarnings = [
            `Force Square is enabled with Fixed Size, but width and height don't match at 2048x1024.`,
            `Resizing would fail. Using a size of 2048x2048 instead.`,
        ];

        PackerTestHelper.testPackerDetectBadConfig(new BasicPacker(), options, testOptions);

        expect(mockConsoleWarn).toHaveBeenCalledWith("WARN", testOptions.expectedWarnings[0]);
        expect(mockConsoleWarn).toHaveBeenCalledWith("WARN", testOptions.expectedWarnings[1]);
    });

    test("detects bad config - powerOfTwo", async () => {
        const options = new ProjectOptions();
        options.sortBy = "AREA_DESC";
        options.sizeMode = "Fixed Size";
        options.trimMode = "None";
        options.constraint = "Power of Two";
        options.width = 2000;
        options.height = 1000;
        testOptions.spriteCount = 1;
        testOptions.expectedValidate = true;
        testOptions.expectedCatchMsg = "foo";
        testOptions.expectedWarnings = [
            `Power of Two constraint is enabled with Fixed Size, but the width or height are not powers of two at 2000x1000.`,
            `Resizing would fail. Using a size of 2048x1024 instead.`,
        ];

        PackerTestHelper.testPackerDetectBadConfig(new BasicPacker(), options, testOptions);

        expect(mockConsoleWarn).toHaveBeenCalledWith("WARN", testOptions.expectedWarnings[0]);
        expect(mockConsoleWarn).toHaveBeenCalledWith("WARN", testOptions.expectedWarnings[1]);
    });

    test("handles missing image frames", () => {
        const options = new ProjectOptions();
        options.width = options.height = 1024;
        options.sortBy = "AREA_DESC";
        options.sizeMode = "Fixed Size";
        testOptions.spriteCount = 3;
        testOptions.expectedValidate = true;
        testOptions.expectedCatchMsg = "Failed";

        PackerTestHelper.testPackerWithMissingImageFramesSucceeds(new BasicPacker(), options, testOptions);
    });

    // test("handles duplicate frames", async () => {
    //     const options = new ProjectOptions();
    //     options.width = options.height = 1024;
    //     options.sortBy = "AREA_DESC";
    //     options.aliasSprites = "Yes";
    //     options.sizeMode = "Max Size";
    //     testOptions.spriteCount = 32;
    //     testOptions.expectedValidate = true;

    //     PackerTestHelper.testPackerWithMissingImageFrames(new BasicPacker(), options, testOptions);
    // });

    test("handles force square failure", async () => {
        const options = new ProjectOptions();
        options.width = 1024;
        options.height = 32;
        options.sortBy = "AREA_DESC";
        options.forceSquare = "Yes";
        options.sizeMode = "Max Size";
        testOptions.spriteCount = 32;
        testOptions.expectedSuccess = false;
        testOptions.expectedValidate = false;
        testOptions.expectedCatchMsg = "Failed";
        
        PackerTestHelper.testPackerWithMissingImageFramesFails(new BasicPacker(), options, testOptions);
    });

});