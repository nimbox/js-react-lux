import type { Meta, StoryObj } from '@storybook/react';
import { Close } from './Close';
import { fn } from '@storybook/test';


// Definition

const meta: Meta<typeof Close> = {
    component: Close,
    args: { onClick: fn() }
};

export default meta;
type Story = StoryObj<typeof Close>;

// Stories

export const Primary: Story = {
    render: ({ onClick }) => {
        return (
            <div>
                <Close onClick={onClick} />
            </div>
        );
    }
};
