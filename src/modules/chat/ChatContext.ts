import React, { createContext, useContext } from 'react';
import { defaultActionRenderers, type ActionRendererRegistry } from './message/actions';
import { defaultMessageOptions } from './message/defaultOptions';
import type { MessageRendererRegistry } from './message/renderers';
import type { BaseMessage } from './types/BaseMessage';
import type { MessageOption } from './types/MessageOption';


// Chat Context

export interface ChatContextProps {

    // Renderers

    // The optional `message` lets a proxy vary markup per channel (mrkdwn vs
    // WhatsApp formatting vs HTML) from one provider — see docs §4.
    renderText: (text: string, message?: BaseMessage) => React.ReactNode;

    // Author rendering is design-system chrome the base positions but does not own
    // the data for. The author is opaque (`unknown`) to the base; the consumer
    // supplies the primitives — `avatar`, `name`, and the optional `handle` (a
    // proxy-agnostic secondary identifier: a phone number, an `@user`, an email) —
    // which the base composes per location. The first-bubble header shows `name`
    // + `handle`; compact PREVIEW surfaces (reply-quote, conversation line) and the
    // reaction-details row show `name` ONLY — the handle is noise there. The base
    // ships no defaults (all render nothing), so a consumer that shows authors must
    // provide these. See docs/module-chat.md §6.

    authorRenderer: {
        avatar: (author: unknown) => React.ReactNode;
        name: (author: unknown) => React.ReactNode;
        handle?: (author: unknown) => React.ReactNode;
    };

    // The actions (buttons) rendered under a message bubble dispatch through this
    // registry, keyed by `action.type`. Apps override or extend it to add their
    // own action kinds; the library ships `defaultActionRenderers`.

    actionRenderers: ActionRendererRegistry;

    // Message renderer registry, keyed by message `type` and dimensioned by
    // surface (`full`/`preview`). An app supplies this to map its own types to
    // renderers; an unregistered type falls back to `UnknownMessage` (§6). Reply
    // quotes and the composer banner render through this same registry at the
    // `preview` surface — there is no separate reply registry.

    messageRenderers?: MessageRendererRegistry;

    // Viewer options — the operations the viewer performs *on* a message (react,
    // reply, copy, …), declared as data and gated by capability. The base renders
    // them in a consistent chrome (`MessageOptions` — hover quick-row + overflow
    // menu); `capabilities` is the channel's permitted set, so per-channel
    // affordance differences never reach component code. An absent `capabilities`
    // is permissive (single-channel apps can ignore it); `options` defaults to the
    // base set (just `react`). See docs/module-chat.md §7.

    options: MessageOption[];
    capabilities?: ReadonlySet<string>;

    // Formatters

    formatDuration: (duration: number) => string;

    formatTime: (timestamp: number | string | Date | undefined | null) => string;
    formatCalendar: (timestamp: number | string | Date | undefined | null) => string;

    // Opaque delivery-status token rendered to a node (an icon tick, usually).
    // A renderer, not a formatter: it produces a ReactNode, not a display string.

    renderStatus: (status: string) => React.ReactNode;

}

export const defaultProps: ChatContextProps = {

    // Text rendering

    renderText: (text) => text,

    // Author rendering — no default avatar/name (the base owns no author shape);
    // a consumer that shows authors overrides these.

    authorRenderer: {
        avatar: () => null,
        name: () => null,
        handle: () => null
    },

    // Action rendering

    actionRenderers: defaultActionRenderers,

    // Options — the base default set (just `react`); no `capabilities` (permissive).

    options: defaultMessageOptions,

    // Formatters + status

    formatTime: defaultFormatTime,
    formatDuration: defaultFormatDuration,
    formatCalendar: defaultFormatCalendar,
    renderStatus: defaultRenderStatus

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

    if (!timestamp) {
        return '';
    }

    const date = new Date(timestamp);
    return formatTime(date);

}

function defaultFormatDuration(duration: number = 0) {

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

    if (!timestamp) {
        return '';
    }

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

function defaultRenderStatus(status: string) {
    return status;
}
