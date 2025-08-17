import { Meta, StoryObj } from '@storybook/react-vite';
import { EditableText } from './EditableText';
import { action } from 'storybook/actions';
import { useState } from 'react';


const meta: Meta<typeof EditableText> = {
    component: EditableText,
    tags: ['autodocs'],
    argTypes: {
        onChange: { action: 'changed' }
    },
    render: (args) => {

        const [value, setValue] = useState(args.value);
        const handleChange = async (newText: string) => {
            try {
                await args.onChange(newText, value);
                setValue(newText);
            } catch (error) {
                setValue(args.value);
            }
        };

        return (
            <div>
                <div>Line before</div>
                <div>
                    Before <EditableText {...args} value={value} onChange={handleChange} /> After
                </div>
                <div>Line after</div>
            </div>

        );

    }
};

export default meta;
type Story = StoryObj<typeof EditableText>;

export const Default: Story = {
    args: {
        value: 'Click to edit me'
    }
};

export const WithLoadingResolved: Story = {
    args: {
        value: 'Click to edit with loading',
        onChange: async (newText, oldText) => {
            action('dispatching change')(newText, oldText);
            await new Promise((resolve) => setTimeout(resolve, 4000));
            action('changed')(newText, oldText);
        }
    }
};

export const WithLoadingRejected: Story = {
    args: {
        value: 'Click to edit with loading and rejection',
        onChange: async (newText, oldText) => {
            action('dispatching change')(newText, oldText);
            await new Promise((_, reject) => setTimeout(() => reject(new Error('Update failed')), 4000));
            action('changed')(newText, oldText);
        }
    }
};
