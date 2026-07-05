import type { Meta, StoryObj } from '@storybook/react-vite';
import { BoundingBoxSpacing as BoundingBoxSpacingCheck } from '../../../stories/utilities/BoundingBoxSpacing';
import { centered } from '../stories/decorators';
import { ChatImage } from './ChatImage';


const meta = {
    title: 'Chat/Atoms/ChatImage',
    component: ChatImage,
    decorators: [centered],
    tags: ['autodocs']
} satisfies Meta<typeof ChatImage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories

export const Default: Story = {
    args: {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&h=400&q=80',
        size: 234567,
        alt: 'Landscape'
    }
};

export const BoundingBoxSpacing: Story = {
    args: {
        url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&h=400&q=80',
        size: 234567,
        alt: 'Landscape'
    },
    render: () => (
        <BoundingBoxSpacingCheck>
            <ChatImage
                url="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&h=400&q=80"
                size={234567}
                alt="Landscape"
            />
        </BoundingBoxSpacingCheck>
    )
};
