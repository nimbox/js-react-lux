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
     * Show the wrapper content as focused. You need to intercept the onFocus
     * and onBlur of your element to set this value.
     */
    focus?: boolean;

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

        focus,
        disabled,
        error,

        start,
        end,

        onFocus,
        onBlur,

        children,
        className,

        ...divProps

    } = props;

    // configuration

    const [padding, setPadding] = useState([0, 0]);

    // manage focus

    const [internalFocus, setInternalFocus] = useState(false);

    const handleOnFocus = (e: React.FocusEvent<HTMLDivElement>) => {
        setInternalFocus(true);
        if (onFocus) { onFocus(e); }
    }

    const handleOnBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        if (onBlur) { onBlur(e); }
        setInternalFocus(false);
    }

    const isFocus = focus || internalFocus;

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

            onFocus={handleOnFocus}
            onBlur={handleOnBlur}

            className={classnames(

                'relative',
                withFullWidth ? 'block w-full' : 'inline-block',
                withFullHeight ? 'h-full' : null,

                (variant === 'outlined') && classnames(
                    'lux-control-padding',
                    'rounded border',
                    disabled ?
                        'opacity-50' :
                        isFocus ?
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
                        isFocus ?
                            (isError ?
                                'border-b-2 text-danger-500 border-danger-500' :
                                'border-b-2 border-primary-500'
                            ) :
                            (isError ?
                                'border-b text-danger-500 border-danger-500' :
                                'border-b border-control-border'
                            )
                ),

                (variant === 'filled') && classnames(
                    'lux-control-padding',
                    'bg-primary-100',
                    'rounded-t'
                ),

                (variant === 'plain') && classnames(

                ),

                'outline-none focus:outline-none'

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
                {children && (!isString(children) || children.trim().length > 0) ?  children : <>&nbsp;</>}
            </div>

            {start &&
                <div
                    ref={startRef}
                    className={classnames(
                        'absolute inset-y-0 left-0 flex justify-start items-center'
                    )}
                    style={{
                        paddingLeft: variant === 'inlined' || variant === 'plain' ? '0.25em' : '0.75em',
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
                        'absolute inset-y-0 right-0',
                        { 'lux-control-padding-end': variant !== 'inlined' && variant !== 'plain' },
                        'flex justify-end items-center'
                    )}
                    style={{
                        paddingLeft: '0.25em',
                        paddingRight: variant === 'inlined' || variant === 'plain' ? '0.25em' : '0.75em'
                    }}
                >
                    {end}
                </div>
            }

        </div>
    );

});
