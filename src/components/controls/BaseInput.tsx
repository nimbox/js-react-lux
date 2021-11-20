import { POINT_CONVERSION_UNCOMPRESSED } from 'constants';
import React, { Ref } from 'react';


export const BaseInput = React.forwardRef((
    props: React.InputHTMLAttributes<HTMLInputElement>,
    inputRef: Ref<HTMLInputElement>
) => {

    // Properties

    const {
        className,
        ...inputProps
    } = props;

    // Render
    
    return (
        <input

            ref={inputRef}

            {...inputProps}

            className={classnames(
                'block w-full',
                'outline-none focus:outline-none',
                error || context.error ? 'placeholder-danger-500' : 'placeholder-control-placeholder',
                'placeholder-opacity-40',
                className
            )}
        />
    );
    

});