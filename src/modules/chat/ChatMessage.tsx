import classNames from 'classnames';
import { FC, ReactNode, useContext, useMemo } from 'react';
import { useFormatter } from '../../contexts/FormatterContext';
import { CheckIcon, ClockIcon, CrossIcon, DoubleCheckIcon, FileIcon } from '../../icons/components';
import { useChatDirection } from './ChatDirectionContext';
import { ChatMessageListContext } from './ChatMessageList';


export interface ChatMessageContainerProps {

    direction?: 'in' | 'out';
    timestamp: Date;

    status?: 'pending' | 'sent' | 'delivered' | 'read' | 'failed';
    failedCause?: string;

    className?: string;

}

export const ChatMessageContainer: FC<ChatMessageContainerProps & { children: ReactNode }> = (props) => {

    const contextDirection = useChatDirection();
    const { direction = contextDirection, children, className } = props;

    return (
        <div className={classNames('relative max-w-md rounded-xl group', className)}>

            {children}

            <div className={classNames('hidden group-last:block absolute bottom-[2px]', {
                'right-[-6px] w-0 h-0 transform -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[6px] border-l-chat-message-out': direction === 'out',
                'left-[-6px] w-0 h-0 transform -translate-y-1/2 border-y-[6px] border-y-transparent border-r-[6px] border-r-chat-message-in': direction === 'in'
            })} />

        </div>
    );

};

export interface ChatMessageProps extends ChatMessageContainerProps {
    name?: string | null;
    remoteId?: string | null;
}

export const ChatMessage: FC<ChatMessageProps & { children: ReactNode }> = (props) => {

    const contextDirection = useChatDirection();
    const { direction = contextDirection, name, remoteId, children, className } = props;

    return (
        <div className={classNames(
            'relative max-w-md rounded-xl drop-shadow group', {
            'bg-chat-message-out text-gray-800 ': direction === 'out',
            'bg-chat-message-in text-gray-800': direction === 'in'
        }, className)}>

            {(name || remoteId) &&
                <div className="flex flex-row justify-between items-center gap-2">
                    <div className="font-bold">{name || ''}</div>
                    {remoteId && <div className="text-xs text-gray-500">{remoteId}</div>}
                </div>
            }

            {children}

            <div className={classNames('hidden group-last:block absolute bottom-[2px]', {
                'right-[-6px] w-0 h-0 transform -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[6px] border-l-chat-message-out': direction === 'out',
                'left-[-6px] w-0 h-0 transform -translate-y-1/2 border-y-[6px] border-y-transparent border-r-[6px] border-r-chat-message-in': direction === 'in'
            })} />

        </div>
    );

};

export interface ChatMessageTimestampStatusProps {
    direction: ChatMessageProps['direction'];
    timestamp: Date;
    status: ChatMessageProps['status'];
    failedCause?: ChatMessageProps['failedCause'];
    className?: string;
}

const ChatMessageTimestampStatus: FC<ChatMessageTimestampStatusProps> = (props) => {

    const contextDirection = useChatDirection();
    const { direction = contextDirection, timestamp, status, failedCause, className = direction === 'in' ? 'text-gray-500' : 'text-gray-500' } = props;

    const formatter = useFormatter();

    return (
        <div className={classNames('flex flex-row justify-end items-center gap-1', className)}>
            <span className="text-xs">{formatter.formatTime(timestamp)}</span>
            <ChatStatus status={status} failedCause={failedCause} />
        </div>
    );

};

const ChatMessageOverlayTimestampStatus: FC<ChatMessageTimestampStatusProps> = (props) => {

    return (
        <div className="absolute bottom-0 right-0 p-1 flex flex-row justify-end items-end gap-1 rounded-xl chat-timestamp-overlay pointer-events-none">
            <ChatMessageTimestampStatus {...props} className="text-white" />
        </div>
    );

};

//
// Text Message
//

export interface ChatTextMessageProps extends ChatMessageProps {

    header?: string;
    body: string;
    footer?: string;

}

export const ChatTextMessage: FC<ChatTextMessageProps> = (props) => {

    const { header, body, footer, className, ...rest } = props;
    const isEmoji = useMemo(() => props.body.length <= 3 && /\p{Extended_Pictographic}/u.test(props.body), [props.body]);

    return (
        <ChatMessage {...rest} className={classNames('p-2', className)}>
            {header && <div className="font-bold mb-2">{header}</div>}
            <div className={classNames({ 'text-center text-4xl': isEmoji })}>{body}</div>
            {footer && <div className="text-xs text-gray-500">{footer}</div>}
            <ChatMessageTimestampStatus direction={props.direction} timestamp={props.timestamp} status={props.status} failedCause={props.failedCause} />
        </ChatMessage>
    );

};

//
// Image message
//

export interface ChatImageMessageProps extends ChatMessageProps {
    src: string;
    caption?: string;
}

export const ChatImageMessage: FC<ChatImageMessageProps> = (props) => {

    const { className, ...rest } = props;

    const { scrollToBottom } = useContext(ChatMessageListContext);

    return (
        <ChatMessage {...rest} className={classNames('p-1', className)}>
            <div className="relative">
                <img src={props.src} onLoad={scrollToBottom} onError={scrollToBottom} className="rounded-xl" />
                {!props.caption &&
                    <ChatMessageOverlayTimestampStatus direction={props.direction} timestamp={props.timestamp} status={props.status} />
                }
            </div>
            {props.caption &&
                <>
                    <div>{props.caption}</div>
                    <ChatMessageTimestampStatus direction={props.direction} timestamp={props.timestamp} status={props.status} failedCause={props.failedCause} />
                </>
            }
        </ChatMessage>
    );

};

export interface ChatImageAboveMessageProps extends ChatMessageProps {
    src: string;
}

export const ChatImageAboveMessage: FC<ChatImageMessageProps> = (props) => {

    const contextDirection = useChatDirection();
    const { direction = contextDirection, className, ...rest } = props;

    const { scrollToBottom } = useContext(ChatMessageListContext);

    return (
        <ChatMessageContainer {...rest} className="space-y-2">
            <img src={props.src} onLoad={scrollToBottom} onError={scrollToBottom} alt="" className="max-w-32 rounded-xl" />
            <ChatMessageTimestampStatus direction={props.direction} timestamp={props.timestamp} status={props.status} failedCause={props.failedCause} className={classNames(
                'p-2 rounded-xl',
                {
                    'bg-chat-message-out text-gray-800 ': direction === 'out',
                    'bg-chat-message-in text-gray-800': direction === 'in'
                }, className)} />
        </ChatMessageContainer>
    );

};

export interface ChatDocumentMessageProps extends ChatMessageProps {
    src: string;
    size: number;
    filename: string;
    caption?: string;
}

export const ChatDocumentMessage: FC<ChatDocumentMessageProps> = (props) => {

    const { className, ...rest } = props;

    return (
        <ChatMessage {...rest} className={classNames('p-2', className)}>
            <a href={props.src} target="_blank" rel="noopener noreferrer">
                <div className="relative flex flex-row items-center gap-2 bg-gray-100 rounded-xl p-2">
                    <FileIcon className="w-8 h-8" />
                    <div>
                        <div>{props.filename}</div>
                        <div className="text-xs text-gray-500">{Math.round(props.size / 1000)} KB</div>
                    </div>
                </div>
            </a>
            <ChatMessageTimestampStatus direction={props.direction} timestamp={props.timestamp} status={props.status} failedCause={props.failedCause} />
        </ChatMessage>
    );

};

//
// Audio message
//

export interface ChatAudioMessageProps extends ChatMessageProps {
    src: string;
    caption?: string;
}

export const ChatAudioMessage: FC<ChatAudioMessageProps> = (props) => {

    const { className, ...rest } = props;

    return (
        <ChatMessage {...rest} className={classNames('p-2', className)}>
            <audio src={props.src} controls className="mb-2" />
            {/* <AudioPlayer src={props.src} /> */}
            {props.caption && <div>{props.caption}</div>}
            <ChatMessageTimestampStatus direction={props.direction} timestamp={props.timestamp} status={props.status} failedCause={props.failedCause} />
        </ChatMessage>
    );

};

//
// Video message
//

export interface ChatVideoMessageProps extends Omit<ChatMessageProps, 'timestampOvertaly'> {
    src: string;
    caption?: string;
}

export const ChatVideoMessage: FC<ChatVideoMessageProps> = (props) => {

    const { className, ...rest } = props;

    return (
        <ChatMessage {...rest} className={classNames('p-1', className)}>
            <div className="relative">
                <video src={props.src} controls className="rounded-xl" />
                {!props.caption &&
                    <ChatMessageOverlayTimestampStatus direction={props.direction} timestamp={props.timestamp} status={props.status} />
                }
            </div>
            {props.caption &&
                <>
                    <div>{props.caption}</div>
                    <ChatMessageTimestampStatus direction={props.direction} timestamp={props.timestamp} status={props.status} failedCause={props.failedCause} />
                </>
            }
        </ChatMessage>
    );

};

//
// Status
//

const ChatStatus: FC<Pick<ChatMessageProps, 'status' | 'failedCause'>> = ({ status, failedCause }) => {

    if (status === 'pending') {
        return <span className="text-muted"><ClockIcon /></span>;
    }

    if (status === 'sent') {
        return <span className="text-muted"><CheckIcon /></span>;
    }

    if (status === 'delivered') {
        return <span className="text-muted"><DoubleCheckIcon /></span>;
    }

    if (status === 'read') {
        return <span className="text-blue-500"><DoubleCheckIcon /></span>;
    }

    if (status === 'failed') {
        switch (failedCause) {
            case 'expired':
                return <span className="text-danger-500"><ClockIcon /></span>;
            default:
                return <span title={failedCause} className="text-danger-500"><CrossIcon /></span>;
        }
    }

    return null;

};
