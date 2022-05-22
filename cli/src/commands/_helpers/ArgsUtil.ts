import {Arguments, Argv /*CommandModule*/} from 'yargs';
import yargs from 'yargs/yargs';
import 'colors';
import * as fs from "fs";
import {symlink} from "fs";
// import path from 'path';
import glob from 'glob';

export class ValidatedResult {
     _command = "";
    get command() : string { return this._command; }
    set command(value: string) { this._command = value; }

    _commandArgs = [] as (string | number)[];
    get commandArgs() : (string | number)[] { return this._commandArgs; }
    set commandArgs(value: (string | number)[]) { this._commandArgs = value; }

    // _argv : { [x: string]: unknown; _: (string | number)[]; $0: string; } | Promise<{ [x: string]: unknown; _: (string | number)[]; $0: string; }> = { _: [], $0: ''};
    // get argv() : { [x: string]: unknown; _: (string | number)[]; $0: string; } | Promise<{ [x: string]: unknown; _: (string | number)[]; $0: string; }> { return this._argv; }
    // set argv(value: { [x: string]: unknown; _: (string | number)[]; $0: string; } | Promise<{ [x: string]: unknown; _: (string | number)[]; $0: string; }>) { this._argv = value; }

    _path: string | undefined | null = undefined;
    get path() : string | undefined | null { return this._path; }
    set path(value: string | undefined | null) { this._path = value; }

    _helpModule: string | undefined | null = undefined;
    get helpModule() : string | undefined | null { return this._helpModule; }
    set helpModule(value: string | undefined | null) { this._helpModule = value; }

    _images: string[] = [];
    get images() : string[] { return this._images; }
    setImages(value: string[]) { this._images = value; }
    addImage(value: string) : number { return this._images.push(value); }
    clearImages() { this._images = []; }

    _errors: string[] = [];
    get errors() : string[] { return this._errors; }
    setErrors(value: string[]) { this._errors = value; }
    addError(value: string) : number { return this._errors.push(value); }
    clearErrors() { this._errors = []; }

    get hasError() : boolean { return this._errors.length > 0; }
    get hasNoError() : boolean { return this._errors.length === 0; }
}


export default class ArgsUtil {
    static Validate = (args: Arguments, command: string, hasPath: boolean, hasImages: boolean): ValidatedResult => {
        const result = new ValidatedResult();

        // if (command && args[command] === command) {
        if (command && (args[command] === command || (args._ && args._.length > 0 && args._[0] === command))) {
            result.command = command;
            result.commandArgs = args._; // && args._.length > 0 ? args._ : [];
        } else {
            result.addError(`Missing command, '${command}'.`);
        }

        result.helpModule =
            args.module as string ||
            (args._ && args._.length > 1 ? (args._[1] as string).split(' ')[0] : undefined);

        if (hasPath && args["path"]) {
            result.path = args["path"] as string;
            if (hasPath && command !== "new") {
                if (!fs.existsSync(result.path)) {
                    result.addError(`Path not found, '${result.path}'.`)
                }
            }
        } else if(hasPath) {
            result.errors.push("Missing path value.");
        }

        if (hasImages && args["images"]) {
            for (const image of args["images"] as string[]) {
                if (fs.existsSync(image)) {
                    // result.addImage(Buffer.from(fs.readFileSync(image)).toString('base64'));
                    result.addImage(image);
                } else {
                    glob.sync(image, {}).forEach((match) => {
                        if (fs.existsSync(match)) {
                            result.addImage(match);
                        }
                    });
                }
            }
        } else if (command === "add" || command === "remove") {
            result.addError("Missing images.");
        }

        // result.hasError = result.errors && result.errors.length > 0;
        if(result.hasError) {
            for(const error of result.errors) {
                // console.error(error.red);
            }
        }

        return result;
    }
}