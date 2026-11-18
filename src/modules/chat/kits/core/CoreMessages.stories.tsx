import type { Meta, StoryObj } from '@storybook/react-vite';
import { chatBackdrop } from '../../stories/decorators';
import { audioMessage, audioPendingMessage, documentMessage, imageInboundNoCaption, imageLightNoCaption, imageMessage, imageOutboundNoCaption, imagePendingMessage, imageWithReply, stickerMessage, stickerPendingMessage, stickerWithReply, textInbound, videoMessage, videoPendingMessage } from '../../stories/messages';
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

export const ImageNoCaption: Story = { args: { message: imageOutboundNoCaption } };

export const ImageInboundNoCaption: Story = { args: { message: imageInboundNoCaption } };

export const ImageWithReply: Story = { args: { message: imageWithReply } };

const imageGallery: BaseMessage[] = [imageMessage, imageInboundNoCaption, imageOutboundNoCaption, imageWithReply, imagePendingMessage];

export const ImageGallery: Story = {
    args: { message: textInbound },   // ignored by the custom render; satisfies the required-prop meta
    render: () => <MessageThread messages={imageGallery} className="h-[60rem]" />
};

// Images that are not first in their group, so they carry no author header:
// the image runs to the bubble's top edge as well. Each run opens with a text
// message (which takes the header), then an image without a caption and one
// with a caption, on both sides.

const imagesWithoutHeader: BaseMessage[] = [
    textInbound,
    { ...imageInboundNoCaption, id: 'headerless-in-1', timestamp: '2024-01-16T10:21:10Z' },
    { ...imageMessage, id: 'headerless-in-2', group: imageInboundNoCaption.group, timestamp: '2024-01-16T10:21:20Z', reactions: undefined },
    { ...imageOutboundNoCaption, id: 'headerless-out-0', type: 'text', content: { text: 'Here are both versions' }, timestamp: '2024-01-16T10:22:00Z' },
    { ...imageOutboundNoCaption, id: 'headerless-out-1', timestamp: '2024-01-16T10:22:10Z' },
    { ...imageWithReply, id: 'headerless-out-2', replyTo: undefined, timestamp: '2024-01-16T10:22:20Z' }
];

export const ImageWithoutHeader: Story = {
    args: { message: textInbound },   // ignored by the custom render; satisfies the required-prop meta
    render: () => <MessageThread messages={imagesWithoutHeader} className="h-[60rem]" />
};

// A mostly white image with no header and no caption, both sides: how the
// gradient holds the white properties up over a light picture.

const lightImageWithoutHeader: BaseMessage[] = [
    textInbound,
    { ...imageLightNoCaption, id: 'light-in', author: imageInboundNoCaption.author, group: imageInboundNoCaption.group, alignment: 'start', status: undefined, timestamp: '2024-01-16T10:21:10Z' },
    { ...imageOutboundNoCaption, id: 'light-out-0', type: 'text', content: { text: 'Snow day' }, timestamp: '2024-01-16T10:22:00Z' },
    { ...imageLightNoCaption, id: 'light-out', timestamp: '2024-01-16T10:22:10Z' }
];

export const ImageLightWithoutHeader: Story = {
    args: { message: textInbound },   // ignored by the custom render; satisfies the required-prop meta
    render: () => <MessageThread messages={lightImageWithoutHeader} className="h-[42rem]" />
};

export const Sticker: Story = { args: { message: stickerMessage } };

export const StickerWithReply: Story = { args: { message: stickerWithReply } };

export const Audio: Story = { args: { message: audioMessage } };

export const Video: Story = { args: { message: videoMessage } };

export const Document: Story = { args: { message: documentMessage } };

export const ImagePending: Story = { args: { message: imagePendingMessage } };

export const StickerPending: Story = { args: { message: stickerPendingMessage } };

export const AudioPending: Story = { args: { message: audioPendingMessage } };

export const VideoPending: Story = { args: { message: videoPendingMessage } };

const pendingGallery: BaseMessage[] = [imagePendingMessage, stickerPendingMessage, audioPendingMessage, videoPendingMessage];

export const PendingGallery: Story = {
    args: { message: textInbound },   // ignored by the custom render; satisfies the required-prop meta
    render: () => <MessageThread messages={pendingGallery} className="h-[42rem]" />
};

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
