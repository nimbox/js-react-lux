/* eslint-disable import/no-anonymous-default-export */
import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { CircleIcon, SquareIcon } from '../../icons/components';
import { Button } from '../Button';
import { TextArea } from './TextArea';


// Definition

export default {
    title: 'Components/Inputs/TextArea',
    component: TextArea,
    parameters: {
        layout: 'centered',
    }
} as ComponentMeta<typeof TextArea>


const Template: ComponentStory<typeof TextArea> = ({ ...args }) => {
    const [value, setValue] = useState('Katniss');
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => { setValue(e.target.value); action('onChange')(e.target.value); }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(value); }
    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row gap-x-2 items-center">
            <TextArea type="text" value={value} onChange={handleChange} {...args} />
            <Button type="submit">Submit</Button>
        </form>
    );
};


// Default

export const Default = Template.bind({});
Default.args = {

    variant: 'outlined',

    label: 'Name',
    placeholder: 'Enter name',

};

//
// Stories
//

export const Controlled = () => {
    const [value, setValue] = useState('Katniss');
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => { setValue(e.target.value); action('onChange')(e.target.value); }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(value); }
    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center space-x-2">
            <TextArea type="text" value={value} onChange={handleChange} placeholder="Enter name" />
            <Button type="submit">Submit</Button>
        </form>
    );
};

export const Uncontrolled = () => {
    const ref = useRef<HTMLTextAreaElement>(null);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(ref.current?.value); }
    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center space-x-2">
            <TextArea type="text" ref={ref} defaultValue="Katniss" placeholder="Enter name" />
            <Button type="submit">Submit</Button>
        </form>
    );
};

export const Error = () => {
    return (
        <form className="w-96 flex flex-row items-center space-x-2">
            <TextArea type="text" error={true} defaultValue="" placeholder="Enter name" />
            <Button type="submit">Submit</Button>
        </form>
    );
};

export const Placeholder = () => {
    return (
        <form className="w-96 flex flex-row items-center space-x-2">
            <TextArea type="text" defaultValue="" placeholder="Enter name" />
            <Button type="submit">Submit</Button>
        </form>
    );
};

export const Adorned = () => {
    return (
        <form className="w-96 flex flex-row items-center space-x-2">
            <TextArea
                type="text"
                defaultValue=""
                start={<SquareIcon className="stroke-1" />}
                end={<CircleIcon className="stroke-1" />}
                placeholder="Enter name"
            />
            <Button type="submit">Submit</Button>
        </form>
    );
};