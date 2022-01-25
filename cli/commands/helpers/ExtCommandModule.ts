import yargs, {CommandModule, Arguments, Argv, CommandBuilder} from "yargs";
import {LogMessage, MessageType} from "./LogMessage";
import {ValidatedResult} from "../args-util";

export default class ExtCommandModule implements CommandModule<{}, unknown> {
    //_messages : string[] = [];

    constructor() {
        this._messages = [];
    }

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
    handler (argv: Arguments) : void {
        this.handlerResult = new ValidatedResult();
    }

    _messages: LogMessage[] = [];

    _hasError = false;
    get hasError() : boolean { return this._hasError; }
    get hasNoError() : boolean { return !this._hasError; }

    // queueMessage(type: MessageType, message: string) : void {
    //     this._hasError = this._hasError || type === MessageType.Error;
    //     this._messages.push({type, message});
    // }
    //
    // printMessages(): void {
    //     for(const msg of this._messages) {
    //         switch (msg.type) {
    //             case MessageType.Info:
    //                 console.error(msg.message.cyan);
    //                 break;
    //             case MessageType.Warn:
    //                 console.error(msg.message.yellow);
    //                 break;
    //             case MessageType.Error:
    //                 console.error(msg.message.red);
    //                 break;
    //         }
    //     }
    // }
}