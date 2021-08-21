/* eslint-disable import/no-anonymous-default-export */
import { action } from "@storybook/addon-actions";
import React, { useRef, useState } from 'react';
import '../../index.css';
import { Button } from "../Buttons";
import { TimePicker } from './TimePicker';


export default {
    title: 'Component/Picker/TimePicker',
    parameters: {
        layout: 'centered'
    }
};


export const Controlled = () => {

    const [time, setTime] = useState('08:30am');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setTime(e.target.value); action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(time); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row space-x-2">
            <TimePicker name="date" value={time} onChange={handleChange} placeholder="Enter date"/>
            <Button>Submit</Button>
        </form>
    );

};

export const Uncontrolled = () => {

    const ref = useRef<any>();
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(ref.current.value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row space-x-2">
            <TimePicker name="time" ref={ref} defaultValue='08:30am' />
            <Button>Submit</Button>
        </form>
    );

};
