import type { Meta, StoryObj } from '@storybook/react-vite';
import { centered } from '../stories/decorators';
import { ChatAudio } from './ChatAudio';


// `ChatAudio` reads `useChat()` for the `formatDuration` FORMATTER only (never message
// data) — and the context default makes it render fine with no provider (§2). Pass a
// `duration` to show it immediately; omit it and the atom falls back to the element's
// own metadata on load.

const meta = {
    title: 'Chat/Atoms/ChatAudio',
    component: ChatAudio,
    decorators: [centered],
    tags: ['autodocs']
} satisfies Meta<typeof ChatAudio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithDuration: Story = {
    args: {
        url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        size: 123456,
        duration: 8
    }
};

export const WithoutDuration: Story = {
    args: {
        url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
        size: 123456
    }
};
