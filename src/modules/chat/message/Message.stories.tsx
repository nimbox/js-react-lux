import type { Meta, StoryObj } from '@storybook/react-vite';
import { sarah } from '../stories/authors';
import { chatBackdrop } from '../stories/decorators';
import { editedMessage, emojiOnly, longText, textInbound, textOutbound, textWithReply, withReactions } from '../stories/messages';
import { SingleMessage } from '../stories/MessageThread';
import { withStoryChat } from '../stories/StoryChatProvider';
import type { BaseMessage } from '../types/BaseMessage';


// A single bubble across its states, driven through the same dispatch the timeline
// uses (`SingleMessage` = one author group, no separators). Hover a bubble for the
// overflow option menu; hover the row for the reaction picker.

const meta = {
    title: 'Chat/Message/Message',
    component: SingleMessage,
    tags: ['autodocs'],
    decorators: [chatBackdrop, withStoryChat],
    parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof SingleMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inbound: Story = { args: { message: textInbound } };

export const Outbound: Story = { args: { message: textOutbound } };

// A reply-quote above the bubble: the replied-to message renders through the SAME
// registry at the `preview` surface (no separate reply stack — §6).
export const WithReply: Story = { args: { message: textWithReply } };

export const LongText: Story = { args: { message: longText } };

export const EmojiOnly: Story = { args: { message: emojiOnly } };

// Reaction pills (Container-tier, auto). Click the cluster for the lazy who-reacted
// popover; the highlighted pill marks the viewer's own reaction.
export const WithReactions: Story = { args: { message: withReactions } };

// `editedAt` → Properties appends "(edited)" (§3).
export const Edited: Story = { args: { message: editedMessage } };

// The delivery ticks `renderStatus` paints from the opaque `status` token (§3). Absent
// tokens fall back to the raw string.
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
