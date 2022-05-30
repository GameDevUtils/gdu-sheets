// // @ts-nocheck

import {Arguments} from "yargs";
import fs from "fs";
import {Buffer} from "buffer";
import { ImageUtil, FileUtil, ProjectUtil, Project, ImageFrame } from "gdu-common";

export default class CommandModuleEx_NoCheck {

    static mergeArgsIntoProject = (project: Project, args: Arguments) => {
        project.options.name = args.name as string ?? project.options.name;
        project.options.imageFormat = ProjectUtil.stringToImageFormat(args.imageFormat as string, project.options.imageFormat);
        project.options.dataFormat = ProjectUtil.stringToDataFormat(args.dataFormat as string, project.options.dataFormat);
        project.options.nameInSheet = ProjectUtil.stringToSpriteNameInAtlas(args.nameInSheet as string, project.options.nameInSheet);

        project.options.spritePacker = ProjectUtil.stringToSpritePacker(args.spritePacker as string, project.options.spritePacker);
        project.options.sortBy = ProjectUtil.stringToSortBy(args.sortBy as string, project.options.sortBy);
        project.options.allowRotate = ProjectUtil.booleanToYesNo(args.allowRotate as boolean, project.options.allowRotate);

        project.options.width = args.width as number ?? project.options.width;
        project.options.height = args.height as number ?? project.options.height;
        project.options.sizeMode = ProjectUtil.stringToSizeMode(args.sizeMode as string, project.options.sizeMode);
        project.options.constraint = ProjectUtil.stringToConstraint(args.constraint as string, project.options.constraint);
        project.options.forceSquare = ProjectUtil.booleanToYesNo(args.forceSquare as boolean, project.options.forceSquare);
        project.options.includeAt2x = ProjectUtil.booleanToYesNo(args.include2x as boolean, project.options.includeAt2x);

        project.options.borderPadding = args.borderPadding as number ?? project.options.borderPadding;
        project.options.shapePadding = args.shapePadding as number ?? project.options.shapePadding;
        project.options.innerPadding = args.innerPadding as number ?? project.options.innerPadding;

        project.options.cleanAlpha = ProjectUtil.booleanToYesNo(args.cleanAlpha as boolean, project.options.cleanAlpha);
        project.options.colorMask = ProjectUtil.booleanToYesNo(args.colorMask as boolean, project.options.colorMask);
        project.options.aliasSprites = ProjectUtil.booleanToYesNo(args.aliasSprites as boolean, project.options.aliasSprites);
        project.options.debugMode = ProjectUtil.booleanToYesNo(args.debugMode as boolean, project.options.debugMode);
        project.options.trimMode = ProjectUtil.stringToTrimMode(args.trimMode as string, project.options.trimMode);
        project.options.trimThreshold = args.trimThreshold as number ?? project.options.trimThreshold;

        project.options.animatedGif = ProjectUtil.stringToAnimatedGif(args.animatedGif as string, project.options.animatedGif);
        project.options.compressProject = ProjectUtil.booleanToYesNo(args.compressProject as boolean, project.options.compressProject);

        return project;
    }

    static mergeImagesIntoProject = (project: Project, images: string[]) => {
        if(images && images.length) {
            images.forEach((path) => {
                if(fs.existsSync(path)) {
                    const imageItem = ImageUtil.EMPTY_IMAGE_ITEM;
                    const fileParts = FileUtil.getFileParts(path);
                    imageItem.filename = fileParts?.filename;
                    imageItem.filetype = ProjectUtil.stringToImageFormat(fileParts?.filetype ?? 'png');
                    imageItem.fullpath = fileParts?.pathfull;
                    imageItem.src =
                        ImageUtil.PREAMBLE_TEMPLATE.replace(/xxx/g, (fileParts?.filetype ?? 'png').toLocaleLowerCase()) +
                        Buffer.from(fs.readFileSync(path)).toString('base64');
                    imageItem.frames = [] as ImageFrame[];
                    imageItem.populateFrameDataComplete = false;
                    imageItem.isEmpty = false;
                    project.images[path] = imageItem;
                }
            });
        }
    }
}
