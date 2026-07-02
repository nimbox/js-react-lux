import { useChat } from '../ChatContext';
import type { BaseMessage } from '../types/BaseMessage';
import { TombstoneMessage, TombstoneMessagePreview, UnknownMessage, UnknownMessagePreview } from './instances';
import { resolveSurface, type MessageRenderer, type MessageSurface } from './renderers';


// Resolves the component that renders a message at a given `surface`
// (default `full`). Deletion short-circuits before the type lookup
// (§3): a message with `deletedAt` renders as a content-free
// tombstone, whatever its original type. Otherwise it dispatches
// through the app's `messageRenderers` (ChatProvider); an
// unregistered `type` falls back to `UnknownMessage` /
// `UnknownMessagePreview`.

export function useMessageRenderer(): (message: BaseMessage, surface?: MessageSurface) => MessageRenderer {

    const { messageRenderers } = useChat();

    return (message: BaseMessage, surface: MessageSurface = 'full') => {

        if (message.deletedAt != null) {
            return surface === 'preview' ? TombstoneMessagePreview : TombstoneMessage;
        }

        const entry = messageRenderers?.[message.type];
        return resolveSurface(entry, surface)
            ?? (surface === 'preview' ? UnknownMessagePreview : UnknownMessage);

    };

}
