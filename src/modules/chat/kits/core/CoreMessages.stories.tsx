import type { Meta, StoryObj } from '@storybook/react-vite';
import { chatBackdrop } from '../../stories/decorators';
import { audioMessage, documentMessage, imageMessage, stickerMessage, textInbound, videoMessage } from '../../stories/messages';
import { MessageThread, SingleMessage } from '../../stories/MessageThread';
import { withStoryChat } from '../../stories/StoryChatProvider';
import type { BaseMessage } from '../../types/BaseMessage';


const meta = {
    title: 'Chat/Message/Kit',
    component: SingleMessage,
    tags: ['autodocs'],
    decorators: [chatBackdrop, withStoryChat],
    parameters: { layout: 'fullscreen' }
} satisfies Meta<typeof SingleMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories

export const Text: Story = { args: { message: textInbound } };

export const Image: Story = { args: { message: imageMessage } };

export const Sticker: Story = { args: { message: stickerMessage } };

export const Audio: Story = { args: { message: audioMessage } };

export const Video: Story = { args: { message: videoMessage } };

export const Document: Story = { args: { message: documentMessage } };

const gallery: BaseMessage[] = [textInbound, imageMessage, audioMessage, videoMessage, documentMessage, stickerMessage];

export const Gallery: Story = {
    args: { message: textInbound },   // ignored by the custom render; satisfies the required-prop meta
    render: () => <MessageThread messages={gallery} className="h-[42rem]" />
};

// Two consecutive messages of the same type, same author/alignment, forced into
// one group (a distinct `group` key per type — the fixtures' own `group` is
// shared across several of them, which would merge audio/video/document into a
// single group instead of showing each type in isolation). `buildMessageRows`
// then really marks the first `isFirst` and the second not, the same as it
// would for a real adapter — the effect a single `SingleMessage` story (always
// `isFirst`) can't show: only the first bubble in a run gets the author header;
// the second sits flush beneath it with none.

function asGroupPair(message: BaseMessage, group: string): BaseMessage[] {
    const second = new Date(message.timestamp);
    second.setSeconds(second.getSeconds() + 30);
    return [
        { ...message, group },
        { ...message, id: `${message.id}-2`, group, timestamp: second.toISOString() }
    ];
}

const groupedPairs: BaseMessage[] = [
    ...asGroupPair(textInbound, 'pair-text'),
    ...asGroupPair(imageMessage, 'pair-image'),
    ...asGroupPair(stickerMessage, 'pair-sticker'),
    ...asGroupPair(audioMessage, 'pair-audio'),
    ...asGroupPair(videoMessage, 'pair-video'),
    ...asGroupPair(documentMessage, 'pair-document')
];

export const GroupedPairs: Story = {
    args: { message: textInbound },   // ignored by the custom render; satisfies the required-prop meta
    render: () => <MessageThread messages={groupedPairs} className="h-[42rem]" />
};
