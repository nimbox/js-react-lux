import type { Decorator } from '@storybook/react-vite';
import { ChatSurface } from '../surface/ChatSurface';


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
