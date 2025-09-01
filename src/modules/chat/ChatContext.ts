import React, { createContext, useContext } from 'react';
import type { MessageData } from './types/MessageData';


// Chat Context

export interface ChatContextProps {

    // Renderers

    renderText: (text: string) => React.ReactNode;


    // Reply functionality

    replyTo: Omit<MessageData, 'replyTo'> | null;
    setReplyTo: (message: Omit<MessageData, 'replyTo'>) => void;
    clearReplyTo: () => void;

    // Preview

    preview: MessageData | null;
    setPreview?: (message: MessageData) => void;
    clearPreview?: () => void;

    // Formatters

    formatDuration: (duration: number) => string;

    formatTime: (timestamp: number | string | Date | undefined | null) => string;
    formatCalendar: (timestamp: number | string | Date | undefined | null) => string;

    formatStatus: (status: string) => React.ReactNode;

}

export const defaultProps: ChatContextProps = {

    // Text rendering

    renderText: (text) => text,



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

    formatTime: defaultFormatTime,
    formatDuration: defaultFormatDuration,
    formatCalendar: defaultFormatCalendar,
    formatStatus: defaultFormatStatus

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

function defaultFormatTime(timestamp: number | string | Date | undefined | null) {

    if (!timestamp) { return ''; }

    const date = new Date(timestamp);
    return formatTime(date);

}

function defaultFormatDuration(duration: number) {

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

}

function defaultFormatCalendar(timestamp: number | string | Date | undefined | null) {

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

function defaultFormatStatus(status: string) {
    return status;
}
