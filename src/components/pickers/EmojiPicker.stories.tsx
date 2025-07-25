import type { Meta, StoryObj } from '@storybook/react';
import { EmojiPicker } from './EmojiPicker';


// Definition

const meta: Meta<typeof EmojiPicker> = {
    component: EmojiPicker,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs'],
    argTypes: {
        onSelect: { action: 'emoji selected' }
    }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories

export const Default: Story = {
    args: {}
};

export const CompactForm: Story = {
    args: {
        defaultExpanded: false
    }
};

export const FullForm: Story = {
    args: {
        defaultExpanded: true
    }
};
