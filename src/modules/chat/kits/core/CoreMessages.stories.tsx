import type { Meta, StoryObj } from '@storybook/react-vite';
import { chatBackdrop } from '../../stories/decorators';
import { audioMessage, documentMessage, imageMessage, stickerMessage, textInbound, videoMessage } from '../../stories/messages';
import { MessageThread, SingleMessage } from '../../stories/MessageThread';
import { withStoryChat } from '../../stories/StoryChatProvider';
import type { BaseMessage } from '../../types/BaseMessage';


// The core kit's message instances — the channel-neutral content vocabulary
// (text / image / sticker / audio / video / document) bound to the base slots + atoms
// and registered in `coreMessageRenderers`. A consumer spreads this registry and
// extends it per channel type (§2, §8). Each story is a `full`-surface bubble.

const meta = {
    title: 'Chat/Message/Kit',
    component: SingleMessage,
    tags: ['autodocs'],
    decorators: [chatBackdrop, withStoryChat],
    parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof SingleMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = { args: { message: textInbound } };

// Image → the `ChatImage` atom inside the bubble, with the caption in the Body slot.
export const Image: Story = { args: { message: imageMessage } };

// Sticker → a bubble-less floating image (`ChatSticker`); it reuses the image content
// view under its own registry key.
export const Sticker: Story = { args: { message: stickerMessage } };

export const Audio: Story = { args: { message: audioMessage } };

export const Video: Story = { args: { message: videoMessage } };

export const Document: Story = { args: { message: documentMessage } };

// All six types together, in a single dispatched thread.
const gallery: BaseMessage[] = [textInbound, imageMessage, audioMessage, videoMessage, documentMessage, stickerMessage];

export const Gallery: Story = {
    args: { message: textInbound },   // ignored by the custom render; satisfies the required-prop meta
    render: () => <MessageThread messages={gallery} className="h-[42rem]" />
};
