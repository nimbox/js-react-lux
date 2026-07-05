import type { Meta, StoryObj } from '@storybook/react-vite';
import { BoundingBoxSpacing as BoundingBoxSpacingCheck } from '../../../stories/utilities/BoundingBoxSpacing';
import { ChatAvatar } from './ChatAvatar';


const meta = {
    title: 'Chat/Atoms/ChatAvatar',
    component: ChatAvatar,
    decorators: [(Story) => <div className="p-8 text-5xl flex justify-center"><Story /></div>],
    tags: ['autodocs']
} satisfies Meta<typeof ChatAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories

export const Initials: Story = {
    args: { color: '#ffffff', backgroundColor: '#3B82F6', initials: 'AR' }
};

export const BoundingBoxSpacing: Story = {
    args: { color: '#ffffff', backgroundColor: '#3B82F6', initials: 'AR' },
    render: () => (
        <BoundingBoxSpacingCheck>
            <ChatAvatar color="#ffffff" backgroundColor="#3B82F6" initials="AR" />
        </BoundingBoxSpacingCheck>
    )
};

export const Photo: Story = {
    args: { url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' }
};

export const DefaultColor: Story = {
    args: { initials: 'JS' }
};
