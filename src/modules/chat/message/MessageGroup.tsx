import classnames from 'classnames';
import { type ReactNode } from 'react';
import { useChat } from '../ChatContext';
import type { MessageGroupData } from '../types/MessageGroupData';


// MessageGroup

export interface MessageGroupProps {

    group: MessageGroupData;

    className?: string;
    children?: ReactNode;

}

export function MessageGroup({ group, className, children }: MessageGroupProps) {

    const { authorRenderer } = useChat();

    return (
        <div className={classnames('px-10 flex flex-row', className)}>

            <div className={classnames('flex-none p-1 text-[20px] leading-[24px]', {
                'order-1': group.alignment === 'start',
                'order-2': group.alignment === 'end'
            })}>
                {authorRenderer.avatar(group.author)}
            </div>

            <div className={classnames('grow min-w-0 flex flex-col gap-1', {
                'order-2 items-start': group.alignment === 'start',
                'order-1 items-end': group.alignment === 'end'
            })}>
                {children}
            </div>

        </div>
    );

}
