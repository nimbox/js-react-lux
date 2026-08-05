import { CircleIcon } from '@nimbox/icons-react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ControlledTemplate, HookFormTemplate, UncontrolledTemplate } from '../../templates/InputTemplates';
import { TimePicker } from './TimePicker';


// Definition

const meta: Meta<typeof TimePicker> = {

    component: TimePicker,
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
                'withKeepOpen'
            ]
        }
    },
    tags: ['autodocs'],

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

export const Controlled: Story = {
    render: (args) => <ControlledTemplate component={TimePicker} componentProps={args} initial="8:30am" forced="2:45pm" />
};

export const Uncontrolled: Story = {
    render: (args) => <UncontrolledTemplate component={TimePicker} componentProps={args} initial="8:30am" forced="2:45pm" />
};

export const HookForm: Story = {
    render: (args) => <HookFormTemplate component={TimePicker} componentProps={args} initial="8:30am" forced="2:45pm" />
};
