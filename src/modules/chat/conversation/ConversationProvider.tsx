import React from 'react';
import type { BaseConversation } from '../types/BaseConversation';
import { ConversationContext } from './ConversationContext';


// ConversationProvider — the context PRODUCER for a conversation row.
// The row slots (the `Conversation` namespace) are the context
// CONSUMERS; keeping the two apart mirrors `MessageProvider` vs
// `Message`. Base owns this mechanism and the neutral `BaseConversation`
// envelope; the kit's `DefaultConversation` mounts it and composes the
// slots; the consumer owns the list, ordering, selection, and menu.
//
// It carries only what the slots read — the row's `conversation` and
// its `selected` state. Hover is plain CSS (`Conversation.Container`
// sets `group`), so there is no interaction state here.

export interface ConversationProviderProps {

    conversation: BaseConversation;
    selected?: boolean;

    children?: React.ReactElement | null;

}

export function ConversationProvider({ children, ...props }: ConversationProviderProps) {

    return (
        <ConversationContext.Provider value={props}>
            {children}
        </ConversationContext.Provider>
    );

}

// The slots that a row composes live in the `Conversation` namespace
// (`./Conversation`), NOT on this component — the provider is only the
// context producer, the slots are its consumers.
