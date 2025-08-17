import { Meta, StoryObj } from '@storybook/react-vite';
import { ControlledTemplate, HookFormTemplate, UncontrolledTemplate } from '../../templates/InputTemplates';
import { Input } from './Input';


// Definition

const meta: Meta<typeof Input> = {
    component: Input,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof Input>;

// Templates

const InputTemplate: Story = {
    render: (args) => {
        return (
            <div className="flex flex-row justify-between items-baseline gap-4 ">
                <Input variant="filled" {...args} />
                <Input variant="outlined" {...args} />
                <Input variant="inlined" {...args} />
                <Input variant="plain" {...args} />
            </div>
        );
    }
};

// Stories

export const Primary: Story = {
    args: {
        variant: 'outlined',
        label: 'Label'
    }
};

export const All: Story = {
    ...InputTemplate,
    args: {
        defaultValue: 'Enabled'
    }
};

export const Disabled: Story = {
    ...InputTemplate,
    args: {
        defaultValue: 'Disabled',
        disabled: true
    }
};

export const Controlled: Story = {
    render: (args) => <ControlledTemplate component={Input} componentProps={args} initial="Hello" forced="Bye" />
};

export const Uncontrolled: Story = {
    render: (args) => <UncontrolledTemplate component={Input} componentProps={args} initial="Hello" forced="Bye" />
};

export const HookForm: Story = {
    render: (args) => <HookFormTemplate component={Input} componentProps={args} initial="Hello" forced="Bye" />
};
