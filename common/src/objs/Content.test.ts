import Content from "./Content";

describe('Content strings are populated', () => {

    test('LICENSE', () => {
        expect(Content.LICENSE.length).toBeGreaterThan(0);
    });

    test('LIBS', () => {
        expect(Content.LIBS.length).toBeGreaterThan(0);
    });

    test('DEVELOPER', () => {
        expect(Content.DEVELOPER.length).toBeGreaterThan(0);
    });

});