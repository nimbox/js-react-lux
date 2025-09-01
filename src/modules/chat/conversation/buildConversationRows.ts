import type { ConversationBuildRowsOptions } from '../types/ConversationBuildRowsOptions';
import type { ConversationData } from '../types/ConversationData';
import type { ConversationRow } from '../types/ConversationRow';


export function buildConversationRows(
    conversations: ConversationData[],
    options: ConversationBuildRowsOptions = {}
): ConversationRow[] {

    let processed = conversations;

    if (options.sort) {
        processed = sortConversations(processed);
    }

    return processed.map(c => ({ id: c.id, type: 'conversation', conversation: c }));

}

/**
 * Sorts conversations by timestamp in descending order.
 */
function sortConversations(
    conversations: ConversationData[]
) {

    const destructured = conversations
        .map(c => [c.timestamp ? new Date(c.timestamp).getTime() : 0, c] as const)
        .sort(([a], [b]) => b - a)
        .map(([_, c]) => c);

    return destructured;

}
