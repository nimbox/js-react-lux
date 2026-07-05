import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { DefaultConversation } from '../kits/core/DefaultConversation';
import { conversations } from '../stories/conversations';
import { StoryChatProvider } from '../stories/StoryChatProvider';


const meta = {
    title: 'Chat/Conversation/List',
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

// Stories

export const Default: Story = {
    render: () => <ConversationListDemo />
};
