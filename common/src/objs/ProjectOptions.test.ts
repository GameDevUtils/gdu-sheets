import ProjectOptions from "./ProjectOptions";

describe("ProjectOptions", () => {

    // beforeAll(() => LogUtil.OutputModule = console );

    test("ProjectOptions.Empty() equals a new instance of same", () => {
        const options1 = ProjectOptions.Empty;
        const options2 = new ProjectOptions();
        options2.isEmpty = true;

        expect(options2).toStrictEqual(options1);
        expect(options2).not.toBe(options1);
    });

});