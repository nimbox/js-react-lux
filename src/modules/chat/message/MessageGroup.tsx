import { type ReactNode } from 'react';
import { cn } from '../../../components/utilities/cn';
import type { MessageGroupData } from '../types/MessageGroupData';


// MessageGroup — vertical stack + alignment + the horizontal gutter a group's messages sit
// in. The avatar no longer lives here: it used to be a sibling column, bottom-aligned
// against this stack's total rendered height — fragile, since trailing per-message chrome
// (a reactions pill) inflated that height and detached the avatar from the bubble tail. The
// avatar is now the last bubble's own chrome (`MessageBubble`, gated on `isLast`),
// anchored directly to the last bubble's own box instead of a sibling's height.
// `MESSAGE_GUTTER` reserves exactly the room the avatar pokes into: a 1.875rem
// diameter + 0.25rem margin (`MessageBubble.tsx`) = 2.125rem, flush. All rem,
// so this holds at any root font-size, not just the one it's tuned at. Exported
// so a consumer building its own thread/list (§6, "whoever dispatches,
// provides") can reuse the exact value — e.g. for an authorless row laid out
// outside `MessageGroup` — instead of re-deriving or duplicating it.
export const MESSAGE_GUTTER = 'px-[2.125rem]';

export interface MessageGroupProps {

    group: MessageGroupData;
    children?: ReactNode;

    className?: string;

}

export function MessageGroup({ group, className, children }: MessageGroupProps) {

    return (
        <div className={cn(MESSAGE_GUTTER, 'flex flex-col gap-1', className, {
            'items-start': group.alignment === 'start',
            'items-end': group.alignment === 'end'
        })}>
            {children}
        </div>
    );

}
