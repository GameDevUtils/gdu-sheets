import MathHelper from "./MathHelper";

describe("MathHelper", () => {

    test("CountBits() works as expected", () => {
        expect(MathHelper.CountBits(0)).toStrictEqual(0);
        expect(MathHelper.CountBits(1 << 0)).toStrictEqual(1);
        expect(MathHelper.CountBits(1 << 1)).toStrictEqual(1);
        expect(MathHelper.CountBits(1 << 2)).toStrictEqual(1);
        expect(MathHelper.CountBits(1 << 3)).toStrictEqual(1);
        expect(MathHelper.CountBits(1 << 4)).toStrictEqual(1);
        expect(MathHelper.CountBits(1 << 5)).toStrictEqual(1);
        expect(MathHelper.CountBits(1 << 6)).toStrictEqual(1);
        expect(MathHelper.CountBits(1 << 7)).toStrictEqual(1);
        expect(MathHelper.CountBits(1 << 8)).toStrictEqual(1);
        expect(MathHelper.CountBits(1 << 9)).toStrictEqual(1);
        expect(MathHelper.CountBits(3)).toStrictEqual(2);
        expect(MathHelper.CountBits(5)).toStrictEqual(2);
        expect(MathHelper.CountBits(7)).toStrictEqual(3);
    });

    test("IsPowerOfTwo() works as expected", () => {
        let count = 0;

        for(let i = 0; i < 65; i++) {
            count += MathHelper.IsPowerOfTwo(i) ? 1 : 0;
        }

        expect(count).toStrictEqual(7);
    });

    test("RoundUpToPowerOfTwo() works as expected", () => {
        expect(MathHelper.RoundUpToPowerOfTwo(0)).toStrictEqual(0);
        expect(MathHelper.RoundUpToPowerOfTwo(1)).toStrictEqual(1);
        expect(MathHelper.RoundUpToPowerOfTwo(2)).toStrictEqual(2);
        expect(MathHelper.RoundUpToPowerOfTwo(3)).toStrictEqual(4);
        expect(MathHelper.RoundUpToPowerOfTwo(4)).toStrictEqual(4);
        expect(MathHelper.RoundUpToPowerOfTwo(5)).toStrictEqual(8);
        expect(MathHelper.RoundUpToPowerOfTwo(6)).toStrictEqual(8);
        expect(MathHelper.RoundUpToPowerOfTwo(7)).toStrictEqual(8);
        expect(MathHelper.RoundUpToPowerOfTwo(8)).toStrictEqual(8);
        expect(MathHelper.RoundUpToPowerOfTwo(9)).toStrictEqual(16);
        expect(MathHelper.RoundUpToPowerOfTwo(511)).toStrictEqual(512);
        expect(MathHelper.RoundUpToPowerOfTwo(512)).toStrictEqual(512);
        expect(MathHelper.RoundUpToPowerOfTwo(513)).toStrictEqual(1024);
        expect(MathHelper.RoundUpToPowerOfTwo(1023)).toStrictEqual(1024);
        expect(MathHelper.RoundUpToPowerOfTwo(1024)).toStrictEqual(1024);
        expect(MathHelper.RoundUpToPowerOfTwo(1025)).toStrictEqual(2048);
        expect(MathHelper.RoundUpToPowerOfTwo(2000)).toStrictEqual(2048);
        expect(MathHelper.RoundUpToPowerOfTwo(2047)).toStrictEqual(2048);
        expect(MathHelper.RoundUpToPowerOfTwo(2048)).toStrictEqual(2048);
        expect(MathHelper.RoundUpToPowerOfTwo(2049)).toStrictEqual(4096);
    });

});