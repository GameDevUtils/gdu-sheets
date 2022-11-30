import Project from "../../objs/Project";
import LogHelper from "../LogHelper";
import {
    CallbackStatusTypes,
    GuillotinePackerHeuristics,
    ShelfPackerHeuristics,
    SortByTypes,
    SpritePackerTypes
} from "../Types";
import PackerHelper from "../PackerHelper";
import BasePacker from "./BasePacker";
import SortHelper from "../SortHelper";
import Rectangle from "../../objs/Rectangle";
import ParserHelper from "../ParserHelper";

export default class ShelfPacker extends BasePacker {

    public GetPackerType(): SpritePackerTypes {
        return "Shelf";
    }

    public GetDefaultSortBy(): SortByTypes {
        return "HEIGHT_DESC"; // "AREA_DESC";
    }

    public GetHeuristic(project: Project): ShelfPackerHeuristics {
        let heuristic: ShelfPackerHeuristics;

        if(project.options.packerHeuristics !== "InferFromSort") {
            return project.options.packerHeuristics as ShelfPackerHeuristics ?? "FirstFit";
        }

        // TODO: implement NextFit | FirstFit
        switch(project.options.sortBy ?? this.GetDefaultSortBy()) {
            case "WIDTH":
                heuristic = "WorstWidth";
                break;
            case "WIDTH_DESC":
                heuristic = "BestWidth";
                break;
            case "HEIGHT":
                heuristic = "WorstHeight";
                break;
            case "HEIGHT_DESC":
                heuristic = "BestHeight";
                break;
            case "AREA":
            case "PERIMETER":
                heuristic =  "WorstArea";
                break;
            case "AREA_DESC":
            case "PERIMETER_DESC":
            default:
                heuristic = "BestArea";
                break;
        }

        return heuristic;
    }

    protected pack_currentX: number = 0;
    protected pack_currentY: number = 0;
    protected pack_maxX: number = 0;
    protected pack_maxY: number = 0;

    protected OnInit(project: Project): boolean {
        // TODO: implement
        return true;
    }

    protected OnPack(project: Project): boolean {
        // TODO: implement
        this.DoCompleteCallback(true, project);
        return true;
    }

    protected OnResize(project: Project, oldWidth: number, oldHeight: number, newWidth: number, newHeight: number, changed: boolean): boolean {
        // TODO: implement
        return changed;
    }

    protected OnProgressCallback(progress: number): boolean {
        // TODO: implement
        return true;
    }

    protected OnCompleteCallback(success: boolean): void {
        // TODO: implement
    }

    private static _registerParser = (() => {
        PackerHelper.RegisterPacker(new ShelfPacker());
    })();

}