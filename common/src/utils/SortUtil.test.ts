import {SortUtil} from "./SortUtil";
import {ImageFrame, ImageItem} from "..";
import {PackMode} from "./PackUtil";
// import {ImageUtil_ImageParser} from "./ImageUtil._base";
import {SortBy} from "..";
// import {ImageUtil} from "./ImageUtil";
import {ProjectUtil} from "./ProjectUtil";

describe("SortUtil", () => {

    const project = ProjectUtil.EMPTY_PROJECT;
    const images : ImageItem[] = [];
    beforeEach(() => {
        images.length = 0

        images.push(ImageItem.EMPTY_IMAGE_ITEM);
        images[0].filename = 'xyz-a';
        images[0].fullpath = 'xyz-afp';
        images[0].frames.push(ImageFrame.EMPTY_IMAGE_FRAME);
        images[0].frames[0].width = 100;
        images[0].frames[0].height = 150;
        images[0].frames[0].guid = 'xyz-00';

        images.push(ImageItem.EMPTY_IMAGE_ITEM);
        images[1].filename = 'xyz-b';
        images[1].fullpath = 'xyz-bfp';
        images[1].frames.push(ImageFrame.EMPTY_IMAGE_FRAME);
        images[1].frames[0].width = 400;
        images[1].frames[0].height = 200;
        images[1].frames[0].guid = 'xyz-01';
        images[1].frames.push(ImageFrame.EMPTY_IMAGE_FRAME);
        images[1].frames[1].width = 64;
        images[1].frames[1].height = 64;
        images[1].frames[1].guid = 'xyz-02';

        images.push(ImageItem.EMPTY_IMAGE_ITEM);
        images[2].filename = 'xyz-d';
        images[2].fullpath = 'xyz-dfp';
        images[2].frames.push(ImageFrame.EMPTY_IMAGE_FRAME);
        images[2].frames[0].width = 180;
        images[2].frames[0].height = 20;
        images[2].frames[0].guid = 'xyz-03';

        images.push(ImageItem.EMPTY_IMAGE_ITEM);
        images[3].filename = 'xyz-e';
        images[3].fullpath = 'xyz-efp';
        images[3].frames.push(ImageFrame.EMPTY_IMAGE_FRAME);
        images[3].frames[0].width = 32;
        images[3].frames[0].height = 128;
        images[3].frames[0].guid = 'xyz-04';

        project.images = { };
        project.images["one"] = images[0];
        project.images["two"] = images[1];
        project.images["three"] = images[2];
        project.images["four"] = images[3];
    });

    test("handles sort by area-descending", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS });

        expect(sortedData[0].guid).toEqual('xyz-01');
        expect(sortedData[1].guid).toEqual('xyz-00');
        expect(sortedData[2].guid).toEqual('xyz-02');
        expect(sortedData[3].guid).toEqual('xyz-04');
        expect(sortedData[4].guid).toEqual('xyz-03');
    });

    test("handles sort by area", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.AREA, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-03');
        expect(sortedData[1].guid).toEqual('xyz-02');
        expect(sortedData[2].guid).toEqual('xyz-04');
        expect(sortedData[3].guid).toEqual('xyz-00');
        expect(sortedData[4].guid).toEqual('xyz-01');
    });

    test("handles sort by height-decending", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.HEIGHT_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-01');
        expect(sortedData[1].guid).toEqual('xyz-00');
        expect(sortedData[2].guid).toEqual('xyz-04');
        expect(sortedData[3].guid).toEqual('xyz-02');
        expect(sortedData[4].guid).toEqual('xyz-03');
    });

    test("handles sort by height", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.HEIGHT, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-03');
        expect(sortedData[1].guid).toEqual('xyz-02');
        expect(sortedData[2].guid).toEqual('xyz-04');
        expect(sortedData[3].guid).toEqual('xyz-00');
        expect(sortedData[4].guid).toEqual('xyz-01');
    });

    test("handles sort by width-decending", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.WIDTH_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-01');
        expect(sortedData[1].guid).toEqual('xyz-03');
        expect(sortedData[2].guid).toEqual('xyz-00');
        expect(sortedData[3].guid).toEqual('xyz-02');
        expect(sortedData[4].guid).toEqual('xyz-04');
    });

    test("handles sort by width", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.WIDTH, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-04');
        expect(sortedData[1].guid).toEqual('xyz-02');
        expect(sortedData[2].guid).toEqual('xyz-00');
        expect(sortedData[3].guid).toEqual('xyz-03');
        expect(sortedData[4].guid).toEqual('xyz-01');
    });

    test("handles sort by name-decending", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.NAME_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-04');
        expect(sortedData[1].guid).toEqual('xyz-03');
        expect(sortedData[2].guid).toEqual('xyz-02');
        expect(sortedData[3].guid).toEqual('xyz-01');
        expect(sortedData[4].guid).toEqual('xyz-00');
    });

    test("handles sort by name-decending, with filename collisions", () => {
        project.images['one'].filename = project.images['two'].filename = project.images['four'].filename;
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.NAME_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-02');
        expect(sortedData[1].guid).toEqual('xyz-04');
        expect(sortedData[2].guid).toEqual('xyz-00');
        expect(sortedData[3].guid).toEqual('xyz-01');
        expect(sortedData[4].guid).toEqual('xyz-03');
    });

    test("handles sort by path-decending", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.PATH_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-04');
        expect(sortedData[1].guid).toEqual('xyz-03');
        expect(sortedData[2].guid).toEqual('xyz-02');
        expect(sortedData[3].guid).toEqual('xyz-01');
        expect(sortedData[4].guid).toEqual('xyz-00');
    });

    test("handles sort by path-decending, with filename collisions", () => {
        project.images['one'].fullpath = project.images['two'].fullpath = project.images['four'].fullpath;
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.PATH_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-02');
        expect(sortedData[1].guid).toEqual('xyz-04');
        expect(sortedData[2].guid).toEqual('xyz-00');
        expect(sortedData[3].guid).toEqual('xyz-01');
        expect(sortedData[4].guid).toEqual('xyz-03');
    });

    test("handles sort by name", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.NAME, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-00');
        expect(sortedData[1].guid).toEqual('xyz-02');
        expect(sortedData[2].guid).toEqual('xyz-01');
        expect(sortedData[3].guid).toEqual('xyz-03');
        expect(sortedData[4].guid).toEqual('xyz-04');
    });

    test("handles sort by name, with filename collisions", () => {
        project.images['one'].filename = project.images['two'].filename = project.images['four'].filename;
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.NAME, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-03');
        expect(sortedData[1].guid).toEqual('xyz-02');
        expect(sortedData[2].guid).toEqual('xyz-04');
        expect(sortedData[3].guid).toEqual('xyz-00');
        expect(sortedData[4].guid).toEqual('xyz-01');
    });

    test("handles sort by path", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.PATH, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-00');
        expect(sortedData[1].guid).toEqual('xyz-02');
        expect(sortedData[2].guid).toEqual('xyz-01');
        expect(sortedData[3].guid).toEqual('xyz-03');
        expect(sortedData[4].guid).toEqual('xyz-04');
    });

    test("handles sort by path, with filename collisions", () => {
        project.images['one'].fullpath = project.images['two'].fullpath = project.images['four'].fullpath;
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.PATH, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-03');
        expect(sortedData[1].guid).toEqual('xyz-02');
        expect(sortedData[2].guid).toEqual('xyz-04');
        expect(sortedData[3].guid).toEqual('xyz-00');
        expect(sortedData[4].guid).toEqual('xyz-01');
    });

    test("handles sort by shorter-side-descending", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SHORTER_SIDE_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-01');
        expect(sortedData[1].guid).toEqual('xyz-00');
        expect(sortedData[2].guid).toEqual('xyz-02');
        expect(sortedData[3].guid).toEqual('xyz-04');
        expect(sortedData[4].guid).toEqual('xyz-03');
    });

    test("handles sort by shorter-side", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SHORTER_SIDE, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-02');
        expect(sortedData[1].guid).toEqual('xyz-00');
        expect(sortedData[2].guid).toEqual('xyz-03');
        expect(sortedData[3].guid).toEqual('xyz-04');
        expect(sortedData[4].guid).toEqual('xyz-01');
    });

    test("handles sort by longer-side-descending", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.LONGER_SIDE_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-01');
        expect(sortedData[1].guid).toEqual('xyz-03');
        expect(sortedData[2].guid).toEqual('xyz-00');
        expect(sortedData[3].guid).toEqual('xyz-04');
        expect(sortedData[4].guid).toEqual('xyz-02');
    });

    test("handles sort by longer-side", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.LONGER_SIDE, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-02');
        expect(sortedData[1].guid).toEqual('xyz-04');
        expect(sortedData[2].guid).toEqual('xyz-00');
        expect(sortedData[3].guid).toEqual('xyz-03');
        expect(sortedData[4].guid).toEqual('xyz-01');
    });

    test("handles sort by perimeter-descending", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.PERIMETER_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-01');
        expect(sortedData[1].guid).toEqual('xyz-00');
        expect(sortedData[2].guid).toEqual('xyz-03');
        expect(sortedData[3].guid).toEqual('xyz-04');
        expect(sortedData[4].guid).toEqual('xyz-02');
    });

    test("handles sort by perimeter", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.PERIMETER, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-02');
        expect(sortedData[1].guid).toEqual('xyz-04');
        expect(sortedData[2].guid).toEqual('xyz-03');
        expect(sortedData[3].guid).toEqual('xyz-00');
        expect(sortedData[4].guid).toEqual('xyz-01');
    });

    test("handles sort by side-diff-descending", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SIDE_DIFF_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-01');
        expect(sortedData[1].guid).toEqual('xyz-03');
        expect(sortedData[2].guid).toEqual('xyz-04');
        expect(sortedData[3].guid).toEqual('xyz-00');
        expect(sortedData[4].guid).toEqual('xyz-02');
    });

    test("handles sort by side-diff", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SIDE_DIFF, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-02');
        expect(sortedData[1].guid).toEqual('xyz-00');
        expect(sortedData[2].guid).toEqual('xyz-04');
        expect(sortedData[3].guid).toEqual('xyz-03');
        expect(sortedData[4].guid).toEqual('xyz-01');
    });

    test("handles sort by side-ratio-descending", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SIDE_RATIO_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-03');
        expect(sortedData[1].guid).toEqual('xyz-01');
        expect(sortedData[2].guid).toEqual('xyz-02');
        expect(sortedData[3].guid).toEqual('xyz-00');
        expect(sortedData[4].guid).toEqual('xyz-04');
    });

    test("handles sort by side-ratio-descending, with collisions", () => {
        project.images['one'].frames[0].width = project.images['three'].frames[0].width; project.images['one'].frames[0].height = project.images['three'].frames[0].height;
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SIDE_RATIO_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-00');
        expect(sortedData[1].guid).toEqual('xyz-03');
        expect(sortedData[2].guid).toEqual('xyz-01');
        expect(sortedData[3].guid).toEqual('xyz-02');
        expect(sortedData[4].guid).toEqual('xyz-04');
    });

    test("handles sort by side-ratio-descending, with invalid height", () => {
        project.images['one'].frames[0].height = project.images['two'].frames[0].height = project.images['four'].frames[0].height = 0;
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SIDE_RATIO_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-00');
        expect(sortedData[1].guid).toEqual('xyz-01');
        expect(sortedData[2].guid).toEqual('xyz-04');
        expect(sortedData[3].guid).toEqual('xyz-03');
        expect(sortedData[4].guid).toEqual('xyz-02');
    });

    test("handles sort by side-ratio", () => {
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SIDE_RATIO, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-04');
        expect(sortedData[1].guid).toEqual('xyz-00');
        expect(sortedData[2].guid).toEqual('xyz-02');
        expect(sortedData[3].guid).toEqual('xyz-01');
        expect(sortedData[4].guid).toEqual('xyz-03');
    });

    test("handles sort by side-ratio, with collisions", () => {
        project.images['one'].frames[0].width = project.images['three'].frames[0].width; project.images['one'].frames[0].height = project.images['three'].frames[0].height;
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SIDE_RATIO, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-04');
        expect(sortedData[1].guid).toEqual('xyz-02');
        expect(sortedData[2].guid).toEqual('xyz-01');
        expect(sortedData[3].guid).toEqual('xyz-00');
        expect(sortedData[4].guid).toEqual('xyz-03');
    });

    test("handles sort by side-ratio, with invalid height", () => {
        project.images['one'].frames[0].height = project.images['two'].frames[0].height = project.images['four'].frames[0].height = 0;
        const sortedData = SortUtil.sort(project, { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SIDE_RATIO, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-00');
        expect(sortedData[1].guid).toEqual('xyz-01');
        expect(sortedData[2].guid).toEqual('xyz-04');
        expect(sortedData[3].guid).toEqual('xyz-02');
        expect(sortedData[4].guid).toEqual('xyz-03');
    });

});
