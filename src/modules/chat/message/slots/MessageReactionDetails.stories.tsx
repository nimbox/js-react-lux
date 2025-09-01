import type { Meta, StoryObj } from '@storybook/react-vite';
import { authors } from '../../data/authors';
import { reactionDetails } from '../../data/reactionDetails';
import { type MessageData } from '../../types/MessageData';
import { MessageProvider } from '../MessageProvider';
import { MessageReactionDetails } from './MessageReactionDetails';


// Definition

const meta: Meta<typeof MessageReactionDetails> = {
    component: MessageReactionDetails,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof MessageReactionDetails>;

const message: MessageData = {
    id: '1',
    author: authors['1'],
    direction: 'inbound',
    type: 'text',
    body: 'Hello, world!',
    timestamp: 0
};

// Stories

function Content() {
    return (
        <div className="inline-block border border-control-border rounded">
            <MessageReactionDetails />
        </div>
    );
}

export const Default: Story = {
    render: () => (
        <Content />
    ),
    decorators: [
        (Story) => (
            <MessageProvider message={message} getReactions={async () => reactionDetails}>
                <Story />
            </MessageProvider>
        )
    ]
};

export const Delayed: Story = {
    render: () => (
        <Content />
    ),
    decorators: [
        (Story) => (
            <MessageProvider message={message} getReactions={async () => new Promise((resolve) => setTimeout(() => resolve(reactionDetails), 2000))}>
                <Story />
            </MessageProvider>
        )
    ]
};

export const Loading: Story = {
    render: () => (
        <Content />
    ),
    decorators: [
        (Story) => (
            <MessageProvider message={message} getReactions={async () => new Promise(() => { })}>
                <Story />
            </MessageProvider>
        )
    ]
};

export const Empty: Story = {
    render: () => (
        <Content />
    ),
    decorators: [
        (Story) => (
            <MessageProvider message={message} getReactions={async () => []}>
                <Story />
            </MessageProvider>
        )
    ]
};

export const Error: Story = {
    render: () => (
        <Content />
    ),
    decorators: [
        (Story) => (
            <MessageProvider message={message} getReactions={async () => Promise.reject('Failed to fetch reaction details')}>
                <Story />
            </MessageProvider>
        )
    ]
};
