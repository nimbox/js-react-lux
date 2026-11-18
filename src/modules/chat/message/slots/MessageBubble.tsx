import { cn } from '../../../../components/utilities/cn';
import { useChat } from '../../ChatContext';
import { useMessage } from '../MessageContext';
import { MessagePill } from './MessagePill';


export interface MessageBubbleProps {
    children: React.ReactNode;
    className?: string;
}

// The bubble is two boxes. The outer one is the anchor: it takes the instance's
// `className` (its sizing) and positions the group avatar, which sits outside
// the surface. The inner one is the `Pill` surface, which clips its content to
// its own corners, so an image or a coloured rule that runs to the edges
// follows the bubble's shape without knowing it.
//
// The group's last bubble is marked twice, both driven by the one `isLast`
// check here and both dropped in a `plain` preview: the avatar, and a tight
// corner on the speaker's side of the surface. (For a split-bubble instance
// like a sticker, this bubble isn't the widest sibling, but `items-start`/
// `items-end` aligns every sibling to the same outer edge, so anchoring here
// lands identically to anchoring on the wider container.)
//
export function MessageBubble({ children, className }: MessageBubbleProps) {

    const { message: { alignment, author }, isLast, plain } = useMessage();
    const { authorRenderer } = useChat();

    const marksLast = !plain && isLast;

    return (
        <div className={cn('relative', className)}>
            <MessagePill className={cn('overflow-hidden', marksLast && (alignment === 'start' ? 'rounded-bl-sm' : 'rounded-br-sm'))}>
                {children}
            </MessagePill>
            {marksLast && author != null && (
                // rem, not px: 1.5em avatar (`Avatar.tsx`) at 1.25rem font-size
                // plus 0.25rem margin exactly fills `MessageGroup`'s
                // `MESSAGE_GUTTER`, at any root font-size — not just the one
                // it's tuned at.
                <div className={cn(
                    'absolute bottom-0 text-[1.25rem] leading-[1.5rem]',
                    alignment === 'start' ? 'right-full mr-1' : 'left-full ml-1'
                )}>
                    {authorRenderer.avatar(author)}
                </div>
            )}
        </div>
    );

}
