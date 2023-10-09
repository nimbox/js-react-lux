/* eslint-disable react-hooks/rules-of-hooks */
import { action } from '@storybook/addon-actions';
import { Story, StoryFn, StoryObj } from '@storybook/react';
import React, { ChangeEvent, FC, FocusEvent, FormEvent, FunctionComponent, ReactElement, ReactNode, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../components/Button';
import { Input } from '../components/inputs/Input';
import { setRefInputValue } from '../components/utilities/setRefInputValue';


export interface InputTemplateProps<T> {

    initial?: string;

    forced?: string;

    component: FunctionComponent<T>;

}


export const ControlledInputTemplate: <T>(props: InputTemplateProps<T>) => StoryFn<T> =
    ({ initial, forced, component: Component }): any =>
        (args: any) => {

            const ref = useRef<HTMLInputElement>(null);

            const [value, setValue] = useState(initial);
            const handleSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(value); };
            const handleChange = (e: ChangeEvent<HTMLInputElement>) => { setValue(e.target.value); action('onChange')(e.target.value); };
            const handleBlur = (e: FocusEvent<HTMLInputElement>) => { action('onBlur')(e.target.value); };

            const forceBlurButtonRef = useRef<HTMLButtonElement>(null);
            const handleForceBlur = () => setTimeout(() => forceBlurButtonRef.current?.focus(), 5000);
            const handleSet = () => setRefInputValue(ref, forced);

            return {
                render: () => (
                    <form onSubmit={handleSubmit} className="w-96 space-y-2">
                        <div className="flex flex-row items-baseline gap-2">
                            <Input type="text" className="w-4" />
                            <Component ref={ref} value={value} onChange={handleChange} onBlur={handleBlur} {...args} />
                            <Input type="text" className="w-4" />
                        </div>
                        <div className="flex flex-row items-center gap-x-2">
                            <Button ref={forceBlurButtonRef} type="button" semantic="secondary" onClick={handleForceBlur}>Blur</Button>
                            <Button type="button" semantic="secondary" onClick={handleSet}>Force</Button>
                            <Button>Submit</Button>
                        </div>
                    </form>
                ),
                component: Component,
                args
            };

        };


export const UncontrolledInputTemplate: <T>(props: InputTemplateProps<T>) => StoryFn<T> =
    ({ initial, forced, component: Component }): any =>
        (args: any) => {

            const ref = useRef<HTMLInputElement>(null);

            const handleSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(ref.current?.value); };
            const handleChange = (e: ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); };
            const handleBlur = (e: FocusEvent<HTMLInputElement>) => { action('onBlur')(e.target.value); };

            const forceBlurButtonRef = useRef<HTMLButtonElement>(null);
            const handleForceBlur = () => setTimeout(() => forceBlurButtonRef.current?.focus(), 5000);
            const handleSet = () => setRefInputValue(ref, forced);

            return (
                <form onSubmit={handleSubmit} className="w-96 space-y-2">
                    <div className="flex flex-row items-baseline gap-2">
                        <Input type="text" className="w-4" />
                        <Component ref={ref} defaultValue={initial} onChange={handleChange} onBlur={handleBlur} {...args} />
                        <Input type="text" className="w-4" />
                    </div>
                    <div className="flex flex-row items-center gap-x-2">
                        <Button ref={forceBlurButtonRef} type="button" semantic="secondary" onClick={handleForceBlur}>Blur</Button>
                        <Button type="button" semantic="secondary" onClick={handleSet}>Force</Button>
                        <Button>Submit</Button>
                    </div>
                </form>
            );

        };


export const HookFormInputTemplate: <T>(props: InputTemplateProps<T>) => StoryFn<T> =
    ({ initial, forced, component: Component, ...props }): any =>
        (args: any) => {

            const { register, handleSubmit, setValue } = useForm({ defaultValues: { field: initial } });
            const { onChange, onBlur, ...restOfRegister } = register('field');

            const handleFormSubmit = (data: any) => { action('onSubmit')(data); }
            const handleChange = (e: ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); onChange(e); };
            const handleBlur = (e: FocusEvent<HTMLInputElement>) => { action('onBlur')(e.target.value); onBlur(e); };

            const forceBlurButtonRef = useRef<HTMLButtonElement>(null);
            const handleForceBlur = () => setTimeout(() => forceBlurButtonRef.current?.focus(), 5000);
            const handleForce = () => setValue('field', forced);

            return (
                <form onSubmit={handleSubmit(handleFormSubmit)} className="w-96 space-y-2">
                    <div className="flex flex-row items-baseline gap-2">
                        <Input type="text" className="w-4" />
                        <Component {...restOfRegister} onChange={handleChange} onBlur={handleBlur} {...args} />
                        <Input type="text" className="w-4" />
                    </div>
                    <div className="flex flex-row items-center gap-x-2">
                        <Button ref={forceBlurButtonRef} type="button" semantic="secondary" onClick={handleForceBlur}>Blur</Button>
                        <Button type="button" semantic="secondary" onClick={handleForce}>Force</Button>
                        <Button>Submit</Button>
                    </div>
                </form>
            );

        };


type createControlled = <T extends {}>(Component: FC<T>, props: { initial: string, forced: string }) => (args: T) => ReactNode;
export const createControlledTemplate: createControlled = (Component, { initial, forced }) => (args) => {

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
                <div className="flex flex-row items-baseline gap-2">
                    <Input type="text" className="w-4" />
                    <Input ref={ref} value={value} onChange={handleChange} onBlur={handleBlur} {...args} />
                    <Input type="text" className="w-4" />
                </div>
                <div className="flex flex-row items-center gap-x-2">
                    <Button ref={forceBlurButtonRef} type="button" semantic="secondary" onClick={handleForceBlur}>Blur</Button>
                    <Button type="button" semantic="secondary" onClick={handleSet}>Force</Button>
                    <Button>Submit</Button>
                </div>
            </form>
        );
        
};


type createUncontrolled = <T extends {}>(Component: FC<T>, props: { initial: string, forced: string }) => (args: T) => ReactNode;
export const createUncontrolledTemplate: createUncontrolled = (Component, { initial, forced }) => (args) => {

    const ref = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(ref.current?.value); };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); };
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => { action('onBlur')(e.target.value); };

    const forceBlurButtonRef = useRef<HTMLButtonElement>(null);
    const handleForceBlur = () => setTimeout(() => forceBlurButtonRef.current?.focus(), 5000);
    const handleSet = () => setRefInputValue(ref, forced);

    return (
        <form onSubmit={handleSubmit} className="w-96 space-y-2">
            <div className="flex flex-row items-baseline gap-2">
                <Input type="text" className="w-4" />
                <Component ref={ref} defaultValue={initial} onChange={handleChange} onBlur={handleBlur} {...args} />
                <Input type="text" className="w-4" />
            </div>
            <div className="flex flex-row items-center gap-x-2">
                <Button ref={forceBlurButtonRef} type="button" semantic="secondary" onClick={handleForceBlur}>Blur</Button>
                <Button type="button" semantic="secondary" onClick={handleSet}>Force</Button>
                <Button>Submit</Button>
            </div>
        </form>
    );

};


type createHookForm = <T extends {}>(Component: FC<T>, props: { initial: string, forced: string }) => (args: T) => ReactNode;
export const createHookFormTemplate: createHookForm = (Component, { initial, forced }) => (args) => {

    const { register, handleSubmit, setValue } = useForm({ defaultValues: { field: initial } });
    const { onChange, onBlur, ...restOfRegister } = register('field');

    const handleFormSubmit = (data: any) => { action('onSubmit')(data); }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.value); onChange(e); };
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => { action('onBlur')(e.target.value); onBlur(e); };

    const forceBlurButtonRef = useRef<HTMLButtonElement>(null);
    const handleForceBlur = () => setTimeout(() => forceBlurButtonRef.current?.focus(), 5000);
    const handleForce = () => setValue('field', forced);

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-96 space-y-2">
            <div className="flex flex-row items-baseline gap-2">
                <Input type="text" className="w-4" />
                <Component {...restOfRegister} onChange={handleChange} onBlur={handleBlur} {...args} />
                <Input type="text" className="w-4" />
            </div>
            <div className="flex flex-row items-center gap-x-2">
                <Button ref={forceBlurButtonRef} type="button" semantic="secondary" onClick={handleForceBlur}>Blur</Button>
                <Button type="button" semantic="secondary" onClick={handleForce}>Force</Button>
                <Button>Submit</Button>
            </div>
        </form>
    );

};
