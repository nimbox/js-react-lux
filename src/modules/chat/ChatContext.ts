import React, { createContext, useContext } from 'react';
import { MessageContextProps } from './message/MessageContext';
import { TextMessageContainer } from './message/renderers/TextMessage';
import { ReactionDetailsData } from './types/ReactionDetailsData';


// Chat Context

export interface ChatContextProps {

    renderMessage: Record<string, (message: MessageContextProps) => React.ReactElement<MessageContextProps>>;
    renderDefaultMessage: (message: MessageContextProps) => React.ReactElement<MessageContextProps>;

    getReactions: (messageId: string) => Promise<ReactionDetailsData[]>;
    addReaction: (messageId: string, emoji: string) => Promise<void>;
    removeReaction: (messageId: string, emoji: string) => Promise<void>;

}

export const defaultProps: ChatContextProps = {

    renderMessage: {},
    renderDefaultMessage: defaultRenderMessage,

    getReactions: defaultGetReactions,
    addReaction: defaultAddReaction,
    removeReaction: defaultRemoveReaction

};

export const ChatContext = createContext<ChatContextProps>(defaultProps);

export function useChat() {

    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChat must be used within a ChatProvider');
    }

    return context;

}

// Defaults

function defaultRenderMessage(message: MessageContextProps) {
    return React.createElement(TextMessageContainer, message);
}

function defaultGetReactions(): Promise<ReactionDetailsData[]> {
    return Promise.reject(
        new Error(
            'No fetchReactionDetails found – wrap your app in <ChatProvider>'
        )
    );
}

function defaultAddReaction(): Promise<void> {
    return Promise.reject(
        new Error(
            'No addReaction found – wrap your app in <ChatProvider>'
        )
    );
}

function defaultRemoveReaction(): Promise<void> {
    return Promise.reject(
        new Error(
            'No removeReaction found – wrap your app in <ChatProvider>'
        )
    );
}
