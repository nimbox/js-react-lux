/* eslint-disable import/no-anonymous-default-export */
import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import React, { ChangeEventHandler, FormEventHandler, forwardRef, Ref, useImperativeHandle, useRef, useState } from 'react';
import { setRefInputValue } from '../../utilities/setRefInputValue';
import { Button } from '../Button';
import { Input } from '../inputs/Input';
import { DatePicker, DatePickerProps } from './DatePicker';


export default {
    title: 'Components/Pickers/DatePicker',
    component: DatePicker,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof DatePicker>;


// 
// Templates
//

const Template = forwardRef((
    { setValue: finalValue, onChange, onSubmit, ...props }: DatePickerProps & {
        defaultValue?: string,
        value?: string,
        setValue: string,
        onChange: ChangeEventHandler<HTMLInputElement>,
        onSubmit: FormEventHandler<HTMLFormElement>,
    },
    inputRef: Ref<HTMLInputElement>
) => {

    const internalInputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(inputRef, () => internalInputRef.current!);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const handleBlur = () => setTimeout(() => buttonRef.current?.focus(), 5000);
    const handleSet = () => setRefInputValue(internalInputRef, finalValue);

    return (
        <form onSubmit={onSubmit} className="w-96 flex flex-col items-start gap-y-2">
            <div className="flex flex-row items-baseline gap-x-2">
                <Input className="w-4" />                
                <DatePicker {...props} ref={internalInputRef} onChange={onChange} />
                <Input className="w-4" />
            </div>
            <div className="flex flex-row items-center gap-x-2">
                <Button ref={buttonRef} type="button" variant="outlined" onClick={handleBlur}>Blur</Button>
                <Button type="button" variant="outlined" onClick={handleSet}>Set</Button>
                <Button>Submit</Button>
            </div>
        </form>
    );

});


const ControlledTemplate = (props: DatePickerProps) => {

    const [date, setDate] = useState('19-12-1967');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setDate(e.target.value); action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(date); }

    return (
        <Template
            {...props}
            name="date"
            value={date}
            setValue="01-05-2022"
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );

};

const UncontrolledTemplate = (props: DatePickerProps) => {

    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(ref.current!.value); }

    return (
        <Template
            {...props}
            ref={ref}
            name="color"
            defaultValue="19-12-1967"
            setValue="01-05-2022"
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );

};


// 
// Stories
//

export const Default: ComponentStory<typeof DatePicker> = UncontrolledTemplate.bind({});
Default.args = {};

export const Controlled = ControlledTemplate.bind({});
export const Uncontrolled = UncontrolledTemplate.bind({});
