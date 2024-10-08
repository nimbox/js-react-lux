import type { Meta, StoryObj } from '@storybook/react';
import { Postit } from './Postit';


// Definition

const meta: Meta<typeof Postit> = {
    component: Postit
};

export default meta;
type Story = StoryObj<typeof Postit>;

// Templates

const PostitTemplate: Story = {
    render: (args) => {
        return (
            <Postit {...args} >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida gravida erat, sed sollicitudin elit consectetur ut. Nam fringilla posuere.</Postit>
        );
    },
    args: {
        className: 'w-1/4'
    }
};

// Stories

export const Basic: Story = {
    ...PostitTemplate
};

export const Empty: Story = {
    render: () => {
        return (
            <Postit className="w-1/5 py-0"></Postit>
        );
    }
};

export const MultipleWidths: Story = {
    render: () => {
        return (
            <div className="grid grid-cols-1 gap-2">
                <Postit className="postit w-1/4">The content</Postit>
                <Postit className="postit w-2/4">The content</Postit>
                <Postit className="postit w-3/4">The content</Postit>
                <Postit className="postit w-4/4">The content</Postit>
            </div>
        );
    }
};

export const ToSmall: Story = {
    render: () => {
        return (
            <Postit className="min-w-0 min-h-0 w-8 h-8"></Postit>
        );
    }
};