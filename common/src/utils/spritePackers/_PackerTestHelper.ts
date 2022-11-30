import Project from "../../objs/Project";
import ImageItem from "../../objs/ImageItem";
import ImageFrame from "../../objs/ImageFrame";
import Rectangle from "../../objs/Rectangle";
import {createHash, Hash} from "crypto";
import BasePacker from "./BasePacker";
import BasicPacker from "./BasicPacker";
import ProjectOptions from "../../objs/ProjectOptions";
import {SortByTypes, SpritePackerTypes} from "../Types";

export type TestOptions = {
    spriteCount: number,
    packerType: SpritePackerTypes,
    defaultSortBy: SortByTypes,
    expectedHeuristics: string,
    expectedSuccess: boolean,
    expectedValidate: boolean,
    expectedThenMsg: string,
    expectedCatchMsg: string,
};

export default class PackerTestHelper {

    static makeImageItemName(index: number) : string {
        const HashSHA256: Hash = createHash('sha256');
        return 'img' + HashSHA256.update(index.toString(10)).digest('hex');
    };

    static makeProject(spriteCount: number) : Project {
        const project = new Project();

        for(let i = 0; i < spriteCount; i++) {
            const image = new ImageItem();
            const name = PackerTestHelper.makeImageItemName(i);
            image.filename = name;
            image.filetype = 'png';
            image.fullpath = `~/assets/${name}.png`;
            const frame = new ImageFrame();
            frame.spriteRect = Rectangle.Create(0,0,32,32, false);
            frame.spriteRect.width = image.width = 32;
            frame.spriteRect.height = image.height = 32;
            image.frames?.push(frame);
            project.images[name] = image;
        }

        // make sure there weren't any images[name] collisions
        expect(Object.getOwnPropertyNames(project.images).length).toEqual(spriteCount);

        return project;
    };

    static async testPackerPacksFewerSpritesSuccessfully(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : Promise<void> {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);
        project.options = projectOptions;

        return await packer.DoPack(project)
            .then((res) => {
                expect(res).toEqual(testOptions.expectedThenMsg);
                expect(packer.GetPackerType()).toEqual(testOptions.packerType);
                expect(packer.GetDefaultSortBy()).toEqual(testOptions.defaultSortBy);
                expect(packer.GetHeuristic(project)).toEqual(testOptions.expectedHeuristics);
            }).catch((err) => {
                expect(err).toEqual(testOptions.expectedCatchMsg);
                throw new Error("Unexpected code path.");
            }).finally(() => {
                expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
                expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
            });
    };

    static async testPackerHandlesOnInitFailure(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : Promise<void> {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);
        project.options = projectOptions;

        return await packer.DoPack(project)
            .then((res) => {
                expect(res).toEqual(testOptions.expectedThenMsg);
                throw new Error("Unexpected code path.");
            }).catch((err) => {
                expect(err).toEqual(testOptions.expectedCatchMsg);
            })
            .finally(() => {
                // TODO: fix bug, Validate should fail on failed pack
                expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
                // TODO: fix bug, BasePacker should populate pack_success on fail
                expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
            });
    };

    static async testPackerHandlesManySpritesSuccessfully(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : Promise<void> {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);
        project.options = projectOptions;

        return await packer.DoPack(project)
            .then((res) => {
                expect(res).toEqual(testOptions.expectedThenMsg);
            }).catch((err) => {
                throw new Error("Unexpected code path.");
            })
            .finally(() => {
                expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
                expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
            });
    };

    static async testPackerHandlesManyMoreSpritesSuccessfully(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : Promise<void> {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);
        project.options = projectOptions;

        return await packer.DoPack(project)
            .then((res) => {
                expect(res).toEqual(testOptions.expectedThenMsg);
            }).catch((err) => {
                throw new Error("Unexpected code path.");
            })
            .finally(() => {
                expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
                expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
            });
    };

    static async testPackerFailsToPackSprites(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : Promise<void> {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);
        project.options = projectOptions;

        return await packer.DoPack(project)
            .then((res) => {
                expect(res).toEqual(testOptions.expectedThenMsg);
                throw new Error("Unexpected code path.");
            })
            .catch((err: Error) => {
                expect(err.message || err).toEqual(testOptions.expectedCatchMsg);
            })
            .finally(() => {
                expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
                expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
            });
    };

    static async testPackerPacksSpritesWithoutPadding(packer: BasePacker, projectOptions: ProjectOptions, testOptions: TestOptions) : Promise<void> {
        const project = PackerTestHelper.makeProject(testOptions.spriteCount);
        project.options = projectOptions;

        return await packer.DoPack(project)
            .then((res) => {
                expect(res).toEqual(testOptions.expectedThenMsg);
            })
            .catch((err: Error) => {
                throw new Error("Unexpected code path.");
            })
            .finally(() => {
                expect(packer.ValidatePlacements(project)).toEqual(testOptions.expectedValidate);
                expect(packer.pack_success).toEqual(testOptions.expectedSuccess);
            });
    };

}