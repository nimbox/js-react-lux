import classNames from 'classnames';
import { useChat } from '../../ChatContext';
import { useMessage } from '../MessageContext';
import { MessagePill } from './MessagePill';


export interface MessageBubbleProps {
    children: React.ReactNode;
}

// The tail and the group avatar are the same idea — "this is the group's last
// bubble" — so both are driven by the one `isLast` check here (and dropped in a
// `plain` preview), anchored to this SAME `relative` box (the `Pill` chrome, made
// `relative` here). (For a
// split-bubble instance like a sticker, this bubble isn't the widest sibling,
// but `items-start`/`items-end` aligns every sibling to the same outer edge,
// so anchoring here lands identically to anchoring on the wider container.)
export function MessageBubble({ children }: MessageBubbleProps) {

    const { message: { alignment, author }, isLast, plain } = useMessage();
    const { authorRenderer } = useChat();

    return (
        <MessagePill className="relative">
            {children}
            {!plain && isLast && author != null && (
                // rem, not px: 1.5em avatar (`Avatar.tsx`) at 1.25rem font-size
                // plus 0.25rem margin exactly fills `MessageGroup`'s
                // `MESSAGE_GUTTER`, at any root font-size — not just the one
                // it's tuned at.
                <div className={classNames(
                    'absolute bottom-0 text-[1.25rem] leading-[1.5rem]',
                    alignment === 'start' ? 'right-full mr-1' : 'left-full ml-1'
                )}>
                    {authorRenderer.avatar(author)}
                </div>
            )}
            {!plain && isLast && <MessageArrow position={'bottom'} />}
        </MessagePill>
    );

}


export function MessageArrow({ position }: { position: 'top' | 'bottom' }) {

    const { message: { alignment } } = useMessage();

    return (
        <div className={classNames('absolute w-0 h-0', {
            'top-[14px]': position === 'top',
            'bottom-[4px]': position === 'bottom'
        }, {
            'right-[-6px] border-y-[6px] border-y-transparent border-l-[10px] border-l-chat-message-out': alignment === 'end',
            'left-[-6px] border-y-[6px] border-y-transparent border-r-[10px] border-r-chat-message-in': alignment === 'start'
        })}
        />
    );

}
