import type { Meta, StoryObj } from '@storybook/react-vite';
import { conversationEmpty, conversationLongName, conversationMuted, conversationPinned, conversationWithPhoto } from '../stories/conversations';
import { withStoryChat } from '../stories/StoryChatProvider';
import { DefaultConversation } from '../kits/core/DefaultConversation';


// The conversation ROW — lux owns the row's look (an opinionated, replaceable default),
// the consumer owns the LIST (see the List story). `DefaultConversation` composes the
// base `Conversation.*` slots: avatar, name + timestamp, the last-message SUMMARY (via
// the message registry), and the opaque `meta` painted by `renderConversationMeta`.
// The overflow options menu reveals on hover (§1, §7).

const meta = {
    title: 'Chat/Conversation/Row',
    component: DefaultConversation,
    tags: ['autodocs'],
    decorators: [(Story) => <div className="w-[380px] p-4"><Story /></div>, withStoryChat],
    parameters: { layout: 'centered' }
} satisfies Meta<typeof DefaultConversation>;

export default meta;
type Story = StoryObj<typeof meta>;

// Photo avatar + an unread badge. Last message is a text summary.
export const Default: Story = { args: { conversation: conversationWithPhoto } };

// Initials avatar; the last message is an image → the `summary` surface renders
// "📷 …" (never a hand-built string). `meta.pinned` paints the 📌 indicator.
export const Pinned: Story = { args: { conversation: conversationPinned } };

// `meta.muted` paints a bell indicator; the option menu resolves a stateful Unmute.
export const Muted: Story = { args: { conversation: conversationMuted } };

export const Selected: Story = { args: { conversation: conversationWithPhoto, selected: true } };

export const LongName: Story = { args: { conversation: conversationLongName } };

// No last message → the base "Nothing yet…" placeholder.
export const Empty: Story = { args: { conversation: conversationEmpty } };
