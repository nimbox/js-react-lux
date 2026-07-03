import classNames from 'classnames';
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';


// MessageList

export interface MessageListProps {
    className?: string;
    children?: any;
}

// The scroll container is a base-owned product concern (docs §10). Its contract:
//
//  • open pinned to the bottom (newest message visible);
//  • STAY pinned only while the user is already near the bottom — a user who has
//    scrolled up to read history is NEVER yanked back down — never an
//    unconditional scroll-to-bottom on every render;
//  • re-pin on late layout growth that happens WITHOUT a React render — an image
//    decoding, a font loading, media metadata arriving — via a `ResizeObserver`.
//    This is what keeps you at the bottom when a freshly-arrived image finishes
//    loading and grows the content (see the note on `overflow-anchor` below).
//
// Reset per conversation by KEYING this component (`key={conversationId}` in the
// consumer): the remount re-initialises `pinned` and re-pins to the bottom.
export function MessageList({ className, children }: MessageListProps) {

    const scrollRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Are we currently pinned to the bottom? Starts true so a fresh list opens at
    // the newest message; the user's own scrolling flips it.
    const pinnedRef = useRef(true);

    const NEAR_BOTTOM_PX = 80;

    const scrollToBottom = useCallback(() => {
        const element = scrollRef.current;
        if (element) {
            element.scrollTop = element.scrollHeight;
        }
    }, []);

    // The user's scroll decides whether we keep the pin.
    const handleScroll = useCallback(() => {
        const element = scrollRef.current;
        if (element) {
            pinnedRef.current = element.scrollHeight - element.scrollTop - element.clientHeight <= NEAR_BOTTOM_PX;
        }
    }, []);

    // Render-driven content change (a new/removed message): keep the pin if we had
    // it. Runs before paint so there is no visible jump.
    useLayoutEffect(() => {
        if (pinnedRef.current) {
            scrollToBottom();
        }
    }, [children, scrollToBottom]);

    // Layout growth WITHOUT a render — an image decoding, a webfont, late media
    // metadata. The effect above never fires for these, so observe the content box
    // directly and re-pin while the user is at the bottom.
    useEffect(() => {
        const content = contentRef.current;
        if (!content) {
            return;
        }
        const observer = new ResizeObserver(() => {
            if (pinnedRef.current) {
                scrollToBottom();
            }
        });
        observer.observe(content);
        return () => observer.disconnect();
    }, [scrollToBottom]);

    // Render
    //
    // No `overflow-anchor: none` here: the browser's default scroll anchoring keeps
    // a scrolled-up user's view stable when
    // content above them changes size. Bottom-pinning is handled explicitly above,
    // so the two do not fight — anchoring guards the scrolled-up case, the pin
    // guards the at-bottom case.
    return (
        <div
            ref={scrollRef}
            onScroll={handleScroll}
            className={classNames('w-full h-full overflow-y-auto', className)}
        >
            <div ref={contentRef} className="w-full min-h-full py-2 flex flex-col justify-end gap-y-2">
                {children}
            </div>
        </div>
    );

}
