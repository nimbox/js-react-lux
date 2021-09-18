import classnames from 'classnames';
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Context } from './Control';


//
// Wrapper
//

export interface WrapperProps {

    /**
     * Variant to display the element. Defaults to 'outlined'.
     */
    variant?: 'outlined' | 'filled' | 'inlined';

    /**
     * Disable full width on the block.
     */
    withNoFull?: boolean;

    //

    /**
    * Element in wrapper is focused. You need to intercept the onFocus and 
    * onBlur of your element to set this value.
    */
    focus?: boolean;

    /**
     * Show the wrapper with content disabled interface (currently opacity 50%).
     */
    disabled?: boolean;

    /**
     * Show the wrapper with an error interface (currently danger color).
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

export const Wrapper = React.forwardRef<HTMLDivElement, WrapperProps & React.HTMLAttributes<HTMLDivElement>>((props, ref) => {

    // properties

    const {

        variant = 'outlined',
        withNoFull = false,

        focus,
        disabled,
        error,

        start,
        end,

        onFocus,
        onBlur,

        children,

        ...divProps

    } = props;

    // configuration


    const [padding, setPadding] = useState([0, 0]);

    const context = useContext(Context);
    const isError = context.error || error;

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

    //

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
                withNoFull ? 'inline-block' : 'block w-full',

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

                'outline-none focus:outline-none'

            )}

            {...divProps}

        >

            <div
                style={{
                    ...(padding[0] > 0 && { paddingLeft: variant === 'inlined' ? `${padding[0]}px` : `calc(${padding[0]}px - 0.75em)` }),
                    ...(padding[1] > 0 && { paddingRight: variant === 'inlined' ? `${padding[1]}px` : `calc(${padding[1]}px - 0.75em)` })
                }}
            >
                {children}
            </div>

            {start &&
                <div
                    ref={startRef}
                    className={classnames('absolute inset-y-0 left-0 flex justify-start items-center')}
                    style={{
                        paddingLeft: variant === 'inlined' ? '0.25em' : '0.75em',
                        paddingRight: '0.25em'
                    }}
                >
                    {start}
                </div>
            }

            {end &&
                <div
                    ref={endRef}
                    className={classnames('absolute inset-y-0 right-0', { 'lux-control-padding-end': variant !== 'inlined' }, 'flex justify-end items-center')}
                    style={{
                        paddingLeft: '0.25em',
                        paddingRight: variant === 'inlined' ? '0.25em' : '0.75em'
                    }}
                >
                    {end}
                </div>
            }

        </div>
    );

});
