import {ImageItem} from "./images";
import {SerializableProjectOptions} from "../utils/ProjectUtil";

export enum ImageFormat {
    PNG = 1,
    GIF,
    JPG,
    BMP,
    // SVG,
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
    AREA = 0,
    AREA_DESC,
    HEIGHT,
    HEIGHT_DESC,
    NAME,
    NAME_DESC,
    PATH,
    PATH_DESC,
    WIDTH,
    WIDTH_DESC,
    SHORTER_SIDE,
    SHORTER_SIDE_DESC,
    LONGER_SIDE,
    LONGER_SIDE_DESC,
    PERIMETER,
    PERIMETER_DESC,
    SIDE_DIFF,
    SIDE_DIFF_DESC,
    SIDE_RATIO,
    SIDE_RATIO_DESC,
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

export enum OptionName {
    Name, // string
    ImageFormat, // ImageFormat
    DataFormat, // DataFormat
    NameInSheet, // SpriteNameInAtlas
    // YesNo, // YesNo
    SpriteNameInAtlas, // SpriteNameInAtlas [alias of NameInSheet]
    SpritePacker, // SpritePacker
    SortBy, // SortBy
    AllowRotate, // YesNo
    Width, // number
    Height, // number
    SizeMode, // SizeMode
    Constraint, // Constraint
    ForceSquare, // YesNo
    Include2x, // YesNo
    BorderPadding, // number
    ShapePadding, // number
    InnerPadding, // number
    CleanAlpha, // YesNo
    ColorMask, // YesNo
    AliasSprites, // YesNo
    DebugMode, // DebugMode
    TrimMode, // TrimMode
    TrimThreshold, // number
    AnimatedGif, // AnimatedGif
    CompressProject, // YesNo
}

export enum OptionGroup {
    Output,
    Algorithm,
    Dimensions,
    Padding,
    Filters,
    Advanced,
}

export const DefaultProjectOptions = {
    "0.2.0": {
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
        isEmpty: false,
    },
    "0.3.0": {
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
        isEmpty: false,
    },
}

export type ProjectOptions = {
    name: string | undefined,
    imageFormat: ImageFormat | undefined,
    dataFormat: DataFormat | undefined,
    nameInSheet: SpriteNameInAtlas | undefined,
    spritePacker: SpritePacker | undefined,
    sortBy: SortBy | undefined,
    allowRotate: YesNo | undefined,
    width: number | undefined,
    height: number | undefined,
    sizeMode: SizeMode | undefined,
    constraint: Constraint | undefined,
    forceSquare: YesNo | undefined,
    includeAt2x: YesNo | undefined,
    borderPadding: number | undefined,
    shapePadding: number | undefined,
    innerPadding: number | undefined,
    cleanAlpha: YesNo | undefined,
    colorMask: YesNo | undefined,
    aliasSprites: YesNo | undefined,
    debugMode: YesNo | undefined,
    trimMode: TrimMode | undefined,
    trimThreshold: number | undefined,
    animatedGif: AnimatedGif | undefined,
    compressProject: YesNo | undefined,
};

export type Project = {
    application: string | undefined,
    version: string | undefined,
    url: string | undefined,
    options: ProjectOptions | SerializableProjectOptions,
    images: { [key: string]: ImageItem },
    isEmpty: boolean  | undefined,
};

