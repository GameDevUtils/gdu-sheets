// @ts-nocheck

import {Arguments} from "yargs";
import {
    AnimatedGif,
    Constraint,
    DataFormat,
    ImageFormat,
    Project,
    SizeMode,
    SortBy,
    SpriteNameInAtlas,
    SpritePacker,
    TrimMode,
    YesNo
} from "gdu-common/build/objs/projects";
import fs from "fs";
import ImageUtil from "gdu-common/build/utils/ImageUtil";
import FileUtil from "gdu-common/build/utils/FileUtil";
import {Buffer} from "buffer";

export default class CommandModuleEx_NoCheck {

    static mergeArgsIntoProject = (project: Project, args: Arguments) => {
        project.options.name = args.name as string ?? project.options.name;
        project.options.imageFormat = ImageFormat[args.imageFormat as ImageFormat ?? project.options.imageFormat];
        project.options.dataFormat = DataFormat[args.dataFormat as DataFormat ?? project.options.dataFormat];
        project.options.nameInSheet = SpriteNameInAtlas[args.nameInSheet as SpriteNameInAtlas ?? project.options.nameInSheet];

        project.options.spritePacker = SpritePacker[args.spritePacker as SpritePacker ?? project.options.spritePacker];
        project.options.sortBy = SortBy[args.sortBy as SortBy ?? project.options.sortBy];
        project.options.allowRotate = args.allowRotate ? YesNo[YesNo.YES] : YesNo[project.options.allowRotate];

        project.options.width = args.width as number ?? project.options.width;
        project.options.height = args.height as number ?? project.options.height;
        project.options.sizeMode = SizeMode[args.sizeMode as SizeMode ?? project.options.sizeMode];
        project.options.constraint = Constraint[args.constraint as Constraint ?? project.options.constraint];
        project.options.forceSquare = args.forceSquare ? YesNo[YesNo.YES] : YesNo[project.options.forceSquare];
        project.options.includeAt2x = args.include2x ? YesNo[YesNo.YES] : YesNo[project.options.includeAt2x];

        project.options.borderPadding = args.borderPadding as number ?? project.options.borderPadding;
        project.options.shapePadding = args.shapePadding as number ?? project.options.shapePadding;
        project.options.innerPadding = args.innerPadding as number ?? project.options.innerPadding;

        project.options.cleanAlpha = args.cleanAlpha ? YesNo[YesNo.YES] : YesNo[project.options.cleanAlpha];
        project.options.colorMask = args.colorMask ? YesNo[YesNo.YES] : YesNo[project.options.colorMask];
        project.options.aliasSprites = args.aliasSprites ? YesNo[YesNo.YES] : YesNo[project.options.aliasSprites];
        project.options.debugMode = args.debugMode ? YesNo[YesNo.YES] : YesNo[project.options.debugMode];
        project.options.trimMode = args.trimMode as TrimMode ?? TrimMode[project.options.trimMode];
        project.options.trimThreshold = args.trimThreshold as number ?? project.options.trimThreshold;

        project.options.animatedGif = AnimatedGif[args.animatedGif as AnimatedGif ?? project.options.animatedGif];
        project.options.compressProject = args.compressProject ? YesNo[YesNo.YES] : YesNo[project.options.compressProject];

        return project;
    }

    static mergeImagesIntoProject = (project: Project, images: string[]) => {
        if(images && images.length) {
            images.forEach((path) => {
                if(fs.existsSync(path)) {
                    const imageItem = ImageUtil.EMPTY_IMAGE_ITEM;
                    const fileParts = FileUtil.getFileParts(path);
                    imageItem.filename = fileParts?.filename;
                    imageItem.filetype = fileParts?.filetype as unknown as ImageFormat;
                    imageItem.fullpath = fileParts?.pathfull;
                    imageItem.src =
                        ImageUtil.PREAMBLE_TEMPLATE.replace(/xxx/g, (fileParts?.filetype ?? 'png').toLocaleLowerCase()) +
                        Buffer.from(fs.readFileSync(path)).toString('base64');
                    imageItem.frames = [];
                    imageItem.populateFrameDataComplete = false;
                    imageItem.isEmpty = false;
                    project.images[path] = imageItem;
                }
            });
        }
    }
}