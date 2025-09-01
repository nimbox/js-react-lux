import classNames from 'classnames';
import { useCallback, useLayoutEffect, useMemo, useRef } from 'react';
import { ChatMessageListContext } from './MessageListContext';


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

    const debouncedScrollToBottom = useCallback(() => {
        if (debouncedRef.current) {
            clearTimeout(debouncedRef.current);
        }
        debouncedRef.current = setTimeout(scrollToBottom, 0);
    }, [scrollToBottom]);

    // Context

    const providerValue = useMemo(() => ({
        scrollToBottom: debouncedScrollToBottom
    }), [debouncedScrollToBottom]);

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
        <ChatMessageListContext.Provider value={providerValue}>
            <div
                ref={listRef}
                className={classNames(
                    'w-full h-full py-2 flex flex-col gap-y-2 overflow-y-auto',
                    className
                )}
            >
                <div className="grow"></div> {/* Pushes content to the bottom */}
                {children}
            </div>
        </ChatMessageListContext.Provider>
    );

}
