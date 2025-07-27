import React, { createContext, useContext } from 'react';
import { MessageContextProps } from './message/MessageContext';
import { TextMessageContainer } from './message/renderers/TextMessage';
import { MessageData } from './types/MessageData';
import { ReactionDetailsData } from './types/ReactionDetailsData';

import { TextReplyRenderer } from './reply/renderers/TextReply';


// Chat Context

export interface ChatContextProps {

    renderMessage: Record<string, (message: MessageContextProps) => React.ReactElement<MessageContextProps>>;
    renderDefaultMessage: (message: MessageContextProps) => React.ReactElement<MessageContextProps>;

    renderReply: Record<string, () => React.ReactElement>;
    renderDefaultReply: () => React.ReactElement;

    getReactions: (messageId: string) => Promise<ReactionDetailsData[]>;
    addReaction: (messageId: string, emoji: string) => Promise<void>;
    removeReaction: (messageId: string, emoji: string) => Promise<void>;

    // Reply functionality

    replyTo: Omit<MessageData, 'replyTo'> | null;
    setReplyTo: (message: Omit<MessageData, 'replyTo'>) => void;
    clearReplyTo: () => void;

}

export const defaultProps: ChatContextProps = {

    // Message rendering

    renderMessage: {},
    renderDefaultMessage: defaultRenderMessage,

    // Reply rendering

    renderReply: {},
    renderDefaultReply: defaultRenderReply,

    // Reaction functionality

    getReactions: defaultGetReactions,
    addReaction: defaultAddReaction,
    removeReaction: defaultRemoveReaction,

    // Reply functionality

    replyTo: null,
    setReplyTo: function (): void {
        throw new Error('Function not implemented.');
    },
    clearReplyTo: function (): void {
        throw new Error('Function not implemented.');
    }

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

function defaultRenderReply() {
    return React.createElement(TextReplyRenderer);
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
