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

    static _logLevel: MESSAGE_TYPE = MESSAGE_TYPE.ERROR;
    static get LogLevel() { return LogUtil._logLevel; }
    // @ts-ignore
    static set LogLevel(level: MESSAGE_TYPE) { LogUtil._logLevel = MESSAGE_TYPE[level]; }

    static LogMessage(type: MESSAGE_TYPE, data: string, more?: string | any) : void {
        const message = {
            type: type,
            data: LogUtil.IncludePrefix ? MESSAGE_TYPE[type] + ': ' + data : data,
            more: more ? (typeof more === 'string' ? more : JSON.stringify(more)) : more,
        } as Message;

        LogUtil._messages.push(message);

        const outputModule = LogUtil._outputModule;
        if(outputModule && (type as number) >= (LogUtil.LogLevel as number)) {
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