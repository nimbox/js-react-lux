import { useChat } from '../ChatContext';
import type { BaseConversation } from '../types/BaseConversation';
import type { ConversationOption } from '../types/ConversationOption';


// The derivation seam for a conversation row — the twin of
// `useMessageOptions`. Resolves the options shown for a conversation:
// **requested ∩ permitted ∩ applicable** (docs §7). Requested = the
// consumer's `conversationOptions`. Permitted = the option's
// `capability` is in `capabilities` (an absent set is permissive).
// Applicable = `applies(conversation)`.

export function useConversationOptions(conversation: BaseConversation): ConversationOption[] {

    const { conversationOptions, capabilities } = useChat();

    return conversationOptions.filter(option =>
        (option.capability == null || capabilities == null || capabilities.has(option.capability)) &&
        (option.applies == null || option.applies(conversation))
    );

}
