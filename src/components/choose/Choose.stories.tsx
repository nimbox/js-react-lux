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
