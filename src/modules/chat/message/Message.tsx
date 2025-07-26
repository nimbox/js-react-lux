import classNames from 'classnames';
import { useContext } from 'react';
import { ChatContext } from '../ChatContext';
import { MessageContext, MessageContextProps } from './MessageContext';
import { MessageReact } from './MessageReact';
import { MessageAuthor } from './slots/MessageAuthor';
import { MessageBody } from './slots/MessageBody';
import { MessageBubble } from './slots/MessageBubble';
import { MessageContainer } from './slots/MessageContainer';
import { MessageFloatingAttachments } from './slots/MessageFloatingAttachments';
import { MessageFloatingBody } from './slots/MessageFloatingBody';
import { MessageFooter } from './slots/MessageFooter';
import { MessageHeader } from './slots/MessageHeader';
import { MessageMenu } from './slots/MessageMenu';
import { MessageProperties } from './slots/MessageProperties';
import { MessageReactions } from './slots/MessageReactions';
import { useMessageGroup } from './MessageGroupContext';
import { MessageAudio } from './slots/MessageAudio';
import { MessageVideo } from './slots/MessageVideo';
import { MessageImage } from './slots/MessageImage';


// Message

export function Message(props: MessageContextProps) {

    const { renderMessage, renderDefaultMessage } = useContext(ChatContext);
    const { group: { direction } } = useMessageGroup();

    // Try to get a specific renderer for this message type, fallback to default
    const messageType = props.message.type || 'text';
    const specificRenderer = renderMessage[messageType];
    const renderer = specificRenderer || renderDefaultMessage;

    return (
        <MessageContext.Provider value={props}>
            <div className={classNames('flex flex-row items-center gap-2 group', {
                'justify-start': direction === 'inbound',
                'justify-end': direction === 'outbound'
            })}>
                {renderer(props)}
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
Message.Menu = MessageMenu;

Message.React = MessageReact;
