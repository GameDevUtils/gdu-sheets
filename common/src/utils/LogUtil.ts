import {Message, MESSAGE_TYPE} from "../objs/messages";

interface LogFunction {
    (data: string, ...more: any[]): void;
}

export interface LogTo {
    debug: LogFunction;
    info: LogFunction;
    log: LogFunction;
    warn: LogFunction;
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

    static _logLevel: MESSAGE_TYPE = MESSAGE_TYPE.DEBUG;
    static get LogLevel() { return LogUtil._logLevel; }
    // @ts-ignore
    static set LogLevel(level: MESSAGE_TYPE) { LogUtil._logLevel = level; }

    static LogMessage(type: MESSAGE_TYPE, data: string, more?: string | any) : void {

        // // try to ensure numeric value
        // switch(type) {
        //     case MESSAGE_TYPE.DEBUG: type = MESSAGE_TYPE.DEBUG; break;
        //     case MESSAGE_TYPE.INFO: type = MESSAGE_TYPE.INFO; break;
        //     case MESSAGE_TYPE.LOG: type = MESSAGE_TYPE.LOG; break;
        //     case MESSAGE_TYPE.WARN: type = MESSAGE_TYPE.WARN; break;
        //     case MESSAGE_TYPE.ERROR: type = MESSAGE_TYPE.ERROR; break;
        //     default: type = MESSAGE_TYPE.WARN; break;
        // }

        const message = {
            type: type,
            data: LogUtil.IncludePrefix ? MESSAGE_TYPE[type] + ': ' + data : data,
            more: more ? (typeof more === 'string' ? more : JSON.stringify(more)) : more,
        } as Message;

        LogUtil._messages.push(message);

        const outputModule = LogUtil._outputModule;
        if(outputModule && (type >= LogUtil.LogLevel)) {
            switch(type) {
                case MESSAGE_TYPE.DEBUG:
                    console.debug(message.data + (message.more ? '\n' + message.more : ''));
                    break;
                case MESSAGE_TYPE.INFO:
                    console.info(message.data + (message.more ? '\n' + message.more : ''));
                    break;
                case MESSAGE_TYPE.LOG:
                    console.log(message.data + (message.more ? '\n' + message.more : ''));
                    break;
                case MESSAGE_TYPE.WARN:
                    console.warn(message.data + (message.more ? '\n' + message.more : ''));
                    break;
                case MESSAGE_TYPE.ERROR:
                    console.error(message.data + (message.more ? '\n' + message.more : ''));
                    break;
            }
        }
    }

    static Clear() : void {
        LogUtil._messages.length = 0;
    }

    // static Flush(out: stream) : void { }
}