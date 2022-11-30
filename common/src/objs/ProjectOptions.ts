import {
    AllHeuristics,
    AnimatedGifTypes,
    ConstraintTypes,
    DataFormatTypes,
    ExportableImageFormatTypes,
    NameInSheetTypes,
    SizeModeTypes,
    SortByTypes,
    SpritePackerTypes,
    TrimModeTypes,
    YesNoTypes
} from "..";


export default class ProjectOptions {

    public name: string | undefined = "Untitled";
    public imageFormat: ExportableImageFormatTypes = "PNG";
    public dataFormat: DataFormatTypes = "XML";
    public nameInSheet: NameInSheetTypes = "Strip Extension";
    public spritePacker: SpritePackerTypes = "JoeRects";
    public packerHeuristics: AllHeuristics = "InferFromSort";
    public sortBy: SortByTypes = "AREA_DESC";
    public allowRotate: YesNoTypes = "No";
    public width: number = 0;
    public height: number = 0;
    public sizeMode: SizeModeTypes = "Max Size";
    public constraint: ConstraintTypes = "Power of Two";
    public forceSquare: YesNoTypes = "No";
    public includeAt2x: YesNoTypes = "No";
    public borderPadding: number | undefined = 2;
    public shapePadding: number | undefined = 2;
    public innerPadding: number | undefined = 0;
    public cleanAlpha: YesNoTypes = "No";
    public colorMask: YesNoTypes = "No";
    public aliasSprites: YesNoTypes = "No";
    public debugMode: YesNoTypes = "No";
    public trimMode: TrimModeTypes = "Trim";
    public trimThreshold: number | undefined = 1;
    public animatedGif: AnimatedGifTypes = "Use First Frame";
    public compressProject: YesNoTypes = "No";
    public isEmpty: boolean = false;

    public static get Empty() : ProjectOptions {
        return Object.assign(new ProjectOptions(), { isEmpty: true }) as ProjectOptions;
    }

}