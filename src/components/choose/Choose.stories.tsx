/* eslint-disable import/no-anonymous-default-export */
import { action } from '@storybook/addon-actions';
import { useEffect } from '@storybook/addons';
import React, { forwardRef, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSearchMatcher } from '../../utilities/createSearchMatcher';
import { Button } from '../Button';
import { Input } from '../inputs/Input';
import { Choose, ChooseProps } from './Choose';
import { ControlledInputTemplate, HookFormInputTemplate, UncontrolledInputTemplate } from '../../templates/InputTemplate';


export default {
    title: 'Components/Choose/Choose',
    component: Choose,
    parameters: {
        layout: 'centered'
    }
};

interface Option {
    value: string;
    name: string;
}

interface Group {
    name: string;
    options: Option[];
}

const colors: Group[] = [
    {
        name: 'Primary', options: [
            { value: 'ffff00', name: 'Yellow' },
            { value: '0000ff', name: 'Blue' },
            { value: 'ff0000', name: 'Red' }
        ]
    },
    {
        name: 'Secondary', options: [
            { value: '00ff00', name: 'Green' },
            { value: '800080', name: 'Purple' },
            { value: 'ffa500', name: 'Orange' }
        ]
    }
];

const extractor = (group: Group): Option[] => group.options;
const identifier = (color: Option) => color.value;

const chooser = async (value?: string | ReadonlyArray<string> | number | undefined) => {
    // await new Promise(resolve => setTimeout(() => resolve(undefined), 2000));
    const option = colors.map(group => extractor(group).find(o => identifier(o) === value)).find(o => o != null);
    return option;
};

const supplier = async (query?: string) => {
    // await new Promise(resolve => setTimeout(() => resolve(undefined), 2000));
    if (query == null || query.trim() === '') {
        return colors;
    } else {
        const matcher = createSearchMatcher(query.trim());
        return [
            { ...colors[0], options: colors[0].options.filter(o => matcher(o.name)) },
            { ...colors[1], options: colors[1].options.filter(o => matcher(o.name)) }
        ];
    }
};

//
// Stories
//

export const Default = () => {

    const [value, setValue] = useState('800080');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setValue(e.target.value); action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); action('onSubmit')(value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center space-x-2">
            <Input className="w-4" />
            <Choose

                supplier={supplier}
                extractor={extractor}
                identifier={identifier}

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

};

const Template = forwardRef<
    HTMLInputElement,
    Partial<ChooseProps<Option, Group>> & React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {

    return (
        <Choose

            ref={ref}

            chooser={chooser}
            supplier={supplier}
            extractor={extractor}
            identifier={identifier}

            renderEmpty={() => 'No options'}
            renderGroupLabel={({ group }) => <span>{group.name}</span>}
            renderOption={({ option }) => <span className="lux-px-2em italic">{option.name}</span>}
            renderChosen={({ option }) => <span>{option.name}</span>}

            {...props}

        />
    );

});


export const Controlled = ControlledInputTemplate({ initial: '800080', forced: 'ffa500', component: Template }).bind({});
export const Uncontrolled = UncontrolledInputTemplate({ initial: '800080', forced: 'ffa500', component: Template }).bind({});
export const HookForm = HookFormInputTemplate({ initial: '800080', forced: 'ffa500', component: Template }).bind({});
export const HookFormWithSearch = HookFormInputTemplate({ initial: '800080', forced: 'ffa500', component: Template }).bind({});
HookFormWithSearch.args = { withSearch: true };


export const ReactHookFormReset = () => {

    const { register, reset, handleSubmit } = useForm();
    useEffect(() => { reset({ color: '0000ff' }); }, [reset]);
    const handleFormSubmit = (data: any) => { action('onSubmit')(data); }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-96 flex flex-row items-center space-x-2">
            <Template {...register('color')} />
            <Button>Submit</Button>
        </form>
    );

};

export const Disabled = () => {

    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); action('onSubmit')(ref.current?.value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center space-x-2">
            <Template
                ref={ref}
                disabled={true}
                defaultValue="800080"
                onChange={handleChange}
            />
            <Button>Submit</Button>
        </form>
    );

};

export const Error = () => {

    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); action('onSubmit')(ref.current?.value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center space-x-2">
            <Template
                ref={ref}
                error={true}
                defaultValue="800080"
                onChange={handleChange}
            />
            <Button>Submit</Button>
        </form>
    );

};


export const Placeholder = () => {

    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); action('onSubmit')(ref.current?.value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center space-x-2">
            <Template
                ref={ref}
                onChange={handleChange}
                placeholder="Choose a color"
            />
            <Button>Submit</Button>
        </form>
    );

};

export const PlaceholderDisabled = () => {

    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); action('onSubmit')(ref.current?.value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center space-x-2">
            <Template
                ref={ref}
                disabled={true}
                onChange={handleChange}
                placeholder="Choose a color"
            />
            <Button>Submit</Button>
        </form>
    );

};

export const PlaceholderError = () => {

    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); action('onSubmit')(ref.current?.value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center space-x-2">
            <Template
                ref={ref}
                error={true}
                onChange={handleChange}
                placeholder="Choose a color"
            />
            <Button>Submit</Button>
        </form>
    );

};
