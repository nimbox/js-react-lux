import classnames from 'classnames';
import React, { useContext } from 'react';
import { ComponentScale, controlScale, controlText } from '../ComponentScale';
import { Context } from './Control';


export interface TextAreaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    scale?: ComponentScale;
    error?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(({ scale, error, className, ...props }, ref) => {

    const context = useContext(Context);

    return (
        <textarea {...props} ref={ref} className={classnames(
            controlText[scale || context.scale || 'base'],
            'block w-full rounded border border-control-border',
            error || context.error ?
                'border-danger-500 focus:border-danger-500 focus:ring focus:ring-danger-500' :
                'focus:border-primary-500 focus:ring focus:ring-primary-500',
            'focus:ring-opacity-50 focus:outline-none disabled:opacity-50',
            className)}
            style={{ padding: '0.5em 0.75em 0.5em 0.75em' }}
        />
    );

});
