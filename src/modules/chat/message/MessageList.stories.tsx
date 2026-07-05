import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatSurface } from '../stories/decorators';
import { MessageThread } from '../stories/MessageThread';
import { firstUnreadId, thread } from '../stories/messages';
import { StoryChatProvider } from '../stories/StoryChatProvider';


// The flagship read-path story: a full timeline driven ONLY through public props and
// plain fixtures (no consumer/domain types). It exercises the base mechanics end to
// end — `MessageList` sticky-bottom scroll, `buildMessageRows` day separators + author
// grouping + tombstone, both alignments, every core media type, a reply-quote, an edit
// stamp, reaction pills with a lazy details popover, the hover reaction picker, and the
// overflow option menu — all wired by `StoryChatProvider` (the "consumer").

const meta = {
    title: 'Chat/Message/Thread',
    component: MessageThread,
    tags: ['autodocs'],
    parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof MessageThread>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderThread: Story['render'] = (args) => (
    <StoryChatProvider>
        <ChatSurface className="h-screen">
            <MessageThread {...args} />
        </ChatSurface>
    </StoryChatProvider>
);

export const Thread: Story = {
    render: renderThread,
    args: {
        messages: thread,
        className: 'h-full pb-6'
    }
};

// The unread "New messages" marker, injected before the first unread message. Unread
// is viewer-relative, so the story supplies the watermark id (§4).
export const WithUnreadMarker: Story = {
    render: renderThread,
    args: {
        messages: thread,
        markerBeforeId: firstUnreadId,
        className: 'h-full pb-6'
    }
};

// A read-only viewer: no reaction callbacks (the picker disappears) and an empty option
// set (the overflow menu disappears). Capabilities/options are data, gated in one place.
export const ReadOnly: Story = {
    render: (args) => (
        <StoryChatProvider onCreateReaction={undefined} onDeleteReaction={undefined} messageOptions={[]}>
            <ChatSurface className="h-screen">
                <MessageThread {...args} />
            </ChatSurface>
        </StoryChatProvider>
    ),
    args: {
        messages: thread,
        className: 'h-full pb-6'
    }
};
