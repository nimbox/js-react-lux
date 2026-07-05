import type { Meta, StoryObj } from '@storybook/react-vite';
import { centered } from '../stories/decorators';
import { ChatSticker } from './ChatSticker';


// A sticker floats free — no bubble, no background — so it is its own atom, not a
// styled `ChatImage`.

const meta = {
    title: 'Chat/Atoms/ChatSticker',
    component: ChatSticker,
    decorators: [centered],
    tags: ['autodocs']
} satisfies Meta<typeof ChatSticker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f44d.svg',
        size: 34567,
        alt: 'thumbs up'
    }
};
