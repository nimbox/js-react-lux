import React, { type ChangeEvent, type FocusEvent, type FormEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { action } from 'storybook/actions';
import { Button } from '../components/Button';
import { Input } from '../components/inputs/Input';


/**
 * The `InputTemplates` trio, for controls whose answer is `checked` rather than
 * `value` — checkboxes and radios.
 *
 * They differ from the value templates in one way worth knowing: *Force*
 * reaches the control through its ref and nothing else. On a value input that
 * means writing through the native `value` setter and dispatching an `input`
 * event, because React would not otherwise notice. Here it is `click()`, which
 * is the honest equivalent: React detects a checkbox changing from the `click`
 * event, not from `change`, so a dispatched `change` would go unseen.
 */
export interface CheckedInputTemplateProps<P> {
    component: React.ComponentType<P>;
    componentProps: P;
    initial: boolean;
}

export const ControlledCheckedTemplate = <P extends object>({ component: Component, componentProps, initial }: CheckedInputTemplateProps<P>) => {

    const ref = useRef<HTMLInputElement>(null);

    const [checked, setChecked] = useState(initial);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(checked); };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { setChecked(e.target.checked); action('onChange')(e.target.checked); };
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => { action('onBlur')(e.target.checked); };

    return (
        <form onSubmit={handleSubmit} className="w-96 space-y-2">
            <div className="flex flex-row items-center gap-x-2">
                <Input type="text" className="w-4" placeholder="before" />
                <Component ref={ref} checked={checked} onChange={handleChange} onBlur={handleBlur} {...componentProps} />
                <span className="border-t border-b">{String(checked)}</span>
                <Input type="text" className="w-4" placeholder="after" />
            </div>
            <div className="flex flex-row items-center gap-x-2">
                <Button type="button" semantic="secondary" onClick={() => ref.current?.focus()}>Focus</Button>
                <Button type="button" semantic="secondary" onClick={() => ref.current?.click()}>Force</Button>
                <Button>Submit</Button>
            </div>
        </form>
    );

};

export const UncontrolledCheckedTemplate = <P extends object>({ component: Component, componentProps, initial }: CheckedInputTemplateProps<P>) => {

    const ref = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(ref.current?.checked); };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.checked); };
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => { action('onBlur')(e.target.checked); };

    return (
        <form onSubmit={handleSubmit} className="w-96 space-y-2">
            <div className="flex flex-row items-center gap-x-2">
                <Input type="text" className="w-4" placeholder="before" />
                <Component ref={ref} defaultChecked={initial} onChange={handleChange} onBlur={handleBlur} {...componentProps} />
                <Input type="text" className="w-4" placeholder="after" />
            </div>
            <div className="flex flex-row items-center gap-x-2">
                <Button type="button" semantic="secondary" onClick={() => ref.current?.focus()}>Focus</Button>
                <Button type="button" semantic="secondary" onClick={() => ref.current?.click()}>Force</Button>
                <Button>Submit</Button>
            </div>
        </form>
    );

};

export const HookFormCheckedTemplate = <P extends object>({ component: Component, componentProps, initial }: CheckedInputTemplateProps<P>) => {

    const { register, handleSubmit, setValue, getValues, reset } = useForm({ defaultValues: { field: initial } });
    const { onChange, onBlur, ...restOfRegister } = register('field');

    const handleFormSubmit = (data: unknown) => { action('onSubmit')(data); };
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => { action('onChange')(e.target.checked); onChange(e); };
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => { action('onBlur')(e.target.checked); onBlur(e); };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="w-96 space-y-2">
            <div className="flex flex-row items-center gap-x-2">
                <Input type="text" className="w-4" placeholder="before" />
                <Component {...restOfRegister} onChange={handleChange} onBlur={handleBlur} {...componentProps} />
                <Input type="text" className="w-4" placeholder="after" />
            </div>
            <div className="flex flex-row items-center gap-x-2">
                <Button type="button" semantic="secondary" onClick={() => setValue('field', !getValues('field'))}>Force</Button>
                <Button type="button" semantic="secondary" onClick={() => reset({ field: initial })}>Reset</Button>
                <Button>Submit</Button>
            </div>
        </form>
    );

};
