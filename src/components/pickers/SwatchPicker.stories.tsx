/* eslint-disable import/no-anonymous-default-export */
import { action } from '@storybook/addon-actions';
import { useRef, useState } from 'react';
import { Button } from '../Buttons';
import { SwatchPicker, SwatchPickerProps } from './SwatchPicker';


export default {
    title: 'Component/Picker/SwatchPicker',
    component: SwatchPicker,
    parameters: {
        layout: 'centered'
    }
};

export const Template = ({ withPlacement: placement, withArrow, withSameWidth, error, popperClassName }: SwatchPickerProps) => {
    return (
        <div className="w-96">
            <SwatchPicker defaultValue="#906090" error={error} withPlacement={placement} withArrow={withArrow} withSameWidth={withSameWidth} popperClassName={popperClassName} placeholder="Select color" />
        </div>
    );
};
Template.args = {
    error: false,
    placement: 'bottom-start',
    withArrow: true,
    withSameWidth: false,
    popperClassName: 'p-2 w-64 grid grid-cols-5 cursor-pointer'
};

export const Controlled = () => {

    const [color, setColor] = useState('#906090');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setColor(e.target.value); action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(color); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row space-x-2">
            <SwatchPicker name="date" value={color} onChange={handleChange} placeholder="Select color" />
            <Button>Submit</Button>
        </form>
    );

};

export const Uncontrolled = () => {

    const ref = useRef<HTMLInputElement>(null);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(ref.current!.value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row space-x-2">
            <SwatchPicker ref={ref} name="date" defaultValue="#906090" placeholder="Select color" />
            <Button>Submit</Button>
        </form>
    );

};
