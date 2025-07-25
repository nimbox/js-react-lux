import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../components/Button';
import { Avatar } from '../../components/displays/Avatar';
import { Input } from '../../components/inputs/Input';
import { SendIcon } from '../../icons/components';
import { ChatGroup } from './ChatGroup';
import { ChatTextMessage } from './ChatMessage';
import { ChatMessageList } from './ChatMessageList';


// Definition

const meta: Meta<typeof ChatTextMessage> = {
    component: ChatTextMessage
};

export default meta;
type Story = StoryObj<typeof ChatTextMessage>;

// Templates

const ChatMessageTemplate: Story = {
    render: (args) => {
        return (
            <ChatTextMessage {...args} />
        );
    },
    args: {
        direction: 'sent',
        status: 'read',
        body: 'Lorem impsum dolor est'

    }
};

// Stories

export const Received: Story = {
    ...ChatMessageTemplate,
    args: {
        ...ChatMessageTemplate.args,
        direction: 'received'
    }
};

export const Sent: Story = {
    ...ChatMessageTemplate,
    args: {
        ...ChatMessageTemplate.args,
        direction: 'sent'
    }
};

export const SentSent: Story = {
    ...ChatMessageTemplate,
    args: {
        ...ChatMessageTemplate.args,
        direction: 'sent',
        status: 'sent'
    }
};

export const SentDelivered: Story = {
    ...ChatMessageTemplate,
    args: {
        ...ChatMessageTemplate.args,
        direction: 'sent',
        status: 'delivered'
    }
};

export const SentRead: Story = {
    ...ChatMessageTemplate,
    args: {
        ...ChatMessageTemplate.args,
        direction: 'sent',
        status: 'read'
    }
};

export const SentFailed: Story = {
    ...ChatMessageTemplate,
    args: {
        ...ChatMessageTemplate.args,
        direction: 'sent',
        status: 'failed'
    }
};

export const Empty: Story = {
    render: () => {
        return (
            <ChatTextMessage body="" />
        );
    }
};

export const Multiple: Story = {
    render: (args) => {
        return (
            <ChatGroup user={''}>
                <ChatMessageTemplate.render {...args} />
                <ChatMessageTemplate.render {...args} />
                <ChatMessageTemplate.render {...args} />
            </ChatGroup>
        );
    }
};

const shortText = 'Lorem impsum dolor est';
const longText = 'Lorem ipsum odor amet, consectetuer adipiscing elit. Leo nulla fames tortor; luctus nunc pellentesque commodo. Dapibus nam fusce taciti netus platea montes convallis hac. Cursus in pellentesque nec, efficitur mi blandit neque. Eros accumsan amet sollicitudin libero efficitur pharetra elementum. Nisl dictumst ornare metus ante rhoncus ultricies fermentum. Ultrices ullamcorper torquent nibh, condimentum imperdiet nisi semper sollicitudin.';

const User = () => <Avatar color="#ecf0f1" backgroundColor="#e74c3c" src="https://nimbox.com/wp-content/uploads/2021/02/person-04.jpg">KE</Avatar>;

export const KitchenSink: Story = {
    render: (args) => {
        return (
            <div className="h-96">
                <ChatMessageList className="pb-4">
                    <ChatGroup user={<User />} direction='received'>
                        <ChatTextMessage {...args} body={shortText} />
                        <ChatTextMessage {...args} body={shortText} />
                        <ChatTextMessage {...args} body={longText} />
                    </ChatGroup>
                    <ChatGroup user={<User />} direction='sent'>
                        <ChatTextMessage {...args} body={shortText} />
                        <ChatTextMessage {...args} body={longText} />
                    </ChatGroup>
                </ChatMessageList>
                <div className="flex flex-row items-center gap-2 bg-orange-50 p-4">
                    <Input defaultValue="Enabled" variant="filled" />
                    <Button semantic="primary" rounded={true}><SendIcon /></Button>
                </div>
            </div>
        );
    }
};
