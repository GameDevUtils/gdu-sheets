import Project, {ImageItems} from "./Project";
import ProjectOptions from "./ProjectOptions";

describe("ProjectOptions", () => {

    // beforeAll(() => LogUtil.OutputModule = console );

    test("Project.Empty() equals a new instance of same", () => {
        const project1 = Project.Empty;
        const project2 = new Project();
        project2.isEmpty = true;

        expect(project2).toStrictEqual(project1);
        expect(project2).not.toBe(project1);
    });

    test("Project.PROJECT_v0_3_0() equals a new instance of Project", () => {
        const project1 = Project.PROJECT_V0_3_0;
        const project2 = new Project();

        expect(project2).toStrictEqual(project1);
        expect(project2).not.toBe(project1);
    });

    test("Project.PROJECT_v0_2_0() equals a new instance of Project", () => {
        const project1 = Project.PROJECT_V0_2_0;
        const project2 = Object.assign(new Project(), {
            application: "FannyPack Sprite Sheets",
            version: "0.2.0",
            url: "https://github.com/groundh0g/FannyPack",
            options: new ProjectOptions(),
            images: {} as ImageItems,
            canvas: "",
            isEmpty: false,
        }) as Project;

        expect(project2).toStrictEqual(project1);
        expect(project2).not.toBe(project1);
    });

});