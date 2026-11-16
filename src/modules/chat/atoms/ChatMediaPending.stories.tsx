import type { Meta, StoryObj } from '@storybook/react-vite';
import { BoundingBoxSpacing as BoundingBoxSpacingCheck } from '../../../stories/utilities/BoundingBoxSpacing';
import { centered } from '../stories/decorators';
import { ChatMediaPending } from './ChatMediaPending';


const meta = {
    title: 'Chat/Atoms/ChatMediaPending',
    component: ChatMediaPending,
    decorators: [centered],
    tags: ['autodocs']
} satisfies Meta<typeof ChatMediaPending>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories

export const Default: Story = {};

export const Sticker: Story = { args: { className: 'w-24 h-24 bg-transparent' } };

export const Audio: Story = { args: { className: 'w-[300px] max-w-full h-[54px]' } };

export const Video: Story = { args: { className: 'w-64 h-36' } };

export const BoundingBoxSpacing: Story = {
    render: () => (
        <BoundingBoxSpacingCheck>
            <ChatMediaPending />
        </BoundingBoxSpacingCheck>
    )
};
