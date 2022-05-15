import {Message, MESSAGE_TYPE} from "../objs/messages";
// import stream from "node:stream";

interface LogFunction {
    (data: string, ...more: any[]): void;
}

export interface LogTo {
    log: LogFunction;
    info: LogFunction;
    debug: LogFunction;
    error: LogFunction;
    clear?: LogFunction;
}

export default class LogUtil {

    static _messages : Array<Message> = [];

    static _includePrefix = false;
    static get IncludePrefix(): boolean { return LogUtil._includePrefix; }
    static set IncludePrefix(show: boolean) { LogUtil._includePrefix = show; }

    static _outputModule: LogTo | undefined = undefined;
    static set OutputModule(logTo: LogTo) { LogUtil._outputModule = logTo; }

    static LogMessage(type: MESSAGE_TYPE, data: string, more?: string | any) : void {
        const message = {
            type: type,
            data: LogUtil.IncludePrefix ? MESSAGE_TYPE[type] + ': ' + data : data,
            more: more ? (typeof more === 'string' ? more : JSON.stringify(more)) : more,
        } as Message;

        LogUtil._messages.push(message);

        const outputModule = LogUtil._outputModule;
        if(outputModule) {
            switch(type) {
                case MESSAGE_TYPE.WARN:
                    console.info(message.data + (message.more ? '\n' + message.more : ''));
                    // console.log(message.data + (message.more ? '\n' + message.more : ''));
                    break;
                case MESSAGE_TYPE.DEBUG:
                    console.debug(message.data + (message.more ? '\n' + message.more : ''));
                    // console.log(message.data + (message.more ? '\n' + message.more : ''));
                    break;
                case MESSAGE_TYPE.ERROR:
                    console.error(message.data + (message.more ? '\n' + message.more : ''));
                    // console.log(message.data + (message.more ? '\n' + message.more : ''));
                    break;
            }
        }
    }

    static Clear() : void {
        LogUtil._messages.length = 0;
    }

    // static Flush(out: stream) : void { }
}