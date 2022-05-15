import SortUtil from "./SortUtil";
import {ImageFrame} from "../objs/images";
import {PackMode} from "./PackUtil";
import ImageUtil_ImageParser from "./ImageUtil._base";
import {SortBy} from "../objs/projects";

describe("SortUtil", () => {

    const data : ImageFrame[] = [];
    beforeEach(() => {
        data.length = 0;
        data.push(ImageUtil_ImageParser.EMPTY_IMAGEFRAME);
        data[0].width = 100;
        data[0].height = 150;
        data[0].guid = 'xyz-00';
        data[0].filename = 'xyz-a';
        data.push(ImageUtil_ImageParser.EMPTY_IMAGEFRAME);
        data[1].width = 400;
        data[1].height = 200;
        data[1].guid = 'xyz-01';
        data[1].filename = 'xyz-b';
        data.push(ImageUtil_ImageParser.EMPTY_IMAGEFRAME);
        data[2].width = 64;
        data[2].height = 64;
        data[2].guid = 'xyz-02';
        data[2].filename = 'xyz-c';
        data.push(ImageUtil_ImageParser.EMPTY_IMAGEFRAME);
        data[3].width = 180;
        data[3].height = 20;
        data[3].guid = 'xyz-03';
        data[3].filename = 'xyz-d';
        data.push(ImageUtil_ImageParser.EMPTY_IMAGEFRAME);
        data[4].width = 32;
        data[4].height = 128;
        data[4].guid = 'xyz-04';
        data[4].filename = 'xyz-e';

    });

    test("handles sort by area-descending", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS });

        expect(sortedData[0].guid).toEqual('xyz-01');
        expect(sortedData[1].guid).toEqual('xyz-00');
        expect(sortedData[2].guid).toEqual('xyz-02');
        expect(sortedData[3].guid).toEqual('xyz-04');
        expect(sortedData[4].guid).toEqual('xyz-03');
    });

    test("handles sort by area", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.AREA, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-03');
        expect(sortedData[1].guid).toEqual('xyz-02');
        expect(sortedData[2].guid).toEqual('xyz-04');
        expect(sortedData[3].guid).toEqual('xyz-00');
        expect(sortedData[4].guid).toEqual('xyz-01');
    });

    test("handles sort by height-decending", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.HEIGHT_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-01');
        expect(sortedData[1].guid).toEqual('xyz-00');
        expect(sortedData[2].guid).toEqual('xyz-04');
        expect(sortedData[3].guid).toEqual('xyz-02');
        expect(sortedData[4].guid).toEqual('xyz-03');
    });

    test("handles sort by height", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.HEIGHT, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-03');
        expect(sortedData[1].guid).toEqual('xyz-02');
        expect(sortedData[2].guid).toEqual('xyz-04');
        expect(sortedData[3].guid).toEqual('xyz-00');
        expect(sortedData[4].guid).toEqual('xyz-01');
    });

    test("handles sort by width-decending", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.WIDTH_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-01');
        expect(sortedData[1].guid).toEqual('xyz-03');
        expect(sortedData[2].guid).toEqual('xyz-00');
        expect(sortedData[3].guid).toEqual('xyz-02');
        expect(sortedData[4].guid).toEqual('xyz-04');
    });

    test("handles sort by width", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.WIDTH, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-04');
        expect(sortedData[1].guid).toEqual('xyz-02');
        expect(sortedData[2].guid).toEqual('xyz-00');
        expect(sortedData[3].guid).toEqual('xyz-03');
        expect(sortedData[4].guid).toEqual('xyz-01');
    });

    test("handles sort by name-decending", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.NAME_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-04');
        expect(sortedData[1].guid).toEqual('xyz-03');
        expect(sortedData[2].guid).toEqual('xyz-02');
        expect(sortedData[3].guid).toEqual('xyz-01');
        expect(sortedData[4].guid).toEqual('xyz-00');
    });

    test("handles sort by name-decending, with filename collisions", () => {
        data[0].filename = data[2].filename = data[4].filename;
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.NAME_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-02');
        expect(sortedData[1].guid).toEqual('xyz-04');
        expect(sortedData[2].guid).toEqual('xyz-00');
        expect(sortedData[3].guid).toEqual('xyz-03');
        expect(sortedData[4].guid).toEqual('xyz-01');
    });

    test("handles sort by name", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.NAME, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-00');
        expect(sortedData[1].guid).toEqual('xyz-01');
        expect(sortedData[2].guid).toEqual('xyz-02');
        expect(sortedData[3].guid).toEqual('xyz-03');
        expect(sortedData[4].guid).toEqual('xyz-04');
    });

    test("handles sort by name, with filename collisions", () => {
        data[0].filename = data[2].filename = data[4].filename;
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.NAME, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-01');
        expect(sortedData[1].guid).toEqual('xyz-03');
        expect(sortedData[2].guid).toEqual('xyz-02');
        expect(sortedData[3].guid).toEqual('xyz-04');
        expect(sortedData[4].guid).toEqual('xyz-00');
    });

    test("handles sort by shorter-side-descending", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SHORTER_SIDE_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-01');
        expect(sortedData[1].guid).toEqual('xyz-00');
        expect(sortedData[2].guid).toEqual('xyz-02');
        expect(sortedData[3].guid).toEqual('xyz-04');
        expect(sortedData[4].guid).toEqual('xyz-03');
    });

    test("handles sort by shorter-side", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SHORTER_SIDE, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-02');
        expect(sortedData[1].guid).toEqual('xyz-00');
        expect(sortedData[2].guid).toEqual('xyz-03');
        expect(sortedData[3].guid).toEqual('xyz-04');
        expect(sortedData[4].guid).toEqual('xyz-01');
    });

    test("handles sort by longer-side-descending", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.LONGER_SIDE_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-01');
        expect(sortedData[1].guid).toEqual('xyz-03');
        expect(sortedData[2].guid).toEqual('xyz-00');
        expect(sortedData[3].guid).toEqual('xyz-04');
        expect(sortedData[4].guid).toEqual('xyz-02');
    });

    test("handles sort by longer-side", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.LONGER_SIDE, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-02');
        expect(sortedData[1].guid).toEqual('xyz-04');
        expect(sortedData[2].guid).toEqual('xyz-00');
        expect(sortedData[3].guid).toEqual('xyz-03');
        expect(sortedData[4].guid).toEqual('xyz-01');
    });

    test("handles sort by perimeter-descending", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.PERIMETER_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-01');
        expect(sortedData[1].guid).toEqual('xyz-00');
        expect(sortedData[2].guid).toEqual('xyz-03');
        expect(sortedData[3].guid).toEqual('xyz-04');
        expect(sortedData[4].guid).toEqual('xyz-02');
    });

    test("handles sort by perimeter", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.PERIMETER, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-02');
        expect(sortedData[1].guid).toEqual('xyz-04');
        expect(sortedData[2].guid).toEqual('xyz-03');
        expect(sortedData[3].guid).toEqual('xyz-00');
        expect(sortedData[4].guid).toEqual('xyz-01');
    });

    test("handles sort by side-diff-descending", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SIDE_DIFF_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-01');
        expect(sortedData[1].guid).toEqual('xyz-03');
        expect(sortedData[2].guid).toEqual('xyz-04');
        expect(sortedData[3].guid).toEqual('xyz-00');
        expect(sortedData[4].guid).toEqual('xyz-02');
    });

    test("handles sort by side-diff", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SIDE_DIFF, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-02');
        expect(sortedData[1].guid).toEqual('xyz-00');
        expect(sortedData[2].guid).toEqual('xyz-04');
        expect(sortedData[3].guid).toEqual('xyz-03');
        expect(sortedData[4].guid).toEqual('xyz-01');
    });

    test("handles sort by side-ratio-descending", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SIDE_RATIO_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-03');
        expect(sortedData[1].guid).toEqual('xyz-01');
        expect(sortedData[2].guid).toEqual('xyz-02');
        expect(sortedData[3].guid).toEqual('xyz-00');
        expect(sortedData[4].guid).toEqual('xyz-04');
    });

    test("handles sort by side-ratio-descending, with collisions", () => {
        data[0].width = data[2].width; data[0].height = data[2].height;
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SIDE_RATIO_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-03');
        expect(sortedData[1].guid).toEqual('xyz-01');
        expect(sortedData[2].guid).toEqual('xyz-00');
        expect(sortedData[3].guid).toEqual('xyz-02');
        expect(sortedData[4].guid).toEqual('xyz-04');
    });

    test("handles sort by side-ratio-descending, with invalid height", () => {
        data[0].width = data[2].width; data[0].height = data[2].height = 0;
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SIDE_RATIO_DESC, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-00');
        expect(sortedData[1].guid).toEqual('xyz-02');
        expect(sortedData[2].guid).toEqual('xyz-03');
        expect(sortedData[3].guid).toEqual('xyz-01');
        expect(sortedData[4].guid).toEqual('xyz-04');
    });

    test("handles sort by side-ratio", () => {
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SIDE_RATIO, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-04');
        expect(sortedData[1].guid).toEqual('xyz-00');
        expect(sortedData[2].guid).toEqual('xyz-02');
        expect(sortedData[3].guid).toEqual('xyz-01');
        expect(sortedData[4].guid).toEqual('xyz-03');
    });

    test("handles sort by side-ratio, with collisions", () => {
        data[0].width = data[2].width; data[0].height = data[2].height;
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SIDE_RATIO, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-04');
        expect(sortedData[1].guid).toEqual('xyz-00');
        expect(sortedData[2].guid).toEqual('xyz-02');
        expect(sortedData[3].guid).toEqual('xyz-01');
        expect(sortedData[4].guid).toEqual('xyz-03');
    });

    test("handles sort by side-ratio, with invalid height", () => {
        data[0].width = data[2].width; data[0].height = data[2].height = 0;
        const sortedData = SortUtil.sort([data], { packMode: PackMode.JOE_RECTS, primarySortModeOverride: SortBy.SIDE_RATIO, secondarySortMode: SortBy.AREA });

        expect(sortedData[0].guid).toEqual('xyz-00');
        expect(sortedData[1].guid).toEqual('xyz-02');
        expect(sortedData[2].guid).toEqual('xyz-04');
        expect(sortedData[3].guid).toEqual('xyz-01');
        expect(sortedData[4].guid).toEqual('xyz-03');
    });

});
