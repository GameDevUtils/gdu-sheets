export enum MESSAGE_TYPE {
    DEBUG,
    INFO,
    LOG,
    WARN,
    ERROR,
}

export type Message = {
    type: MESSAGE_TYPE,
    data: string,
    more: string | null,
};
