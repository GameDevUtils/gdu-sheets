import {Arguments, CommandBuilder, CommandModule} from "yargs";
import ArgsUtil, {ValidatedResult} from "../utils/ArgsUtil";
import fs from "fs";
// import CommandModuleEx_NoCheck from "./CommandModuleEx.no-check";
import {Buffer} from "buffer";
import {FileUtil, ProjectUtil, LogUtil, MESSAGE_TYPE, APPLICATION_VERSION, Args} from "gdu-common";


export default class CommandModuleEx implements CommandModule<{}, unknown> {
    _aliases: ReadonlyArray<string> | string | undefined;
    _builder: CommandBuilder<{}, unknown> | undefined;
    _command: ReadonlyArray<string> | string | undefined;
    _deprecated: boolean | string | undefined;
    _describe: string | false | undefined;

    get aliases(): ReadonlyArray<string> | string | undefined { return this._aliases; }
    get builder(): CommandBuilder<{}, unknown> | undefined { return this._builder; }
    get command(): ReadonlyArray<string> | string | undefined { return this._command; }
    get deprecated(): boolean | string | undefined { return this._deprecated; }
    get describe(): string | false | undefined { return this._describe; }

    _handlerResult: ValidatedResult = new ValidatedResult();
    get handlerResult() : ValidatedResult { return this._handlerResult; }
    set handlerResult(value: ValidatedResult) { this._handlerResult = value; }

    _hasError = false;
    get hasError() : boolean { return this._hasError; }
    get hasNoError() : boolean { return !this._hasError; }

    _readFirst = false;
    get readFirst() : boolean { return this._readFirst; }
    set readFirst(val: boolean) { this._readFirst = val; }

    _populateFrames = false;
    get populateFrames() : boolean { return this._populateFrames; }
    set populateFrames(val: boolean) { this._populateFrames = val; }

    _packImages = false;
    get packImages() : boolean { return this._packImages; }
    set packImages(val: boolean) { this._packImages = val; }

    _cullImages = false;
    get cullImages() : boolean { return this._cullImages; }
    set cullImages(val: boolean) { this._cullImages = val; }

    _commandName : string = '';
    protected get commandName() : string { return this._commandName; }
    protected set commandName(val: string) { this._commandName = val; }

    static setFlowValues = (self: any, commandName: string, readFirst: boolean = false, cullImages: boolean = false, packImages: boolean = false, populateFrames: boolean = false) => {
        self.commandName = commandName;
        self.readFirst = readFirst;
        self.cullImages = cullImages;
        self.packImages = packImages;
        self.populateFrames = populateFrames;
    };

    handler(args: Arguments): void {
        // @ts-ignore
        LogUtil.LogLevel = MESSAGE_TYPE[args.logLevel as keyof MESSAGE_TYPE];
        LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, `In handler, '${ this.commandName }', before Validate() ...`);
        LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, 'In handler ...');
        this.handlerResult = ArgsUtil.Validate(args, this.commandName, true, true);

        if (this.handlerResult.hasNoError) {
            const exists = fs.existsSync(args.path as string);
            const save = !exists || args.overwrite;
            let project = ProjectUtil.DEFAULT_PROJECT;

            LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, `Executing command, '${ this.commandName }'.`);
            if(this.readFirst) {
                LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, 'Reading project file ...');
                if(exists) {
                    const data = fs.readFileSync(args.path as string, { flag: 'r'}).toString();
                    project = ProjectUtil.deserialize(data, APPLICATION_VERSION.CURRENT);
                    LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, 'Success.');
                } else {
                    LogUtil.LogMessage(MESSAGE_TYPE.ERROR, `Cannot find file, '${args.path as string}'.`);
                }
            }

            const argsForMerge = Object.assign({}, args) as Args;
            ProjectUtil.mergeArgsIntoProject(project, argsForMerge);

            if(this.cullImages) {
                const cullByFullPath = args.removeByFullPath;
                const cullByFilename = args.removeByFilename;

                LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, 'Culling images ...');
                const keys = Object.keys(project.images);
                keys.forEach((key) => {
                    if(cullByFullPath) {
                        if(this.handlerResult._images.includes(key)) {
                            delete project.images[key];
                            LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, '  ${key}');
                        }
                    } else if(cullByFilename) {
                        const fileParts = FileUtil.getFileParts(key);
                        let found = '';
                        this.handlerResult._images.forEach((img) => {
                            if(img.endsWith(fileParts?.filename ?? '')) {
                                found = img;
                            }
                        });
                        if(found.length > 0) {
                            LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, '  ${found}')
                            delete project.images[found];
                        }
                    }
                });
            } else {
                LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, 'Merging images into project ...')

                // CommandModuleEx_NoCheck.mergeImagesIntoProject(project, this.handlerResult._images);
                const images = this.handlerResult._images;
                if(images && images.length) {
                    images.forEach((path) => {
                        if(fs.existsSync(path)) {
                            ProjectUtil.mergeSingleImageIntoProject(
                                project, path, Buffer.from(fs.readFileSync(path)));
                        }
                    });
                }

                LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, 'Success.')
            }

            if(this.populateFrames || this.packImages) {
                ProjectUtil.populateImageFrames(project);
            }

            if(this.packImages) {
                // TODO: pack images
                // TODO: export sheet and atlas
                // TODO: optionally compress sheet and atlas
            } else {
                LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, 'Writing project ...');
                const projectJson = ProjectUtil.serialize(project);
                if(args.console) {
                    LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, 'Writing project to console.');
                    console.log(projectJson);
                } else {
                    if(save) {
                        LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, `'Writing project to file, '${args.path as string}'.'`);
                        const compressed = project.options.compressProject ?? false;
                        // TODO: implement compression
                        fs.writeFileSync(args.path as string, Buffer.from(projectJson), { flag: 'w' });
                    } else {
                        LogUtil.LogMessage(MESSAGE_TYPE.WARN, `File exists, '${args.path as string}'. Specify '--overwrite' to replace.`);
                    }
                }
            }
// console.log(JSON.stringify(project,null,3));
        }
    }
}