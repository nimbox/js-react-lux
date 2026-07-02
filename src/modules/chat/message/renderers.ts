import { type ComponentType } from 'react';
import type { MessageInstanceProps } from './MessageProvider';


// Message renderers
//
// A message is rendered by looking up an entry for its `type` in the app's
// registry (`ChatProvider`'s `messageRenderers`, resolved through
// `useMessageRenderer`) and picking a **surface** (`full` for the timeline
// bubble, `preview` for the compact form inside a reply-quote / composer banner /
// conversation line). The base ships no content renderers of its own — the kit
// or consumer supplies them; an unregistered `type` falls back to
// `UnknownMessage` / `UnknownMessagePreview`.

export type MessageSurface = 'full' | 'preview';

export type MessageRenderer = ComponentType<MessageInstanceProps>;

// A registry entry. Transitionally either a bare renderer (the `full` surface;
// preview absent) or a `{ full, preview }` pair. The end-state (docs §6) requires
// both surfaces; the union keeps the migration non-breaking for consumers that
// have not authored previews yet.
export interface MessageInstance {
    full: MessageRenderer;
    preview?: MessageRenderer;
}

export type MessageRendererEntry = MessageRenderer | MessageInstance;

export type MessageRendererRegistry = Record<string, MessageRendererEntry>;

// Builds a registry entry from typed surface components, confining the
// `type ⇒ component` erasure to one place per type (docs §6, *Type safety*).
// `full` fixes the content type; `preview` may accept a wider type (e.g. a
// shared unknown-content preview). The registry stores the erased form.
export function messageInstance<TContent>(entry: {
    full: ComponentType<MessageInstanceProps<TContent>>;
    preview?: ComponentType<MessageInstanceProps<TContent>>;
}): MessageInstance {
    return entry as MessageInstance;
}

// Resolves a registry entry to the component for a surface. A bare renderer
// serves only `full`; a `{ full, preview }` pair serves whichever it defines.
// (Robust against `memo`/`forwardRef` entries, which are objects without `full`.)
export function resolveSurface(
    entry: MessageRendererEntry | undefined,
    surface: MessageSurface
): MessageRenderer | undefined {
    if (!entry) {
        return undefined;
    }
    if (typeof entry === 'object' && 'full' in entry) {
        return entry[surface];
    }
    return surface === 'full' ? entry : undefined;
}
