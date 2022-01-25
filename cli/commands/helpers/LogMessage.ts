
export enum MessageType {
    Info,
    Warn,
    Error,
}

export type LogMessage = {
    type: MessageType,
    message: string,
}