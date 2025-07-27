import { MessageData } from '../types/MessageData';


export interface MessageGroup {

    id: string;

    author: MessageData['author'];
    direction: 'inbound' | 'outbound';

    messages: MessageData[];

}

export interface MessageGroupWithDate extends MessageGroup {

    dateKey: string; // Local date string like "2024-01-15"
    dateValue: Date; // Local date object for comparison

}

export interface DateGroup {
    dateValue: Date; // Local date object for operations and display
    groups: MessageGroup[]; // Groups of messages for this date
}

/**
 * Sorts messages by timestamp in ascending order.
 */
export function sortMessagesByTimestamp(messages: MessageData[]): MessageData[] {
    return [...messages]
        .map(m => [m.timestamp ? new Date(m.timestamp).getTime() : 0, m] as const)
        .sort(([a], [b]) => a - b)
        .map(([, m]) => m);
}

/**
 * Groups consecutive messages by author and direction.
 */
export function groupByAuthor(messages: MessageData[]): MessageGroup[] {

    const groups: MessageGroup[] = [];
    let currentGroup: MessageGroup | null = null;

    for (const message of messages) {
        if (
            !currentGroup ||
            currentGroup.author?.id !== message.author?.id ||
            currentGroup.direction !== message.direction
        ) {
            currentGroup = {
                id: message.id,
                direction: message.direction,
                author: message.author,
                messages: []
            };
            groups.push(currentGroup);
        }

        currentGroup.messages.push(message);

    }

    return groups;

}

/**
 * Groups messages by local date (timezone-aware)
 */
export function groupByDate(
    messages: MessageData[], 
    createDateKey: (date: Date) => string = (date) => date.toLocaleDateString('en-US')
): Array<{
    dateValue: Date;
    dateKey: string;
    messages: MessageData[];
}> {

    const dateGroups = new Map<string, {
        dateValue: Date;
        dateKey: string;
        messages: MessageData[];
    }>();

    for (const message of messages) {

        if (!message.timestamp) continue;

        const dateValue = new Date(message.timestamp);
        const dateKey = createDateKey(dateValue);

        let existing = dateGroups.get(dateKey);
        if (!existing) {
            existing = {
                dateValue,
                dateKey,
                messages: []
            };
            dateGroups.set(dateKey, existing);
        }

        existing.dateValue = dateValue.getTime() < existing.dateValue.getTime() ? dateValue : existing.dateValue;
        existing.messages.push(message);

    }

    return Array.from(dateGroups.values())
        .sort((a, b) => a.dateValue.getTime() - b.dateValue.getTime());

}

/**
 * Groups messages by author/direction.
 */
export function groupMessagesByAuthor(messages: MessageData[]): MessageGroup[] {
    const sortedMessages = sortMessagesByTimestamp(messages);
    return groupByAuthor(sortedMessages);
}

/**
 * Groups messages by date and author/direction.
 */
export function groupMessagesByDateAuthor(
    messages: MessageData[],
    createDateKey?: (date: Date) => string
): DateGroup[] {

    const sortedMessages = sortMessagesByTimestamp(messages);
    const dateGroups = groupByDate(sortedMessages, createDateKey);

    const result: DateGroup[] = [];

    for (const dateGroup of dateGroups) {
        const authorGroups = groupByAuthor(dateGroup.messages);
        result.push({
            dateValue: dateGroup.dateValue,
            groups: authorGroups
        });
    }

    return result;

}
