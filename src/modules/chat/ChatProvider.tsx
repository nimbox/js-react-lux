import { useState } from 'react';
import { ChatContext, ChatContextProps, defaultProps } from './ChatContext';
import { MessageData } from './types/MessageData';


// Chat

export interface ChatProviderProps extends ChatContextProps {
    children: React.ReactNode;
}

export function ChatProvider(props: Partial<ChatProviderProps>) {

    const { replyTo: replyToProp, children, ...rest } = props;

    // Reply state management

    const [replyTo, setReplyTo] = useState<Omit<MessageData, 'replyTo'> | null>(replyToProp ?? null);

    const handleSetReplyTo = (message: Omit<MessageData, 'replyTo'>) => {
        setReplyTo(message);
    };

    const handleClearReplyTo = () => {
        setReplyTo(null);
    };

    // Render

    return (
        <ChatContext.Provider value={{
            ...defaultProps,
            ...rest,
            replyTo,
            setReplyTo: handleSetReplyTo,
            clearReplyTo: handleClearReplyTo
        }}>
            {children}
        </ChatContext.Provider >
    );

}
