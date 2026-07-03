import { createContext, useContext } from 'react';
import type { MessageProviderInputs } from './MessageProvider';


// MessageContext

// The context the message slots read. Identical to the provider's inputs — the
// provider adds no derived state of its own (hover reveal is pure CSS, so there is no
// `isOver` here). Kept as a named alias so slots depend on a context type rather than
// the provider's input type directly.
export type MessageContextProps = MessageProviderInputs;

export const MessageContext = createContext<MessageContextProps | null>(null);

export function useMessage() {

    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessage must be used within a Message');
    }

    return context;

}
