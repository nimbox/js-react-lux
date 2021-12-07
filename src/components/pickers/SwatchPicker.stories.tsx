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

export const Template = ({ withPlacement, withArrow, withSameWidth, error, popperClassName }: SwatchPickerProps) => {
    return (
        <div className="w-96">
            <SwatchPicker

                defaultValue="#906090"
                error={error}

                withPlacement={withPlacement}
                withArrow={withArrow}
                withSameWidth={withSameWidth}

                popperClassName={popperClassName}

                placeholder="Select color" />

        </div>
    );
};
Template.args = {
    error: false,
    placement: 'bottom-start',
    withArrow: true,
    withSameWidth: false,
    popperClassName: 'w-64 lux-p-2em grid grid-cols-5 overflow-hidden cursor-pointer'
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
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(ref.current!.value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row space-x-2">
            <SwatchPicker ref={ref} name="date" defaultValue="#906090" onChange={handleChange} placeholder="Select color" />
            <Button>Submit</Button>
        </form>
    );

};

export const Direct = () => {

    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); action('onSubmit')(ref.current?.value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row items-center space-x-2">
            <SwatchPicker ref={ref} name="date" defaultValue="#906090" onChange={handleChange} placeholder="Select color" />
            <Button>Submit</Button>
            <Button type="button" onClick={() => ref.current!.value = '#ffff00'}>Set</Button>
        </form>
    );

};

export const Focus = () => {

    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(ref.current!.value); }

    return (
        <form onSubmit={handleSubmit} className="w-96 flex flex-row space-x-2">
            <SwatchPicker ref={ref} name="date" defaultValue="#906090" onChange={handleChange} placeholder="Select color" />
            <Button onClick={() => {

                // const f = ref.current!.focus;
                console.log('ref.current', ref.current!);
                console.log('ref.current.focus', ref.current?.focus);
                // console.log('f', );

                ref.current?.focus();

            }}>Focus</Button>
        </form>
    );

};
