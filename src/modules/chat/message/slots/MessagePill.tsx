import classNames from 'classnames';
import { type ReactNode } from 'react';
import { useMessage } from '../MessageContext';


export interface MessagePillProps {
    children?: ReactNode;
    className?: string;
}

// The alignment-coloured `rounded-xl shadow` chrome shared by every bubble-
// like box in a message — `Bubble` itself composes this for its own box
// (passing `relative`, since it anchors the tail/avatar), and floating/
// split instances use it directly for chrome outside the one `Bubble` a
// `Container` carries (§12 invariant: exactly one `Bubble` per `Container`)
// — e.g. a sticker's author header. Unlike `Bubble`, it never reads
// `isFirst`/`isLast` and never renders a tail or the group avatar.
export function MessagePill({ children, className }: MessagePillProps) {

    const { message: { alignment } } = useMessage();

    return (
        <div className={classNames('rounded-xl shadow px-2 py-1', className, {
            'bg-chat-message-out text-gray-800': alignment === 'end',
            'bg-chat-message-in text-gray-800': alignment === 'start'
        })}>
            {children}
        </div>
    );

}
