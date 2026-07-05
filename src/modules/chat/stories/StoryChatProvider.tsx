import { BellIcon, CheckIcon, ClockIcon, DoubleCheckIcon, ForwardIcon, ReplyIcon, ThumbTackIcon, TrashIcon, WarningIcon } from '@nimbox/icons-react';
import type { Decorator } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { action } from 'storybook/actions';
import type { ChatContextProps } from '../ChatContext';
import { ChatProvider } from '../ChatProvider';
import { ChatAvatar } from '../atoms';
import { coreMessageRenderers } from '../kits/core/renderers';
import type { BaseConversation } from '../types/BaseConversation';
import type { ConversationOption } from '../types/ConversationOption';
import type { MessageOption } from '../types/MessageOption';
import type { ReactionDetail } from '../types/ReactionDetail';
import { initials, type StoryAuthor } from './authors';
import type { StoryConversationMeta } from './conversations';
import { reactionDetails } from './reactions';


// StoryChatProvider — the "consumer" every read-path story wraps in. It supplies the
// full ChatProvider wiring a real app would (authorRenderer, the core kit's renderer
// registry, status ticks, a sample option set, reaction callbacks, lazy details) so a
// story only has to drive components with plain fixtures. Every field is overridable:
// spread `{...overrides}` last, so a story can turn the picker off
// (`onCreateReaction={undefined}`), empty the menu (`messageOptions={[]}`), gate with
// `capabilities`, etc. See docs/module-chat.md §9 (consumer contract).


// author is opaque to the base — the story reads its own `StoryAuthor` here and
// composes the three primitives. The base picks WHICH per location (name+handle on the
// header, name-only on previews/reaction rows — §6).
export const storyAuthorRenderer: ChatContextProps['authorRenderer'] = {
    avatar: (author) => {
        const a = author as StoryAuthor;
        return <ChatAvatar color="#ffffff" backgroundColor={a.color} url={a.avatarUrl} initials={initials(a.name)} />;
    },
    name: (author) => {
        const a = author as StoryAuthor;
        return <span className="text-sm font-semibold" style={{ color: a.color }}>{a.name}</span>;
    },
    handle: (author) => {
        const a = author as StoryAuthor;
        return a.handle ? <span className="text-xs text-gray-400">{a.handle}</span> : null;
    }
};

// renderStatus paints the opaque delivery token as an icon tick (§3 — rendered, never
// interpreted). Unknown tokens fall back to the raw string.
const STATUS_ICONS: Record<string, ReactNode> = {
    pending: <ClockIcon className="w-3.5 h-3.5" />,
    sent: <CheckIcon className="w-3.5 h-3.5" />,
    delivered: <DoubleCheckIcon className="w-3.5 h-3.5" />,
    read: <DoubleCheckIcon className="w-3.5 h-3.5 text-blue-500" />,
    failed: <WarningIcon className="w-3.5 h-3.5 text-red-500" />
};
function renderStatus(status: string): ReactNode {
    return STATUS_ICONS[status] ?? status;
}

// Viewer options on a message — data, gated (requested ∩ permitted ∩ applicable) and
// rendered by the base overflow menu. Each `resolve`s a Menu.Item bound to its message
// (§7). Suppressed on a tombstone via `applies`.
export const sampleMessageOptions: MessageOption[] = [
    {
        type: 'reply', placement: 'menu',
        applies: (message) => message.deletedAt == null,
        resolve: (message) => ({ icon: <ReplyIcon />, label: 'Reply', onSelect: () => action('option:reply')(message.id) })
    },
    {
        type: 'copy', placement: 'menu',
        applies: (message) => message.deletedAt == null,
        resolve: (message) => ({ label: 'Copy', onSelect: () => action('option:copy')(message.id) })
    },
    {
        type: 'forward', placement: 'menu',
        applies: (message) => message.deletedAt == null,
        resolve: (message) => ({ icon: <ForwardIcon />, label: 'Forward', onSelect: () => action('option:forward')(message.id) })
    },
    {
        type: 'delete', placement: 'menu',
        applies: (message) => message.deletedAt == null,
        resolve: (message) => ({ icon: <TrashIcon />, label: 'Delete', className: 'text-red-600', onSelect: () => action('option:delete')(message.id) })
    }
];

// The conversation twin — the SAME option model over a row. Labels are stateful,
// resolved from the opaque `meta` (Pin ↔ Unpin, Mute ↔ Unmute) — what a static field
// could not express (§7).
export const sampleConversationOptions: ConversationOption[] = [
    {
        type: 'pin', placement: 'menu',
        resolve: (conversation) => {
            const meta = conversation.meta as StoryConversationMeta | undefined;
            return { label: meta?.pinned ? 'Unpin' : 'Pin', onSelect: () => action('option:pin')(conversation.id) };
        }
    },
    {
        type: 'mute', placement: 'menu',
        resolve: (conversation) => {
            const meta = conversation.meta as StoryConversationMeta | undefined;
            return { icon: <BellIcon />, label: meta?.muted ? 'Unmute' : 'Mute', onSelect: () => action('option:mute')(conversation.id) };
        }
    },
    {
        type: 'delete', placement: 'menu',
        resolve: (conversation) => ({ icon: <TrashIcon />, label: 'Delete', className: 'text-red-600', onSelect: () => action('option:delete')(conversation.id) })
    }
];

// Paints the opaque conversation `meta` into the row's meta slot (the twin of
// authorRenderer for a message's opaque author — §1). The base never reads `meta`.
function renderConversationMeta(conversation: BaseConversation): ReactNode {
    const meta = conversation.meta as StoryConversationMeta | undefined;
    if (!meta?.pinned && !meta?.muted) {
        return null;
    }
    return (
        <span className="flex items-center gap-1 text-gray-400">
            {meta.muted && <BellIcon className="w-4 h-4" />}
            {meta.pinned && <span title="Pinned"><ThumbTackIcon className="w-4 h-4" /></span>}
        </span>
    );
}


export interface StoryChatProviderProps extends Partial<ChatContextProps> {
    children: ReactNode;
}

export function StoryChatProvider({ children, ...overrides }: StoryChatProviderProps) {

    return (
        <ChatProvider
            authorRenderer={storyAuthorRenderer}
            messageRenderers={{ ...coreMessageRenderers }}
            renderStatus={renderStatus}
            messageOptions={sampleMessageOptions}
            conversationOptions={sampleConversationOptions}
            renderConversationMeta={renderConversationMeta}
            onCreateReaction={async (message, emoji) => { action('createReaction')({ id: message.id, emoji }); }}
            onDeleteReaction={async (message, emoji) => { action('deleteReaction')({ id: message.id, emoji }); }}
            getReactionDetails={async (): Promise<ReactionDetail[]> => reactionDetails}
            {...overrides}
        >
            {children}
        </ChatProvider>
    );

}

// Convenience decorator — wraps a story in the default StoryChatProvider. Stories that
// need to override wiring (turn the picker off, gate capabilities, …) render
// `<StoryChatProvider …>` inline instead.
export const withStoryChat: Decorator = (Story) => (
    <StoryChatProvider>
        <Story />
    </StoryChatProvider>
);
