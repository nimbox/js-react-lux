import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { ControlledTemplate, HookFormTemplate, UncontrolledTemplate } from '../../templates/InputTemplates';
import { Button } from '../Button';
import { Input } from '../inputs/Input';
import { Choose, ChooseProps } from './Choose';
import * as data from './data';
import { CircleIcon, SquareIcon } from '../../icons/components';


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
