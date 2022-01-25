import {Arguments, /*CommandModule*/} from 'yargs';
import 'colors';
import * as fs from "fs";
// import path from 'path';
// import * as base64 from "base-64";

export class ValidatedResult {
     _command = "";
    get command() : string { return this._command; }
    set command(value: string) { this._command = value; }
    _path: string | undefined | null = undefined;
    get path() : string | undefined | null { return this._path; }
    set path(value: string | undefined | null) { this._path = value; }
    _images: string[] = [];
    get images() { return this._images; }
    addImage(value: string) { this._images.push(value); }
    _errors: string[] = [];
    get errors() { return this._errors; }
    addError(value: string) { this._errors.push(value); }
    _hasError = false;
    get hasError() { return this._hasError; }
    set hasError(value: boolean) { this._hasError = value; }
    get hasNoError() { return !this._hasError; }
}


export default class ArgsUtil {
    static Validate = (args: Arguments, command: string, hasPath: boolean, hasImages: boolean): ValidatedResult => {
        const result = new ValidatedResult();

        if (command && (args[command] === command || (args._ && args._.length > 0 && args._[0] === command))) {
            result.command = command;
        } else {
            result.addError(`Missing command, '${command}'.`);
        }

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
                    result.addImage(Buffer.from(fs.readFileSync(image)).toString('base64'));
                }
            }

        } else if (command === "add" || command === "remove") {
            result.addError("Missing images.");
        }

        result.hasError = result.errors && result.errors.length > 0;
        if(result.hasError) {
            for(const error of result.errors) {
                // console.error(error.red);
            }
        }

        return result;
    }
}