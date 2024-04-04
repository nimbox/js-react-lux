import type { Meta, StoryObj } from '@storybook/react';
import { ControlledTemplate, HookFormTemplate, UncontrolledTemplate } from '../../templates/InputTemplates';
import { DatePicker } from './DatePicker';


// Definition

const meta: Meta<typeof DatePicker> = {
    component: DatePicker,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

// Stories

export const Controlled: Story = {
    render: (args) => <ControlledTemplate component={DatePicker} componentProps={args} initial="19-12-1967" forced="02-02-2022" />
};

export const Uncontrolled: Story = {
    render: (args) => <UncontrolledTemplate component={DatePicker} componentProps={args} initial="19-12-1967" forced="02-02-2022" />
};

export const HookForm: Story = {
    render: (args) => <HookFormTemplate component={DatePicker} componentProps={args} initial="19-12-1967" forced="02-02-2022" />
};
