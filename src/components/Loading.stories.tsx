import type { Meta, StoryObj } from '@storybook/react';
import { Loading } from './Loading';


// Definition

const meta: Meta<typeof Loading> = {
    component: Loading,
    argTypes: {
        className: {
            control: 'select',
            options: ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-4xl']
        }
    }
};

export default meta;
type Story = StoryObj<typeof Loading>;

// Templates

const LoadingTemplate: Story = {
    render: (args) => {
        return (
            <div className="space-x-4">
                <Loading {...args} />
            </div>
        );
    }
};

// Stories

export const Base: Story = {
    ...LoadingTemplate,
    args: {
        className: 'text-base'
    }
};

export const Small: Story = {
    ...LoadingTemplate,
    args: {
        className: 'text-sm'
    }
};

export const Large: Story = {
    ...LoadingTemplate,
    args: {
        className: 'text-lg'
    }
};

export const ExtraLarge: Story = {
    ...LoadingTemplate,
    args: {
        className: 'text-xl'
    }
};

export const ExtraLarge4: Story = {
    ...LoadingTemplate,
    args: {
        className: 'text-4xl'
    }
};
