import ProjectUtil, {Images} from "./ProjectUtil";
import ObjectUtil from "./ObjectUtil";
import {APPLICATION_VERSION} from "./AppUtil";
import '../objs/projects';
import {TrimMode, YesNo} from "../objs/projects";
import ImageUtil_PNG from "./ImageUtil._png";
import ImageUtil from "./ImageUtil";
import ImageUtil_ImageParser from "./ImageUtil._base";

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
            // expect(result.application).toBe(proj1.application);
            // expect(result.version).toBe(proj1.version);
            // expect(result.url).toBe(proj1.url);
            // expect(result.options.name).toBe(proj1.options.name);
            // expect(result.options.debugMode).toBe(proj1.options.debugMode);
            // expect(result.options.borderPadding).toBe(proj1.options.borderPadding);
        });

        test("consistent with latest version when no proj is specified", () => {
            const proj1 = ProjectUtil.getDefaultProject(APPLICATION_VERSION.CURRENT);
            // const empty = ProjectUtil.getEmptyProject(APPLICATION_VERSION.CURRENT);

            const result = ProjectUtil.mergeProjects();

            expect(result).toStrictEqual(proj1);
            // expect(result.application).toBe(proj1.application);
            // expect(result.version).toBe(proj1.version);
            // expect(result.url).toBe(proj1.url);
            // expect(result.options.name).toBe(proj1.options.name);
            // expect(result.options.debugMode).toBe(proj1.options.debugMode);
            // expect(result.options.borderPadding).toBe(proj1.options.borderPadding);
        });

        test("consistent with version 0.3.0 when merging projects", () => {
            const proj1 = ProjectUtil.getDefaultProject(APPLICATION_VERSION.V0_3_0);
            const empty = ProjectUtil.getEmptyProject(APPLICATION_VERSION.V0_3_0);

            const result = ProjectUtil.mergeProjects(empty, proj1, APPLICATION_VERSION.V0_3_0);

            expect(result).toStrictEqual(proj1);
            // expect(result.application).toBe(proj1.application);
            // expect(result.version).toBe(proj1.version);
            // expect(result.url).toBe(proj1.url);
            // expect(result.options.name).toBe(proj1.options.name);
            // expect(result.options.debugMode).toBe(proj1.options.debugMode);
            // expect(result.options.borderPadding).toBe(proj1.options.borderPadding);
        });

        test("consistent with version 0.2.0 when merging projects", () => {
            const proj1 = ProjectUtil.getDefaultProject(APPLICATION_VERSION.V0_2_0);
            const empty = ProjectUtil.getEmptyProject(APPLICATION_VERSION.V0_2_0);

            const result = ProjectUtil.mergeProjects(empty, proj1, APPLICATION_VERSION.V0_2_0);

            expect(result).toStrictEqual(proj1);
            // expect(result.application).toBe(proj1.application);
            // expect(result.version).toBe(proj1.version);
            // expect(result.url).toBe(proj1.url);
            // expect(result.options.name).toBe(proj1.options.name);
            // expect(result.options.debugMode).toBe(proj1.options.debugMode);
            // expect(result.options.borderPadding).toBe(proj1.options.borderPadding);
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

            expect(proj2Obj).not.toStrictEqual(proj1Obj);
        });

    });

    // TODO: test method cited in test name
    test.todo("mergeProjectOptions");

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

});
