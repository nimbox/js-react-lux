import { action } from '@storybook/addon-actions';
import { forwardRef, Ref, useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/inputs/Input';


export interface InputTemplateProps {

    defaultValue?: string;

    setValue: string;

}

export const InputTemplate = forwardRef(<T extends any>(
    props: T & InputTemplateProps,
    ref: Ref<HTMLInputElement>
) => {

    const { children } = props;

    const [value, setValue] = useState(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { setValue(e.target.value); action('onChange')(e.target.value); }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); action('onSubmit')(date); }


    return (
        <form onSubmit={onSubmit} className="w-96 flex flex-col items-start gap-y-2">
            <div className="flex flex-row items-center gap-x-2">
                <Input className="w-4" />
                {children}
                
                <DatePicker {...props} ref={internalInputRef} onChange={onChange} />

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

export const UncontrolledInputTemplate = <T extends any>(props: T) => {

};

export const ControlledInputTemplate = <T extends any>(props: T) => {

};
