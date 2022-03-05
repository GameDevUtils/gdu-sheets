
export const V0_2_0 = "0.2.0";
export const V0_3_0 = "0.3.0";

export const V_LATEST = V0_3_0;

export enum ImageFormat {
    PNG = 1,
    GIF,
    JPG,
}

export enum DataFormat {
    CSS = 1,
    JSON,
    XML,
}

export enum YesNo {
    NO,
    YES,
}

export enum SpriteNameInAtlas {
    KeepExtension = 1,
    StripExtension,
}

export enum SpritePacker {
    JoeRects = 1,
    Basic,
}

export enum SortBy {
    AREA = 1,
    AREA_DESC,
    HEIGHT,
    HEIGHT_DESC,
    NAME,
    NAME_DESC,
    WIDTH,
    WIDTH_DESC,
}

export enum SizeMode {
    MaxSize = 1,
    FixedSize,
}

export enum Constraint {
    AnySize = 1,
    PowerOfTwo,
}

export enum TrimMode {
    None = 1,
    Trim,
}

export enum AnimatedGif {
    UseFirstFrame = 1,
    ExtractFrames,
}

export type ProjectOptions = {
    name: string | undefined,
    imageFormat: ImageFormat,
    dataFormat: DataFormat,
    nameInSheet: SpriteNameInAtlas,
    spritePacker: SpritePacker,
    sortBy: SortBy,
    allowRotate: YesNo,
    width: number,
    height: number,
    sizeMode: SizeMode,
    constraint: Constraint,
    forceSquare: YesNo,
    includeAt2x: YesNo,
    borderPadding: number,
    shapePadding: number,
    innerPadding: number,
    cleanAlpha: YesNo,
    colorMask: YesNo,
    aliasSprites: YesNo,
    debugMode: YesNo,
    trimMode: TrimMode,
    trimThreshold: number,
    animatedGif: AnimatedGif,
    compressProject: YesNo,
}

export type AppConsts = {
    APPLICATION_NAME: { [key: string]: string },
    APPLICATION_VERSION: { [key: string]: string },
    APPLICATION_URL: { [key: string]: string },
    GIT_URL: { [key: string]: string },
    DEFAULT_OPTIONS: { [key: string]: ProjectOptions },
};

const DefaultOptionsValuesForV0_2_0: ProjectOptions = {
    name: "Untitled",
    imageFormat: ImageFormat.PNG,
    dataFormat: DataFormat.XML,
    nameInSheet: SpriteNameInAtlas.StripExtension,
    spritePacker: SpritePacker.JoeRects,
    sortBy: SortBy.AREA_DESC,
    allowRotate: YesNo.NO,
    width: 1024,
    height: 1024,
    sizeMode: SizeMode.MaxSize,
    constraint: Constraint.PowerOfTwo,
    forceSquare: YesNo.NO,
    includeAt2x: YesNo.NO,
    borderPadding: 2,
    shapePadding: 2,
    innerPadding: 0,
    cleanAlpha: YesNo.NO,
    colorMask: YesNo.NO,
    aliasSprites: YesNo.NO,
    debugMode: YesNo.NO,
    trimMode: TrimMode.None,
    trimThreshold: 1,
    animatedGif: AnimatedGif.UseFirstFrame,
    compressProject: YesNo.NO,
};

export type ProjectImageItem = {
    filename: string,
    filetype: string,
    width: number,
    height: number,
    src: string,
    guid: string,
    frameCount: number,
    frames: Array<string>,
    populateFrameDataComplete: boolean,
    filterAppliedAliasHash: boolean,
    filterAppliedTrimRect: boolean,
    filterAppliedPaddingInner: boolean,
}

export const AppConstants: AppConsts = {
    APPLICATION_NAME: {
        V0_2_0: "FannyPack Sprite Sheets",
        V0_3_0: "GameDevUtils.com Sheets",
    },
    APPLICATION_VERSION: {
        V0_2_0: V0_2_0,
        V0_3_0: V0_3_0,
    },
    APPLICATION_URL: {
        V0_2_0: "https://GameDevUtils.com/",
        V0_3_0: "https://GameDevUtils.com/",
    },
    GIT_URL: {
        V0_2_0: "https://github.com/groundh0g/FannyPack",
        V0_3_0: "https://github.com/GameDevUtils/gdu-sheets",
    },
    DEFAULT_OPTIONS: {
        V0_2_0: Object.assign({}, DefaultOptionsValuesForV0_2_0),
        V0_3_0: Object.assign({}, DefaultOptionsValuesForV0_2_0),
    }
};


// =======================================
// =======================================
// =======================================


export class Project {

    static readonly empty: Project = new Project();

    application: string;
    version: string;
    url: string;
    options: ProjectOptions;
    images: { [key: string]: ProjectImageItem };
    isEmpty: boolean;

    constructor(copy?: string | Project) {
        if(copy) {
            if(typeof copy === "string") {
                // `copy` is the version of the defaults you want to use
                const src: string = copy;
                this.application = AppConstants.APPLICATION_NAME[src];
                this.version = AppConstants.APPLICATION_VERSION[src];
                this.url = AppConstants.APPLICATION_URL[src];
                this.options = Object.assign({}, AppConstants.DEFAULT_OPTIONS[src]);
                this.images = { };
                this.isEmpty = false;
            } else {
                // `copy` is the an instance of `Project` to duplicate
                const src: Project = copy;
                this.application = src.application;
                this.version = src.version;
                this.url = src.url;
                this.options = Object.assign({}, src.options);
                this.images = { };
                this.isEmpty = false;
            }
        } else {
            // initialize with latest version's default values
            this.application = AppConstants.APPLICATION_NAME[V_LATEST];
            this.version = AppConstants.APPLICATION_VERSION[V_LATEST];
            this.url = AppConstants.APPLICATION_URL[V_LATEST];
            this.options = Object.assign({}, AppConstants.DEFAULT_OPTIONS[V_LATEST]);
            this.images = { };
            this.isEmpty = false;
        }
    }

    toJSON(copy: Project | undefined): string {
        return JSON.stringify(copy || this);
    }

    fromJSON(src: string): Project {
        const srcProj: Project = JSON.parse(src) as Project;
        const project: Project = new Project();

        if(srcProj) {
            project.application = srcProj?.application?.toString();
            project.version = srcProj?.version?.toString();
            project.url = srcProj?.url?.toString();
            project.options = (srcProj?.options?.name) ?
                Object.assign({}, srcProj.options) :
                Object.assign({}, Project.empty.options);
            project.images = {};
            if(srcProj?.images) {
                Object.keys(srcProj.images).forEach(
                    key => {
                        project.images[key] = Object.assign({}, srcProj.images[key]);
                    }
                );
            }
        }

        return project;
    }
}

export const LICENSE = `
Copyright (c) 2016-${new Date().getFullYear()} Joseph B. Hall [@groundh0g]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
`;

export const LIBS = `
The following open source and public domain projects helped make this 
application possible.

 * base64 - a base64 encoder / decoder, compatible with atob() and btoa()
 * Blob - W3C Blob interface for browsers that do not support it
 * Bootstrap - a framework for faster and easier web development
 * crypto-js - an implementation of SHA256 and MD5 hashing
 * FileSaver - W3C FileSaver interface for browsers that do not support it
 * GitHub Pages - websites for you and your projects
 * Jekyll Bootstrap - The definitive Jekyll blogging framework
 * jQuery - a fast, small, and feature-rich JavaScript library
 * json2 - JSON feature for browsers that do not support it
 * jszip - create, read, and edit .zip files with Javascript
 * libgif.js - a modified version of @buzzfeed's & @shachaf's GIF parser
 * libgifparser.js - my lib, based on @buzzfeed's SuperGIF
 * object-keys.js - Object.keys for browsers that do not support it
 * string-helpers.js - contains, endsWith, ... for browsers without support
 * UUID - a JavaScript module to create GUIDs
 * MaxRectsBinPack.cpp - my JavaScript port of C++ source by Jukka Jylänki
`;

export const DEVELOPER = `
Joe Hall has been a professional software developer for the last ${new Date().getFullYear() - 1991} years.

He worked as a programmer for Microsoft and IBM and he was the software 
architect for a Fortune 500 bank. He was the CTO of a ticket sales and 
servicing company and he started his own consulting company in 2006.

Joe makes his living writing desktop, web, and mobile device applications 
for businesses and governmental agencies, but game programming is his 
passion, and it was gaming that got him into programming in the first place.

He was a member of the original Xbox team and he joined the Visual Studio 
.NET team just after the Xbox was released in 2001. Joe is the author of XNA 
Game Studio Express: Developing Games for Windows and the Xbox 360, which was 
published in 2007.

Joe also dabbles in sketching, cartooning, and creating 3D models. When you 
see his artistic creations, you'll understand why he makes his living as a 
programmer.
`;

