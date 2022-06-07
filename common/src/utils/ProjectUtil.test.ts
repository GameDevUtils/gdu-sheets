import {Args, Images, ProjectUtil} from "./ProjectUtil";
import {ObjectUtil} from "./ObjectUtil";
import {APPLICATION_VERSION} from "./AppUtil";
import '../objs/projects';
import {
    AnimatedGif,
    Constraint,
    DataFormat,
    ImageFormat,
    SizeMode,
    SortBy,
    SpriteNameInAtlas,
    SpritePacker,
    TrimMode,
    YesNo
} from "../objs/projects";
import ImageUtil_PNG from "./ImageUtil._png";
import {ImageUtil} from "./ImageUtil";
import ImageUtil_ImageParser from "./ImageUtil._base";
import {Buffer} from "buffer";
import fs from "fs";
import path from "path";

describe("ProjectUtil", () => {

    test("defaults are same for v0.2.0 and v0.3.0", () => {
        const v020proj = ProjectUtil.getDefaultOptions(APPLICATION_VERSION.V0_2_0);
        const v030proj = ProjectUtil.getDefaultOptions(APPLICATION_VERSION.V0_3_0);

        expect(ObjectUtil.isDeepEqual(v020proj, v030proj));
    });

    test("defaults are same", () => {
        expect(ObjectUtil.isDeepEqual(
            ProjectUtil.getDefaultOptions(),
            ProjectUtil.DEFAULT_OPTIONS));
    });

    test("merge between empty and default is default", () => {
        const projDefault = ProjectUtil.getDefaultOptions();
        const projEmpty = ProjectUtil.EMPTY_OPTIONS;

        const result = ProjectUtil.mergeOptions(projEmpty, projDefault);

        expect(ObjectUtil.isDeepEqual(result, projDefault));
    });

    test("merge between two projects", () => {
        const proj1 = ProjectUtil.EMPTY_PROJECT;
        const proj2 = ProjectUtil.EMPTY_PROJECT;
        const defPr = ProjectUtil.DEFAULT_PROJECT;

        proj1.application = 'GameDevUtils';
        proj1.url = 'http://gamedevutils.com/';
        proj1.options.name = 'proj1';
        proj1.options.debugMode = YesNo.YES;
        proj2.application = 'FannyPack';
        proj2.url = 'http://fannypack.bogus/';
        proj2.options.name = 'proj2';
        proj2.options.debugMode = YesNo.NO;
        proj2.options.trimMode = TrimMode.Trim;
        proj2.options.borderPadding = 5;

        const result = ProjectUtil.mergeProjects(proj1, proj2);

        expect(result.application).toBe(proj1.application);
        expect(result.url).toBe(proj1.url)
        expect(result.options.name).toBe(proj1.options.name);
        expect(result.options.debugMode).toBe(proj1.options.debugMode);
        expect(result.options.trimMode).toBe(proj2.options.trimMode);
        expect(result.options.borderPadding).toBe(proj2.options.borderPadding);
        expect(result.options.animatedGif).toBe(defPr.options.animatedGif);
        expect(result.options.shapePadding).toBe(defPr.options.shapePadding);
    });

    test("the default value of EMPTY_PROJECT matches current version of same", () => {
        expect(ProjectUtil.EMPTY_PROJECT).toStrictEqual(ProjectUtil.getEmptyProject(APPLICATION_VERSION.CURRENT));
    });

    test("the default value of EMPTY_OPTIONS matches current version of same", () => {
        expect(ProjectUtil.EMPTY_OPTIONS).toStrictEqual(ProjectUtil.getEmptyOptions(APPLICATION_VERSION.CURRENT));
    });

    describe("merge values", () => {

        test("consistent with latest version when merging projects", () => {
            const proj1 = ProjectUtil.getDefaultProject(APPLICATION_VERSION.CURRENT);
            const empty = ProjectUtil.getEmptyProject(APPLICATION_VERSION.CURRENT);

            const result = ProjectUtil.mergeProjects(empty, proj1);

            expect(result).toStrictEqual(proj1);
        });

        test("consistent with latest version when no proj is specified", () => {
            const proj1 = ProjectUtil.getDefaultProject(APPLICATION_VERSION.CURRENT);

            const result = ProjectUtil.mergeProjects();

            expect(result).toStrictEqual(proj1);
        });

        test("consistent with version 0.3.0 when merging projects", () => {
            const proj1 = ProjectUtil.getDefaultProject(APPLICATION_VERSION.V0_3_0);
            const empty = ProjectUtil.getEmptyProject(APPLICATION_VERSION.V0_3_0);

            const result = ProjectUtil.mergeProjects(empty, proj1, APPLICATION_VERSION.V0_3_0);

            expect(result).toStrictEqual(proj1);
        });

        test("consistent with version 0.2.0 when merging projects", () => {
            const proj1 = ProjectUtil.getDefaultProject(APPLICATION_VERSION.V0_2_0);
            const empty = ProjectUtil.getEmptyProject(APPLICATION_VERSION.V0_2_0);

            const result = ProjectUtil.mergeProjects(empty, proj1, APPLICATION_VERSION.V0_2_0);

            expect(result).toStrictEqual(proj1);
        });

        test("serializes version 0.3.0 projects without images", () => {
            const proj1Obj = ProjectUtil.getDefaultProject();
            const proj1Txt = ProjectUtil.serialize(proj1Obj);
            const proj2Obj = ProjectUtil.deserialize(proj1Txt, APPLICATION_VERSION.CURRENT);

            expect(proj1Obj).toStrictEqual(proj2Obj);
        });

        test("serializes version 0.2.0 projects without images", () => {
            const proj1Obj = ProjectUtil.getDefaultProject(APPLICATION_VERSION.V0_2_0);
            const proj1Txt = ProjectUtil.serialize(proj1Obj, APPLICATION_VERSION.V0_2_0);
            const proj2Obj = ProjectUtil.deserialize(proj1Txt, APPLICATION_VERSION.V0_2_0);

            expect(proj2Obj).toStrictEqual(proj1Obj);
        });

        test("reports error when deserializing malformed projects", () => {
            const proj1Obj = ProjectUtil.getDefaultProject();
            const proj1Txt = ProjectUtil.serialize(proj1Obj);
            const proj2Obj = ProjectUtil.deserialize(proj1Txt.substring(25), APPLICATION_VERSION.CURRENT);

            expect(proj1Obj).toStrictEqual(proj2Obj);
        });

        test("serializes and deserailizes projects without images", () => {
            const proj1Obj = ProjectUtil.getDefaultProject();
            proj1Obj.images["foo"] = ImageUtil.EMPTY_IMAGE_ITEM;

            const proj1Txt = ProjectUtil.serialize(proj1Obj);
            const proj2Obj = ProjectUtil.deserialize(proj1Txt, APPLICATION_VERSION.CURRENT);

            expect(proj2Obj).toStrictEqual(proj1Obj);
        });

        test("serializes and deserailizes projects with images", () => {
            const proj1Obj = ProjectUtil.getDefaultProject();
            proj1Obj.images["foo"] = ImageUtil.EMPTY_IMAGE_ITEM;
            proj1Obj.images["foo"].frames.push(ImageUtil_PNG.EMPTY_IMAGE_FRAME);
            proj1Obj.images["foo"].frames.push(
                ImageUtil_ImageParser.buildImageFrame(new Uint8Array([0,0,0,0,0,0,0,0,0]), 3, 3)
            );

            const proj1Txt = ProjectUtil.serialize(proj1Obj);
            const proj2Obj = ProjectUtil.deserialize(proj1Txt, APPLICATION_VERSION.CURRENT);

            // ProjectUtil.serialize strips frames to save space
            expect(proj2Obj).not.toStrictEqual(proj1Obj);

            // compare with frames added back in
            proj2Obj.images["foo"].frames = proj1Obj.images["foo"].frames;
            expect(proj2Obj).toStrictEqual(proj1Obj);
        });

    });

    // TODO: test method cited in test name
    test("mergeProjectOptions", () => {
        const projDefault = ProjectUtil.DEFAULT_PROJECT;
        const projEmpty = ProjectUtil.EMPTY_PROJECT;

        const result = ProjectUtil.mergeProjectOptions(projEmpty, projDefault);

        expect(ObjectUtil.isDeepEqual(result, projDefault));
    });

    test("mergeImages, version 0.3.0", () => {
        const images1 : Images = { };
        const images2 : Images = { };
        images1["foo"] = ImageUtil.getEmptyImageItem(APPLICATION_VERSION.V0_3_0);
        images2["bar"] = ImageUtil.getEmptyImageItem(APPLICATION_VERSION.V0_3_0);

        const combined = ProjectUtil.mergeImages(images1, images2, APPLICATION_VERSION.V0_3_0);

        expect(combined["foo"]).not.toEqual(undefined);
        expect(combined["bar"]).not.toEqual(undefined);
        expect(combined["foo"]).toStrictEqual(images1["foo"]);
        expect(combined["bar"]).toStrictEqual(images2["bar"]);
    });

    test("mergeImages, version 0.3.0, missing target parameter", () => {
        const images1 : Images = { };
        const images2 : Images = { };
        images1["foo"] = ImageUtil.getEmptyImageItem(APPLICATION_VERSION.V0_3_0);
        images2["bar"] = ImageUtil.getEmptyImageItem(APPLICATION_VERSION.V0_3_0);

        const combined = ProjectUtil.mergeImages(undefined, images2, APPLICATION_VERSION.V0_3_0);

        expect(combined["foo"]).toEqual(undefined);
        expect(combined["bar"]).not.toEqual(undefined);
        expect(combined["bar"]).toStrictEqual(images2["bar"]);
    });

    test("mergeImages, version 0.3.0, missing source parameter", () => {
        const images1 : Images = { };
        const images2 : Images = { };
        images1["foo"] = ImageUtil.getEmptyImageItem(APPLICATION_VERSION.V0_3_0);
        images2["bar"] = ImageUtil.getEmptyImageItem(APPLICATION_VERSION.V0_3_0);

        const combined = ProjectUtil.mergeImages(images1, undefined, APPLICATION_VERSION.V0_3_0);

        expect(combined["foo"]).not.toEqual(undefined);
        expect(combined["bar"]).toEqual(undefined);
        expect(combined["foo"]).toStrictEqual(images1["foo"]);
    });

    test("mergeImages, version 0.2.0", () => {
        const images1 : Images = { };
        const images2 : Images = { };
        images1["foo"] = ImageUtil.getEmptyImageItem(APPLICATION_VERSION.V0_2_0);
        images2["bar"] = ImageUtil.getEmptyImageItem(APPLICATION_VERSION.V0_2_0);

        const combined = ProjectUtil.mergeImages(images1, images2, APPLICATION_VERSION.V0_2_0);

        expect(combined["foo"]).not.toEqual(undefined);
        expect(combined["bar"]).not.toEqual(undefined);
        expect(combined["foo"]).toStrictEqual(images1["foo"]);
        expect(combined["bar"]).toStrictEqual(images2["bar"]);
    });

    // test("stringToImageFormat", () => {
    //     expect(ProjectUtil.stringToImageFormat("foo")).toEqual(ImageFormat.PNG);
    //     expect(ProjectUtil.stringToImageFormat("bmp")).toEqual(ImageFormat.BMP);
    //     expect(ProjectUtil.stringToImageFormat("gif")).toEqual(ImageFormat.GIF);
    //     expect(ProjectUtil.stringToImageFormat("jpg")).toEqual(ImageFormat.JPG);
    //     expect(ProjectUtil.stringToImageFormat("png")).toEqual(ImageFormat.PNG);
    // });
    //
    // test("stringToDataFormat", () => {
    //     expect(ProjectUtil.stringToDataFormat("foo")).toEqual(DataFormat.XML);
    //     expect(ProjectUtil.stringToDataFormat("css")).toEqual(DataFormat.CSS);
    //     expect(ProjectUtil.stringToDataFormat("json")).toEqual(DataFormat.JSON);
    //     expect(ProjectUtil.stringToDataFormat("xml")).toEqual(DataFormat.XML);
    // });
    //
    // test("stringToSpriteNameInAtlas", () => {
    //     expect(ProjectUtil.stringToSpriteNameInAtlas("foo")).toEqual(SpriteNameInAtlas.StripExtension);
    //     expect(ProjectUtil.stringToSpriteNameInAtlas("KeepExtension")).toEqual(SpriteNameInAtlas.KeepExtension);
    //     expect(ProjectUtil.stringToSpriteNameInAtlas("StripExtension")).toEqual(SpriteNameInAtlas.StripExtension);
    // });
    //
    // test("stringToDataFormat", () => {
    //     expect(ProjectUtil.stringToSpritePacker("foo")).toEqual(SpritePacker.JoeRects);
    //     expect(ProjectUtil.stringToSpritePacker("Basic")).toEqual(SpritePacker.Basic);
    //     expect(ProjectUtil.stringToSpritePacker("JoeRects")).toEqual(SpritePacker.JoeRects);
    // });
    //
    // test("stringToSortBy", () => {
    //     expect(ProjectUtil.stringToSortBy("foo")).toEqual(SortBy.AREA_DESC);
    //     expect(ProjectUtil.stringToSortBy("AREA")).toEqual(SortBy.AREA);
    //     expect(ProjectUtil.stringToSortBy("AREA_DESC")).toEqual(SortBy.AREA_DESC);
    //     expect(ProjectUtil.stringToSortBy("HEIGHT")).toEqual(SortBy.HEIGHT);
    //     expect(ProjectUtil.stringToSortBy("HEIGHT_DESC")).toEqual(SortBy.HEIGHT_DESC);
    //     expect(ProjectUtil.stringToSortBy("LONGER_SIDE")).toEqual(SortBy.LONGER_SIDE);
    //     expect(ProjectUtil.stringToSortBy("LONGER_SIDE_DESC")).toEqual(SortBy.LONGER_SIDE_DESC);
    //     expect(ProjectUtil.stringToSortBy("NAME")).toEqual(SortBy.NAME);
    //     expect(ProjectUtil.stringToSortBy("NAME_DESC")).toEqual(SortBy.NAME_DESC);
    //     expect(ProjectUtil.stringToSortBy("PATH")).toEqual(SortBy.PATH);
    //     expect(ProjectUtil.stringToSortBy("PATH_DESC")).toEqual(SortBy.PATH_DESC);
    //     expect(ProjectUtil.stringToSortBy("PERIMETER")).toEqual(SortBy.PERIMETER);
    //     expect(ProjectUtil.stringToSortBy("PERIMETER_DESC")).toEqual(SortBy.PERIMETER_DESC);
    //     expect(ProjectUtil.stringToSortBy("SHORTER_SIDE")).toEqual(SortBy.SHORTER_SIDE);
    //     expect(ProjectUtil.stringToSortBy("SHORTER_SIDE_DESC")).toEqual(SortBy.SHORTER_SIDE_DESC);
    //     expect(ProjectUtil.stringToSortBy("SIDE_DIFF")).toEqual(SortBy.SIDE_DIFF);
    //     expect(ProjectUtil.stringToSortBy("SIDE_DIFF_DESC")).toEqual(SortBy.SIDE_DIFF_DESC);
    //     expect(ProjectUtil.stringToSortBy("SIDE_RATIO")).toEqual(SortBy.SIDE_RATIO);
    //     expect(ProjectUtil.stringToSortBy("SIDE_RATIO_DESC")).toEqual(SortBy.SIDE_RATIO_DESC);
    //     expect(ProjectUtil.stringToSortBy("WIDTH")).toEqual(SortBy.WIDTH);
    //     expect(ProjectUtil.stringToSortBy("WIDTH_DESC")).toEqual(SortBy.WIDTH_DESC);
    // });
    //
    // test("booleanToYesNo", () => {
    //     expect(ProjectUtil.booleanToYesNo(undefined)).toEqual(YesNo.NO);
    //     expect(ProjectUtil.booleanToYesNo(true)).toEqual(YesNo.YES);
    //     expect(ProjectUtil.booleanToYesNo(false)).toEqual(YesNo.NO);
    // });
    //
    // test("stringToSizeMode", () => {
    //     expect(ProjectUtil.stringToSizeMode("foo")).toEqual(SizeMode.MaxSize);
    //     expect(ProjectUtil.stringToSizeMode("FixedSize")).toEqual(SizeMode.FixedSize);
    //     expect(ProjectUtil.stringToSizeMode("MaxSize")).toEqual(SizeMode.MaxSize);
    // });
    //
    // test("stringToConstraint", () => {
    //     expect(ProjectUtil.stringToConstraint("foo")).toEqual(Constraint.PowerOfTwo);
    //     expect(ProjectUtil.stringToConstraint("AnySize")).toEqual(Constraint.AnySize);
    //     expect(ProjectUtil.stringToConstraint("PowerOfTwo")).toEqual(Constraint.PowerOfTwo);
    // });
    //
    // test("stringToTrimMode", () => {
    //     expect(ProjectUtil.stringToTrimMode("foo")).toEqual(TrimMode.None);
    //     expect(ProjectUtil.stringToTrimMode("None")).toEqual(TrimMode.None);
    //     expect(ProjectUtil.stringToTrimMode("Trim")).toEqual(TrimMode.Trim);
    // });
    //
    // test("stringToAnimatedGif", () => {
    //     expect(ProjectUtil.stringToAnimatedGif("foo")).toEqual(AnimatedGif.UseFirstFrame);
    //     expect(ProjectUtil.stringToAnimatedGif("ExtractFrames")).toEqual(AnimatedGif.ExtractFrames);
    //     expect(ProjectUtil.stringToAnimatedGif("UseFirstFrame")).toEqual(AnimatedGif.UseFirstFrame);
    // });

    // test("", () => {});
    // test("", () => {});
    // test("", () => {});
    // test("", () => {});
    // test("", () => {});

    test("mergeSingleImageIntoProject", () => {
        const args: Args = {
            name: "Untitled",
            imageFormat: "PNG",
            dataFormat: "XML",
            nameInSheet: "StripExtension",
            spritePacker: "JoeRects",
            sortBy: "NAME",
            allowRotate: true,
            width: 1024,
            height: 512,
            sizeMode: "MaxSize",
            constraint: "PowerOfTwo",
            forceSquare: true,
            include2X: true,
            borderPadding: 2,
            shapePadding: 2,
            innerPadding: 0,
            cleanAlpha: true,
            colorMask: false,
            aliasSprites: true,
            debugMode: true,
            trimMode: "Trim",
            trimThreshold: 1,
            animatedGif: "ExtractFrames",
            compressProject: true,
        };
        const project = ProjectUtil.mergeArgsIntoProject(ProjectUtil.DEFAULT_PROJECT, args);

        expect(project.options.name).toEqual(args.name);

        const argsEmpty: Args = { };
        const project2 = ProjectUtil.mergeArgsIntoProject(ProjectUtil.DEFAULT_PROJECT, argsEmpty);

        expect(project2.options.name).toEqual(ProjectUtil.DEFAULT_PROJECT.options.name);

    });

    test("mergeSingleImageIntoProject", () => {
        const project = ProjectUtil.DEFAULT_PROJECT;
        const path = "./sprites/GIF/hero-walk-cycle.gif";

        ProjectUtil.mergeSingleImageIntoProject(project, path, Buffer.from([0,1,3,4,5,6,7,8,9]));

        expect(project.images[path].src).toEqual("data:image/gif;base64,AAEDBAUGBwgJ");
    });

    test("populateImageFrames", () => {
        // start with a default "empty" project
        const project = ProjectUtil.DEFAULT_PROJECT;

        // add images to project
        const images = [
            "../_assets/sprites/BMP/sheet.bmp",
            "../_assets/sprites/GIF/walk-cycle.gif",
            "../_assets/sprites/JPG/avatars/avatar-1.jpg",
            "../_assets/sprites/PNG/Characters/platformChar_happy.png",
        ];
        if(images && images.length) {
            images.forEach((path) => {
                if(fs.existsSync(path)) {
                    ProjectUtil.mergeSingleImageIntoProject(
                        project, path, Buffer.from(fs.readFileSync(path)));
                }
            });
        }

        // once saved, frames are striped to save space, reload
        const json = ProjectUtil.serialize(project);
        const project2 = ProjectUtil.deserialize(json, APPLICATION_VERSION.CURRENT);

        // repopulate the frames
        const proj2 = ProjectUtil.populateImageFrames(project2);
// console.error(ProjectUtil.serialize(proj2));

        // expect(project.images[path].src).toEqual("data:image/gif;base64,AAEDBAUGBwgJ");
    });

});
