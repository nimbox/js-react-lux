import classNames from 'classnames';
import { useCallback, useLayoutEffect, useRef } from 'react';


// MessageList

export interface MessageListProps {
    className?: string;
    children?: any;
}

export function MessageList({ className, children }: MessageListProps) {

    const listRef = useRef<HTMLDivElement>(null);
    const debouncedRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Scroll to bottom functions

    const scrollToBottom = useCallback(() => {
        if (listRef.current) {
            listRef.current.scrollTop = Number.MAX_SAFE_INTEGER;
        }
    }, []);

    // const debouncedScrollToBottom = useCallback(() => {
    //     if (debouncedRef.current) {
    //         clearTimeout(debouncedRef.current);
    //     }
    //     debouncedRef.current = setTimeout(scrollToBottom, 0);
    // }, [scrollToBottom]);

    // Effects

    useLayoutEffect(() => {
        scrollToBottom();
    }, [children, scrollToBottom]);

    useLayoutEffect(() => {
        return () => {
            if (debouncedRef.current) {
                clearTimeout(debouncedRef.current);
            }
        };
    }, []);

    // Render

    return (
        <div
            ref={listRef}
            className={classNames('w-full h-full overflow-y-auto', className)}
            style={{ overflowAnchor: 'none' }}
        >
            <div className="w-full min-h-full py-2 flex flex-col justify-end gap-y-2">
                {children}
                <div style={{ height: 1, overflowAnchor: 'auto' }} />
            </div>
        </div>
    );

}
