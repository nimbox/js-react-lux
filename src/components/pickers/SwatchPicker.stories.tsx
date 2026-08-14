import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlledTemplate, HookFormTemplate, UncontrolledTemplate } from '../../templates/InputTemplates';
import { SwatchPicker } from './SwatchPicker';


// Definition

const meta: Meta<typeof SwatchPicker> = {
    component: SwatchPicker,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof SwatchPicker>;

// Stories

export const Controlled: Story = {
    render: (args) => <ControlledTemplate component={SwatchPicker} componentProps={args} initial="#906090" forced="#EA9317" />
};

export const Uncontrolled: Story = {
    render: (args) => <UncontrolledTemplate component={SwatchPicker} componentProps={args} initial="#906090" forced="#EA9317" />
};

export const HookForm: Story = {
    render: (args) => <HookFormTemplate component={SwatchPicker} componentProps={args} initial="#906090" forced="#EA9317" />
};
