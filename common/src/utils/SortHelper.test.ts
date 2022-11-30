import SortHelper from "./SortHelper";
import Project from "../objs/Project";
import ImageItem from "../objs/ImageItem";

describe("SortHelper", () => {

    test("Sorting new Project() works as expected", () => {
        const project = new Project();
        const sortByMethod = SortHelper.SortByMethods["NAME"];

        const result = sortByMethod(project);

        expect(result.length).toEqual(0);
    });

    const makeProject = () : Project => {
        const project = new Project();
        project.images['deck'] = new ImageItem();
        project.images['deck'].filename = 'deck';
        project.images['deck'].filetype = 'png';
        project.images['deck'].fullpath = '~/assets/deck.png';
        project.images['arcs'] = new ImageItem();
        project.images['arcs'].filename = 'arcs';
        project.images['arcs'].filetype = 'png';
        project.images['arcs'].fullpath = '~/assets/arcs.png';
        project.images['card'] = new ImageItem();
        project.images['card'].filename = 'card';
        project.images['card'].filetype = 'png';
        project.images['card'].fullpath = '~/assets/card.png';
        project.images['buck'] = new ImageItem();
        project.images['buck'].filename = 'buck';
        project.images['buck'].filetype = 'png';
        project.images['buck'].fullpath = '~/assets/buck.png';
        return project;
    };

    describe("Sorting by NAME[_DESC] works as expected", () => {

        test("Sorting project with images, sorted by NAME, works as expected", () => {
            const project = makeProject();
            const sortByMethod = SortHelper.SortByMethods["NAME"];

            const result = sortByMethod(project);

            expect(result.length).toEqual(4);
            expect(result).toStrictEqual(['arcs', 'buck', 'card', 'deck']);
        });

        test("Sorting project with images, sorted by NAME_DESC, works as expected", () => {
            const project = makeProject();
            const sortByMethod = SortHelper.SortByMethods["NAME_DESC"];

            const result = sortByMethod(project);

            expect(result.length).toEqual(4);
            expect(result).toStrictEqual(['deck', 'card', 'buck', 'arcs']);
        });

        test("Sorting project with images, sorted by NAME, with extension, works as expected", () => {
            const project = makeProject();
            project.options.nameInSheet = "Keep Extension";
            const sortByMethod = SortHelper.SortByMethods["NAME"];

            const result = sortByMethod(project);

            expect(result.length).toEqual(4);
            expect(result).toStrictEqual(['arcs', 'buck', 'card', 'deck']);
        });

        test("Sorting project with images, sorted by NAME_DESC, with extension, works as expected", () => {
            const project = makeProject();
            project.options.nameInSheet = "Keep Extension";
            const sortByMethod = SortHelper.SortByMethods["NAME_DESC"];

            const result = sortByMethod(project);

            expect(result.length).toEqual(4);
            expect(result).toStrictEqual(['deck', 'card', 'buck', 'arcs']);
        });

    });

    describe("Sorting by PATH[_DESC] works as expected", () => {

        test("Sorting project with images, sorted by PATH, works as expected", () => {
            const project = makeProject();
            const sortByMethod = SortHelper.SortByMethods["PATH"];

            const result = sortByMethod(project);

            expect(result.length).toEqual(4);
            expect(result).toStrictEqual(['arcs', 'buck', 'card', 'deck']);
        });

        test("Sorting project with images, sorted by PATH_DESC, works as expected", () => {
            const project = makeProject();
            const sortByMethod = SortHelper.SortByMethods["PATH_DESC"];

            const result = sortByMethod(project);

            expect(result.length).toEqual(4);
            expect(result).toStrictEqual(['deck', 'card', 'buck', 'arcs']);
        });

        test("Sorting project with images, sorted by PATH, with extension, works as expected", () => {
            const project = makeProject();
            project.options.nameInSheet = "Keep Extension";
            const sortByMethod = SortHelper.SortByMethods["PATH"];

            const result = sortByMethod(project);

            expect(result.length).toEqual(4);
            expect(result).toStrictEqual(['arcs', 'buck', 'card', 'deck']);
        });

        test("Sorting project with images, sorted by PATH_DESC, with extension, works as expected", () => {
            const project = makeProject();
            project.options.nameInSheet = "Keep Extension";
            const sortByMethod = SortHelper.SortByMethods["PATH_DESC"];

            const result = sortByMethod(project);

            expect(result.length).toEqual(4);
            expect(result).toStrictEqual(['deck', 'card', 'buck', 'arcs']);
        });

    });

});