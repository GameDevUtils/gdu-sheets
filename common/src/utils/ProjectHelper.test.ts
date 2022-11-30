import Project from "../objs/Project";
import ProjectHelper from "./ProjectHelper";
import ImageItem from "../objs/ImageItem";
import ImageFrame from "../objs/ImageFrame";
import Rectangle from "../objs/Rectangle";


describe("ProjectHelper", () => {

    // beforeAll(() => LogUtil.OutputModule = console );

    test("project can be serialized and deserialized", () => {
        const project1 = new Project();
        const image1 = new ImageItem();
        const frame = new ImageFrame();
        frame.spriteRect = Rectangle.Create(1, 2, 3, 4, true);
        (image1.frames ?? []).push(frame);
        project1.images['foo'] = image1;
        const data = ProjectHelper.Serialize(project1);
        const project2 = ProjectHelper.Deserialize(data, false);

        expect(project2).toStrictEqual(project1);
    });

});