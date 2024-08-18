import classNames from 'classnames';
import { FC } from 'react';
import { CheckIcon, CrossIcon } from '../../icons/components';
import { useChatDirection } from './ChatDirectionContext';


export interface ChatMessageProps {

    direction?: 'received' | 'sent';
    status?: 'sent' | 'delivered' | 'read' | 'failed';

    className?: string;

}

export interface ChatTextMessageProps extends ChatMessageProps {

    body: string;

}

export const ChatTextMessage: FC<ChatTextMessageProps> = (props) => {

    const contextDirection = useChatDirection();
    const { direction = contextDirection, status, body, className } = props;

    return (
        <div className={classNames('relative max-w-[75%] bg-gray-200 p-2 rounded-xl group', {
            'bg-secondary-500 text-white': direction === 'sent',
            'bg-gray-200 text-gray-800': direction === 'received'
        }, className)}>
            <div>{body}</div>
            <div className="flex flex-row justify-end items-center gap-1">
                <span className="text-sm opacity-50">10:20pm</span>
                {direction === 'sent' && <ChatStatus status={status} />}
            </div>
            <div className={classNames('hidden group-last:block absolute bottom-[2px]', {
                'right-[-6px] w-0 h-0 transform -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[6px] border-l-gray-200': direction === 'sent',
                'left-[-6px] w-0 h-0 transform -translate-y-1/2 border-y-[6px] border-y-transparent border-r-[6px] border-r-gray-200': direction === 'received',
            })} />
        </div>
    );

};

const ChatStatus: FC<Pick<ChatMessageProps, 'status'>> = ({ status }) => {

    if (status === 'sent') {
        return <span className="text-muted"><CheckIcon className="inline" /></span>;
    }

    if (status === 'delivered') {
        return <span className="text-muted"><CheckIcon className="inline" /><CheckIcon className="inline -ml-3" /></span>;
    }

    if (status === 'read') {
        return <span className="text-blue-500"><CheckIcon className="inline" /><CheckIcon className="inline -ml-3" /></span>;
    }

    if (status === 'failed') {
        return <span className="text-muted"><CrossIcon className="inline text-danger-500" /></span>;
    }

    return null;

}
