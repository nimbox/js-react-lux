import type { Meta, StoryObj } from '@storybook/react-vite';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import { action } from 'storybook/actions';
import { CircleIcon, SquareIcon } from '@nimbox/icons-react';
import { ControlledTemplate, HookFormTemplate, UncontrolledTemplate } from '../../templates/InputTemplates';
import { Button } from '../Button';
import { Input } from '../inputs/Input';
import { Choose, type ChooseProps } from './Choose';
import * as data from './data';


// Definition

const meta: Meta<typeof Choose> = {
    component: Choose,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof Choose<data.Option, data.Group>>;

// Templates

type TemplateProps = Partial<ChooseProps<data.Option, data.Group>>;
const Template = forwardRef<
    HTMLInputElement,
    TemplateProps & React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {

    return (
        <Choose

            ref={ref}

            chooser={data.chooser}
            supplier={data.supplier}
            extractor={data.extractor}
            identifier={data.identifier}

            renderEmpty={() => 'No options'}
            renderGroupLabel={({ group }) => <span>{group.name}</span>}
            renderOption={({ option }) => <span className="lux-px-2em italic">{option.name}</span>}
            renderChosen={({ option }) => <span>{option.name}</span>}

            {...props}

        />
    );

});

const ChooseTemplate: Story = {
    render: (args) => {

        const ref = useRef<HTMLInputElement>(null);
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); };
        const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); action('onSubmit')(ref.current?.value); };

        return (
            <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center space-x-2">
                <Template
                    {...args}
                    ref={ref}
                    onChange={handleChange}
                />
                <Button className="flex-none">Submit</Button>
            </form>
        );

    },
    args: {
        defaultValue: '800080'
    }
};

// Stories

export const Primary: Story = {
    render: () => {

        const [value, setValue] = useState('800080');
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setValue(e.target.value); action('onChange')(e.target.value); };
        const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); action('onSubmit')(value); };

        return (
            <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center space-x-2">
                <Input className="w-4" />
                <Choose

                    supplier={data.supplier}
                    extractor={data.extractor}
                    identifier={data.identifier}

                    value={value}
                    onChange={handleChange}

                    renderEmpty={() => 'No options'}
                    renderGroupLabel={({ group }) => <span>{group.name}</span>}
                    renderOption={({ option }) => <span className="lux-px-2em italic">{option.name}</span>}
                    renderChosen={({ option }) => <span>{option.name}</span>}

                    fieldClassName="w-52"

                />
                <Input className="w-4" />
                <Button>Submit</Button>
            </form>

        );

    }
};

export const Controlled: Story = {
    render: (args) => <ControlledTemplate component={Template} componentProps={args} initial="800080" forced="ffa500" />
};

export const Uncontrolled: Story = {
    render: (args) => <UncontrolledTemplate component={Template} componentProps={args} initial="800080" forced="ffa500" />
};

export const HookForm: Story = {
    render: (args) => <HookFormTemplate component={Template} componentProps={args} initial="800080" forced="ffa500" />
};

export const HookFormWithSearch: Story = {
    render: (args) => <ControlledTemplate component={Template} componentProps={args} initial="800080" forced="ffa500" />,
    args: {
        withSearch: true
    }
};

export const HookFormReset: Story = {
    render: () => {

        const { register, reset, handleSubmit } = useForm();
        useEffect(() => { reset({ color: '0000ff' }); }, [reset]);
        const handleFormSubmit: SubmitHandler<FieldValues> = (data) => { action('onSubmit')(data); };

        return (
            <form onSubmit={handleSubmit(handleFormSubmit)} className="w-96 flex flex-row items-center space-x-2">
                <Template {...register('color')} />
                <Button>Submit</Button>
            </form>
        );

    }
};

export const Disabled: Story = {
    ...ChooseTemplate,
    args: {
        disabled: true
    }
};

export const Error: Story = {
    ...ChooseTemplate,
    args: {
        error: true
    }
};

export const Placeholder: Story = {
    ...ChooseTemplate,
    args: {
        placeholder: 'Choose a color'
    }
};

export const PlaceholderDisabled: Story = {
    ...ChooseTemplate,
    args: {
        disabled: true,
        placeholder: 'Choose a color'
    }
};

export const PlaceholderError: Story = {
    ...ChooseTemplate,
    args: {
        error: true,
        placeholder: 'Choose a color'
    }
};

export const Adornment: Story = {
    ...ChooseTemplate,
    args: {
        start: <SquareIcon style={{ marginLeft: '0.5em' }} />,
        end: <CircleIcon style={{ marginRight: '0.5em' }} />,
        placeholder: 'Select color'
    }
};

/**
 * `withClear` — the cross beside the chevron that empties the chosen value.
 *
 * Worth a story of its own because there had not been one: `withClear` is off
 * by default and was switched on nowhere in the codebase, so the control had
 * never actually been pressed. It was broken. Clearing ran on `click` and
 * stopped propagation, which keeps the click off the field but does nothing
 * about focus — and focus lands on `mousedown`, before that click exists, and
 * the field opens its list `onFocus`. So clearing emptied the value and
 * reopened the list on it in the same gesture.
 *
 * **What to check:** press the cross. The value empties, the placeholder comes
 * back, and the list stays shut. Then press the field itself and confirm it
 * still opens — the fix must not cost the field its ordinary click.
 *
 * And the other way round, which the above missed: open the list *first*, then
 * press the cross. It must close. Not opening a shut list and closing an open
 * one are two different things, and the mousedown handler only ever did the
 * first — so clearing from an open list used to leave it hanging there.
 */
export const WithClear: Story = {
    ...ChooseTemplate,
    args: {
        // Spelled out rather than inherited: a story about clearing needs
        // something to clear, and `args` here replaces the template's rather
        // than merging with it.
        ...ChooseTemplate.args,
        withClear: true,
        placeholder: 'Choose a color'
    }
};

/**
 * `withClear` on a *controlled* field whose value comes back late.
 *
 * The story above clears an uncontrolled field, and that always worked: the
 * clear empties `chosenOption` itself and nothing puts it back. Controlled is
 * where it broke, and only when the new value lags — which is the ordinary case
 * for a field that writes through to a server, since the value returns with the
 * answer rather than with the click.
 *
 * Two things went wrong in that gap. While the old value was still in force the
 * field re-resolved it and drew the old option again; then the empty value
 * arrived and matched nothing, and the settle step only ever *assigned* an
 * option it found — so the old one stayed on screen for good, contradicting the
 * value the field held. Reading `''` as "nothing chosen" is what fixes it.
 *
 * **What to check:** press the cross. The option may flicker back for the
 * length of the round trip, and then the placeholder must return and stay.
 */
export const WithClearControlledLate: Story = {
    render: (args) => {

        const [value, setValue] = useState('800080');

        // A write that answers half a second later, like a mutation would.
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const next = e.target.value;
            action('onChange')(next);
            setTimeout(() => setValue(next), 500);
        };

        return (
            <div className="w-96">
                <Template
                    {...args}
                    withClear
                    placeholder="Choose a color"
                    value={value}
                    onChange={handleChange}
                />
                <div className="lux-pt-2em text-muted">value: {value === '' ? '(empty)' : value}</div>
            </div>
        );

    }
};
