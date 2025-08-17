import React, { createContext, useContext } from 'react';
import type { MessageContextProps } from './message/MessageContext';
import type { MessageData } from './types/MessageData';
import type { ReactionDetailsData } from './types/ReactionDetailsData';


// Chat Context

export interface ChatContextProps {

    // Renderers

    renderText: (text: string) => React.ReactNode;

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

    // Preview

    preview: MessageData | null;
    setPreview?: (message: MessageData) => void;
    clearPreview?: () => void;

    // Formatters

    timeFormatter: (timestamp: string | Date | undefined | null) => string;
    calendarFormatter: (timestamp: string | Date | undefined | null) => string;

    statusFormatter: (status: string) => React.ReactNode;

}

export const defaultProps: ChatContextProps = {

    // Text rendering

    renderText: (text) => text,

    // Message rendering

    renderMessage: {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderDefaultMessage: () => (() => null) as any,

    // Reply rendering

    renderReply: {},
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    renderDefaultReply: () => (() => null) as any,

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
    },

    // Preview

    preview: null,
    setPreview: function (): void {
        throw new Error('Function not implemented.');
    },
    clearPreview: function (): void {
        throw new Error('Function not implemented.');
    },

    // Formatters

    timeFormatter: defaultTimeFormatter,
    calendarFormatter: defaultCalendarFormatter,

    statusFormatter: defaultStatusFormatter

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

// function defaultRenderMessage(message: MessageContextProps) {
//     throw new Error('No renderMessage found – wrap your app in <ChatProvider>');
//     // return React.createElement(DefaultMessageRenderer, message);
// }

// function defaultRenderReply() {
//     throw new Error('No renderReply found – wrap your app in <ChatProvider>');
//     // return React.createElement(DefaultReplyRenderer);
// }

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

function defaultTimeFormatter(timestamp: string | Date | undefined | null) {

    if (!timestamp) { return ''; }

    const date = new Date(timestamp);
    return formatTime(date);

}

function defaultCalendarFormatter(timestamp: string | Date | undefined | null) {

    if (!timestamp) { return ''; }

    const date = new Date(timestamp);
    if (isToday(date)) {
        return formatTime(date);
    } else {
        return formatCalendar(date);
    }

}

function isToday(date: Date) {

    const today = new Date();
    return date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

}
function formatTime(date: Date) {
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });
}

function formatCalendar(date: Date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: '2-digit'
    });
}


function defaultStatusFormatter(status: string) {
    return status;
}
