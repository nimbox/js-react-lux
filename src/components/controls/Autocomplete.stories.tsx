/* eslint-disable import/no-anonymous-default-export */
import { action } from '@storybook/addon-actions';
import React, { useRef, useState } from 'react';
import { CircleIcon, SquareIcon } from '../../icons/components';
import { createSearchMatcher } from '../../utilities/createSearchMatcher';
import { Button } from '../Buttons';
import { Autocomplete, AutocompleteProps } from './Autocomplete';


export default {
    title: 'Component/Controls/Autocomplete',
    component: Autocomplete,
    parameters: {
        layout: 'centered'
    }
}

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

const strinfigy = ({ option }: { option: Option }) => option.name;

const provider = async (query?: string) => {
    // await new Promise(resolve => setTimeout(() => resolve(undefined), 2000));
    if (query == null || query.trim() === '') {
        return [];
    } else {
        const matcher = createSearchMatcher(query.trim());
        return [
            { ...colors[0], options: colors[0].options.filter(o => matcher(o.name)) },
            { ...colors[1], options: colors[1].options.filter(o => matcher(o.name)) }
        ];
    }
};

export const Default = () => {

    return (
        <Autocomplete

            supplier={provider}
            extractor={extractor}

            defaultValue="Hello"

            withArrow={true}
            withSameWidth={true}

            renderEmpty={() => 'No options'}
            renderGroupLabel={({ group }) => <span>{group.name}</span>}
            renderOption={({ option }) => <span className="lux-px-2em italic">{option.name}</span>}

            renderChosen={strinfigy}

        />
    );

};

const Template = React.forwardRef<
    HTMLInputElement,
    Partial<AutocompleteProps<Option, Group>> & React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {

    return (
        <Autocomplete

            ref={ref}

            supplier={provider}
            extractor={extractor}

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

//
// Stories
//

export const Controlled = () => {

    const [value, setValue] = useState('800080');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setValue(e.target.value); action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); action('onSubmit')(value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center space-x-2">
            <Template
                value={value}
                onChange={handleChange}
            />
            <Button>Submit</Button>
        </form>
    );

};

export const Uncontrolled = () => {

    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); action('onSubmit')(ref.current?.value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center space-x-2">
            <Template
                ref={ref}
                defaultValue="800080"
                onChange={handleChange}
            />
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
                defaultValue=""
                onChange={handleChange}
                placeholder="Select color"
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
                defaultValue=""
                onChange={handleChange}
                placeholder="Select color"
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
                defaultValue=""
                onChange={handleChange}
                placeholder="Select color"
            />
            <Button>Submit</Button>
        </form>
    );

};

export const Adornment = () => {

    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); action('onSubmit')(ref.current?.value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center space-x-2">
            <Template
                ref={ref}
                defaultValue="800080"
                onChange={handleChange}
                start={<SquareIcon style={{ marginLeft: '0.5em' }} />}
                end={<CircleIcon style={{ marginRight: '0.5em' }} />}
                placeholder="Select color"
            />
            <Button>Submit</Button>
        </form>
    );

};

export const Focus = () => {

    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); action('onSubmit')(ref.current?.value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center space-x-2">
            <Template
                ref={ref}
                defaultValue="800080"
                onChange={handleChange}
            />
            <Button type="button" onClick={() => ref.current?.focus()}>Focus</Button>
        </form>
    );

};

export const SetValue = () => {

    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); action('onSubmit')(ref.current?.value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center space-x-2">
            <Template
                ref={ref}
                defaultValue="800080"
                onChange={handleChange}
            />
            <Button type="button" onClick={() => ref.current!.value = 'Yellow'}>Set</Button>
        </form>
    );

};
