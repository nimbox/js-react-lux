import { createContext, useContext } from 'react';


// MessageComposerContext

export interface MessageComposerContextProps {

    registerSubmit: (panel: string, onSubmit: () => Promise<void>) => void;

}

export const MessageComposerContext = createContext<MessageComposerContextProps | null>(null);

export function useMessageComposer() {

    const context = useContext(MessageComposerContext);

    if (!context) {
        throw new Error('useMessageComposer must be used within a MessageComposer');
    }

    return context

}
