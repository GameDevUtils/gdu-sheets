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
    public canvas: string = "";
    public isEmpty: boolean = false;

    public static get Empty() : Project {
        const project = new Project();
        project.isEmpty = true;
        return project;
    }

    public static get PROJECT_V0_2_0() {
        return Object.assign(new Project(), {
            application: "FannyPack Sprite Sheets",
            version: "0.2.0",
            url: "https://github.com/groundh0g/FannyPack",
            options: new ProjectOptions(),
            images: {} as ImageItems,
            canvas: "",
            isEmpty: false,
        }) as Project;
    }

    public static get PROJECT_V0_3_0() {
        return new Project();
    }

}
