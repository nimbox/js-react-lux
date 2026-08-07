import React, { useImperativeHandle, useRef } from 'react';
import { SearchIcon } from '@nimbox/icons-react';
import { useInternalizeValue } from '../../hooks/useInternalizeValue';
import { setRefInputValue } from '../utilities/setRefInputValue';
import { canClear } from './canClear';
import { ClearOrnament } from './ClearOrnament';
import { Input, type InputProps } from './Input';


//
// SearchInput
//

export interface SearchInputProps extends InputProps {

    /** 
    * Display a loading indicator as part of the input. The data that needs to
    * be shown is on its way.
    * @default `false`
    */
    loading?: boolean;

    /** 
     * Display an error indicator as part of the input. The data did not load
     * correctly.
     * @default `false`
     */
    loadingError?: boolean;

}

export function SearchInput(props: SearchInputProps & React.InputHTMLAttributes<HTMLInputElement>) {

    // Properties

    const {

        ref,

        loading, // eslint-disable-line @typescript-eslint/no-unused-vars
        loadingError, // eslint-disable-line @typescript-eslint/no-unused-vars

        start,
        end,

        disabled,
        onChange,

        ...inputProps

    } = props;

    // State

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    // The value is internalized only to know whether there is anything to
    // clear. A search field always offers the cross once there is, which is why
    // it takes no `withClear` of its own: a search that cannot be called off is
    // not a search.

    const [internalValue, handleChangeInternalValue] = useInternalizeValue('', props.defaultValue, props.value, onChange);

    // Handlers

    const handleClear = () => {
        setRefInputValue(inputRef, '');
    };

    // A disabled field offers nothing, the cross included.

    const withCross = !disabled && canClear(internalValue);

    // Render

    return (
        <Input
            ref={inputRef}
            {...inputProps}
            disabled={disabled}
            onChange={handleChangeInternalValue}
            start={
                <>
                    <SearchIcon className="pointer-events-none" />
                    {start}
                </>
            }
            end={
                withCross
                    ? <>
                        {end}
                        <ClearOrnament value={internalValue} onClear={handleClear} />
                    </>
                    : end
            }
        />
    );

}
