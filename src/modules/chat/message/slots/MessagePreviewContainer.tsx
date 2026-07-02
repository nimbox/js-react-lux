import type { ReactNode } from 'react';


// Preview-chrome container — the compact row a `preview`-surface renderer composes
// (docs §6). The base owns this chrome; the kit/consumer fills it with content. The
// *host* that places the preview — a reply-quote, a composer banner, a
// conversation-list row — owns the surrounding chrome (the coloured border, a
// dismiss button), not this slot.
export function MessagePreviewContainer({ children }: { children: ReactNode }) {
    return (
        <div className="max-h-16 flex flex-row items-center gap-2 overflow-hidden">
            {children}
        </div>
    );
}
