import type { Meta, StoryObj } from '@storybook/react-vite';
import { MessageSeparator } from './MessageSeparator';


const meta: Meta<typeof MessageSeparator> = {
    component: MessageSeparator,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        showLine: {
            control: 'boolean',
            description: 'Whether to show horizontal lines on either side'
        },
        children: {
            control: 'text',
            description: 'Custom content to display'
        }
    }
};

export default meta;
type Story = StoryObj<typeof MessageSeparator>;

export const Default: Story = {
    args: {
        children: <MessageSeparator.Pill>Today</MessageSeparator.Pill>
    }
};

export const WithCustomContent: Story = {
    args: {
        children: <MessageSeparator.Pill>Yesterday</MessageSeparator.Pill>
    }
};

export const WithoutLines: Story = {
    args: {
        children: <MessageSeparator.Pill>Last Monday</MessageSeparator.Pill>,
        showLine: false
    }
};

export const CustomPill: Story = {
    args: {
        children: (
            <MessageSeparator.Pill className="bg-blue-100 text-blue-800 border-blue-200">
                Custom Styled Pill
            </MessageSeparator.Pill>
        )
    }
};

export const MultiplePills: Story = {
    args: {
        children: (
            <>
                <MessageSeparator.Pill>Today</MessageSeparator.Pill>
                <MessageSeparator.Pill className="ml-2 bg-green-100 text-green-800 border-green-200">
                    New
                </MessageSeparator.Pill>
            </>
        )
    }
};
