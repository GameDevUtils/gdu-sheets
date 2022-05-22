// import {V0_2_0, V0_3_0, V_LATEST_KEY} from "../objs/projects";

export enum APPLICATION_VERSION {
    V0_2_0 = "0.2.0",
    V0_3_0 = "0.3.0",
    CURRENT = V0_3_0,
}

export type Version = {
    major: number | undefined,
    minor: number | undefined,
    hotfix: number | undefined,
}

export const AppConstants = {
    APPLICATION_NAME: {
        "0.2.0": "FannyPack Sprite Sheets",
        "0.3.0": "GameDevUtils.com Sheets",
    },
    APPLICATION_VERSION: {
        // "CURRENT": V_LATEST_KEY, // only to satisfy "unused export" error... unused
        "0.2.0": APPLICATION_VERSION.V0_2_0,
        "0.3.0": APPLICATION_VERSION.V0_3_0,
    },
    APPLICATION_URL: {
        "0.2.0": "https://GameDevUtils.com/",
        "0.3.0": "https://GameDevUtils.com/",
    },
    APPLICATION_DESCRIPTION: {
        "0.2.0": "2016 initial release",
        "0.3.0": "2022 rewrite",
    },
    GIT_URL: {
        "0.2.0": "https://github.com/groundh0g/FannyPack",
        "0.3.0": "https://github.com/GameDevUtils/gdu-sheets",
    },
};

export default class AppUtil {
    static get CURRENT_VERSION() : APPLICATION_VERSION { return APPLICATION_VERSION.V0_3_0; }

    static APPLICATION_NAME(version?: APPLICATION_VERSION) : string {
        return AppConstants['APPLICATION_NAME'][version ?? APPLICATION_VERSION.CURRENT];
    }

    static APPLICATION_VERSION(version?: APPLICATION_VERSION) : string {
        return AppConstants['APPLICATION_VERSION'][version ?? APPLICATION_VERSION.CURRENT];
    }

    static APPLICATION_URL(version?: APPLICATION_VERSION) : string {
        return AppConstants['APPLICATION_URL'][version ?? APPLICATION_VERSION.CURRENT];
    }

    static APPLICATION_DESCRIPTION(version?: APPLICATION_VERSION) : string {
        return AppConstants['APPLICATION_DESCRIPTION'][version ?? APPLICATION_VERSION.CURRENT];
    }

    static GIT_URL(version?: APPLICATION_VERSION) : string {
        return AppConstants['GIT_URL'][version ?? APPLICATION_VERSION.CURRENT];
    }

    static getVersion(version?: APPLICATION_VERSION) : Version {
        const parts = ((version ?? APPLICATION_VERSION.CURRENT) as string).replace(/v/g, '').split('.');

        if(parts && parts.length > 2) {
            return {
                major:  parseInt(parts[0]),
                minor:  parseInt(parts[1]),
                hotfix: parseInt(parts[2]),
            } as Version;
        } else {
            return {
                major:  0,
                minor:  0,
                hotfix: 0,
            } as Version;
        }
    }
}

