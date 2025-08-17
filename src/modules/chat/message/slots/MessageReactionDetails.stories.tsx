import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatProvider } from '../../ChatProvider';
import { authors } from '../../data/authors';
import { reactionDetails } from '../../data/reactionDetails';
import { MessageData } from '../../types/MessageData';
import { MessageGroupData } from '../../types/MessageGroupData';
import { MessageContext } from '../MessageContext';
import { MessageReactionDetails } from './MessageReactionDetails';
import { MessageGroupContext } from '../MessageGroupContext';


// Definition

const meta: Meta<typeof MessageReactionDetails> = {
    component: MessageReactionDetails,
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof MessageReactionDetails>;

const group: MessageGroupData = {
    id: '1',
    direction: 'inbound',
    author: authors['1']
};

const message: MessageData = {
    id: '1',
    author: authors['1'],
    direction: 'inbound',
    type: 'text',
    body: 'Hello, world!'
};

// Stories

function Content() {
    return (
        <MessageGroupContext.Provider value={{ group }}>
            <MessageContext.Provider value={{ message }}>
                <div className="inline-block border border-control-border rounded">
                    <MessageReactionDetails />
                </div>
            </MessageContext.Provider>
        </MessageGroupContext.Provider>
    );
}

export const Default: Story = {
    render: () => (
        <ChatProvider
            getReactions={async () => {
                return reactionDetails;
            }}
        >
            <Content />
        </ChatProvider>
    )
};

export const Delayed: Story = {
    render: () => (
        <ChatProvider
            getReactions={async () => {
                return new Promise((resolve) => setTimeout(() => resolve(reactionDetails), 2000));
            }}
        >
            <Content />
        </ChatProvider>
    )
};

export const Loading: Story = {
    render: () => (
        <ChatProvider
            getReactions={async () => {
                return new Promise(() => { });
            }}
        >
            <Content />
        </ChatProvider>
    )
};

export const Empty: Story = {
    render: () => (
        <ChatProvider
            getReactions={async () => []}
        >
            <Content />
        </ChatProvider >
    )
};

export const Error: Story = {
    render: () => (
        <ChatProvider
            getReactions={async () => {
                return Promise.reject('Failed to fetch reaction details');
            }}
        >
            <Content />
        </ChatProvider>
    )
};
