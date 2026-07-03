import { useChat } from '../ChatContext';
import type { BaseMessage } from '../types/BaseMessage';
import { TombstoneMessage, TombstoneMessagePreview, UnknownMessage, UnknownMessagePreview } from './instances';
import { resolveSurface, type MessageRenderer, type MessageSurface } from './renderers';


// Resolves the component that renders a message at a given `surface`
// (default `full`). Deletion short-circuits before the type lookup
// (§3): a message with `deletedAt` renders as a content-free
// tombstone, whatever its original type. Otherwise it dispatches
// through the app's `messageRenderers` (ChatProvider).
//
// `full`/`preview` always resolve to a component — an unregistered
// `type` falls back to `UnknownMessage` / `UnknownMessagePreview`.
// `summary` has **no fallback**: an unregistered type (or one that did
// not author a summary) resolves to `null`, and the host renders
// nothing (docs §6). The overloads carry that in the type: `summary`
// returns `MessageRenderer | null`, the other two never null.

interface ResolveMessageRenderer {
    (message: BaseMessage, surface?: 'full' | 'preview'): MessageRenderer;
    (message: BaseMessage, surface: 'summary'): MessageRenderer | null;
    (message: BaseMessage, surface: MessageSurface): MessageRenderer | null;
}

export function useMessageRenderer(): ResolveMessageRenderer {

    const { messageRenderers } = useChat();

    const resolve = (message: BaseMessage, surface: MessageSurface = 'full'): MessageRenderer | null => {

        if (message.deletedAt != null) {
            if (surface === 'full') return TombstoneMessage;
            if (surface === 'preview') return TombstoneMessagePreview;
            return null;   // a deleted message has no summary — render nothing
        }

        const entry = messageRenderers?.[message.type];
        const resolved = resolveSurface(entry, surface);
        if (resolved) return resolved;

        if (surface === 'full') return UnknownMessage;
        if (surface === 'preview') return UnknownMessagePreview;
        return null;       // summary: no fallback (absent ⇒ nothing)

    };

    return resolve as ResolveMessageRenderer;

}
