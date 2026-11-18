import { type ReactNode } from 'react';
import { cn } from '../../../components/utilities/cn';
import type { MessageGroupData } from '../types/MessageGroupData';


// MessageGroup — the vertical stack a group's messages sit in. The group
// avatar and the gutter it stands in are not placed here: both belong to each
// message's `MessageFrame`.

export interface MessageGroupProps {

    group: MessageGroupData;
    children?: ReactNode;

    className?: string;

}

export function MessageGroup({ group, className, children }: MessageGroupProps) {

    return (
        <div className={cn('flex flex-col gap-1', className, {
            'items-start': group.alignment === 'start',
            'items-end': group.alignment === 'end'
        })}>
            {children}
        </div>
    );

}
