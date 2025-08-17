import type { Meta, StoryObj } from '@storybook/react-vite';
import { FieldPopper } from './FieldPopper';


// Definition

const meta: Meta<typeof FieldPopper> = {
    component: FieldPopper,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof FieldPopper>;

// Templates

const FieldPopperTemplate: Story = {
    render: (args) => {
        return (
            <FieldPopper {...args} />
        );
    }
};

// Story

export const Primary: Story = {
    ...FieldPopperTemplate
};
