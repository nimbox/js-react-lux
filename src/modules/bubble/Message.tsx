import classNames from 'classnames';
import { createContext, useCallback, useContext, useState } from 'react';
import { MessageGroupContext } from './MessageGroup';
import { MessageData } from './types/MessageData';
import { useReactionDetails } from './hooks/useReactionDetails';
import { Popup } from '../../components/Popup';

import { MessageReactionDetails } from './message/MessageReactionDetails';
import { MessageReactions } from './message/MessageReaction';

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
            <div className={'relative max-w-[75%] rounded-xl drop-shadow group'}>

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

                <Message.Reactions />

            </div>
        </MessageContext.Provider>
    );

}

export function MessageAuthor() {

    const groupProps = useContext(MessageGroupContext);

    if (!groupProps) {
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

    if (!messageProps) {
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

    if (!messageProps) {
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

    if (!messageProps) {
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

export function MessageAttachments() {

    const messageProps = useContext(MessageContext);
    if (!messageProps || !messageProps.message.attachments || messageProps.message.attachments.length === 0) {
        return null;
    }
    return (
        <div className="flex flex-col gap-2 my-2">
            {messageProps.message.attachments.map((att, i) => {
                if (att.type === 'image') {
                    return (
                        <img
                            key={i}
                            src={att.url}
                            alt={att.name || 'attachment'}
                            className="max-w-xs rounded shadow"
                        />
                    );
                }
                if (att.type === 'audio') {
                    return (
                        <audio key={i} controls className="w-full max-w-xs">
                            <source src={att.url} />
                            Your browser does not support the audio element.
                        </audio>
                    );
                }
                if (att.type === 'video') {
                    return (
                        <video key={i} controls className="w-full max-w-xs rounded shadow">
                            <source src={att.url} />
                            Your browser does not support the video tag.
                        </video>
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

Message.Reactions = MessageReactions;
Message.Attachments = MessageAttachments;