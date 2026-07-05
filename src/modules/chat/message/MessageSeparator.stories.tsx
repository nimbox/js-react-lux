import type { Meta, StoryObj } from '@storybook/react-vite';
import { MessageSeparator } from './MessageSeparator';


// The row divider `buildMessageRows` emits for a day change (`separator`) or the
// unread watermark (`marker`). Pure chrome — content-blind (§4).

const meta = {
    title: 'Chat/Message/Separator',
    component: MessageSeparator,
    parameters: { layout: 'padded' },
    tags: ['autodocs'],
    argTypes: {
        showLine: { control: 'boolean', description: 'Flanking horizontal rules' }
    }
} satisfies Meta<typeof MessageSeparator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DayDivider: Story = {
    args: { children: <MessageSeparator.Pill>January 15, 2024</MessageSeparator.Pill> }
};

export const UnreadMarker: Story = {
    args: { children: <MessageSeparator.Pill>New messages</MessageSeparator.Pill> }
};

export const WithoutLines: Story = {
    args: { showLine: false, children: <MessageSeparator.Pill>Today</MessageSeparator.Pill> }
};
