import classNames from 'classnames';
import { useChat } from '../ChatContext';
import { MessageContext, type MessageContextProps } from './MessageContext';
import { useMessageGroup } from './MessageGroupContext';
import { MessageReact } from './MessageReact';
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
import { useState } from 'react';


// Message

export function Message(props: Omit<MessageContextProps, 'isHovered'>) {

    const { renderMessage, renderDefaultMessage } = useChat();
    const { group: { direction } } = useMessageGroup();
    const [isHovered, setIsHovered] = useState(false);

    // Try to get a specific renderer for this message type,
    // fallback to default renderer.

    const messageType = props.message.type || 'text';
    const specificRenderer = renderMessage[messageType];
    const renderer = specificRenderer || renderDefaultMessage;

    return (
        <MessageContext.Provider value={{ ...props, isHovered }}>
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={classNames('max-w-[75%] flex flex-row items-center gap-2 group', {
                    'justify-start': direction === 'inbound',
                    'justify-end': direction === 'outbound'
                })}
            >
                {renderer({ ...props, isHovered })}
                <Message.React />
            </div>
        </MessageContext.Provider>
    );

}

// Slots

Message.Container = MessageContainer;
Message.Bubble = MessageBubble;

Message.FloatingBody = MessageFloatingBody;
Message.FloatingAttachments = MessageFloatingAttachments;

Message.Author = MessageAuthor;

Message.Header = MessageHeader;

Message.Image = MessageImage;
Message.Audio = MessageAudio;
Message.Video = MessageVideo;

Message.Body = MessageBody;
Message.Footer = MessageFooter;

Message.Properties = MessageProperties;

Message.Reactions = MessageReactions;
Message.Reply = MessageReply;

Message.React = MessageReact;
