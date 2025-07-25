import type { Meta, StoryObj } from '@storybook/react';
import { ChatImageMessage } from './ChatMessage';


// Definition

const meta: Meta<typeof ChatImageMessage> = {
    component: ChatImageMessage
};

export default meta;
type Story = StoryObj<typeof ChatImageMessage>;

// Templates

const ChatImageTemplate: Story = {
    render: (args) => {
        return (
            <ChatImageMessage {...args} />
        );
    },
    args: {
        direction: 'in',
        status: 'read',
        src: 'https://via.placeholder.com/400x250',
        timestamp: new Date()
    }
};

// Stories

export const Simple: Story = {
    ...ChatImageTemplate,
    args: {
        ...ChatImageTemplate.args
    }
};

export const WithCaption: Story = {
    ...ChatImageTemplate,
    args: {
        ...ChatImageTemplate.args,
        caption: 'This is a caption'
    }
};
