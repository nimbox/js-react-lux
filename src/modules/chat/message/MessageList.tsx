import classNames from 'classnames';
import { useLayoutEffect, useRef } from 'react';


// MessageList

export interface MessageListProps {
    className?: string;
    children?: any;
}

export function MessageList({ className, children }: MessageListProps) {

    const listRef = useRef<HTMLDivElement>(null);

    // Effects

    useLayoutEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight - listRef.current.clientHeight;
        }
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
