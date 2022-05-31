import {AppUtil, APPLICATION_VERSION} from "./AppUtil";

describe("AppUtil", () => {

    test('current version is consistent', () => {
        expect(AppUtil.CURRENT_VERSION).toBe(APPLICATION_VERSION.CURRENT);
    });

    test('gets numeric version parts', () => {
        const version020 = AppUtil.getVersion(APPLICATION_VERSION.V0_2_0);
        const version030 = AppUtil.getVersion(APPLICATION_VERSION.V0_3_0);
        const versionCurrent = AppUtil.getVersion();
        const versionBogus = AppUtil.getVersion('44' as APPLICATION_VERSION);

        expect(version020).toStrictEqual({ major: 0, minor: 2, hotfix: 0 });
        expect(version030).toStrictEqual({ major: 0, minor: 3, hotfix: 0 });
        expect(versionBogus).toStrictEqual({ major: 0, minor: 0, hotfix: 0 });
        // this test will fail when the next version is released... rethink?
        expect(versionCurrent).toStrictEqual({ major: 0, minor: 3, hotfix: 0 });
    });

    test('current version is consistent with default app constants', () => {
        expect(AppUtil.APPLICATION_NAME()).toBe(AppUtil.APPLICATION_NAME(APPLICATION_VERSION.CURRENT));
        expect(AppUtil.APPLICATION_URL()).toBe(AppUtil.APPLICATION_URL(APPLICATION_VERSION.CURRENT));
        expect(AppUtil.APPLICATION_VERSION()).toBe(AppUtil.APPLICATION_VERSION(APPLICATION_VERSION.CURRENT));
        expect(AppUtil.APPLICATION_DESCRIPTION()).toBe(AppUtil.APPLICATION_DESCRIPTION(APPLICATION_VERSION.CURRENT));
        expect(AppUtil.GIT_URL()).toBe(AppUtil.GIT_URL(APPLICATION_VERSION.CURRENT));
    });

});
