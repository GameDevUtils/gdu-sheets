// export enum MESSAGE_TYPE {
//     DEBUG,
//     INFO,
//     LOG,
//     WARN,
//     ERROR,
// }

export type MessageTypes = "DEBUG" | "INFO" | "LOG" | "WARN" | "ERROR";

export type Message = {
    type: MessageTypes,
    data: string,
    more: string | null,
};

export interface LogFunction {
    (msg: string, ...more: any[]): void;
}

export interface LogTo {
    debug: LogFunction;
    info: LogFunction;
    log: LogFunction;
    warn: LogFunction;
    error: LogFunction;
    clear?: LogFunction;
}

export default class LogHelper {

    static _messages : Array<Message> = [];

    static _includePrefix = false;
    public static get IncludePrefix(): boolean { return LogHelper._includePrefix; }
    public static set IncludePrefix(value: boolean) { LogHelper._includePrefix = value; }

    static _outputModule: LogTo | undefined = undefined;
    public static set OutputModule(value: LogTo) { LogHelper._outputModule = value; }

    static _logLevel: MessageTypes = "DEBUG";
    public static get LogLevel() { return LogHelper._logLevel; }
    // @ts-ignore
    public static set LogLevel(level: MessageTypes) { LogHelper._logLevel = level; }

    public static LogMessage(type: MessageTypes, msg: string, more?: string | any) : void {

        const message = {
            type: type,
            data: LogHelper.IncludePrefix ? type + ': ' + msg : msg,
            more: more ? (typeof more === 'string' ? more : JSON.stringify(more, null, 3)) : "",
        } as Message;

        LogHelper._messages.push(message);

        const outputModule = LogHelper._outputModule;
        if(outputModule && (type >= LogHelper.LogLevel)) {
            switch(type) {
                case "DEBUG":
                    outputModule.debug(message.data + (message.more ? '\n' + message.more : ''));
                    break;
                case "INFO":
                    outputModule.info(message.data + (message.more ? '\n' + message.more : ''));
                    break;
                case "LOG":
                    outputModule.log(message.data + (message.more ? '\n' + message.more : ''));
                    break;
                case "WARN":
                    outputModule.warn(message.data + (message.more ? '\n' + message.more : ''));
                    break;
                case "ERROR":
                    outputModule.error(message.data + (message.more ? '\n' + message.more : ''));
                    break;
            }
        }
    }

    public static Clear() : void {
        LogHelper._messages.length = 0;
    }
}