import classnames from 'classnames';
import { isString } from 'lodash';
import React, { Ref, useContext, useLayoutEffect, useRef, useState } from 'react';
import { ControlContext } from './Control';


//
// Wrapper
//

export interface WrapperProps {

    /**
     * Variant to display the element.
     * @default 'outlined'
     */
    variant?: 'outlined' | 'filled' | 'inlined' | 'plain';

    /**
     * Show the wrapper content as disabled (currently opacity 50%).
     */
    disabled?: boolean;

    /**
     * Show the wrapper content as error (currently danger color).
     */
    error?: boolean;

    //

    /**
     * Ornament to place at the start of the wrapper.
     */
    start?: React.ReactNode;

    /**
     * Ornament to place at the end of the wrapper.
     */
    end?: React.ReactNode;

    /**
     * Classes to apply to the wrapper. The provided classes are appended to the
     * classes used for formatting the wrapper. The default is `w-full`, but if
     * you provide other classes they override the `w-full` class, but not the
     * formatting classes.
     * @default `block w-full`
     */
    className?: string;

}

/**
 * Wrapper. Container of all inputs that require a focus, disabled, or error 
 * display. Assume this elements acts as a `div` without any css classes or
 * style.
 */
export const Wrapper = React.forwardRef((
    props: WrapperProps & React.HTMLAttributes<HTMLDivElement>,
    ref: Ref<HTMLDivElement>
) => {

    // properties

    const {

        variant = 'outlined',
        disabled,
        error,

        start,
        end,

        onFocus,
        onBlur,

        className = 'block w-full',
        style,

        children,

        ...divProps

    } = props;

    // configuration

    const [padding, setPadding] = useState([0, 0]);

    // manage focus

    const [focus, setFocus] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
        setFocus(true);
        onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        onBlur?.(e);
        setFocus(false);
    };

    // manage error

    const context = useContext(ControlContext);
    const isError = error || context.error;

    // ornament references

    const startRef = useRef<HTMLDivElement>(null);
    const endRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        let [startPadding, endPadding] = [0, 0];
        if (start) {
            const width = startRef.current!.getBoundingClientRect().width;
            startPadding = width;
        }
        if (end) {
            const width = endRef.current!.getBoundingClientRect().width;
            endPadding = width;
        }
        setPadding([startPadding, endPadding]);
    }, [start, end]);

    // render

    return (
        <div

            ref={ref}

            onFocus={handleFocus}
            onBlur={handleBlur}

            className={classnames(

                'relative',

                (variant === 'outlined') && classnames(
                    'lux-control-padding',
                    'rounded border',
                    disabled ?
                        'opacity-50' :
                        focus ?
                            (isError ?
                                'text-danger-500 border-danger-500 ring ring-danger-500 ring-opacity-50' :
                                'border-primary-500 ring ring-primary-500 ring-opacity-50'
                            ) :
                            (isError ?
                                'text-danger-500 border-danger-500' :
                                'border-control-border'
                            )
                ),

                (variant === 'filled' || variant === 'inlined') && classnames(
                    disabled ?
                        'border-b opacity-50' :
                        focus ?
                            (isError ?
                                'border-b-2 text-danger-500 border-danger-500' :
                                'border-b-2 border-primary-500'
                            ) :
                            (isError ?
                                'mb-px border-b text-danger-500 border-danger-500' :
                                'mb-px border-b border-control-border'
                            )
                ),

                (variant === 'filled') && classnames(
                    'lux-control-padding',
                    'bg-primary-100',
                    'rounded-t'
                ),

                'outline-none focus:outline-none',

                className

            )}

            style={{
                ...(padding[0] > 0 && {
                    paddingLeft: `calc(${padding[0]}px + 0.35em)`
                }),
                ...(padding[1] > 0 && {
                    paddingRight: `calc(${padding[1]}px + 0.35em)`
                }),
                ...style
            }}

            {...divProps}

        >

            {children && (!isString(children) || children.trim().length > 0) ? children : <>&nbsp;</>}

            {/* Adornments */}

            {start &&
                <div
                    ref={startRef}
                    className={classnames('absolute inset-y-0 left-0 flex flex-row justify-start items-center')}
                >
                    {start}
                </div>
            }

            {end &&
                <div
                    ref={endRef}
                    className={classnames('absolute inset-y-0 right-0 flex flex-row justify-end items-center')}
                >
                    {end}
                </div>
            }

        </div>
    );

});
