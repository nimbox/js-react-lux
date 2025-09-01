import classnames from 'classnames';
import { type ReactNode } from 'react';
import { Avatar } from '../../../components/displays/Avatar';
import type { MessageGroupData } from '../types/MessageGroupData';


// MessageGroup

export interface MessageGroupProps {

    group: MessageGroupData;

    className?: string;
    children?: ReactNode;

}

export function MessageGroup({ group, className, children }: MessageGroupProps) {

    return (
        <div className={classnames('px-10 flex flex-row', className)}>

            <div className={classnames('flex-none p-1 text-[20px] leading-[24px]', {
                'order-1': group.direction === 'inbound',
                'order-2': group.direction === 'outbound'
            })}>
                <Avatar src={group.author?.avatarUrl} color={group.author?.color || 'red'}>
                    {group.author?.initials}
                </Avatar>
            </div>

            <div className={classnames('grow min-w-0 flex flex-col gap-1', {
                'order-2 items-start': group.direction === 'inbound',
                'order-1 items-end': group.direction === 'outbound'
            })}>
                {children}
            </div>

        </div>
    );

}
