import classnames from 'classnames';
import React, { LegacyRef } from 'react';


export interface CheckBoxProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    className?: string;
    children?: never;
}

export const CheckBox = React.forwardRef<React.InputHTMLAttributes<HTMLInputElement>, CheckBoxProps>(({ className, children, ...props }, ref) => {

    // const context = useContext(Context);

    return (
        <input ref={ref as LegacyRef<HTMLInputElement> | undefined} type="checkbox" {...props}
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
