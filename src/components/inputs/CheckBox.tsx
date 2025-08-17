import classnames from 'classnames';
import { forwardRef, type DetailedHTMLProps, type InputHTMLAttributes } from 'react';


export interface CheckBoxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {

    className?: string;

    children?: never;

}

export const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(({ className, ...props }, ref) => {

    // const context = useContext(Context);

    return (
        <input ref={ref} type="checkbox" {...props}
            className={classnames(
                'text-primary-500',
                'border border-control-border checked:border-control-border',
                'focus:border-primary-500',
                'focus:ring focus:ring-primary-500 focus:ring-opacity-50 focus:ring-offset-0',
                'disabled:opacity-50',
                'rounded',
                className)}
            style={{ width: '1.25em', height: '1.25em', verticalAlign: '-0.25em' }}
        />
    );

});
