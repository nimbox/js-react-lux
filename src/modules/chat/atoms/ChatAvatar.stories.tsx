import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatAvatar } from './ChatAvatar';


// Atoms are pure, prop-driven visuals — they render with NO ChatProvider and no
// envelope (§2, the atom contract). `ChatAvatar` sizes to its parent's font-size, so
// the story sets one on a wrapper.

const meta = {
    title: 'Chat/Atoms/ChatAvatar',
    component: ChatAvatar,
    decorators: [(Story) => <div className="p-8 text-5xl flex justify-center"><Story /></div>],
    tags: ['autodocs']
} satisfies Meta<typeof ChatAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {
    args: { color: '#ffffff', backgroundColor: '#3B82F6', initials: 'AR' }
};

export const Photo: Story = {
    args: { src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', alt: 'Alex Rivera' }
};

export const DefaultColor: Story = {
    args: { initials: 'JS' }
};
