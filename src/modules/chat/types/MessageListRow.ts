import type { BaseMessage } from './BaseMessage';
import type { MessageGroupRow } from './MessageGroupRow';


// A row in the message list. `group` is the common case (consecutive messages by
// one author); `single` is an ungrouped message (a system event — centered, no
// avatar); `separator` is a day divider; `marker` is an injected divider such as
// the unread "New messages" line (§4).
export type MessageListRow =
    { id: string, type: 'separator', date: Date } |
    { id: string, type: 'marker', label?: string } |
    { id: string, type: 'single', message: BaseMessage } |
    { id: string, type: 'group', group: MessageGroupRow };
