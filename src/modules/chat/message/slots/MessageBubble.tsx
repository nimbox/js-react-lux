import { cn } from '../../../../components/utilities/cn';
import { useMessage } from '../MessageContext';
import { MessagePill } from './MessagePill';


export interface MessageBubbleProps {
    children: React.ReactNode;
    className?: string;
}

// The message's main surface: the `Pill` chrome, clipping its content to its
// own corners, so an image or a coloured rule that runs to the edges follows
// the bubble's shape without knowing it. On the group's last message the
// corner on the speaker's side is tight, which marks the end of the group
// beside the avatar `MessageFrame` places there.
export function MessageBubble({ children, className }: MessageBubbleProps) {

    const { message: { alignment }, isLast } = useMessage();

    return (
        <MessagePill className={cn('overflow-hidden', isLast && (alignment === 'start' ? 'rounded-bl-sm' : 'rounded-br-sm'), className)}>
            {children}
        </MessagePill>
    );

}
