import type { Meta, StoryObj } from '@storybook/react-vite';
import { sarah } from '../stories/authors';
import { chatBackdrop } from '../stories/decorators';
import { editedMessage, emojiOnly, longText, textInbound, textOutbound, textWithReply, withReactionsInbound, withReactionsOutbound } from '../stories/messages';
import { SingleMessage } from '../stories/MessageThread';
import { withStoryChat } from '../stories/StoryChatProvider';
import type { BaseMessage } from '../types/BaseMessage';


const meta = {
    title: 'Chat/Message/Message',
    component: SingleMessage,
    tags: ['autodocs'],
    decorators: [chatBackdrop, withStoryChat],
    parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof SingleMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories

export const Inbound: Story = { args: { message: textInbound } };

export const Outbound: Story = { args: { message: textOutbound } };

export const WithReply: Story = { args: { message: textWithReply } };

export const LongText: Story = { args: { message: longText } };

export const EmojiOnly: Story = { args: { message: emojiOnly } };

export const WithReactionsInbound: Story = { args: { message: withReactionsInbound } };

export const WithReactionsOutbound: Story = { args: { message: withReactionsOutbound } };

export const Edited: Story = { args: { message: editedMessage } };

export const Statuses: Story = {
    args: { message: textOutbound },   // ignored by the custom render; satisfies the required-prop meta
    render: () => (
        <div className="flex flex-col gap-2">
            {(['pending', 'sent', 'delivered', 'read', 'failed'] as const).map((status) => {
                const message: BaseMessage = {
                    id: `status-${status}`,
                    author: sarah,
                    group: sarah.id,
                    alignment: 'end',
                    type: 'text',
                    content: { text: `Delivery status: ${status}` },
                    timestamp: '2024-01-16T10:40:00Z',
                    status
                };
                return <SingleMessage key={status} message={message} />;
            })}
        </div>
    )
};
