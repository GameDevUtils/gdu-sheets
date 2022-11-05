import Project from "../objs/Project";
import {CallbackStatusTypes, SortByTypes, SpritePackerTypes} from "./Types";
import {ISpritePacker} from "./spritePackers/ISpritePacker";
import ImageItem from "../objs/ImageItem";

export type Packers = { [key: string]: ISpritePacker };
export type SortByCallbacks = { [key: string]: (project: Project) => string[] };

export default class PackerHelper {

    public static async PackSprites(packer: ISpritePacker, project: Project, progress?: (float) => boolean) : Promise<CallbackStatusTypes>  {
        return packer.packSprites(project, progress);
    }

    public static RegisteredPackers: Packers = {} as Packers;
    public static RegisterPacker(packer: ISpritePacker) : void {
        if(!PackerHelper.RegisteredPackers[packer.getPackerType()]) {
            PackerHelper.RegisteredPackers[packer.getPackerType()] = packer;
        }
    }

    public static get DEFAULT_SORT_BY() : SortByTypes { return "AREA_DESC"; }

    public static SortByMethods: SortByCallbacks = {} as SortByCallbacks;
    public static RegisterSortByMethod(sortBy: SortByTypes, method: (project: Project) => string[]) : void {
        if(!PackerHelper.SortByMethods[sortBy]) {
            PackerHelper.SortByMethods[sortBy] = method;
        }
    }

    private static _initializeSortByMethods = (() => {

        PackerHelper.RegisterSortByMethod("NAME", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                const doKeepExtension = project.options.nameInSheet === "Keep Extension";
                const name_a = project.images[a].filename + (doKeepExtension ? "." + project.images[a].filetype : "");
                const name_b = project.images[b].filename + (doKeepExtension ? "." + project.images[b].filetype : "");
                return (name_a.toUpperCase() < name_b.toUpperCase()) ? -1 : (name_a.toUpperCase() > name_b.toUpperCase()) ? 1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("NAME_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                const doKeepExtension = project.options.nameInSheet === "Keep Extension";
                const name_a = project.images[a].filename + (doKeepExtension ? "." + project.images[a].filetype : "");
                const name_b = project.images[b].filename + (doKeepExtension ? "." + project.images[b].filetype : "");
                return (name_a.toUpperCase() < name_b.toUpperCase()) ? 1 : (name_a.toUpperCase() > name_b.toUpperCase()) ? -1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("PATH", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                const path_a = project.images[a].fullpath;
                const path_b = project.images[b].fullpath;
                return (path_a.toUpperCase() < path_b.toUpperCase()) ? -1 : (path_a.toUpperCase() > path_b.toUpperCase()) ? 1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("PATH_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                const path_a = project.images[a].fullpath;
                const path_b = project.images[b].fullpath;
                return (path_a.toUpperCase() < path_b.toUpperCase()) ? 1 : (path_a.toUpperCase() > path_b.toUpperCase()) ? -1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("SHORTER_SIDE", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let side_a, side_b;
                if(project.options.trimMode === "Trim") {
                    side_a = project.images[a].frames[0].width < project.images[a].frames[0].height ? project.images[a].frames[0].width : project.images[a].frames[0].height;
                    side_b = project.images[b].frames[0].width < project.images[b].frames[0].height ? project.images[b].frames[0].width : project.images[b].frames[0].height;
                } else {
                    side_a = project.images[a].width < project.images[a].height ? project.images[a].width : project.images[a].height;
                    side_b = project.images[b].width < project.images[b].height ? project.images[b].width : project.images[b].height;
                }
                return (side_a < side_b) ? -1 : (side_a > side_b) ? 1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("SHORTER_SIDE_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let side_a, side_b;
                if(project.options.trimMode === "Trim") {
                    side_a = project.images[a].frames[0].width < project.images[a].frames[0].height ? project.images[a].frames[0].width : project.images[a].frames[0].height;
                    side_b = project.images[b].frames[0].width < project.images[b].frames[0].height ? project.images[b].frames[0].width : project.images[b].frames[0].height;
                } else {
                    side_a = project.images[a].width < project.images[a].height ? project.images[a].width : project.images[a].height;
                    side_b = project.images[b].width < project.images[b].height ? project.images[b].width : project.images[b].height;
                }
                return (side_a < side_b) ? 1 : (side_a > side_b) ? -1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("LONGER_SIDE", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let side_a, side_b;
                if(project.options.trimMode === "Trim") {
                    side_a = project.images[a].frames[0].width > project.images[a].frames[0].height ? project.images[a].frames[0].width : project.images[a].frames[0].height;
                    side_b = project.images[b].frames[0].width > project.images[b].frames[0].height ? project.images[b].frames[0].width : project.images[b].frames[0].height;
                } else {
                    side_a = project.images[a].width > project.images[a].height ? project.images[a].width : project.images[a].height;
                    side_b = project.images[b].width > project.images[b].height ? project.images[b].width : project.images[b].height;
                }
                return (side_a < side_b) ? -1 : (side_a > side_b) ? 1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("LONGER_SIDE_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let side_a, side_b;
                if(project.options.trimMode === "Trim") {
                    side_a = project.images[a].frames[0].width > project.images[a].frames[0].height ? project.images[a].frames[0].width : project.images[a].frames[0].height;
                    side_b = project.images[b].frames[0].width > project.images[b].frames[0].height ? project.images[b].frames[0].width : project.images[b].frames[0].height;
                } else {
                    side_a = project.images[a].width > project.images[a].height ? project.images[a].width : project.images[a].height;
                    side_b = project.images[b].width > project.images[b].height ? project.images[b].width : project.images[b].height;
                }
                return (side_a < side_b) ? 1 : (side_a > side_b) ? -1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("PERIMETER", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let sides_a, sides_b;
                if(project.options.trimMode === "Trim") {
                    sides_a = project.images[a].frames[0].width * 2 + project.images[a].frames[0].height * 2;
                    sides_b = project.images[b].frames[0].width * 2 + project.images[b].frames[0].height * 2;
                } else {
                    sides_a = project.images[a].width * 2 + project.images[a].height * 2;
                    sides_b = project.images[b].width * 2 + project.images[b].height * 2;
                }
                return (sides_a < sides_b) ? -1 : (sides_a > sides_b) ? 1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("PERIMETER_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let sides_a, sides_b;
                if(project.options.trimMode === "Trim") {
                    sides_a = project.images[a].frames[0].width * 2 + project.images[a].frames[0].height * 2;
                    sides_b = project.images[b].frames[0].width * 2 + project.images[b].frames[0].height * 2;
                } else {
                    sides_a = project.images[a].width * 2 + project.images[a].height * 2;
                    sides_b = project.images[b].width * 2 + project.images[b].height * 2;
                }
                return (sides_a < sides_b) ? 1 : (sides_a > sides_b) ? -1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("SIDE_DIFF", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let side_a, side_b;
                if(project.options.trimMode === "Trim") {
                    side_a = Math.abs(project.images[a].frames[0].width - project.images[a].frames[0].height);
                    side_b = Math.abs(project.images[b].frames[0].width - project.images[b].frames[0].height);
                } else {
                    side_a = Math.abs(project.images[a].width - project.images[a].height);
                    side_b = Math.abs(project.images[b].width - project.images[b].height);
                }
                return (side_a < side_b) ? -1 : (side_a > side_b) ? 1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("SIDE_DIFF_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let side_a, side_b;
                if(project.options.trimMode === "Trim") {
                    side_a = Math.abs(project.images[a].frames[0].width - project.images[a].frames[0].height);
                    side_b = Math.abs(project.images[b].frames[0].width - project.images[b].frames[0].height);
                } else {
                    side_a = Math.abs(project.images[a].width - project.images[a].height);
                    side_b = Math.abs(project.images[b].width - project.images[b].height);
                }
                return (side_a < side_b) ? 1 : (side_a > side_b) ? -1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("SIDE_RATIO", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let ratio_a, ratio_b;
                if(project.options.trimMode === "Trim") {
                    ratio_a = Math.abs(project.images[a].frames[0].width / (project.images[a].height || 1));
                    ratio_b = Math.abs(project.images[b].frames[0].width / (project.images[b].height || 1));
                } else {
                    ratio_a = Math.abs(project.images[a].frames[0].width / (project.images[a].height || 1));
                    ratio_b = Math.abs(project.images[b].frames[0].width / (project.images[b].height || 1));
                }
                return (ratio_a < ratio_b) ? -1 : (ratio_a > ratio_b) ? 1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("SIDE_RATIO_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                let ratio_a, ratio_b;
                if(project.options.trimMode === "Trim") {
                    ratio_a = Math.abs(project.images[a].frames[0].width / (project.images[a].height || 1));
                    ratio_b = Math.abs(project.images[b].frames[0].width / (project.images[b].height || 1));
                } else {
                    ratio_a = Math.abs(project.images[a].frames[0].width / (project.images[a].height || 1));
                    ratio_b = Math.abs(project.images[b].frames[0].width / (project.images[b].height || 1));
                }
                return (ratio_a < ratio_b) ? -1 : (ratio_a > ratio_b) ? 1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("WIDTH", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                const doTrim = project.options.trimMode === "Trim";
                let width_a = doTrim ? project.images[a].frames[0].width : project.images[a].width;
                let width_b = doTrim ? project.images[b].frames[0].width : project.images[b].width;
                return (width_a < width_b) ? -1 : (width_a > width_b) ? 1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("WIDTH_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                const doTrim = project.options.trimMode === "Trim";
                let width_a = doTrim ? project.images[a].frames[0].width : project.images[a].width;
                let width_b = doTrim ? project.images[b].frames[0].width : project.images[b].width;
                return (width_a < width_b) ? 1 : (width_a > width_b) ? -1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("HEIGHT", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                const doTrim = project.options.trimMode === "Trim";
                let height_a = doTrim ? project.images[a].frames[0].height : project.images[a].height;
                let height_b = doTrim ? project.images[b].frames[0].height : project.images[b].height;
                return (height_a < height_b) ? -1 : (height_a > height_b) ? 1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("HEIGHT_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                const doTrim = project.options.trimMode === "Trim";
                let height_a = doTrim ? project.images[a].frames[0].height : project.images[a].height;
                let height_b = doTrim ? project.images[b].frames[0].height : project.images[b].height;
                return (height_a < height_b) ? 1 : (height_a > height_b) ? -1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("AREA", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                const doTrim = project.options.trimMode === "Trim";
                const width_a = doTrim ? project.images[a].frames[0].width : project.images[a].width;
                const width_b = doTrim ? project.images[b].frames[0].width : project.images[b].width;
                const height_a = doTrim ? project.images[a].frames[0].height : project.images[a].height;
                const height_b = doTrim ? project.images[b].frames[0].height : project.images[b].height;
                const area_a = width_a * height_a;
                const area_b = width_b * height_b;
                return (area_a < area_b) ? -1 : (area_a > area_b) ? 1 : 0;
            });
        });

        PackerHelper.RegisterSortByMethod("AREA_DESC", (project: Project) => {
            return Object.getOwnPropertyNames(project.images).sort((a: string, b: string) => {
                const doTrim = project.options.trimMode === "Trim";
                const width_a = doTrim ? project.images[a].frames[0].width : project.images[a].width;
                const width_b = doTrim ? project.images[b].frames[0].width : project.images[b].width;
                const height_a = doTrim ? project.images[a].frames[0].height : project.images[a].height;
                const height_b = doTrim ? project.images[b].frames[0].height : project.images[b].height;
                const area_a = width_a * height_a;
                const area_b = width_b * height_b;
                return (area_a < area_b) ? 1 : (area_a > area_b) ? -1 : 0;
            });
        });

        return true;
    })();
}
