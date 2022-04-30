/* eslint-disable import/no-anonymous-default-export */
import { action } from '@storybook/addon-actions';
import React, { useRef, useState } from 'react';
import { Button } from '../..';
import { DatePicker, DatePickerProps } from './DatePicker';


export default {
    title: 'Components/Pickers/DatePicker',
    component: DatePicker,
    parameters: {
        layout: 'centered'
    }
};

export const Template = ({ firstDayOfWeek, withShortcuts, placement, error, popperClassName }: DatePickerProps) => {
    return (
        <div className="w-96">
            <DatePicker defaultValue="12-19-1967" firstDayOfWeek={firstDayOfWeek} withShortcuts={withShortcuts} error={error} placement={placement} popperClassName={popperClassName} placeholder="Select date" />
        </div>
    );
};
Template.args = {
    error: false,
    firstDayOfWeek: 0,
    withShortcuts: false,
    placement: 'bottom-start'
};

export const Controlled = () => {

    const [date, setDate] = useState('19-12-1967');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setDate(e.target.value); action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(date); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row space-x-2">
            <DatePicker name="date" value={date} onChange={handleChange} placeholder="Enter date" />
            <Button>Submit</Button>
        </form>
    );

};

export const Uncontrolled = () => {

    const ref = useRef<HTMLInputElement>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(ref.current!.value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row space-x-2">
            <DatePicker ref={ref} name="date" defaultValue="19-12-1967" placeholder="Enter date" />
            <Button>Submit</Button>
        </form>
    );

};

export const WithShortcuts = () => {

    const [date, setDate] = useState('19-12-1967');

    return (
        <div className="w-48 text-xs">
            <div>Select Date</div>
            <DatePicker name="date" withShortcuts={true} value={date} onChange={(d) => setDate(d.target.value)} />
        </div>
    );

};
