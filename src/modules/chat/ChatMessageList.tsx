import classNames from 'classnames';
import { FC, useEffect, useRef } from 'react';


export interface ChatMessageListProps {
    className?: string;
    children?: React.ReactNode;
}

export const ChatMessageList: FC<ChatMessageListProps> = ({ className, children }) => {

    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [children]);

    return (
        <div ref={listRef} className={classNames('w-100 h-full flex flex-col overflow-y-auto space-y-2', className)}>
            <div className="flex-grow"></div> {/* Pushes content to the bottom */}
            {children}
        </div>
    );

};
