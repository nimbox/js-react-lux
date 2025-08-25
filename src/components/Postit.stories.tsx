import type { Meta, StoryObj } from '@storybook/react-vite';
import { Postit } from './Postit';


// Definition

const meta: Meta<typeof Postit> = {
    component: Postit,
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
        className: 'p-4 w-full'
    }
};

// Stories

export const Basic: Story = {
    ...PostitTemplate
};

export const Empty: Story = {
    render: () => {
        return (
            <Postit />
        );
    }
};

export const MultipleWidths: Story = {
    render: () => {
        return (
            <div className="grid grid-cols-1 gap-2">
                <Postit className="p-4 w-1/4">The content</Postit>
                <Postit className="p-4 w-2/4">The content</Postit>
                <Postit className="p-4 w-3/4">The content</Postit>
                <Postit className="p-4 w-4/4">The content</Postit>
            </div>
        );
    }
};
