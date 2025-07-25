import classnames from 'classnames';
import { createContext, ReactElement } from 'react';
import { MessageProps } from './Message';
import { MessageGroupData } from '../types/MessageGroupData';
import { Avatar } from '../../../components/displays/Avatar';
import React from 'react';


// MessageGroup

export interface MessageGroupProps {
    group: MessageGroupData;
    children: ReactElement<MessageGroupMessagesProps>;
}

export const MessageGroupContext = createContext<MessageGroupData | null>(null);

export function MessageGroup({ group, children }: MessageGroupProps) {
    return (
        <MessageGroupContext.Provider value={group}>
            <div className={classnames('px-10 flex flex-row', {
                // 'justify-end': group.direction === 'outbound',
                // 'justify-start': group.direction === 'inbound'
            })}>

                <div className={classnames('p-1 flex-none text-[20px] leading-[24px]', {
                    'order-1': group.direction === 'inbound',
                    'order-2': group.direction === 'outbound'
                })}>
                    <Avatar src={group.author.avatarUrl} color={group.author.color || 'red'}>
                        {group.author.initials}
                    </Avatar>
                </div>

                <div className={classnames('flex-1 flex flex-col gap-1 min-w-0', {
                    'order-2 items-start': group.direction === 'inbound',
                    'order-1 items-end': group.direction === 'outbound'
                })}>
                    {children}
                </div>

            </div>
        </MessageGroupContext.Provider>
    );
}

// MessageGroup.Messages

export interface MessageGroupMessagesProps {
    children: ReactElement<MessageProps> | ReactElement<MessageProps>[];
    className?: string;
}


function MessageGroupMessages({ children }: MessageGroupMessagesProps) {

    // If children is an array, process each child.

    if (Array.isArray(children)) {
        return children.map((child, index) => {
            return React.cloneElement(child, {
                isFirst: index === 0,
                isLast: index === children.length - 1
            });
        });
    }

    // If it's a single child, it's both first and last.

    return React.cloneElement(children, {
        isFirst: true,
        isLast: true
    });

}

// Slots

MessageGroup.Messages = MessageGroupMessages;
