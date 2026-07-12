import type { BaseMessage } from '../types/BaseMessage';
import type { BuildMessageRowsOptions } from '../types/BuildMessageRowsOptions';
import type { MessageGroupRow } from '../types/MessageGroupRow';
import type { MessageListRow } from '../types/MessageListRow';


// Derives the list rows from a flat message list: day separators, author groups,
// ungrouped `single` rows (system events), and an optional unread `marker`.
// Grouping runs on the opaque `group` key — the base never reads `author`.
export function buildMessageRows(
    messages: BaseMessage[],
    options: BuildMessageRowsOptions = {}
): MessageListRow[] {

    const { formatLocalDate = defaultFormatLocalDate, markerBeforeId } = options;
    const rows: MessageListRow[] = [];

    if (messages.length === 0) {
        return rows;
    }

    const sorted = sortMessages(messages);

    // Current state.

    let currentLocalDate: string | null = null;
    let currentGroupRow: MessageGroupRow | null = null;
    let currentGroupKey: string | null = null;

    // Flush the open group (if any) into a row.
    const flushGroup = () => {
        if (currentGroupRow) {
            currentGroupRow.messages[currentGroupRow.messages.length - 1].isLast = true;
            rows.push({ id: currentGroupRow.messages[0].message.id, type: 'group', group: currentGroupRow });
            currentGroupRow = null;
            currentGroupKey = null;
        }
    };

    for (const message of sorted) {

        // Day separator when the (locale-aware) date changes.

        const date = new Date(message.timestamp);
        const localDate = formatLocalDate(date);
        if (localDate !== currentLocalDate) {
            flushGroup();
            rows.push({ id: localDate, type: 'separator', date });
            currentLocalDate = localDate;
        }

        // Unread marker immediately before the watermark message.

        if (markerBeforeId != null && message.id === markerBeforeId) {
            flushGroup();
            rows.push({ id: `marker-${message.id}`, type: 'marker' });
        }

        // Ungrouped message (no `group`) → a `single` row (system events, …).

        if (!message.group) {
            flushGroup();
            rows.push({ id: message.id, type: 'single', message });
            continue;
        }

        // Start a group, or break it on an alignment / grouping-key change.

        if (!currentGroupRow || currentGroupRow.alignment !== message.alignment || currentGroupKey !== message.group) {
            flushGroup();
            currentGroupRow = {
                id: message.id,
                alignment: message.alignment,
                author: message.author,
                messages: [{ message, isFirst: true, isLast: false }]
            };
            currentGroupKey = message.group;
            continue;
        }

        // Otherwise, extend the current group.

        currentGroupRow.messages.push({ message, isFirst: false, isLast: false });

    }

    flushGroup();

    return rows;

}

function sortMessages(messages: BaseMessage[]) {

    const sorted = messages
        .map(c => [c.timestamp ? new Date(c.timestamp).getTime() : 0, c] as const)
        .sort(([a], [b]) => a - b)
        .map(([, c]) => c);

    return sorted;

}

function defaultFormatLocalDate(date: Date) {

    return `${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

}
