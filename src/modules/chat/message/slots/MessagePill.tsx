import { type ReactNode } from 'react';
import { cn } from '../../../../components/utilities/cn';
import { useMessage } from '../MessageContext';


export interface MessagePillProps {
    children?: ReactNode;
    className?: string;
}

// The alignment-coloured `rounded-xl shadow` chrome shared by every bubble-
// like box in a message — `Bubble` composes this for its own surface, and
// floating/split instances use it directly for chrome outside the one `Bubble`
// a message carries (§12 invariant) — e.g. a sticker's author header. Unlike
// `Bubble`, it never reads `isFirst`/`isLast`, never clips its content, and
// never marks the group's last bubble (the tight corner, the group avatar). It
// is a surface with no padding: content that wants an inset wraps itself in
// `Inset`.
export function MessagePill({ children, className }: MessagePillProps) {

    const { message: { alignment } } = useMessage();

    return (
        <div className={cn('rounded-xl shadow', className, {
            'bg-chat-message-out text-gray-800': alignment === 'end',
            'bg-chat-message-in text-gray-800': alignment === 'start'
        })}>
            {children}
        </div>
    );

}
