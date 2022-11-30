import ImageItem from "./ImageItem";

describe("ImageItem", () => {

    // beforeAll(() => LogUtil.OutputModule = console );

    test("ImageItem.Empty() equals a new instance of same", () => {
        const image1 = ImageItem.Empty;
        const image2 = new ImageItem();
        image2.isEmpty = true;

        expect(image2).toStrictEqual(image1);
        expect(image2).not.toBe(image1);
    });

});