import { action } from '@storybook/addon-actions';
import { useRef, useState } from 'react';
import swatches from '../../utils/flat-colors';
import { Button } from '../Buttons';
import { Input } from '../controls/Input';
import { SwatchPicker, SwatchPickerProps } from './SwatchPicker';


export default {
    title: 'Component/Picker/SwatchPicker',
    component: SwatchPicker,
    argTypes: {
        scale: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
        align: { control: { type: 'select', options: ['start', 'stretch', 'end'] } },
        error: { control: { type: 'boolean' } }
    }
};

export const Template = ({ scale, align, swatches, error, popperClassName }: SwatchPickerProps) => {
    return (
        <div className="w-2/3">
            <div className="grid grid-cols-3 gap-4">
                <Input type="text" defaultValue="before" />
                <SwatchPicker scale={scale} align={align} swatches={swatches} defaultValue="#906090" error={error} popperClassName={popperClassName} />
                <Input type="text" defaultValue="after" />
            </div>
        </div>
    );
};
Template.args = {
    scale: 'base',
    align: 'stretch',
    swatches,
    error: false,
    popperClassName: 'grid grid-cols-5 w-32 overflow-hidden'
};


export const Controlled = () => {

    const [color, setColor] = useState("#906090");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        action('submit')(color);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-2/3 m-auto space-y-2">
                <div className="grid grid-cols-3 gap-4">
                    <Input type="text" defaultValue="before" />
                    <SwatchPicker value={color} onChange={(e) => setColor(e.target.value)} swatches={swatches} popperClassName="grid grid-cols-5 overflow-hidden" />
                    <Input type="text" defaultValue="after" />
                </div>
                <Button type="submit">submit</Button>
            </div>
        </form>
    );

};


export const Uncontrolled = () => {

    const ref = useRef<any>();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        action('submit')(ref.current.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="w-2/3 m-auto space-y-2">
                <div className="grid grid-cols-3 gap-4">
                    <Input type="text" defaultValue="before" />
                    <SwatchPicker ref={ref} defaultValue="#906090" swatches={swatches} popperClassName="grid grid-cols-5 overflow-hidden" />
                    <Input type="text" defaultValue="after" />
                </div>
                <Button type="submit">submit</Button>
            </div>
        </form>
    );

}