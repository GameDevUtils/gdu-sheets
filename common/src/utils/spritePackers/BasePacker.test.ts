import Project from "../../objs/Project";
import ImageItem from "../../objs/ImageItem";
import ImageFrame from "../../objs/ImageFrame";
import Rectangle from "../../objs/Rectangle";
// import BasicPacker from "./BasicPacker";
import {createHash, Hash} from "crypto";

describe("BasePacker", () => {

    test.skip("foo", () => {});

    // const makeImageItemName = (index: number) : string => {
    //     const HashSHA256: Hash = createHash('sha256');
    //     return 'img' + HashSHA256.update(index.toString(10)).digest('hex');
    // };
    //
    // const makeLargerProject = (spriteCount: number): Project => {
    //     const project = new Project();
    //
    //     for (let i = 0; i < spriteCount; i++) {
    //         const image = new ImageItem();
    //         const name = makeImageItemName(i);
    //         image.filename = name;
    //         image.filetype = 'png';
    //         image.fullpath = `~/assets/${name}.png`;
    //         const frame = new ImageFrame();
    //         frame.spriteRect = Rectangle.Create(0, 0, 32, 32, false);
    //         frame.spriteRect.width = image.width = 32;
    //         frame.spriteRect.height = image.height = 32;
    //         image.frames?.push(frame);
    //         project.images[name] = image;
    //     }
    //
    //     // make sure there weren't any images[name] collisions
    //     expect(Object.getOwnPropertyNames(project.images).length).toEqual(spriteCount);
    //
    //     return project;
    // };
    //
    // test("BasicPacker packs many sprites successfully", async () => {
    //     // const packer = PackerHelper.RegisteredPackers["Basic"] as BasicPacker;
    //     const packer = new BasicPacker();
    //     const project = makeLargerProject(1);
    //     project.options.sortBy = "AREA_DESC";
    //
    //     project.options.trimMode = "Trim";
    //     project.options.trimThreshold = 255;
    //     project.options.sizeMode = "Fixed Size";
    //     project.options.width = 1023;
    //     project.options.height = 1024;
    //     project.options.forceSquare = "Yes";
    //
    //     packer.DoPack(project)
    //         .then((res) => {
    //             expect(res).toEqual("Completed");
    //             expect(packer.GetPackerType()).toEqual("Basic");
    //             expect(packer.GetDefaultSortBy()).toEqual("HEIGHT_DESC");
    //             expect(packer.GetHeuristic(project)).toEqual("BasicDefault");
    //             expect(packer.ValidatePlacements(project)).toEqual(true);
    //         })
    //         .catch((err) => {
    //             console.error(JSON.stringify(err, null, 3));
    //         });
    // });

});