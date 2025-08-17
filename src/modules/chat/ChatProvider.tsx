import { useState } from 'react';
import { ChatContext, defaultProps, type ChatContextProps } from './ChatContext';
import { type MessageData } from './types/MessageData';


// Chat 

export interface ChatProviderProps extends ChatContextProps {
    children: React.ReactNode;
}

export function ChatProvider(props: Partial<ChatProviderProps>) {

    const { replyTo: replyToProp, children, ...rest } = props;

    // Reply state management

    const [preview, setPreview] = useState<MessageData | null>(null);
    const [replyTo, setReplyTo] = useState<Omit<MessageData, 'replyTo'> | null>(replyToProp ?? null);

    const handleSetPreview = (message: MessageData) => {
        setPreview(message);
    };

    const handleClearPreview = () => {
        setPreview(null);
    };

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

            preview,
            setPreview: handleSetPreview,
            clearPreview: handleClearPreview,

            replyTo,
            setReplyTo: handleSetReplyTo,
            clearReplyTo: handleClearReplyTo

        }}>
            {children}
        </ChatContext.Provider >
    );

}
