import type { Meta, StoryObj } from '@storybook/react-vite';
import { BoundingBoxSpacing as BoundingBoxSpacingCheck } from '../../../stories/utilities/BoundingBoxSpacing';
import { centered } from '../stories/decorators';
import { STICKER_IMAGE } from '../stories/media';
import { ChatSticker } from './ChatSticker';


const meta = {
    title: 'Chat/Atoms/ChatSticker',
    component: ChatSticker,
    decorators: [centered],
    tags: ['autodocs']
} satisfies Meta<typeof ChatSticker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories

export const Default: Story = {
    args: {
        url: STICKER_IMAGE,
        size: 40452,
        alt: 'leaf'
    }
};

export const BoundingBoxSpacing: Story = {
    args: {
        url: STICKER_IMAGE,
        size: 40452,
        alt: 'leaf'
    },
    render: () => (
        <BoundingBoxSpacingCheck>
            <ChatSticker
                url={STICKER_IMAGE}
                size={40452}
                alt="leaf"
            />
        </BoundingBoxSpacingCheck>
    )
};
