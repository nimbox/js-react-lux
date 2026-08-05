import { CircleIcon } from '@nimbox/icons-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlledTemplate, HookFormTemplate, UncontrolledTemplate } from '../../templates/InputTemplates';
import { TimePicker1 } from './TimePicker1';


// Definition

const meta: Meta<typeof TimePicker1> = {

    component: TimePicker1,
    parameters: {
        layout: 'centered',
        // The component's props are intersected with every attribute of an
        // html input, so name the ones worth playing with.
        controls: {
            include: [
                'label', 'placeholder', 'variant', 'end',
                'disabled', 'error', 'withoutFullWidth',
                'withClear',
                'defaultValue',
                'minuteStep', 'dayStartHour', 'dayEndHour', 'withKeepOpen'
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
            options: ['clock', 'none', 'other'],
            mapping: { clock: undefined, none: null, other: <CircleIcon /> },
            description: 'Left out the field carries a clock, `null` leaves it bare.'
        },
        minuteStep: {
            control: 'select',
            options: [5, 10, 15, 20, 30]
        },
        dayStartHour: {
            control: { type: 'range', min: 0, max: 23, step: 1 }
        },
        dayEndHour: {
            control: { type: 'range', min: 1, max: 24, step: 1 }
        }
    },

    // `defaultValue` stays out of here: the controlled template passes
    // `value`, and an input given both warns.

    args: {
        label: 'Time'
    }

};

export default meta;
type Story = StoryObj<typeof meta>;

// Stories

export const Default: Story = {
    args: { defaultValue: '8:30am' }
};

/**
 * The cross only shows once there is a time to clear, so empty the field and
 * it goes away rather than sitting there offering a press that does nothing.
 */
export const WithClear: Story = {
    args: { defaultValue: '8:30am', withClear: true }
};

export const FitContent: Story = {
    args: { defaultValue: '8:30am', withoutFullWidth: true }
};

export const FitContentEmpty: Story = {
    args: { placeholder: 'hh:mm', withoutFullWidth: true }
};

export const HalfHours: Story = {
    args: { defaultValue: '8:30am', minuteStep: 30 }
};

export const Controlled: Story = {
    render: (args) => <ControlledTemplate component={TimePicker1} componentProps={args} initial="8:30am" forced="2:45pm" />
};

export const Uncontrolled: Story = {
    render: (args) => <UncontrolledTemplate component={TimePicker1} componentProps={args} initial="8:30am" forced="2:45pm" />
};

export const HookForm: Story = {
    render: (args) => <HookFormTemplate component={TimePicker1} componentProps={args} initial="8:30am" forced="2:45pm" />
};
