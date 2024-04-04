import type { Meta, StoryObj } from '@storybook/react';
import { ControlledTemplate, HookFormTemplate, UncontrolledTemplate } from '../../templates/InputTemplates';
import { TimePicker } from './TimePicker';


// Definition

const meta: Meta<typeof TimePicker> = {
    component: TimePicker,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof TimePicker>;

// Stories

export const Controlled: Story = {
    render: (args) => <ControlledTemplate component={TimePicker} componentProps={args} initial="8:30am" forced="2:45pm" />
};

export const Uncontrolled: Story = {
    render: (args) => <UncontrolledTemplate component={TimePicker} componentProps={args} initial="8:30am" forced="2:45pm" />
};

export const HookForm: Story = {
    render: (args) => <HookFormTemplate component={TimePicker} componentProps={args} initial="8:30am" forced="2:45pm" />
};
