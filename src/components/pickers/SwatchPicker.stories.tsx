/* eslint-disable import/no-anonymous-default-export */
import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ChangeEvent, ChangeEventHandler, FormEvent, FormEventHandler, forwardRef, Ref, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { setRefInputValue } from '../../utilities/setRefInputValue';
import { Button } from '../Button';
import { Input } from '../inputs/Input';
import { SwatchPicker, SwatchPickerProps } from './SwatchPicker';


export default {
    title: 'Components/Pickers/SwatchPicker',
    component: SwatchPicker,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof SwatchPicker>;


//
// Templates
//

const Template = forwardRef((
    { setValue: finalValue, onChange, onSubmit, ...props }: SwatchPickerProps & {
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
            <div className="flex flex-row items-center gap-x-2">
                <Input className="w-4" />
                <SwatchPicker {...props} ref={internalInputRef} onChange={onChange} />
                <Input className="w-4" />
            </div>
            <div className="flex flex-row items-center gap-x-2">
                <Button ref={buttonRef} type="button" onClick={handleBlur}>Blur</Button>
                <Button type="button" onClick={handleSet}>Set</Button>
                <Button>Submit</Button>
            </div>
        </form>
    );

});

const ControlledTemplate = (props: SwatchPickerProps) => {

    const [color, setColor] = useState('#906090');
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { setColor(e.target.value); action('onChange')(e.target.value); }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(color); }

    return (
        <Template
            {...props}
            name="color"
            value={color}
            setValue="#EA9317"
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );

};

const UncontrolledTemplate = (props: SwatchPickerProps) => {

    const ref = useRef<HTMLInputElement>(null);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(ref.current!.value); }

    return (
        <Template
            {...props}
            ref={ref}
            name="color"
            defaultValue="#906090"
            setValue="#EA9317"
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );

};


//
// Stories
//

export const Default: ComponentStory<typeof SwatchPicker> = UncontrolledTemplate.bind({});
Default.args = {};

export const Controlled = ControlledTemplate.bind({});

export const Uncontrolled = UncontrolledTemplate.bind({});
