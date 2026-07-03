import { type ComponentType } from 'react';
import type { MessageInstanceProps } from './MessageProvider';


// Message renderers
//
// A message is rendered by looking up an entry for its `type` in the app's
// registry (`ChatProvider`'s `messageRenderers`, resolved through
// `useMessageRenderer`) and picking a **surface**:
//
//   full     — the timeline bubble.
//   preview  — a quote *block* (reply-quote, composer banner): label + optional
//              thumbnail, one or two lines.
//   summary  — a dense one-*line* digest (conversation last-message, search hit,
//              pinned list): the leanest form, no thumbnail-card.
//
// The base ships no content renderers of its own — the kit or consumer supplies
// them. `full`/`preview` are required: their absence *breaks* (a raw token in a
// bubble or quote), so an unregistered `type` falls back to `UnknownMessage` /
// `UnknownMessagePreview`. `summary` is **optional and has no fallback** — an
// absent summary renders *nothing* (docs §6). Better an empty digest line than a
// mis-shaped preview (e.g. an image's thumbnail) dragged into a list row.

export type MessageSurface = 'full' | 'preview' | 'summary';

export type MessageRenderer = ComponentType<MessageInstanceProps>;

// A registry entry is either a bare renderer (the `full` surface only) or a
// `{ full, preview, summary? }` record. `full`/`preview` are the required surfaces
// (docs §6); `summary` is optional (absent ⇒ nothing).
export interface MessageInstance {
    full: MessageRenderer;
    preview?: MessageRenderer;
    summary?: MessageRenderer;
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
    summary?: ComponentType<MessageInstanceProps<TContent>>;
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
