import { action } from 'storybook/actions';
import React, { ChangeEvent, FocusEvent, FormEvent, useRef, useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/inputs/Input';
import { setRefInputValue } from '../components/utilities/setRefInputValue';
import { useForm } from 'react-hook-form';


export interface ControlledTemplateProps<P> {
    component: React.ComponentType<P>;
    componentProps: P;
    initial: string;
    forced: string;
}

export const ControlledTemplate = <P extends object>({ component: Component, componentProps, initial, forced }: ControlledTemplateProps<P>) => {

    const ref = useRef<HTMLInputElement>(null);

    const [value, setValue] = useState(initial);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(value); };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { setValue(e.target.value); action('onChange')(e.target.value); };
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => { action('onBlur')(e.target.value); };

    const forceBlurButtonRef = useRef<HTMLButtonElement>(null);
    const handleForceBlur = () => setTimeout(() => forceBlurButtonRef.current?.focus(), 5000);
    const handleSet = () => setRefInputValue(ref, forced);

    return (
        <form onSubmit={handleSubmit} className="w-96 space-y-2">
            <div className="grid grid-cols-3 items-baseline gap-2">
                <Input type="text" className="w-4" />
                <Component ref={ref} value={value} onChange={handleChange} onBlur={handleBlur} {...componentProps} />
                <Input type="text" className="w-4" />
            </div>
            <div className="flex flex-row items-center gap-x-2">
                <Button ref={forceBlurButtonRef} type="button" semantic="secondary" onClick={handleForceBlur}>Blur</Button>
                <Button type="button" semantic="secondary" onClick={() => ref.current?.focus()}>Focus</Button>
                <Button type="button" semantic="secondary" onClick={handleSet}>Force</Button>
                <Button>Submit</Button>
            </div>
        </form>
    );

};

export const UncontrolledTemplate = <P extends object>({ component: Component, componentProps, initial, forced }: ControlledTemplateProps<P>) => {

    const ref = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(ref.current?.value); };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); };
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => { action('onBlur')(e.target.value); };

    const forceBlurButtonRef = useRef<HTMLButtonElement>(null);
    const handleForceBlur = () => setTimeout(() => forceBlurButtonRef.current?.focus(), 5000);
    const handleSet = () => setRefInputValue(ref, forced);

    return (
        <form onSubmit={handleSubmit} className="w-96 space-y-2">
            <div className="grid grid-cols-3 items-baseline gap-2">
                <Input type="text" className="w-4" />
                <Component ref={ref} defaultValue={initial} onChange={handleChange} onBlur={handleBlur} {...componentProps} />
                <Input type="text" className="w-4" />
            </div>
            <div className="flex flex-row items-center gap-x-2">
                <Button ref={forceBlurButtonRef} type="button" semantic="secondary" onClick={handleForceBlur}>Blur</Button>
                <Button type="button" semantic="secondary" onClick={() => ref.current?.focus()}>Focus</Button>
                <Button type="button" semantic="secondary" onClick={handleSet}>Force</Button>
                <Button>Submit</Button>
            </div>
        </form>
    );

};

export const HookFormTemplate = <P extends object>({ component: Component, componentProps, initial, forced }: ControlledTemplateProps<P>) => {

    const { register, handleSubmit, setValue } = useForm({ defaultValues: { field: initial } });
    const { onChange, onBlur, ...restOfRegister } = register('field');

    const handleFormSubmit = (data) => { action('onSubmit')(data); };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); onChange(e); };
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => { action('onBlur')(e.target.value); onBlur(e); };

    const forceBlurButtonRef = useRef<HTMLButtonElement>(null);
    const handleForceBlur = () => setTimeout(() => forceBlurButtonRef.current?.focus(), 5000);
    const handleForce = () => setValue('field', forced);

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-96 space-y-2">
            <div className="grid grid-cols-3  items-baseline gap-2">
                <Input type="text" className="w-4" />
                <Component {...restOfRegister} onChange={handleChange} onBlur={handleBlur} {...componentProps} />
                <Input type="text" className="w-4" />
            </div>
            <div className="flex flex-row items-center gap-x-2">
                <Button ref={forceBlurButtonRef} type="button" semantic="secondary" onClick={handleForceBlur}>Blur</Button>
                {/* <Button type="button" semantic="secondary" onClick={() => ref.current?.focus()}>Focus</Button> */}
                <Button type="button" semantic="secondary" onClick={handleForce}>Force</Button>
                <Button>Submit</Button>
            </div>
        </form>
    );

};
