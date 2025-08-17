import { action } from 'storybook/actions';
import type { Meta, StoryObj } from '@storybook/react-vite';
import React, { useRef } from 'react';
import { CircleIcon, SquareIcon } from '../../icons/components';
import { ControlledTemplate, HookFormTemplate, UncontrolledTemplate } from '../../templates/InputTemplates';
import { Button } from '../Button';
import * as data from '../choose/data';
import { Autocomplete, AutocompleteProps } from './Autocomplete';

// Definition

const meta: Meta<typeof Autocomplete> = {
    component: Autocomplete,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof Autocomplete<data.Option, data.Group>>;

const strinfigy = ({ option }: { option: data.Option }) => option.name;


// Template

type TemplateProps = Partial<AutocompleteProps<data.Option, data.Group>>;
const Template = React.forwardRef<
    HTMLInputElement,
    TemplateProps & React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {

    return (
        <Autocomplete

            ref={ref}

            supplier={data.supplier}
            extractor={data.extractor}

            withArrow={true}
            withSameWidth={true}

            renderEmpty={() => 'No options'}
            renderGroupLabel={({ group }) => <span>{group.name}</span>}
            renderOption={({ option }) => <span className="lux-px-2em italic">{option.name}</span>}

            renderChosen={strinfigy}

            {...props}

        />
    );

});

const AutocompleteTemplate: Story = {
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

        return (
            <Autocomplete

                supplier={data.supplier}
                extractor={data.extractor}

                defaultValue="Hello"

                withArrow={true}
                withSameWidth={true}

                renderEmpty={() => 'No options'}
                renderGroupLabel={({ group }) => <span>{group.name}</span>}
                renderOption={({ option }) => <span className="lux-px-2em italic">{option.name}</span>}

                renderChosen={strinfigy}

            />
        );

    }
};

// Stories

export const Controlled: Story = {
    render: (args) => <ControlledTemplate component={Template} componentProps={args} initial="800080" forced="ffa500" />
};

export const Uncontrolled: Story = {
    render: (args) => <UncontrolledTemplate component={Template} componentProps={args} initial="800080" forced="ffa500" />
};

export const HookForm: Story = {
    render: (args) => <HookFormTemplate component={Template} componentProps={args} initial="800080" forced="ffa500" />
};

export const Disabled: Story = {
    ...AutocompleteTemplate,
    args: {
        disabled: true
    }
};

export const Error: Story = {
    ...AutocompleteTemplate,
    args: {
        error: true
    }
};

export const Placeholder: Story = {
    ...AutocompleteTemplate,
    args: {
        defaultValue: '',
        placeholder: 'Select color'
    }
};

export const PlaceholderDisabled: Story = {
    ...AutocompleteTemplate,
    args: {
        disabled: true,
        defaultValue: '',
        placeholder: 'Select color'
    }
};

export const PlaceholderError: Story = {
    ...AutocompleteTemplate,
    args: {
        error: true,
        defaultValue: '',
        placeholder: 'Select color'
    }
};

export const Adornment: Story = {
    ...AutocompleteTemplate,
    args: {
        start: <SquareIcon style={{ marginLeft: '0.5em' }} />,
        end: <CircleIcon style={{ marginRight: '0.5em' }} />,
        placeholder: 'Select color'
    }
};
