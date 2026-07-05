import type { Meta, StoryObj } from '@storybook/react-vite';
import { centered } from '../stories/decorators';
import { ChatImage } from './ChatImage';


// A resolved `url` + `size` handed in by a kit — the atom never reaches into a message
// for one (§2).

const meta = {
    title: 'Chat/Atoms/ChatImage',
    component: ChatImage,
    decorators: [centered],
    tags: ['autodocs']
} satisfies Meta<typeof ChatImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&h=400&q=80',
        size: 234567,
        alt: 'Landscape'
    }
};
