import classNames from 'classnames';
import { useState, type ReactNode } from 'react';
import type { ReplyProps } from '../reply/ReplyProvider';
import type { MessageData } from '../types/MessageData';
import type { ReactionDetailsData } from '../types/ReactionDetailsData';
import { MessageContext } from './MessageContext';
import { MessageReactionPicker } from './MessageReactionPicker';
import { MessageAudio } from './slots/MessageAudio';
import { MessageAuthor } from './slots/MessageAuthor';
import { MessageBody } from './slots/MessageBody';
import { MessageBubble } from './slots/MessageBubble';
import { MessageContainer } from './slots/MessageContainer';
import { MessageFloatingAttachments } from './slots/MessageFloatingAttachments';
import { MessageFloatingBody } from './slots/MessageFloatingBody';
import { MessageFooter } from './slots/MessageFooter';
import { MessageHeader } from './slots/MessageHeader';
import { MessageImage } from './slots/MessageImage';
import { MessageProperties } from './slots/MessageProperties';
import { MessageReactions } from './slots/MessageReactions';
import { MessageReply } from './slots/MessageReply';
import { MessageVideo } from './slots/MessageVideo';


// MessageProvider


export interface MessageProps {

    menu?: React.ReactElement<{ onOpenChange: (open: boolean) => void }>;
    message: MessageData;

    onAddReaction?: (emoji: string) => Promise<void>;
    onRemoveReaction?: (emoji: string) => Promise<void>;
    getReactions?: () => Promise<ReactionDetailsData[]>;

    renderReplyTo?: (props: ReplyProps) => React.ReactNode;

    isFirst?: boolean;
    isLast?: boolean;

}
export interface MessageProviderProps extends MessageProps {

    className?: string;
    children?: ReactNode;

}

export function MessageProvider({ className, children, ...props }: MessageProviderProps) {

    const [isOver, setIsOver] = useState(false);

    return (
        <MessageContext.Provider value={{ ...props, isOver }}>
            <div
                onMouseEnter={() => setIsOver(true)}
                onMouseLeave={() => setIsOver(false)}
                className={classNames('max-w-[75%] group', className)}
            >
                {children}
            </div>
        </MessageContext.Provider>
    );

}

// Slots

MessageProvider.Container = MessageContainer;
MessageProvider.Bubble = MessageBubble;

MessageProvider.FloatingBody = MessageFloatingBody;
MessageProvider.FloatingAttachments = MessageFloatingAttachments;

MessageProvider.Author = MessageAuthor;

MessageProvider.Header = MessageHeader;

MessageProvider.Image = MessageImage;
MessageProvider.Audio = MessageAudio;
MessageProvider.Video = MessageVideo;

MessageProvider.Body = MessageBody;
MessageProvider.Footer = MessageFooter;

MessageProvider.Properties = MessageProperties;

MessageProvider.Reactions = MessageReactions;
MessageProvider.Reply = MessageReply;

MessageProvider.React = MessageReactionPicker;
