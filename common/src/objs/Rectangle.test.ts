import Rectangle from "./Rectangle";

describe("Rectangle", () => {

    // beforeAll(() => LogUtil.OutputModule = console );

    test("Rectangle.Create() equals a new instance with same values", () => {
        const rect1 = Rectangle.Create(10,20, 30, 40, false);
        const rect2 = new Rectangle();

        rect2.x = 10;
        rect2.y = 20;
        rect2.width = 30;
        rect2.height = 40;
        rect2.rotated = false;

        expect(rect2).toStrictEqual(rect1);
        expect(rect2).not.toBe(rect1);
    });

    test("Rectangle.Empty().Normalize() is a valid, all-zero instance", () => {
        const rect1 = Rectangle.Empty; //.Normalize();
        const rect2 = Rectangle.Create(0,0,0,0);

        expect(rect2).toStrictEqual(rect1);
        expect(rect2).not.toBe(rect1);
    });

    test("Rectangle.Empty() equals a new instance of same", () => {
        const rect1 = Rectangle.Empty;
        const rect2 = Rectangle.Empty;

        expect(rect2).toStrictEqual(rect1);
        expect(rect2).not.toBe(rect1);
    });

    test("Intersects() and Contains() work as expected", () => {
        const rect1 = Rectangle.Create(10,10,50,50);
        const rect2 = Rectangle.Create(20,20,20,20);
        const rect3 = Rectangle.Create(10, 65, 20,20);
        const rect4 = Rectangle.Empty;

        expect(rect1.Contains(rect2)).toEqual(true);
        expect(rect1.Intersects(rect2)).toEqual(true);
        expect(rect1.Contains(rect3)).toEqual(false);
        expect(rect1.Intersects(rect3)).toEqual(false);
        expect(rect1.Contains(rect4)).toEqual(false);
        expect(rect1.Intersects(rect4)).toEqual(false);
    });

    test("calculated fields work as expected", () => {
        const rect = Rectangle.Create(10,10,50,50);

        expect(rect.x).toEqual(rect.left);
        expect(rect.y).toEqual(rect.top);
        expect(rect.x + rect.width).toEqual(rect.right);
        expect(rect.y + rect.height).toEqual(rect.bottom);
        expect(rect.isEmpty).toEqual(false);

        rect.width = rect.height = 0;
        expect(rect.isEmpty).toEqual(true);
    });

    test("Copy() works as expected", () => {
        const rect1 = Rectangle.Create(10,10,50,50);
        const rect2 = Rectangle.Copy(rect1);

        expect(rect2).toStrictEqual(rect1);
        expect(rect2).not.toBe(rect1);
    });

    test("Inflate() works as expected", () => {
        const rect1 = Rectangle.Create(10,10,50,50);
        const rect2 = Rectangle.Inflate(rect1, 3);

        expect(rect2).toStrictEqual(Rectangle.Create(7,7,56,56));
    });

});