import classnames from 'classnames';
import { type ReactNode } from 'react';
import type { MessageGroupData } from '../types/MessageGroupData';


// MessageGroup — vertical stack + alignment + the horizontal gutter a group's messages sit
// in. The avatar no longer lives here: it used to be a sibling column, bottom-aligned
// against this stack's total rendered height — fragile, since trailing per-message chrome
// (a reactions pill) inflated that height and detached the avatar from the bubble tail. The
// avatar is now auto-mounted Container-tier chrome (`MessageContainer`, gated on `isLast`),
// anchored directly to the last bubble's own box instead of a sibling's height. The `px-10`
// gutter kept here still reserves the room that avatar pokes into.

export interface MessageGroupProps {

    group: MessageGroupData;
    children?: ReactNode;

    className?: string;

}

export function MessageGroup({ group, className, children }: MessageGroupProps) {

    return (
        <div className={classnames('px-10 flex flex-col gap-1', className, {
            'items-start': group.alignment === 'start',
            'items-end': group.alignment === 'end'
        })}>
            {children}
        </div>
    );

}
