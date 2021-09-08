import classnames from 'classnames';
import React, { cloneElement, useContext, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { Context } from './Control';


export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {

    start?: React.ReactNode;
    end?: React.ReactNode;

    error?: boolean;

}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ start, end, error, className, ...props }, ref) => {

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const context = useContext(Context);

    const startRef = useRef<HTMLElement>(null);
    useLayoutEffect(() => {
        if (start) {
            const width = startRef.current!.getBoundingClientRect().width;
            inputRef.current!.style.paddingLeft = `${width}px`;
        }
    }, [start]);

    const endRef = useRef<HTMLElement>(null);
    useLayoutEffect(() => {
        if (end) {
            const width = endRef.current!.getBoundingClientRect().width;
            inputRef.current!.style.paddingRight = `${width}px`;
        }
    }, [end]);


    return (
        <div className="relative">
            <input {...props} ref={inputRef} className={classnames(
                'block w-full',
                'lux-control-font lux-control-padding',
                'rounded border border-control-border',
                error || context.error ?
                    'text-danger-500 border-danger-500 focus:border-danger-500 focus:ring-danger-500 placeholder-danger-500' :
                    'focus:border-primary-500 focus:ring-primary-500 placeholder-control-border',
                'focus:ring focus:ring-opacity-50 focus:outline-none',
                'placeholder-opacity-40',
                'disabled:opacity-50',
                className)}
            />
            {start ? cloneElement(start as any, { ref: startRef }) : null}
            {end ? cloneElement(end as any, { ref: endRef }) : null}
        </div>
    );

});
