import type { BaseMessage } from './BaseMessage';


// One message within an author group, with its position flags (first/last in the
// group). The flags live inline — no nested `meta` (the old `MessageRowMeta`
// collided with the unrelated `Conversation.Meta` slot / `BaseConversation.meta`).
export interface MessageRow {

    message: BaseMessage;

    isFirst: boolean;
    isLast: boolean;

}
