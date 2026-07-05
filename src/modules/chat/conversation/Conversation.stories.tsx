import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { BoundingBoxSpacing as BoundingBoxSpacingCheck } from '../../../stories/utilities/BoundingBoxSpacing';
import { DefaultConversation } from '../kits/core/DefaultConversation';
import { conversationEmpty, conversationLongMessage, conversationLongMessagePinnedMuted, conversationLongName, conversationMuted, conversationPinned, conversationPinnedAndMuted, conversationWithPhoto } from '../stories/conversations';
import { withStoryChat } from '../stories/StoryChatProvider';


const meta = {
    title: 'Chat/Conversation/Default',
    component: DefaultConversation,
    tags: ['autodocs'],
    decorators: [withStoryChat],
    parameters: { layout: 'centered' }
} satisfies Meta<typeof DefaultConversation>;

export default meta;
type Story = StoryObj<typeof meta>;

const row: Decorator = (Story) => <div className="w-[380px] p-4"><Story /></div>;

// Stories

export const Default: Story = { decorators: [row], args: { conversation: conversationWithPhoto } };

export const BoundingBoxSpacing: Story = {
    args: { conversation: conversationWithPhoto },
    render: () => (
        <BoundingBoxSpacingCheck>
            <div className="w-[380px]"><DefaultConversation conversation={conversationWithPhoto} /></div>
        </BoundingBoxSpacingCheck>
    )
};

export const Pinned: Story = { decorators: [row], args: { conversation: conversationPinned } };

export const Muted: Story = { decorators: [row], args: { conversation: conversationMuted } };

export const PinnedAndMuted: Story = { decorators: [row], args: { conversation: conversationPinnedAndMuted } };

export const Selected: Story = { decorators: [row], args: { conversation: conversationWithPhoto, selected: true } };

export const LongName: Story = { decorators: [row], args: { conversation: conversationLongName } };

export const LongMessage: Story = { decorators: [row], args: { conversation: conversationLongMessage } };

export const LongMessagePinnedAndMuted: Story = { decorators: [row], args: { conversation: conversationLongMessagePinnedMuted } };

export const Empty: Story = { decorators: [row], args: { conversation: conversationEmpty } };
