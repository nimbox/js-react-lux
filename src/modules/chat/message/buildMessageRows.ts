import type { MessageBuildRowsOptions } from '../types/MessageBuildRowsOptions';
import type { MessageData } from '../types/MessageData';
import type { MessageGroupRow } from '../types/MessageGroupRow';
import type { MessageListRow } from '../types/MessageListRow';


export function buildMessageRows(
    messages: MessageData[],
    options: MessageBuildRowsOptions = {}
): MessageListRow[] {

    const { formatLocalDate = defaultFormatLocalDate } = options;
    const rows: MessageListRow[] = [];

    if (messages.length > 0) {

        const sorted = sortMessages(messages);

        // Current state.

        let currentLocalDate: string | null = null;
        let currentGroupRow: MessageGroupRow | null = null;

        // Go over all messages and build rows.

        for (const message of sorted) {

            // Add a new date separator if the date has changed.
            // Take into account that we are using a locale aware
            // date string to actually do this.

            const date = new Date(message.timestamp);
            const localDate = formatLocalDate(date);

            if (localDate !== currentLocalDate) {

                // If we have a current group row, add it to the rows.

                if (currentGroupRow) {
                    currentGroupRow.messages[currentGroupRow.messages.length - 1].meta.isLast = true;
                    rows.push({ id: currentGroupRow.messages[0].message.id, type: 'group', group: currentGroupRow });
                    currentGroupRow = null;
                }

                // Add the new date separator.

                rows.push({ id: localDate, type: 'separator', date });
                currentLocalDate = localDate;

            }

            // If we don't have a current group row,
            // create one and with the message in it.

            if (!currentGroupRow) {
                currentGroupRow = {
                    id: message.id,
                    direction: message.direction,
                    author: message.author,
                    messages: [{ message, meta: { isFirst: true, isLast: false } }]
                };
                continue;
            }

            // If the current group row has a different direction or author,
            // purge the row and create a new one with the message in it.

            if (currentGroupRow.direction !== message.direction || currentGroupRow.author.id !== message.author.id) {
                currentGroupRow.messages[currentGroupRow.messages.length - 1].meta.isLast = true;
                rows.push({ id: currentGroupRow.messages[0].message.id, type: 'group', group: currentGroupRow });
                currentGroupRow = {
                    id: message.id,
                    direction: message.direction,
                    author: message.author,
                    messages: [{ message, meta: { isFirst: true, isLast: false } }]
                };
                continue;
            }

            // Add the message to the current group row.

            currentGroupRow.messages.push({ message, meta: { isFirst: false, isLast: false } });

        }

        // If we have a current group row, 
        // add it to the rows.

        if (currentGroupRow) {
            currentGroupRow.messages[currentGroupRow.messages.length - 1].meta.isLast = true;
            rows.push({ id: currentGroupRow.messages[0].message.id, type: 'group', group: currentGroupRow });
        }

    }

    return rows;

}

function sortMessages(messages: MessageData[]) {

    const sorted = messages
        .map(c => [c.timestamp ? new Date(c.timestamp).getTime() : 0, c] as const)
        .sort(([a], [b]) => a - b)
        .map(([_, c]) => c);

    return sorted;

}

function defaultFormatLocalDate(date: Date) {

    return `${String(date.getFullYear())}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

}
