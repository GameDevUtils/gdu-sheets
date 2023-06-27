import SortHelper from "./SortHelper";
import Project from "../objs/Project";
import ImageItem from "../objs/ImageItem";
import ImageFrame from "../objs/ImageFrame";
import Rectangle from "../objs/Rectangle";
import PackerTestHelper from "./spritePackers/_PackerTestHelper";
import ParserHelper from "./ParserHelper";
import ProjectOptions from "../objs/ProjectOptions";
import BmpParser from "./frameParsers/BmpParser";
import GifParser from "./frameParsers/GifParser";
import PngParser from "./frameParsers/PngParser";
import JpgParser from "./frameParsers/JpgParser";

describe("SortHelper", () => {

    beforeAll(() => { 
        ParserHelper.RegisterParser(new BmpParser());
        ParserHelper.RegisterParser(new GifParser());
        ParserHelper.RegisterParser(new PngParser());
        ParserHelper.RegisterParser(new JpgParser());
    });

    const IMAGE_DATA = [
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAALCAIAAADJDItPAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kctLQkEUhz/tYZhlUIsWLSSsVUYZSG2ClKhAQsyg10ZvPgIfl3uVkLZBW6EgatNrUX9BbYPWQVAUQbStdVGbktu5GRiRZ5gz3/zmnMPMGbBG0kpGrx+ATDavhSf8rrn5BZftiUbsWGhlMKro6lgoFKSmvd9KpNi1x6xVO+5fa16O6wpYmoRHFVXLC08KB1fzqslbwh1KKrosfCLcp8kFhW9MPVbhZ5OTFf40WYuEA2BtE3Ylf3HsFyspLSMsL8edSReUn/uYL3HEs7MzsnbL7EInzAR+XEwxTgAfg4yI9+HBS7/sqJE/8J0/TU5yFfEqRTRWSJIiT5+oBakelzUhelxGmqLZ/7991RND3kp1hx8aHg3jtQdsm1AuGcbHgWGUD6HuAc6z1fzcPgy/iV6qau49cK7D6UVVi23D2QZ03qtRLfot1cm0JhLwcgwt89B+BfbFSs9+zjm6g8iafNUl7OxCr8Q7l74AKb1nylVCe+oAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAWSURBVBiVY/y8TpoBN2DCIzcqjQsAAFzmAdIfwZaYAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAWCAIAAABPIytRAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kctLQkEUhz/tYZhlUIsWLSSsVUYZSG2ClKhAQsyg10ZvPgIfl3uVkLZBW6EgatNrUX9BbYPWQVAUQbStdVGbktu5GRiRZ5gz3/zmnMPMGbBG0kpGrx+ATDavhSf8rrn5BZftiUbsWGhlMKro6lgoFKSmvd9KpNi1x6xVO+5fa16O6wpYmoRHFVXLC08KB1fzqslbwh1KKrosfCLcp8kFhW9MPVbhZ5OTFf40WYuEA2BtE3Ylf3HsFyspLSMsL8edSReUn/uYL3HEs7MzsnbL7EInzAR+XEwxTgAfg4yI9+HBS7/sqJE/8J0/TU5yFfEqRTRWSJIiT5+oBakelzUhelxGmqLZ/7991RND3kp1hx8aHg3jtQdsm1AuGcbHgWGUD6HuAc6z1fzcPgy/iV6qau49cK7D6UVVi23D2QZ03qtRLfot1cm0JhLwcgwt89B+BfbFSs9+zjm6g8iafNUl7OxCr8Q7l74AKb1nylVCe+oAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAdSURBVDiNY/y8TpqBXMBEts5RzaOaRzWPah7imgGOAQHoSobKXQAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAhCAIAAABBfoyNAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kctLQkEUhz/tYZhlUIsWLSSsVUYZSG2ClKhAQsyg10ZvPgIfl3uVkLZBW6EgatNrUX9BbYPWQVAUQbStdVGbktu5GRiRZ5gz3/zmnMPMGbBG0kpGrx+ATDavhSf8rrn5BZftiUbsWGhlMKro6lgoFKSmvd9KpNi1x6xVO+5fa16O6wpYmoRHFVXLC08KB1fzqslbwh1KKrosfCLcp8kFhW9MPVbhZ5OTFf40WYuEA2BtE3Ylf3HsFyspLSMsL8edSReUn/uYL3HEs7MzsnbL7EInzAR+XEwxTgAfg4yI9+HBS7/sqJE/8J0/TU5yFfEqRTRWSJIiT5+oBakelzUhelxGmqLZ/7991RND3kp1hx8aHg3jtQdsm1AuGcbHgWGUD6HuAc6z1fzcPgy/iV6qau49cK7D6UVVi23D2QZ03qtRLfot1cm0JhLwcgwt89B+BfbFSs9+zjm6g8iafNUl7OxCr8Q7l74AKb1nylVCe+oAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAsSURBVEiJY/y8TpqBNoCJRuaOGj1q9KjRo0aPGj1q9KjRo0aPGj1q9Eg0GgDlxQH+gxLRugAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAsCAIAAACYDW0sAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kctLQkEUhz/tYZhlUIsWLSSsVUYZSG2ClKhAQsyg10ZvPgIfl3uVkLZBW6EgatNrUX9BbYPWQVAUQbStdVGbktu5GRiRZ5gz3/zmnMPMGbBG0kpGrx+ATDavhSf8rrn5BZftiUbsWGhlMKro6lgoFKSmvd9KpNi1x6xVO+5fa16O6wpYmoRHFVXLC08KB1fzqslbwh1KKrosfCLcp8kFhW9MPVbhZ5OTFf40WYuEA2BtE3Ylf3HsFyspLSMsL8edSReUn/uYL3HEs7MzsnbL7EInzAR+XEwxTgAfg4yI9+HBS7/sqJE/8J0/TU5yFfEqRTRWSJIiT5+oBakelzUhelxGmqLZ/7991RND3kp1hx8aHg3jtQdsm1AuGcbHgWGUD6HuAc6z1fzcPgy/iV6qau49cK7D6UVVi23D2QZ03qtRLfot1cm0JhLwcgwt89B+BfbFSs9+zjm6g8iafNUl7OxCr8Q7l74AKb1nylVCe+oAAAAJcEhZcwAALiMAAC4jAXilP3YAAAA1SURBVFiF7c0xDQAwCACwMRv4fzGHAWQQktZAoyvfhr+yisVisVgsFovFYrFYLBaLxeKj8QC5VQIUnSxS5AAAAABJRU5ErkJggg==",

        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAKCAIAAADtkjPUAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kctLQkEUhz/tYZhlUIsWLSSsVUYZSG2ClKhAQsyg10ZvPgIfl3uVkLZBW6EgatNrUX9BbYPWQVAUQbStdVGbktu5GRiRZ5gz3/zmnMPMGbBG0kpGrx+ATDavhSf8rrn5BZftiUbsWGhlMKro6lgoFKSmvd9KpNi1x6xVO+5fa16O6wpYmoRHFVXLC08KB1fzqslbwh1KKrosfCLcp8kFhW9MPVbhZ5OTFf40WYuEA2BtE3Ylf3HsFyspLSMsL8edSReUn/uYL3HEs7MzsnbL7EInzAR+XEwxTgAfg4yI9+HBS7/sqJE/8J0/TU5yFfEqRTRWSJIiT5+oBakelzUhelxGmqLZ/7991RND3kp1hx8aHg3jtQdsm1AuGcbHgWGUD6HuAc6z1fzcPgy/iV6qau49cK7D6UVVi23D2QZ03qtRLfot1cm0JhLwcgwt89B+BfbFSs9+zjm6g8iafNUl7OxCr8Q7l74AKb1nylVCe+oAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAWSURBVBiVY/y8TpoBL2DCLz2qAgMAAFnKAdBgNEEIAAAAAElFTkSuQmCC",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAUCAIAAAAGHlpnAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kctLQkEUhz/tYZhlUIsWLSSsVUYZSG2ClKhAQsyg10ZvPgIfl3uVkLZBW6EgatNrUX9BbYPWQVAUQbStdVGbktu5GRiRZ5gz3/zmnMPMGbBG0kpGrx+ATDavhSf8rrn5BZftiUbsWGhlMKro6lgoFKSmvd9KpNi1x6xVO+5fa16O6wpYmoRHFVXLC08KB1fzqslbwh1KKrosfCLcp8kFhW9MPVbhZ5OTFf40WYuEA2BtE3Ylf3HsFyspLSMsL8edSReUn/uYL3HEs7MzsnbL7EInzAR+XEwxTgAfg4yI9+HBS7/sqJE/8J0/TU5yFfEqRTRWSJIiT5+oBakelzUhelxGmqLZ/7991RND3kp1hx8aHg3jtQdsm1AuGcbHgWGUD6HuAc6z1fzcPgy/iV6qau49cK7D6UVVi23D2QZ03qtRLfot1cm0JhLwcgwt89B+BfbFSs9+zjm6g8iafNUl7OxCr8Q7l74AKb1nylVCe+oAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAeSURBVDiNY/y8TpqBMsBEof5RI0aNGDVi1IghZwQAf+MB5FA6Y7YAAAAASUVORK5CYII=",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAeCAIAAAAtquBAAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kctLQkEUhz/tYZhlUIsWLSSsVUYZSG2ClKhAQsyg10ZvPgIfl3uVkLZBW6EgatNrUX9BbYPWQVAUQbStdVGbktu5GRiRZ5gz3/zmnMPMGbBG0kpGrx+ATDavhSf8rrn5BZftiUbsWGhlMKro6lgoFKSmvd9KpNi1x6xVO+5fa16O6wpYmoRHFVXLC08KB1fzqslbwh1KKrosfCLcp8kFhW9MPVbhZ5OTFf40WYuEA2BtE3Ylf3HsFyspLSMsL8edSReUn/uYL3HEs7MzsnbL7EInzAR+XEwxTgAfg4yI9+HBS7/sqJE/8J0/TU5yFfEqRTRWSJIiT5+oBakelzUhelxGmqLZ/7991RND3kp1hx8aHg3jtQdsm1AuGcbHgWGUD6HuAc6z1fzcPgy/iV6qau49cK7D6UVVi23D2QZ03qtRLfot1cm0JhLwcgwt89B+BfbFSs9+zjm6g8iafNUl7OxCr8Q7l74AKb1nylVCe+oAAAAJcEhZcwAALiMAAC4jAXilP3YAAAAsSURBVEiJY/y8TpqBxoCJ1haM2jFqx6gdo3aM2jFqx6gdo3aM2jFqxzC3AwC9AwH4w1GqAQAAAABJRU5ErkJggg==",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAoCAIAAAAKd49AAAABgmlDQ1BzUkdCIElFQzYxOTY2LTIuMQAAKJF1kctLQkEUhz/tYZhlUIsWLSSsVUYZSG2ClKhAQsyg10ZvPgIfl3uVkLZBW6EgatNrUX9BbYPWQVAUQbStdVGbktu5GRiRZ5gz3/zmnMPMGbBG0kpGrx+ATDavhSf8rrn5BZftiUbsWGhlMKro6lgoFKSmvd9KpNi1x6xVO+5fa16O6wpYmoRHFVXLC08KB1fzqslbwh1KKrosfCLcp8kFhW9MPVbhZ5OTFf40WYuEA2BtE3Ylf3HsFyspLSMsL8edSReUn/uYL3HEs7MzsnbL7EInzAR+XEwxTgAfg4yI9+HBS7/sqJE/8J0/TU5yFfEqRTRWSJIiT5+oBakelzUhelxGmqLZ/7991RND3kp1hx8aHg3jtQdsm1AuGcbHgWGUD6HuAc6z1fzcPgy/iV6qau49cK7D6UVVi23D2QZ03qtRLfot1cm0JhLwcgwt89B+BfbFSs9+zjm6g8iafNUl7OxCr8Q7l74AKb1nylVCe+oAAAAJcEhZcwAALiMAAC4jAXilP3YAAABBSURBVFiF7c4xFYAwEECxKzbwv2KuBpj+q4QuiYKs/b1z23M7MCNxSEQiEpGIRCQiEYlIRCISkYhEJCIRiUhEIj9ekQIM5mCvEAAAAABJRU5ErkJggg==",
    ];

    const makeProject = (extended: boolean = false) : Project => {
        const project = new Project();

        project.images['deck'] = ParserHelper.RegisteredParsers["PNG"].ParseImageData(IMAGE_DATA[3], `./deck.png`);
        // project.images['deck'] = new ImageItem();
        // project.images['deck'].filename = 'deck';
        // project.images['deck'].filetype = 'png';
        // project.images['deck'].fullpath = '~/assets/deck.png';
        // project.images['deck'].height = 40;
        // project.images['deck'].width = 44;

        project.images['arcs'] = ParserHelper.RegisteredParsers["PNG"].ParseImageData(IMAGE_DATA[2], `./arcs.png`);
        // project.images['arcs'] = new ImageItem();
        // project.images['arcs'].filename = 'arcs';
        // project.images['arcs'].filetype = 'png';
        // project.images['arcs'].fullpath = '~/assets/arcs.png';
        // project.images['arcs'].height = 30;
        // project.images['arcs'].width = 33;

        project.images['card'] = ParserHelper.RegisteredParsers["PNG"].ParseImageData(IMAGE_DATA[1], `./card.png`);
        // project.images['card'] = new ImageItem();
        // project.images['card'].filename = 'card';
        // project.images['card'].filetype = 'png';
        // project.images['card'].fullpath = '~/assets/card.png';
        // project.images['card'].height = 10;
        // project.images['card'].width = 11;

        project.images['buck'] = ParserHelper.RegisteredParsers["PNG"].ParseImageData(IMAGE_DATA[0], `./buck.png`);
        // project.images['buck'] = new ImageItem();
        // project.images['buck'].filename = 'buck';
        // project.images['buck'].filetype = 'png';
        // project.images['buck'].fullpath = '~/assets/buck.png';
        // project.images['buck'].width = 20;
        // project.images['buck'].height = 22;

        if(extended) {
            project.images['peck'] = ParserHelper.RegisteredParsers["PNG"].ParseImageData(IMAGE_DATA[7], `./peck.png`);
            // project.images['peck'] = new ImageItem();
            // project.images['peck'].filename = 'deck';
            // project.images['peck'].filetype = 'png';
            // project.images['peck'].fullpath = '~/assets/deck.png';
            // project.images['peck'].height = 44;
            // project.images['peck'].width = 40;

            project.images['orcs'] = ParserHelper.RegisteredParsers["PNG"].ParseImageData(IMAGE_DATA[6], `./orcs.png`);
            // project.images['orcs'] = new ImageItem();
            // project.images['orcs'].filename = 'arcs';
            // project.images['orcs'].filetype = 'png';
            // project.images['orcs'].fullpath = '~/assets/arcs.png';
            // project.images['orcs'].height = 30;
            // project.images['orcs'].width = 30;

            project.images['hard'] = ParserHelper.RegisteredParsers["PNG"].ParseImageData(IMAGE_DATA[5], `./hard.png`);
            // project.images['hard'] = new ImageItem();
            // project.images['hard'].filename = 'card';
            // project.images['hard'].filetype = 'png';
            // project.images['hard'].fullpath = '~/assets/card.png';
            // project.images['hard'].height = 11;
            // project.images['hard'].width = 10;

            project.images['duck'] = ParserHelper.RegisteredParsers["PNG"].ParseImageData(IMAGE_DATA[4], `./duck.png`);
            // project.images['duck'] = new ImageItem();
            // project.images['duck'].filename = 'buck';
            // project.images['duck'].filetype = 'png';
            // project.images['duck'].fullpath = '~/assets/buck.png';
            // project.images['duck'].width = 22;
            // project.images['duck'].height = 20;
        }

        project.options.trimMode = "None";

        return project;
    };

    describe("SortHelper, with trim mode None", () => {

        test("Sorting new Project() works as expected", () => {
            const project = new Project();
            const sortByMethod = SortHelper.SortByMethods["NAME"];

            const result = sortByMethod(project);

            expect(result.length).toEqual(0);
        });

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

            // note that this and the next test result in the same ordering since the fullpath values are all undefined.
            test("Sorting project with images, sorted by PATH with missing image.fullpath data, works as expected", () => {
                const project = makeProject();
                project.options.trimMode = "Trim";
                const sortByMethod = SortHelper.SortByMethods["PATH"];
                
                for (let key in project.images) {
                    project.images[key].fullpath = undefined;
                }

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

            // note that this and the previous test result in the same ordering since the fullpath values are all undefined.
            test("Sorting project with images, sorted by PATH_DESC with missing image.fullpath data, works as expected", () => {
                const project = makeProject();
                project.options.trimMode = "Trim";
                const sortByMethod = SortHelper.SortByMethods["PATH_DESC"];
                
                for (let key in project.images) {
                    project.images[key].fullpath = undefined;
                }

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

        });

        describe("Sorting by WIDTH[_DESC] works as expected", () => {

            test("Sorting project with images, sorted by WIDTH, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["WIDTH"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['buck', 'card', 'arcs', 'deck']);
            });

            test("Sorting project with images, sorted by WIDTH_DESC, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["WIDTH_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

            // test("Sorting project with images, sorted by WIDTH, works as expected", () => {
            //     const project = makeProject();
            //     project.options.trimMode = "Trim";
            //     const sortByMethod = SortHelper.SortByMethods["WIDTH"];
            //
            //     const result = sortByMethod(project);
            //
            //     expect(result.length).toEqual(4);
            //     expect(result).toStrictEqual(['card', 'buck', 'arcs', 'deck']);
            // });
            //
            // test("Sorting project with images, sorted by WIDTH_DESC, works as expected", () => {
            //     const project = makeProject();
            //     project.options.trimMode = "Trim";
            //     const sortByMethod = SortHelper.SortByMethods["WIDTH_DESC"];
            //
            //     const result = sortByMethod(project);
            //
            //     expect(result.length).toEqual(4);
            //     expect(result).toStrictEqual(['deck', 'arcs', 'buck', 'card']);
            // });

        });

        describe("Sorting by HEIGHT[_DESC] works as expected", () => {

            test("Sorting project with images, sorted by HEIGHT, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["HEIGHT"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['buck', 'card', 'arcs', 'deck']);
            });

            test("Sorting project with images, sorted by HEIGHT_DESC, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["HEIGHT_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

        });

        describe("Sorting by AREA[_DESC] works as expected", () => {

            test("Sorting project with images, sorted by AREA, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["AREA"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['buck', 'card', 'arcs', 'deck']);
            });

            test("Sorting project with images, sorted by AREA_DESC, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["AREA_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

        });

        describe("Sorting by SHORTER_SIDE[_DESC] works as expected", () => {

            test("Sorting project with images, sorted by AREA, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["SHORTER_SIDE"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['buck', 'card', 'arcs', 'deck']);
            });

            test("Sorting project with images, sorted by SHORTER_SIDE_DESC, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["SHORTER_SIDE_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

        });

        describe("Sorting by LONGER_SIDE[_DESC] works as expected", () => {

            test("Sorting project with images, sorted by LONGER_SIDE, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["LONGER_SIDE"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['buck', 'card', 'arcs', 'deck']);
            });

            test("Sorting project with images, sorted by LONGER_SIDE_DESC, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["LONGER_SIDE_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

        });

        describe("Sorting by PERIMETER[_DESC] works as expected", () => {

            test("Sorting project with images, sorted by PERIMETER, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["PERIMETER"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['buck', 'card', 'arcs', 'deck']);
            });

            test("Sorting project with images, sorted by PERIMETER_DESC, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["PERIMETER_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

        });

        describe("Sorting by SIDE_DIFF[_DESC] works as expected", () => {

            test("Sorting project with images, sorted by SIDE_DIFF, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["SIDE_DIFF"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['buck', 'card', 'arcs', 'deck']);
            });

            test("Sorting project with images, sorted by SIDE_DIFF_DESC, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["SIDE_DIFF_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

        });

        describe("Sorting by SIDE_RATIO[_DESC] works as expected", () => {

            test("Sorting project with images, sorted by SIDE_RATIO, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["SIDE_RATIO"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

            test("Sorting project with images, sorted by SIDE_RATIO_DESC, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["SIDE_RATIO_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

        });

    });

    describe("SortHelper, with trim mode Trim", () => {

        beforeAll(() => {
            // PackerTestHelper.InitParsers();
        });

        test("Sorting new Project() works as expected", () => {
            const project = new Project();
            const sortByMethod = SortHelper.SortByMethods["NAME"];

            const result = sortByMethod(project);

            expect(result.length).toEqual(0);
        });

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

        describe("Sorting by WIDTH[_DESC] works as expected", () => {

            test("Sorting project with images, sorted by WIDTH, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["WIDTH"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['buck', 'card', 'arcs', 'deck']);
            });

            test("Sorting project with images, sorted by WIDTH_DESC, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["WIDTH_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

        });

        describe("Sorting by HEIGHT[_DESC] works as expected", () => {

            test("Sorting project with images, sorted by HEIGHT, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["HEIGHT"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['buck', 'card', 'arcs', 'deck']);
            });

            test("Sorting project with images, sorted by HEIGHT_DESC, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["HEIGHT_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

        });

        describe("Sorting by AREA[_DESC] works as expected", () => {

            test("Sorting project with images, sorted by AREA, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["AREA"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['buck', 'card', 'arcs', 'deck']);
            });

            test("Sorting project with images, sorted by AREA_DESC, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["AREA_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

        });

        describe("Sorting by AREA[_DESC] works with trim as expected", () => {

            test("Sorting project with images, sorted by AREA, works as expected", () => {
                const project = makeProject();
                project.options.trimMode = "Trim";
                const sortByMethod = SortHelper.SortByMethods["AREA"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['buck', 'card', 'arcs', 'deck']);
            });

            test("Sorting project with images, sorted by AREA_DESC, works as expected", () => {
                const project = makeProject();
                project.options.trimMode = "Trim";
                const sortByMethod = SortHelper.SortByMethods["AREA_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

        });

        describe("Sorting by SHORTER_SIDE[_DESC] works as expected", () => {

            test("Sorting project with images, sorted by AREA, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["SHORTER_SIDE"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['buck', 'card', 'arcs', 'deck']);
            });

            test("Sorting project with images, sorted by SHORTER_SIDE_DESC, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["SHORTER_SIDE_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

        });

        describe("Sorting by LONGER_SIDE[_DESC] works as expected", () => {

            test("Sorting project with images, sorted by LONGER_SIDE, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["LONGER_SIDE"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['buck', 'card', 'arcs', 'deck']);
            });

            test("Sorting project with images, sorted by LONGER_SIDE_DESC, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["LONGER_SIDE_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

        });

        describe("Sorting by PERIMETER[_DESC] works as expected", () => {

            test("Sorting project with images, sorted by PERIMETER, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["PERIMETER"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['buck', 'card', 'arcs', 'deck']);
            });

            test("Sorting project with images, sorted by PERIMETER_DESC, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["PERIMETER_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

        });

        describe("Sorting by SIDE_DIFF[_DESC] works as expected", () => {

            test("Sorting project with images, sorted by SIDE_DIFF, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["SIDE_DIFF"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['buck', 'card', 'arcs', 'deck']);
            });

            test("Sorting project with images, sorted by SIDE_DIFF_DESC, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["SIDE_DIFF_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

        });

        describe("Sorting by SIDE_RATIO[_DESC] works as expected", () => {

            test("Sorting project with images, sorted by SIDE_RATIO, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["SIDE_RATIO"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

            test("Sorting project with images, sorted by SIDE_RATIO_DESC, works as expected", () => {
                const project = makeProject();
                const sortByMethod = SortHelper.SortByMethods["SIDE_RATIO_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(4);
                expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
            });

        });

        describe("Sorting by LONGER_SIDE[_DESC] works as expected, extended", () => {

            test("Sorting project with images, sorted by LONGER_SIDE, works as expected, extended", () => {
                const project = makeProject(true);
                const sortByMethod = SortHelper.SortByMethods["LONGER_SIDE"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(8);
                expect(result).toStrictEqual(['buck', 'duck', 'card', 'hard', 'arcs', 'orcs', 'deck', 'peck']);
            });

            test("Sorting project with images, sorted by LONGER_SIDE_DESC, works as expected, extended", () => {
                const project = makeProject(true);
                const sortByMethod = SortHelper.SortByMethods["LONGER_SIDE_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(8);
                expect(result).toStrictEqual(['deck', 'peck', 'arcs', 'orcs', 'card', 'hard', 'buck', 'duck']);
            });

        });

        describe("Sorting by LONGER_SIDE[_DESC] works as expected, bad image size", () => {

            test("Sorting project with images, sorted by LONGER_SIDE, works as expected, extended", () => {
                const project = makeProject(true);
                const sortByMethod = SortHelper.SortByMethods["LONGER_SIDE"];
                // project.images['deck'].width = project.images['deck'].height = undefined;
                const result = sortByMethod(project);

                expect(result.length).toEqual(8);
                expect(result).toStrictEqual(['buck', 'duck', 'card', 'hard', 'arcs', 'orcs', 'deck', 'peck']);
            });

            test("Sorting project with images, sorted by LONGER_SIDE_DESC, works as expected, extended", () => {
                const project = makeProject(true);
                const sortByMethod = SortHelper.SortByMethods["LONGER_SIDE_DESC"];

                const result = sortByMethod(project);

                expect(result.length).toEqual(8);
                expect(result).toStrictEqual(['deck', 'peck', 'arcs', 'orcs', 'card', 'hard', 'buck', 'duck']);
            });

        });

    });



    describe("handles missing data", () => { 

        test("handles missing image filename ascending", async () => { 
            const project = makeProject();
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "NAME";
            const sortByMethod = SortHelper.SortByMethods["NAME"];
            for (let key in project.images) {
                project.images[key].filename = undefined;
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(4);
            expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
        });

        test("handles missing image filename descending", async () => { 
            const project = makeProject();
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "NAME_DESC";
            const sortByMethod = SortHelper.SortByMethods["NAME_DESC"];
            for (let key in project.images) {
                project.images[key].filename = undefined;
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(4);
            expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
        });

        test("handles missing padding options short side ascending", async () => { 
            const project = makeProject();
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "SHORTER_SIDE";
            project.options.innerPadding = project.options.shapePadding = project.options.borderPadding = undefined;
            const sortByMethod = SortHelper.SortByMethods["SHORTER_SIDE"];

            const result = sortByMethod(project);

            expect(result.length).toEqual(4);
            expect(result).toStrictEqual(['buck', 'card', 'arcs', 'deck']);
        });

        test("handles missing padding options short side descending", async () => { 
            const project = makeProject();
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "SHORTER_SIDE_DESC";
            project.options.innerPadding = project.options.shapePadding = project.options.borderPadding = undefined;
            const sortByMethod = SortHelper.SortByMethods["SHORTER_SIDE_DESC"];

            const result = sortByMethod(project);

            expect(result.length).toEqual(4);
            expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
        });







        test("handles missing image width and height ascending", async () => { 
            const project = makeProject();
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "SHORTER_SIDE";
            const sortByMethod = SortHelper.SortByMethods["SHORTER_SIDE"];
            for (let key in project.images) {
                const image = project.images[key];
                image.width = image.height = undefined;
                // if (image.frames && image.frames.length) {
                //     image.frames.forEach((frame, index, frames) => { 
                //         frame.spriteRect.width = frame.spriteRect.height = undefined;
                //     });
                // }
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(4);
            expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
        });

        test("handles missing image width and height descending", async () => { 
            const project = makeProject();
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "SHORTER_SIDE_DESC";
            const sortByMethod = SortHelper.SortByMethods["SHORTER_SIDE_DESC"];
            for (let key in project.images) {
                project.images[key].width = project.images[key].height = undefined;
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(4);
            expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
        });





        test("handles missing image width and height with trim enabled ascending", async () => { 
            const project = makeProject();
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "SHORTER_SIDE";
            project.options.trimMode = "Trim";
            const sortByMethod = SortHelper.SortByMethods["SHORTER_SIDE"];
            for (let key in project.images) {
                const image = project.images[key];
                image.width = image.height = undefined;
                // if (image.frames && image.frames.length) {
                //     image.frames.forEach((frame, index, frames) => { 
                //         frame.spriteRect.width = frame.spriteRect.height = undefined;
                //     });
                // }
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(4);
            expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck'].reverse());
        });

        test("handles missing image width and height with trim enabled descending", async () => { 
            const project = makeProject();
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "SHORTER_SIDE_DESC";
            project.options.trimMode = "Trim";
            const sortByMethod = SortHelper.SortByMethods["SHORTER_SIDE_DESC"];
            for (let key in project.images) {
                project.images[key].width = project.images[key].height = undefined;
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(4);
            expect(result).toStrictEqual(['deck', 'arcs', 'card', 'buck']);
        });

        test("handles missing image width and height with trim enabled ascending", async () => { 
            const project = makeProject(true);
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "LONGER_SIDE";
            project.options.trimMode = "Trim";
            const sortByMethod = SortHelper.SortByMethods["LONGER_SIDE"];
            for (let key in project.images) {
                const image = project.images[key];
                image.width = image.height = undefined;
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(8);
            expect(result).toStrictEqual(['peck', 'deck', 'orcs', 'arcs', 'hard', 'card', 'duck', 'buck'].reverse());
        });

        test("handles missing image width and height with trim enabled descending", async () => { 
            const project = makeProject(true);
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "LONGER_SIDE_DESC";
            project.options.trimMode = "Trim";
            const sortByMethod = SortHelper.SortByMethods["LONGER_SIDE_DESC"];
            for (let key in project.images) {
                const image = project.images[key];
                image.width = image.height = undefined;
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(8);
            expect(result).toStrictEqual(['deck', 'peck', 'arcs', 'orcs', 'card', 'hard', 'buck', 'duck']);
        });

        test("handles missing image width and height with trim enabled ascending", async () => { 
            const project = makeProject(true);
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "PERIMETER";
            project.options.trimMode = "Trim";
            const sortByMethod = SortHelper.SortByMethods["PERIMETER"];
            for (let key in project.images) {
                const image = project.images[key];
                image.width = image.height = undefined;
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(8);
            expect(result).toStrictEqual(['peck', 'deck', 'orcs', 'arcs', 'hard', 'card', 'duck', 'buck'].reverse());
        });

        test("handles missing image width and height with trim enabled descending", async () => { 
            const project = makeProject(true);
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "PERIMETER_DESC";
            project.options.trimMode = "Trim";
            const sortByMethod = SortHelper.SortByMethods["PERIMETER_DESC"];
            for (let key in project.images) {
                const image = project.images[key];
                image.width = image.height = undefined;
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(8);
            expect(result).toStrictEqual(['deck', 'peck', 'arcs', 'orcs', 'card', 'hard', 'buck', 'duck']);
        });

        test("handles missing image width and height with trim enabled ascending", async () => { 
            const project = makeProject(true);
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "SIDE_DIFF";
            project.options.trimMode = "Trim";
            const sortByMethod = SortHelper.SortByMethods["SIDE_DIFF"];
            for (let key in project.images) {
                const image = project.images[key];
                image.width = image.height = undefined;
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(8);
            expect(result).toStrictEqual(['peck', 'deck', 'orcs', 'arcs', 'hard', 'card', 'duck', 'buck'].reverse());
        });

        test("handles missing image width and height with trim enabled descending", async () => { 
            const project = makeProject(true);
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "SIDE_DIFF_DESC";
            project.options.trimMode = "Trim";
            const sortByMethod = SortHelper.SortByMethods["SIDE_DIFF_DESC"];
            for (let key in project.images) {
                const image = project.images[key];
                image.width = image.height = undefined;
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(8);
            expect(result).toStrictEqual(['deck', 'peck', 'arcs', 'orcs', 'card', 'hard', 'buck', 'duck']);
        });

        test("handles missing image width and height with trim enabled ascending", async () => { 
            const project = makeProject(true);
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "SIDE_RATIO";
            project.options.trimMode = "Trim";
            const sortByMethod = SortHelper.SortByMethods["SIDE_RATIO"];
            for (let key in project.images) {
                const image = project.images[key];
                image.width = image.height = undefined;
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(8);
            expect(result).toStrictEqual(['duck', 'hard', 'orcs', 'peck', 'buck', 'card', 'arcs', 'deck'].reverse());
        });

        test("handles missing image width and height with trim enabled descending", async () => { 
            const project = makeProject(true);
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "SIDE_RATIO_DESC";
            project.options.trimMode = "Trim";
            const sortByMethod = SortHelper.SortByMethods["SIDE_RATIO_DESC"];
            for (let key in project.images) {
                const image = project.images[key];
                image.width = image.height = undefined;
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(8);
            expect(result).toStrictEqual(['peck', 'orcs', 'hard', 'duck', 'deck', 'arcs', 'card', 'buck']);
        });

        test("handles missing image width and height with trim enabled ascending", async () => { 
            const project = makeProject(true);
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "WIDTH";
            project.options.trimMode = "Trim";
            const sortByMethod = SortHelper.SortByMethods["WIDTH"];
            for (let key in project.images) {
                const image = project.images[key];
                image.width = image.height = undefined;
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(8);
            expect(result).toStrictEqual(['peck', 'deck', 'orcs', 'arcs', 'hard', 'card', 'duck', 'buck'].reverse());
        });

        test("handles missing image width and height with trim enabled descending", async () => { 
            const project = makeProject(true);
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "WIDTH_DESC";
            project.options.trimMode = "Trim";
            const sortByMethod = SortHelper.SortByMethods["WIDTH_DESC"];
            for (let key in project.images) {
                const image = project.images[key];
                image.width = image.height = undefined;
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(8);
            expect(result).toStrictEqual(['peck', 'deck', 'orcs', 'arcs', 'hard', 'card', 'duck', 'buck']);
        });

        test("handles missing image width and height with trim enabled ascending", async () => { 
            const project = makeProject(true);
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "HEIGHT";
            project.options.trimMode = "Trim";
            const sortByMethod = SortHelper.SortByMethods["HEIGHT"];
            for (let key in project.images) {
                const image = project.images[key];
                image.width = image.height = undefined;
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(8);
            expect(result).toStrictEqual(['deck', 'peck', 'arcs', 'orcs', 'card', 'hard', 'buck', 'duck'].reverse());
        });

        test("handles missing image width and height with trim enabled descending", async () => { 
            const project = makeProject(true);
            project.options.width = project.options.height = 1024;
            project.options.sortBy = "HEIGHT_DESC";
            project.options.trimMode = "Trim";
            const sortByMethod = SortHelper.SortByMethods["HEIGHT_DESC"];
            for (let key in project.images) {
                const image = project.images[key];
                image.width = image.height = undefined;
            }

            const result = sortByMethod(project);

            expect(result.length).toEqual(8);
            expect(result).toStrictEqual(['deck', 'peck', 'arcs', 'orcs', 'card', 'hard', 'buck', 'duck']);
        });

    });

});
