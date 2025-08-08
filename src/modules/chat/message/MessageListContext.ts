import { createContext, useContext } from 'react';

// MessageListContext

export interface MessageListContextValue {

    scrollToBottom: () => void;

}

export const ChatMessageListContext = createContext<MessageListContextValue>({
    scrollToBottom: () => null
});

export function useMessageList() {

    const context = useContext(ChatMessageListContext);
    if (!context) {
        throw new Error('useMessageList must be used within a MessageList');
    }

    return context;

}
