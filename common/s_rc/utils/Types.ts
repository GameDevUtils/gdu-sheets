
export type ExportableImageFormatTypes = "BMP" | "GIF" | "JPG" | "PNG" | undefined;
export type ImageFormatTypes = ExportableImageFormatTypes | "SVG" | undefined;
export type DataFormatTypes = "CSS" | "JSON" | "XML" | undefined;
export type YesNoTypes = "Yes" | "No" | undefined;
export type NameInSheetTypes = "Keep Extension" | "Strip Extension" | undefined;
export type SpritePackerTypes = "Basic" | "Guillotine" | "JoeRects" | "Skyline" | undefined;
export type SortByTypes = "AREA" | "AREA_DESC" | "HEIGHT" | "HEIGHT_DESC" | "NAME" | "NAME_DESC" | "PATH" | "PATH_DESC" | "WIDTH" | "WIDTH_DESC" | "SHORTER_SIDE" | "SHORTER_SIDE_DESC" | "LONGER_SIDE" | "LONGER_SIDE_DESC" | "PERIMETER" | "PERIMETER_DESC" | "SIDE_DIFF" | "SIDE_DIFF_DESC" | "SIDE_RATIO" | "SIDE_RATIO_DESC" | undefined;
export type SizeModeTypes = "Fixed Size" | "Max Size" | undefined;
export type ConstraintTypes = "Any Size" | "Power of Two" | undefined;
export type TrimModeTypes = "None" | "Trim" | undefined;
export type AnimatedGifTypes = "Extract Frames" | "Use First Frame" | undefined;

export type CallbackStatusTypes = "Canceled" | "Completed" | "Failed";
