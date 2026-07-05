import type { Meta, StoryObj } from '@storybook/react-vite';
import { chatBackdrop } from '../../stories/decorators';
import { deletedMessage, systemMessage, unknownMessage } from '../../stories/messages';
import { MessageThread, SingleMessage } from '../../stories/MessageThread';
import { withStoryChat } from '../../stories/StoryChatProvider';


// The base fallbacks — how the read path degrades VISIBLY instead of crashing (§8).
// `UnknownMessage` covers an unregistered `type`; `TombstoneMessage` replaces any
// `deletedAt` message (dispatch short-circuit, §3); a `single` row carries an
// authorless system event.

const meta = {
    title: 'Chat/Message/Fallbacks',
    tags: ['autodocs'],
    decorators: [chatBackdrop, withStoryChat],
    parameters: { layout: 'fullscreen' }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// An unregistered `type` ('poll') → `UnknownMessage`: full chrome (reactions, options,
// author, properties) but a content-free interior showing the raw `type` token.
export const UnknownType: Story = {
    render: () => <SingleMessage message={unknownMessage} />
};

// A message with `deletedAt` → `TombstoneMessage`, whatever its original type. The
// dispatch resolver short-circuits before the `type` lookup (§3).
export const Tombstone: Story = {
    render: () => <SingleMessage message={deletedMessage} />
};

// An authorless, groupless message → a `single` row: centered, no avatar column. Its
// `type` ('system-join') is unregistered, so it renders through the Unknown fallback —
// a consumer registers a `system-*` instance to give it a real look. Rendered through
// the full `MessageThread` so the `single` row mechanic is visible.
export const SystemEvent: Story = {
    render: () => <MessageThread messages={[systemMessage]} className="h-[24rem]" />
};
