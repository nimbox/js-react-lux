import { PhoneIcon } from '@nimbox/icons-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { BoundingBoxSpacing as BoundingBoxSpacingCheck } from '../../../stories/utilities/BoundingBoxSpacing';
import { centered } from '../stories/decorators';
import { ChatActionButton } from './ChatActionButton';


const meta = {
    title: 'Chat/Atoms/ChatActionButton',
    component: ChatActionButton,
    decorators: [centered],
    tags: ['autodocs']
} satisfies Meta<typeof ChatActionButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// Stories

export const Default: Story = {
    args: {
        children: 'Visit website',
        href: 'https://www.example.com',
        external: true
    }
};

export const BoundingBoxSpacing: Story = {
    args: {
        children: 'Visit website',
        href: 'https://www.example.com',
        external: true
    },
    render: () => (
        <BoundingBoxSpacingCheck>
            <ChatActionButton href="https://www.example.com" external>
                Visit website
            </ChatActionButton>
        </BoundingBoxSpacingCheck>
    )
};

export const WithIcon: Story = {
    args: {
        children: 'Call us',
        href: 'tel:+15551234567',
        icon: <PhoneIcon />
    }
};

export const Button: Story = {
    args: {
        children: 'Reply',
        onClick: () => {}
    }
};

export const Plain: Story = {
    args: {
        children: 'No action'
    }
};

export const Truncated: Story = {
    args: {
        children: 'A very long call-to-action label that does not fit',
        href: 'https://www.example.com',
        external: true,
        icon: <PhoneIcon />
    },
    render: (args) => (
        <div className="w-56">
            <ChatActionButton {...args} />
        </div>
    )
};
