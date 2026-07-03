import type { BaseMessage } from './BaseMessage';


// One message within an author group, with its position flags (first/last in the
// group). The flags live inline, not in a nested `meta` — which would collide with
// the unrelated `Conversation.Meta` slot / `BaseConversation.meta`.
export interface MessageRow {

    message: BaseMessage;

    isFirst: boolean;
    isLast: boolean;

}
