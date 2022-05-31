import {FileUtil} from "./FileUtil";
import {FileParts} from '../objs/files';
import {FILE} from "dns";
import {ImageFormat} from "..";

describe("FileUtil", () => {

    test("Parses full path into file parts", () => {
        const forceObjsFilesToShowInCoverage : FileParts = FileUtil.getFileParts('');
        expect(forceObjsFilesToShowInCoverage.isValid).toEqual(false);

        expect(FileUtil.getFileParts('./foo').isValid).toEqual(false);
        expect(FileUtil.getFileParts('./foo.png').filename).toEqual('foo.png');
        expect(FileUtil.getFileParts('./foo.png').pathonly).toEqual('.');
        expect(FileUtil.getFileParts('./foo.png').pathfull).toEqual('./foo.png');
        expect(FileUtil.getFileParts('foo.png').filename).toEqual('foo.png');
        expect(FileUtil.getFileParts('.foo.bmp').filename).toEqual('.foo.bmp');
        expect(FileUtil.getFileParts('.foo.bmp').filetype).toEqual('bmp');

        expect(FileUtil.getFileParts('./sprites/hero/happy.png').filename).toEqual('happy.png');
        expect(FileUtil.getFileParts('./sprites/hero/happy.png').fileonly).toEqual('happy');
        expect(FileUtil.getFileParts('./sprites/hero/happy.png').filetype).toEqual('png');
        expect(FileUtil.getFileParts('./sprites/hero/happy.png').pathfull).toEqual('./sprites/hero/happy.png');
        expect(FileUtil.getFileParts('./sprites/hero/happy.png').pathonly).toEqual('./sprites/hero');
    });

});