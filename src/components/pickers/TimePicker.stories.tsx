/* eslint-disable import/no-anonymous-default-export */
import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { useRef, useState } from 'react';
import { Button } from '../Button';
import { TimePicker, TimePickerProps } from './TimePicker';


export default {
    title: 'Components/Pickers/TimePicker',
    component: TimePicker,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof TimePicker>;


const ControlledTemplate = (props: TimePickerProps) => {

    const [time, setTime] = useState('08:30am');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setTime(e.target.value); action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(time); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center gap-x-2">
            <TimePicker {...props} value={time} onChange={handleChange} />
            <Button>Submit</Button>
        </form>
    );

};

const UncontrolledTemplate = (props: TimePickerProps) => {

    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(ref.current!.value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center gap-x-2">
            <TimePicker {...props} ref={ref} defaultValue="08:30am" onChange={handleChange} />
            <Button>Submit</Button>
        </form>
    );

};

export const Default: ComponentStory<typeof TimePicker> = UncontrolledTemplate.bind({});
Default.args = {};

export const Controlled = ControlledTemplate.bind({});

export const Uncontrolled = UncontrolledTemplate.bind({});
