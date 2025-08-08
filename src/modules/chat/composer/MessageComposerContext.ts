import { Context, createContext, useContext } from 'react';


// MessageComposerContext

export interface MessageComposerDraft {

    body: string;
    replyToMessageId?: string;

}

export interface MessageComposerContextProps<D extends MessageComposerDraft = MessageComposerDraft> {

    draft: D;

    updateDraft: (patch: Partial<D> | ((prev: D) => Partial<D>)) => void;
    clearDraft: () => void;

    setBusy: (busy: boolean) => void;

}

export const MessageComposerContext = createContext<MessageComposerContextProps<MessageComposerDraft> | null>(null);

export function useMessageComposer<D extends MessageComposerDraft = MessageComposerDraft>() {

    const context = useContext(MessageComposerContext as unknown as Context<MessageComposerContextProps<D> | null>);

    if (!context) {
        throw new Error('useMessageComposer must be used within a MessageComposer');
    }

    return context as MessageComposerContextProps<D>;

}
