import type { MessageData } from './MessageData';


export interface MessageRow {

    message: MessageData;
    meta: MessageRowMeta;

}

export interface MessageRowMeta {

    isFirst: boolean;
    isLast: boolean;

}
