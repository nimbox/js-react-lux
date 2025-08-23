import { createContext, useContext } from 'react';
import type { ConversationData } from '../types/ConversationData';


// ConversationContext

export interface ConversationContextProps {

    menu?: React.ReactElement;
    conversation: ConversationData;

    isHovered: boolean;
    selected?: boolean;

}

export const ConversationContext = createContext<ConversationContextProps | null>(null);

export function useConversation() {

    const context = useContext(ConversationContext);
    if (!context) {
        throw new Error('useConversation must be used within a Conversation');
    }

    return context;

}
