import type { BaseMessage } from './BaseMessage';


export interface MessageRow {

    message: BaseMessage;
    meta: MessageRowMeta;

}

export interface MessageRowMeta {

    isFirst: boolean;
    isLast: boolean;

}
