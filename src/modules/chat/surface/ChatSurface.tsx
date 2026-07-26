import type { ReactNode } from 'react';
import { cn } from '../../../components/utilities/cn';
import chatBackground from '../assets/chat-background.png';


export interface ChatSurfaceProps {
    className?: string;
    children: ReactNode;
}

/**
 * The chat surface — the themed message-list background with the subtle pattern
 * overlay, so bubbles/rows sit on the real surface instead of a bare backdrop.
 * Wrap a timeline (`className="h-screen"`) or a single message in it.
 */
export function ChatSurface({ className, children }: ChatSurfaceProps) {
    return (
        <div className={cn('relative bg-chat-message-list-bg', className)}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${chatBackground})` }} />
            <div className="relative h-full">{children}</div>
        </div>
    );
}
