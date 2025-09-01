import type { Meta, StoryObj } from '@storybook/react-vite';
import { authors } from '../data/authors';
import { ReplyProvider } from './ReplyProvider';
import { AudioReply, DocumentReply, ImageReply, TextReply, VideoReply } from './instances';


// Definition

const meta: Meta<typeof ReplyProvider> = {
    component: ReplyProvider,
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof ReplyProvider>;

// Stories

export const Text: Story = {
    render: (args) => (
        <TextReply {...args} />
    ),
    args: {
        message: {
            id: '1',
            author: authors['1'],
            direction: 'inbound',
            type: 'text',
            body: 'Hello, world!',
            caption: 'Hello, world!',
            timestamp: '',
            attachments: [
                {
                    type: 'image',
                    name: 'Placeholder Image',
                    mime: 'image/png',
                    size: 15000,
                    url: 'https://picsum.photos/150/150'
                }
            ]
        }
    }
};

export const Sticker: Story = {
    render: (args) => (
        <ImageReply {...args} />
    ),
    args: {
        message: {
            id: '1',
            author: authors['1'],
            direction: 'inbound',
            type: 'sticker',
            body: '',
            caption: 'Thumbs up! 👍',
            timestamp: '',
            attachments: [
                {
                    type: 'sticker',
                    name: 'Thumbs Up',
                    mime: 'image/png',
                    size: 34567,
                    url: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f44d.svg',
                    thumbnailUrl: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg/1f44d.svg'
                }
            ]
        }
    }
};

export const Image: Story = {
    render: (args) => (
        <ImageReply {...args} />
    ),
    args: {
        message: {
            id: '1',
            author: authors['1'],
            direction: 'inbound',
            type: 'image',
            caption: 'Hello, world!',
            timestamp: '',
            attachments: [
                {
                    type: 'image',
                    name: 'Placeholder Image',
                    mime: 'image/png',
                    size: 0,
                    url: 'https://picsum.photos/150/150',
                    thumbnailUrl: 'https://picsum.photos/150/150'
                }
            ]
        }
    }
};

export const Audio: Story = {
    render: (args) => (
        <AudioReply {...args} />
    ),
    args: {
        message: {
            id: '1',
            author: authors['1'],
            direction: 'inbound',
            type: 'audio',
            timestamp: '',
            attachments: [
                {
                    type: 'audio',
                    name: 'Voice Message',
                    mime: 'audio/mp3',
                    size: 256000,
                    duration: 32,
                    url: 'https://example.com/audio.mp3'
                }
            ]
        }
    }
};

export const Video: Story = {
    render: (args) => (
        <VideoReply {...args} />
    ),
    args: {
        message: {
            id: '1',
            author: authors['1'],
            direction: 'inbound',
            type: 'video',
            timestamp: '',
            attachments: [
                {
                    type: 'video',
                    name: 'Video Message',
                    mime: 'video/mp4',
                    size: 2048000,
                    duration: 125,
                    url: 'https://example.com/video.mp4',
                    thumbnailUrl: 'https://picsum.photos/150/150'
                }
            ]
        }
    }
};

export const Document: Story = {
    render: (args) => (
        <DocumentReply {...args} />
    ),
    args: {
        message: {
            id: '1',
            author: authors['1'],
            direction: 'inbound',
            type: 'document',
            timestamp: '',
            attachments: [
                {
                    type: 'document',
                    name: 'Project Proposal',
                    filename: 'project-proposal.pdf',
                    mime: 'application/pdf',
                    size: 1024000,
                    url: 'https://example.com/project-proposal.pdf'
                }
            ]
        }
    }
};

