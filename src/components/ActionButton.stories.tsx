import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { ActionButton } from './ActionButton';
import { Button } from './Button';


const meta: Meta<typeof ActionButton> = {
    component: ActionButton,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof ActionButton>;

export const Primary: Story = {
    args: {
        popperClassName: 'p-2 min-w-[160px]',
        children: (close) => (
            <>
                <Button
                    variant="text"
                    onClick={close(action('edit clicked'))}
                    className="w-full text-left px-4 py-2"
                >
                    Edit
                </Button>
                <Button
                    variant="text"
                    onClick={close(action('delete clicked'))}
                    className="w-full text-left px-4 py-2"
                >
                    Delete
                </Button>
            </>
        )
    }
}; 