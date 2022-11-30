import PathHelper from "./PathHelper";

describe("PathHelper", () => {

    test("ParsePath() works as expected", () => {
        const parts = PathHelper.ParsePath('~/Projects/CnC2/assets/sprites/egyptian.png');

        expect(parts.filetype).toEqual('png');
        expect(parts.fileonly).toEqual('egyptian');
        expect(parts.filename).toEqual('egyptian.png');
        expect(parts.pathfull).toEqual('~/Projects/CnC2/assets/sprites/egyptian.png');
        expect(parts.pathonly).toEqual('~/Projects/CnC2/assets/sprites/');
    });

    test("ParsePath() works as expected with malformed data", () => {
        const parts = PathHelper.ParsePath("*");

        expect(parts.filetype).toEqual(undefined);
        expect(parts.fileonly).toEqual(undefined);
        expect(parts.filename).toEqual(undefined);
        expect(parts.pathfull).toEqual("*");
        expect(parts.pathonly).toEqual(undefined);
        expect(parts.isValid).toEqual(false);
    });

});