export enum MESSAGE_TYPE {
    WARN,
    DEBUG,
    ERROR,
}

export type Message = {
    type: MESSAGE_TYPE,
    data: string,
    more: string | null,
};
