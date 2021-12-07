import classnames from 'classnames';
import React, { Ref, useContext, useLayoutEffect, useRef, useState } from 'react';
import { Context } from './Control';
import { isString } from 'lodash';

//
// Wrapper
//

export interface WrapperProps {

    /**
     * Variant to display the element. Defaults to 'outlined'.
     */
    variant?: 'outlined' | 'filled' | 'inlined' | 'plain';

    /**
     * Enable full width on the block. True by default.
     */
    withFullWidth?: boolean;

    /**
     * Enable full height on the block. False By default.
     */
    withFullHeight?: boolean;

    //

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

}

/**
 * Wrapper. Container of all inputs that require a focus, disabled, or error 
 * disply. Assume this elements acts as a `div` without any css classes or
 * style.
 */
export const Wrapper = React.forwardRef((
    props: WrapperProps & React.HTMLAttributes<HTMLDivElement>,
    ref: Ref<HTMLDivElement>
) => {

    // properties

    const {

        variant = 'outlined',
        withFullWidth = true,
        withFullHeight = false,

        disabled,
        error,

        start,
        end,

        onFocus,
        onBlur,

        className,

        children,

        ...divProps

    } = props;

    // configuration

    const [padding, setPadding] = useState([0, 0]);

    // manage focus

    const [focus, setFocus] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
        setFocus(true);
        onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        onBlur?.(e);
        setFocus(false);
    }

    // manage error

    const context = useContext(Context);
    const isError = error || context.error;

    // ornament references

    const startRef = useRef<HTMLDivElement>(null);
    const endRef = useRef<HTMLDivElement>(null);
    useLayoutEffect(() => {
        let [left, right] = [0, 0];
        if (start) {
            const width = startRef.current!.getBoundingClientRect().width;
            left = width;
        }
        if (end) {
            const width = endRef.current!.getBoundingClientRect().width;
            right = width;
        }
        setPadding([left, right]);
    }, [start, end]);

    // render

    return (
        <div

            ref={ref}

            onFocus={handleFocus}
            onBlur={handleBlur}

            className={classnames(

                'relative',
                withFullWidth ? 'block w-full' : 'inline-block',
                withFullHeight ? 'h-full' : null,

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

                (variant === 'plain') && classnames(

                ),

                'outline-none focus:outline-none overflow-hidden',

                className,

            )}

            {...divProps}

        >

            <div
                className={classnames(
                    withFullHeight ? 'h-full' : null,
                    className
                )}
                style={{
                    ...(padding[0] > 0 && {
                        paddingLeft: variant === 'inlined' || variant === 'plain' ?
                            `${padding[0]}px` :
                            `calc(${padding[0]}px - 0.75em)`
                    }),
                    ...(padding[1] > 0 && {
                        paddingRight: variant === 'inlined' || variant === 'plain' ?
                            `${padding[1]}px` :
                            `calc(${padding[1]}px - 0.75em)`
                    })
                }}
            >
                {children && (!isString(children) || children.trim().length > 0) ? children : <>&nbsp;</>}
            </div>

            {start &&
                <div
                    ref={startRef}
                    className={classnames(
                        'absolute inset-y-0 left-0 flex justify-start items-center'
                    )}
                    style={{
                        // paddingLeft: variant === 'inlined' || variant === 'plain' ? '0.25em' : '0.5em',
                        paddingLeft: 0,
                        paddingRight: '0.25em'
                    }}
                >
                    {start}
                </div>
            }

            {end &&
                <div
                    ref={endRef}
                    className={classnames(
                        'absolute inset-y-0 right-0 flex justify-end items-center'
                    )}
                    style={{
                        paddingLeft: '0.25em',
                        // paddingRight: variant === 'inlined' || variant === 'plain' ? '0.25em' : '0.5em'
                        paddingRight: 0
                    }}
                >
                    {end}
                </div>
            }

        </div>
    );

});
