import { forwardRef, type DetailedHTMLProps, type InputHTMLAttributes } from 'react';
import { cn } from '../utilities/cn';


export interface CheckBoxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

    className?: string;

    children?: never;

}

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(({ className, ...props }, ref) => {

    return (
        <input ref={ref} type="checkbox" {...props}
            className={cn(
                'text-primary-500',
                'border border-control-border checked:border-control-border',
                'focus:border-primary-500',
                'focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-0',
                'disabled:opacity-50',
                'rounded',
                className)}
            style={{ width: '1.25em', height: '1.25em', verticalAlign: '-0.25em' }}
        />
    );

});
