// import {NdArray} from "ndarray";
import ImageItem from "./ImageItem";
import ProjectOptions from "./ProjectOptions";

export type ApplicationTypes = "FannyPack Sprite Sheets" | "GameDevUtils.com" | undefined;
export type VersionTypes = "0.2.0" | "0.3.0" | undefined;
export type ApplicationUrlTypes = "https://github.com/groundh0g/FannyPack" | "https://gamedevutils.com" | undefined;

export type ImageItems = { [key: string]: ImageItem };

export default class Project {
    public application: ApplicationTypes = "GameDevUtils.com";
    public version: VersionTypes = "0.3.0";
    public url: ApplicationUrlTypes = "https://gamedevutils.com";
    public options: ProjectOptions = new ProjectOptions();
    public images: ImageItems = {} as ImageItems;
    public isEmpty: boolean = false;

    public static get Empty() : Project { return { isEmpty: true } as Project; }

    public static Serialize(project : Project) : string {
        let replacer = (key, value) => ['frames', 'raw'].indexOf(key) >= 0 ? undefined : value;
        return JSON.stringify(project, replacer, 3);
    }

    public static Deserialize(data: string) : Project {
        const result = JSON.parse(data) as Project;
        try {
            Project.PopulateImageFrames(result);
        } catch { }
        return result;
    }

    public static PopulateImageFrames(project: Project) : void {
        // TODO: repopulate the image frames from image src
    }
}