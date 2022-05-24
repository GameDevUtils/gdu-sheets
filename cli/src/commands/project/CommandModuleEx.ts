import {Arguments, CommandBuilder, CommandModule} from "yargs";
import ArgsUtil, {ValidatedResult} from "../utils/ArgsUtil";
import LogUtil from "gdu-common/build/utils/LogUtil";
import {MESSAGE_TYPE} from "gdu-common/build/objs/messages";
import fs from "fs";
import ProjectUtil from "gdu-common/build/utils/ProjectUtil";
import {APPLICATION_VERSION} from "gdu-common/build/utils/AppUtil";
import ExtCommandModule_NoCheck from "./CommandModuleEx.no-check";
import {Buffer} from "buffer";
import {YesNo} from "gdu-common/build/objs/projects";
import FileUtil from "gdu-common/build/utils/FileUtil";

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

    _packImages = false;
    get packImages() : boolean { return this._packImages; }
    set packImages(val: boolean) { this._packImages = val; }

    _cullImages = false;
    get cullImages() : boolean { return this._cullImages; }
    set cullImages(val: boolean) { this._cullImages = val; }

    _commandName : string = '';
    protected get commandName() : string { return this._commandName; }
    protected set commandName(val: string) { this._commandName = val; }

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

            ExtCommandModule_NoCheck.mergeArgsIntoProject(project, args);

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
                ExtCommandModule_NoCheck.mergeImagesIntoProject(project, this.handlerResult._images);
                LogUtil.LogMessage(MESSAGE_TYPE.DEBUG, 'Success.')
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
                        const compressed = project.options.compressProject === YesNo.YES;
                        // TODO: implement compression
                        fs.writeFileSync(args.path as string, Buffer.from(projectJson), { flag: 'w' });
                    } else {
                        LogUtil.LogMessage(MESSAGE_TYPE.WARN, `File exists, '${args.path as string}'. Specify '--overwrite' to replace.`);
                    }
                }
            }
        }
    }
}