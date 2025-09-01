import { createContext, useContext } from 'react';
import type { ConversationProviderProps } from './ConversationProvider';


// ConversationContext

export interface ConversationContextProps extends Omit<ConversationProviderProps, 'className' | 'children'> {

    isOver: boolean;

}

export const ConversationContext = createContext<ConversationContextProps | null>(null);

export function useConversation() {

    const context = useContext(ConversationContext);
    if (!context) {
        throw new Error('useConversation must be used within a Conversation');
    }

    return context;

}
