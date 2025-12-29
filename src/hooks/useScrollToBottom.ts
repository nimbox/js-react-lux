import { useRef, useEffect } from 'react';


export interface UseScrollToBottomOptions {
    threshold?: number;
    smooth?: boolean;
}

export function useScrollToBottom(options?: UseScrollToBottomOptions) {

    const { threshold = 10, smooth = false } = options || {};

    const scrollRef = useRef<HTMLDivElement>(null);
    const isUserScrollingRef = useRef(false);
    const lastScrollTopRef = useRef(0);

    const scrollToBottom = (behavior?: ScrollBehavior) => {
        if (!isUserScrollingRef.current && scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: behavior ?? (smooth ? 'smooth' : 'instant'),
            });
        }
    };

    const isAtBottom = (): boolean => {
        if (!scrollRef.current) return true;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        return Math.abs(scrollHeight - clientHeight - scrollTop) < threshold;
    };

    useEffect(() => {

        const element = scrollRef.current;
        if (!element) return;

        const resizeObserver = new ResizeObserver(() => {
            scrollToBottom();
        });

        resizeObserver.observe(element);

        return () => {
            resizeObserver.disconnect();
        };

    }, [smooth]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {

        const element = e.currentTarget;
        const currentScrollTop = element.scrollTop;

        if (currentScrollTop < lastScrollTopRef.current) {
            isUserScrollingRef.current = true;
        }

        const atBottom =
            Math.abs(
                element.scrollHeight - element.clientHeight - currentScrollTop
            ) < threshold;

        if (atBottom) {
            isUserScrollingRef.current = false;
        }

        lastScrollTopRef.current = currentScrollTop;

    };

    return {

        scrollRef,

        handleScroll,
        scrollToBottom,

        isAtBottom,
        isUserScrolling: () => isUserScrollingRef.current,

    };

}