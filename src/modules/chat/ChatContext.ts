import React, { createContext, useContext } from 'react';
import { defaultActionRenderers, type ActionRendererRegistry } from './message/actions';
import type { MessageRendererRegistry } from './message/renderers';
import type { BaseMessage } from './types/BaseMessage';
import type { BaseConversation } from './types/BaseConversation';
import type { ConversationOption } from './types/ConversationOption';
import type { MessageOption } from './types/MessageOption';
import type { ReactionDetail } from './types/ReactionDetail';


// Chat Context

export interface ChatContextProps {

    // ── Message rendering ──────────────────────────────────────────────────────
    // How a message and its parts get painted. `messageRenderers` is the core; the
    // rest paint a piece the base treats as opaque or channel-varying (author, body
    // text, delivery status, in-message actions).

    // Message renderer registry, keyed by message `type` and dimensioned by surface
    // (`full` / `preview` / `summary`, §6). An app maps its own types to renderers;
    // an unregistered type falls back to `UnknownMessage`. Reply quotes, the composer
    // banner and conversation lines all render through this same registry at their
    // surface — there is no separate reply registry.

    messageRenderers?: MessageRendererRegistry;

    // Author rendering — the base treats `author` as opaque (`unknown`) and composes
    // these primitives per location: `avatar`, `name`, and the optional `handle` (a
    // proxy-agnostic secondary identifier: a phone number, an `@user`, an email). The
    // first-bubble header shows `name` + `handle`; compact surfaces (reply-quote,
    // conversation line) and the reaction-details row show `name` ONLY. The base ships
    // no defaults (all render nothing), so a consumer that shows authors must provide
    // these. See docs/module-chat.md §6.

    authorRenderer: {
        avatar: (author: unknown) => React.ReactNode;
        name: (author: unknown) => React.ReactNode;
        handle?: (author: unknown) => React.ReactNode;
    };

    // Body text → nodes. The optional `message` lets a proxy vary markup per channel
    // (mrkdwn vs WhatsApp formatting vs HTML) from one provider — see docs §4.

    renderText: (text: string, message?: BaseMessage) => React.ReactNode;

    // Opaque delivery-status token → a node (an icon tick, usually). A renderer, not
    // a formatter: it produces a ReactNode, not a display string.

    renderStatus: (status: string) => React.ReactNode;

    // In-message action buttons (template buttons / inline keyboards) dispatch through
    // this registry, keyed by `action.type`. The library ships `defaultActionRenderers`.

    actionRenderers: ActionRendererRegistry;


    // ── Message affordances ────────────────────────────────────────────────────
    // What the viewer may DO to a message — declared as data, rendered by base chrome
    // (`MessageOptions`, one opinionated overflow menu, §7). Each option `resolve`s
    // its `Menu.Item` from the message.

    // The requested option set (default: empty). Rendered = requested ∩ permitted ∩
    // applicable.

    messageOptions: MessageOption[];

    // The SHARED permission set — the scope's vocabulary of what the viewer may do
    // "here". Gates BOTH `messageOptions` and `conversationOptions` (an option names a
    // `capability`; this set permits it). Absent ⇒ permissive (single-channel apps can
    // ignore it). Not message-specific — hence unqualified.

    capabilities?: ReadonlySet<string>;

    // Reaction affordance — the data side of the auto reaction chrome the base mounts
    // (`MessageReactionPicker` + the reactions/details popover, §7). Content-blind and
    // per-viewer, so they live here (one wiring for the whole chat), not per message;
    // each receives the `BaseMessage` it acts on (the twin of `messageOptions.resolve`).
    // All optional — the picker only appears when `onCreateReaction` is supplied, the
    // details popover only lists reactors when `getReactionDetails` is, and removal is
    // offered only when `onDeleteReaction` is. `getReactionDetails` is lazy (the popover
    // fetches on open), since `reactions` on the envelope are author-free pills.

    onCreateReaction?: (message: BaseMessage, emoji: string) => Promise<void>;
    onDeleteReaction?: (message: BaseMessage, emoji: string) => Promise<void>;
    getReactionDetails?: (message: BaseMessage) => Promise<ReactionDetail[]>;


    // ── Conversation rendering & affordances ───────────────────────────────────

    // Viewer options on a conversation row (pin, mute, …) — the twin of
    // `messageOptions`, gated the same way against `capabilities` (§7). Rendered as one
    // opinionated overflow menu (`ConversationOptions`); each option `resolve`s its
    // `Menu.Item` from the row. Default: none.

    conversationOptions: ConversationOption[];

    // Paints the opaque conversation `meta` (pinned / starred indicators) into the
    // `ConversationMeta` slot — the parallel to `authorRenderer` for a message's opaque
    // author. The base never reads `meta`; absent ⇒ no indicators.

    renderConversationMeta?: (conversation: BaseConversation) => React.ReactNode;


    // ── Formatters ─────────────────────────────────────────────────────────────
    // Leaf utilities: a scalar → a display string. Library-free defaults (Intl/Date).

    formatTime: (timestamp: number | string | Date | undefined | null) => string;
    formatCalendar: (timestamp: number | string | Date | undefined | null) => string;
    formatDuration: (duration: number) => string;

}

export const defaultProps: ChatContextProps = {

    // ── Message rendering ──────────────────────────────────────────────────────
    // No default renderers (the base owns no content/author shape); a consumer that
    // shows authors overrides `authorRenderer`. (`messageRenderers` is optional —
    // absent here; an unmapped type falls back to `UnknownMessage`.)

    authorRenderer: {
        avatar: () => null,
        name: () => null,
        handle: () => null
    },
    renderText: (text) => text,
    renderStatus: defaultRenderStatus,
    actionRenderers: defaultActionRenderers,

    // ── Message affordances ────────────────────────────────────────────────────
    // Empty; the base ships no content-blind option (the consumer supplies
    // react/reply/…). No `capabilities` ⇒ permissive.

    messageOptions: [],

    // ── Conversation rendering & affordances ───────────────────────────────────
    // Empty; the consumer supplies pin/mute/… (`renderConversationMeta` is optional
    // — absent here).

    conversationOptions: [],

    // ── Formatters ─────────────────────────────────────────────────────────────
    // Library-free (Intl/Date).

    formatTime: defaultFormatTime,
    formatCalendar: defaultFormatCalendar,
    formatDuration: defaultFormatDuration

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
