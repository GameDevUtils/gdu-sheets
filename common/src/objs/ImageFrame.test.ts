import ImageFrame from "./ImageFrame";

describe("ImageFrame", () => {

    // beforeAll(() => LogUtil.OutputModule = console );

    test("ImageFrame.Empty() equals a new instance of same", () => {
        const frame1 = ImageFrame.Empty;
        const frame2 = ImageFrame.Empty;

        expect(frame2).toStrictEqual(frame1);
        expect(frame2).not.toBe(frame1);
    });

});