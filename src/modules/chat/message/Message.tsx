import classNames from 'classnames';
import { useChat } from '../ChatContext';
import { MessageContext, MessageContextProps } from './MessageContext';
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
import { MessageMenu } from './slots/MessageMenu';
import { MessageProperties } from './slots/MessageProperties';
import { MessageReactions } from './slots/MessageReactions';
import { MessageReply } from './slots/MessageReply';
import { MessageVideo } from './slots/MessageVideo';


// Message

export function Message(props: MessageContextProps) {

    const { renderMessage, renderDefaultMessage } = useChat();
    const { group: { direction } } = useMessageGroup();

    // Try to get a specific renderer for this message type,
    // fallback to default renderer.

    const messageType = props.message.type || 'text';
    const specificRenderer = renderMessage[messageType];
    const renderer = specificRenderer || renderDefaultMessage;

    return (
        <MessageContext.Provider value={props}>
            <div className={classNames('max-w-[75%] flex flex-row items-center gap-2 group', {
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
Message.Reply = MessageReply;
Message.Menu = MessageMenu;

Message.React = MessageReact;
