/* eslint-disable import/no-anonymous-default-export */
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { createControlledTemplate, createHookFormTemplate, createUncontrolledTemplate } from '../../templates/InputTemplate';
import { Input, InputProps } from './Input';


const meta: Meta<typeof Input> = {
    title: 'Components/Inputs/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    }
};
export default meta;
type Story = StoryObj<InputProps>;


export const Primary: Story = {
    args: {
        variant: 'outlined',
        label: 'Label',
    }
}

const InputTemplate: Story = {
    render: (args) => {
        return (
            <div className="flex flex-row justify-between">
                <div className="space-x-4">
                    <Input variant="filled" {...args} />
                    <Input variant="outlined" {...args} />
                    <Input variant="inlined" {...args} />
                    <Input variant="plain" {...args} />
                </div>
            </div>
        );
    }
};

export const All: Story = {
    ...InputTemplate,
    args: {
        defaultValue: 'Enabled',
    }
};

export const Disabled: Story = {
    ...InputTemplate,
    args: {
        defaultValue: 'Disabled',
        disabled: true,
    }
};

const ControlledTemplate = createControlledTemplate(Input, { initial: 'Hello', forced: 'Bye' });
export const Controlled: Story = {
    render: (args) => <ControlledTemplate {...args} />
};

const UncontrolledTemplate = createUncontrolledTemplate(Input, { initial: 'Hello', forced: 'Bye' });
export const Uncontrolled: Story = {
    render: (args) => <UncontrolledTemplate {...args} />
};

const HookFormTemplate = createHookFormTemplate(Input, { initial: 'Hello', forced: 'Bye' });
export const HookForm: Story = {
    render: (args) => <HookFormTemplate {...args} />
};
