import classNames from 'classnames';
import { createContext, FC, useCallback, useLayoutEffect, useMemo, useRef } from 'react';


export interface ChatMessageListContextValue {
    scrollToBottom: () => void;
}

export const ChatMessageListContext = createContext<ChatMessageListContextValue>({
    scrollToBottom: () => null,
});

export interface ChatMessageListProps {
    className?: string;
    children?: React.ReactNode;
}

export const ChatMessageList: FC<ChatMessageListProps> = ({ className, children }) => {

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
        scrollToBottom: debouncedScrollToBottom,
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
                    'w-100 h-full py-2 flex flex-col overflow-y-auto',
                    className
                )}
            >
                <div className="flex-grow"></div> {/* Pushes content to the bottom */}
                {children}
            </div>
        </ChatMessageListContext.Provider>
    );

};
