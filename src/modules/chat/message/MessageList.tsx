import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { cn } from '../../../components/utilities/cn';


// Constants

const NEAR_TOP_PX = 200;
const NEAR_BOTTOM_PX = 80;

// MessageList

export interface MessageListProps {

    /**
     * Called when the reader arrives at the top of the list, which for a
     * newest-at-the-bottom list is the oldest end — the cue to load more history.
     *
     * Fires on entering the zone rather than on every scroll event, and again
     * after the content changes while still inside it, so a page too short to
     * push the reader past the threshold does not strand the list. That re-fire
     * is why the caller, not this component, owns the two questions that stop it:
     * whether a load is already in flight, and whether any history remains.
     */
    onReachTop?: () => void;

    className?: string;
    children?: React.ReactNode;

}

// The scroll container is a base-owned product concern (docs §10). Its contract:
//
//  * open pinned to the bottom (newest message visible);
//  * STAY pinned only while the user is already near the bottom — a user who has
//    scrolled up to read history is NEVER yanked back down — never an
//    unconditional scroll-to-bottom on every render;
//  * re-pin on late layout growth that happens WITHOUT a React render — an image
//    decoding, a font loading, media metadata arriving — via a `ResizeObserver`.
//    This is what keeps you at the bottom when a freshly-arrived image finishes
//    loading and grows the content (see the note on `overflow-anchor` below).
//
// Reset per conversation by KEYING this component (`key={conversationId}` in the
// consumer): the remount re-initialises `pinned` and re-pins to the bottom.
export function MessageList({ className, children, onReachTop }: MessageListProps) {

    const scrollRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Are we currently pinned to the bottom? Starts true so a fresh list opens at
    // the newest message; the user's own scrolling flips it.
    const pinnedRef = useRef(true);

    // Held in a ref so `reportTop` stays stable: a caller passing a fresh
    // closure each render must not turn the content effect below into a
    // per-render fire.

    const onReachTopRef = useRef(onReachTop);
    useEffect(() => {
        onReachTopRef.current = onReachTop;
    }, [onReachTop]);

    // Whether we were already in the top zone, so entering it fires once.
    const atTopRef = useRef(false);

    const scrollToBottom = useCallback(() => {
        const element = scrollRef.current;
        if (element) {
            element.scrollTop = element.scrollHeight;
        }
    }, []);

    const reportTop = useCallback(() => {

        const element = scrollRef.current;
        if (!element) {
            return;
        }

        const atTop = element.scrollTop <= NEAR_TOP_PX;
        if (atTop && !atTopRef.current) {
            onReachTopRef.current?.();
        }
        atTopRef.current = atTop;

    }, []);

    // The user's scroll decides whether we keep the pin.

    const handleScroll = useCallback(() => {
        const element = scrollRef.current;
        if (element) {
            pinnedRef.current = element.scrollHeight - element.scrollTop - element.clientHeight <= NEAR_BOTTOM_PX;
        }
        reportTop();
    }, [reportTop]);

    // Render-driven content change (a new/removed message): keep the pin if we
    // had it. Runs before paint so there is no visible jump.

    useLayoutEffect(() => {

        if (pinnedRef.current) {
            scrollToBottom();
        }

        // Content changed, so the reader's position relative to the top has
        // too. Re-arm before asking, so history that arrived without moving
        // them out of the zone still leads to the next page.

        atTopRef.current = false;
        reportTop();

    }, [children, scrollToBottom, reportTop]);

    // Layout growth WITHOUT a render — an image decoding, a webfont, late media
    // metadata. The effect above never fires for these, so observe the content
    // box directly and re-pin while the user is at the bottom.

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

    return (
        <div
            ref={scrollRef}
            onScroll={handleScroll}
            className={cn('w-full h-full overflow-y-auto', className)}
        >
            <div ref={contentRef} className="w-full min-h-full py-2 flex flex-col justify-end gap-1">
                {children}
            </div>
        </div>
    );

}
