import type { Meta, StoryObj } from '@storybook/react-vite';
import { BoundingBoxSpacing as BoundingBoxSpacingCheck } from '../../../stories/utilities/BoundingBoxSpacing';
import { centered } from '../stories/decorators';
import { ChatVideo } from './ChatVideo';


const meta = {
    title: 'Chat/Atoms/ChatVideo',
    component: ChatVideo,
    decorators: [centered],
    tags: ['autodocs']
} satisfies Meta<typeof ChatVideo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories

export const Default: Story = {
    args: {
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        size: 456789
    }
};

export const BoundingBoxSpacing: Story = {
    args: { url: 'https://www.w3schools.com/html/mov_bbb.mp4', size: 456789 },
    render: () => (
        <BoundingBoxSpacingCheck>
            <ChatVideo url="https://www.w3schools.com/html/mov_bbb.mp4" size={456789} />
        </BoundingBoxSpacingCheck>
    )
};

export const WithPoster: Story = {
    args: {
        url: 'https://www.w3schools.com/html/mov_bbb.mp4',
        size: 456789,
        poster: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&h=400&q=80'
    }
};
