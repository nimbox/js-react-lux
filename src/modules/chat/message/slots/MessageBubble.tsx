import classNames from 'classnames';
import { useChat } from '../../ChatContext';
import { useMessage } from '../MessageContext';


export interface MessageBubbleProps {
    children: React.ReactNode;
    // Reduced vertical padding — for bubbles that wrap only compact content such
    // as a floating message's date/status pill.
    compact?: boolean;
}

// The tail and the group avatar are the same idea — "this is the group's last
// bubble" — so both are driven by the one `isLast` check here, anchored to this
// SAME `relative` box. (For a split-bubble instance like a sticker, this bubble
// isn't the widest sibling, but `items-start`/`items-end` aligns every sibling
// to the same outer edge, so anchoring here lands identically to anchoring on
// the wider container.)
export function MessageBubble({ children, compact = false }: MessageBubbleProps) {

    const { message: { alignment, author }, isLast } = useMessage();
    const { authorRenderer } = useChat();

    return (
        <div className={classNames('relative rounded-xl shadow', compact ? 'px-2 py-1' : 'px-2 py-1', {
            'bg-chat-message-out text-gray-800 ': alignment === 'end',
            'bg-chat-message-in text-gray-800': alignment === 'start'
        })}>
            {children}
            {isLast && author != null && (
                <div className={classNames(
                    'absolute bottom-0 text-[20px] leading-[24px]',
                    alignment === 'start' ? 'right-full mr-1' : 'left-full ml-1'
                )}>
                    {authorRenderer.avatar(author)}
                </div>
            )}
            {isLast && <MessageArrow position={'bottom'} />}
        </div>
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
