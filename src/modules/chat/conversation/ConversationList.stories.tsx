import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { conversations } from '../stories/conversations';
import { StoryChatProvider } from '../stories/StoryChatProvider';
import { DefaultConversation } from '../kits/core/DefaultConversation';


// lux ships NO list — ordering, selection, the container, unread source are product
// identity and viewer state (§1, §12). This story is the CONSUMER side: it owns the
// list state and container and drops lux's `DefaultConversation` row into it. Selection
// is local state; clicking a row selects it.

const meta = {
    title: 'Chat/Conversation/List',
    tags: ['autodocs'],
    parameters: { layout: 'centered' }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function ConversationListDemo() {

    const [selectedId, setSelectedId] = useState('conv-alex');

    return (
        <StoryChatProvider>
            <div className="w-[380px] p-2 flex flex-col gap-1 bg-white rounded-xl border border-gray-200">
                {conversations.map((conversation) => (
                    <div key={conversation.id} onClick={() => setSelectedId(conversation.id)} className="cursor-pointer">
                        <DefaultConversation conversation={conversation} selected={conversation.id === selectedId} />
                    </div>
                ))}
            </div>
        </StoryChatProvider>
    );

}

export const Default: Story = {
    render: () => <ConversationListDemo />
};
