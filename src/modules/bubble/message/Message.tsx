import classNames from 'classnames';
import { createContext, useContext } from 'react';
import { MessageData } from '../types/MessageData';
import { MessageGroupContext } from './MessageGroup';
import { MessageMenu } from './MessageMenu';
import { MessageReactions } from './MessageReactions';
import { MessageAttachments } from './MessageAttachments';
import { MessageReact } from './MessageReact';


export interface MessageProps {

    message: MessageData;

    isFirst?: boolean;
    isLast?: boolean;

}

export const MessageContext = createContext<MessageProps | null>(null);

export function Message(props: MessageProps) {

    const { message: { direction }, isFirst } = props;

    return (
        <MessageContext.Provider value={props}>

            <div className={classNames('flex flex-row items-center gap-2 group', {
                'justify-start': direction === 'inbound',
                'justify-end': direction === 'outbound'
            })}>

                <div className={classNames('relative max-w-[75%] grow-0 flex flex-col z-0 group', {
                    'order-1 items-start': direction === 'inbound',
                    'order-2 items-end': direction === 'outbound'
                })}>

                    <Message.Floating />

                    <div className={'rounded-xl drop-shadow'}>

                        <div className={classNames('rounded-lg p-3', {
                            'bg-chat-message-out text-gray-800 ': direction === 'outbound',
                            'bg-chat-message-in text-gray-800': direction === 'inbound'
                        })}>

                            {isFirst && <Message.Author />}

                            <Message.Header />
                            <Message.Attachments />
                            <Message.Body />

                            <Message.Footer />
                            <Message.Properties />

                            {isFirst && <Message.Arrow position={'top'} />}

                        </div>

                    </div>

                    <Message.Reactions />

                    <Message.Menu />

                </div>

                <Message.React />

            </div>

        </MessageContext.Provider>
    );

}

export function MessageAuthor() {

    const groupProps = useContext(MessageGroupContext);

    if (!groupProps || !groupProps.author) {
        return null;
    }

    return (
        <div className="flex flex-row justify-between items-center">
            <div className="truncate font-bold" style={{ color: groupProps.author.color }}>
                {groupProps.author.name}
            </div>
            <div className="text-sm truncate" style={{ color: groupProps.author.color }}>
                {groupProps.author.remoteId}
            </div>
        </div>
    );

}

export function MessageHeader() {

    const messageProps = useContext(MessageContext);

    if (!messageProps || !messageProps.message.header || messageProps.message.header.length === 0) {
        return null;
    }

    return (
        <div className="text-sm font-bold text-gray-500">
            {messageProps.message.header}
        </div>
    );

}

export function MessageBody() {

    const messageProps = useContext(MessageContext);

    if (!messageProps || !messageProps.message.body || messageProps.message.body.length === 0) {
        return null;
    }

    return (
        <div className="text-sm text-gray-500">
            {messageProps.message.body}
        </div>
    );

}

export function MessageFooter() {

    const messageProps = useContext(MessageContext);

    if (!messageProps || !messageProps.message.footer || messageProps.message.footer.length === 0) {
        return null;
    }

    return (
        <div className="text-sm text-gray-500">
            {messageProps.message.footer}
        </div>
    );

}

export function MessageProperties() {

    const messageProps = useContext(MessageContext);

    if (!messageProps) {
        return null;
    }

    return (
        <div className="flex flex-row gap-1 justify-end align-center text-xs text-gray-500">
            <span>{messageProps.message.timestamp}</span>
            <span>{messageProps.message.status}</span>
        </div>
    );

}

export function MessageArrow({ position }: { position: 'top' | 'bottom' }) {

    const messageProps = useContext(MessageContext);

    if (!messageProps) {
        return null;
    }

    return (
        <div className={classNames('absolute bottom-[2px]', {
            'top-[14px]': position === 'top',
            'bottom-[2px]': position === 'bottom'
        }, {
            'right-[-6px] w-0 h-0 transform -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[6px] border-l-chat-message-out': messageProps.message.direction === 'outbound',
            'left-[-6px] w-0 h-0 transform -translate-y-1/2 border-y-[6px] border-y-transparent border-r-[6px] border-r-chat-message-in': messageProps.message.direction === 'inbound'
        })}
        />
    );
}

export function MessageFloating() {

    const messageProps = useContext(MessageContext);
    if (!messageProps) {
        return null;
    }

    const { message } = messageProps;

    // Check if this is a sticker/emoji message that should float above
    const isStickerMessage = message.type === 'sticker' || message.type === 'emoji';
    const hasStickerAttachment = message.attachments?.some(att => att.type === 'sticker' || att.type === 'emoji');

    if (!isStickerMessage && !hasStickerAttachment) {
        return null;
    }

    return (
        <div className="p-2">
            {message.attachments?.map((attachment, index) => {
                if (attachment.type === 'sticker' || attachment.type === 'emoji') {
                    return (
                        <img
                            key={index}
                            src={attachment.url}
                            alt={attachment.name || 'sticker'}
                            className="w-24 h-24 object-contain select-none"
                        />
                    );
                }
                return null;
            })}
        </div>
    );
}

// Slots

Message.Author = MessageAuthor;
Message.Header = MessageHeader;
Message.Body = MessageBody;
Message.Footer = MessageFooter;
Message.Properties = MessageProperties;

Message.Arrow = MessageArrow;
Message.Floating = MessageFloating;

Message.Reactions = MessageReactions;
Message.Attachments = MessageAttachments;
Message.Menu = MessageMenu;
Message.React = MessageReact;