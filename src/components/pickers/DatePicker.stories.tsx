import { CircleIcon } from '@nimbox/icons-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlledTemplate, HookFormTemplate, UncontrolledTemplate } from '../../templates/InputTemplates';
import { DatePicker } from './DatePicker';


// Definition

const meta: Meta<typeof DatePicker> = {

    component: DatePicker,
    parameters: {
        layout: 'centered',
        // The component's props are intersected with every attribute of an
        // html input, so name the ones worth playing with.
        controls: {
            include: [
                'label', 'placeholder', 'variant', 'end',
                'disabled', 'error', 'withoutFullWidth',
                'defaultValue',
                'firstDayOfWeek', 'withShortcuts', 'withKeepOpen'
            ]
        }
    },
    tags: ['autodocs'],

    // A field fills its container, so give it one worth filling — otherwise
    // there is nothing to tell full width and fit content apart.

    decorators: [(Story) => <div className="w-96 border border-dashed border-content-border p-2"><Story /></div>],

    argTypes: {
        variant: {
            control: 'select',
            options: ['outlined', 'filled', 'inlined', 'plain']
        },
        end: {
            control: 'radio',
            options: ['calendar', 'none', 'other'],
            mapping: { calendar: undefined, none: null, other: <CircleIcon /> },
            description: 'Left out the field carries a calendar, `null` leaves it bare.'
        },
        firstDayOfWeek: {
            control: { type: 'range', min: 0, max: 6, step: 1 }
        }
    },

    // `defaultValue` stays out of here: the controlled template passes
    // `value`, and an input given both warns.

    args: {
        label: 'Date'
    }

};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories

export const Default: Story = {
    args: { defaultValue: '19-12-1967' }
};

export const FitContent: Story = {
    args: { defaultValue: '19-12-1967', withoutFullWidth: true }
};

export const FitContentEmpty: Story = {
    args: { placeholder: 'dd-mm-yyyy', withoutFullWidth: true }
};

export const Controlled: Story = {
    render: (args) => <ControlledTemplate component={DatePicker} componentProps={args} initial="19-12-1967" forced="02-02-2022" />
};

export const Uncontrolled: Story = {
    render: (args) => <UncontrolledTemplate component={DatePicker} componentProps={args} initial="19-12-1967" forced="02-02-2022" />
};

export const HookForm: Story = {
    render: (args) => <HookFormTemplate component={DatePicker} componentProps={args} initial="19-12-1967" forced="02-02-2022" />
};
