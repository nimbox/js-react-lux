import type { Meta, StoryObj } from '@storybook/react';
import { ChatProvider } from '../ChatProvider';
import { authors } from '../data/authors';
import { reactions } from '../data/reactions';
import { MessageContext } from '../Message';
import { MessageGroupContext } from '../MessageGroup';
import { MessageData } from '../types/MessageData';
import { MessageGroupData } from '../types/MessageGroupData';
import { MessageReactionDetails } from './MessageReactionDetails';


// Definition

const meta: Meta<typeof MessageReactionDetails> = {
    component: MessageReactionDetails
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
        <MessageGroupContext.Provider value={group}>
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
            fetchReactionDetails={async () => {
                return reactions;
            }}
        >
            <Content />
        </ChatProvider>
    )
};

export const Delayed: Story = {
    render: () => (
        <ChatProvider
            fetchReactionDetails={async () => {
                return new Promise((resolve) => setTimeout(() => resolve(reactions), 2000));
            }}
        >
            <Content />
        </ChatProvider>
    )
};

export const Loading: Story = {
    render: () => (
        <ChatProvider
            fetchReactionDetails={async () => {
                return new Promise(() => {});
            }}
        >
            <Content />
        </ChatProvider>
    )
};

export const Error: Story = {
    render: () => (
        <ChatProvider
            fetchReactionDetails={async () => {
                return Promise.reject('Failed to fetch reaction details');
            }}
        >
            <Content />
        </ChatProvider>
    )
};

