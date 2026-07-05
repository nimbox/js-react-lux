import type { Decorator } from '@storybook/react-vite';
import classNames from 'classnames';
import type { ReactNode } from 'react';
import chatBackground from '../assets/chat-background.png';


// The chat surface — the themed message-list background with the subtle pattern
// overlay, so bubbles/rows sit on the real surface instead of a bare Storybook canvas.
// Used as a wrapper component (`ChatSurface`, for the full-height thread) and as a
// padded decorator (`chatBackdrop`, for single-component stories).

export function ChatSurface({ className, children }: { className?: string; children: ReactNode }) {
    return (
        <div className={classNames('relative bg-chat-message-list-bg', className)}>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${chatBackground})` }} />
            <div className="relative h-full">{children}</div>
        </div>
    );
}

// Padded surface for a single message / reactions / options story.
export const chatBackdrop: Decorator = (Story) => (
    <ChatSurface className="min-h-[28rem] p-8">
        <Story />
    </ChatSurface>
);

// A plain centered card (no chat surface) — for atoms and popovers shown in isolation.
export const centered: Decorator = (Story) => (
    <div className="p-8 flex justify-center">
        <Story />
    </div>
);
