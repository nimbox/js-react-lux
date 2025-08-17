import React, { type Ref, useImperativeHandle, useRef } from 'react';
import { CircleCrossIcon, SearchIcon } from '../../icons/components';
import { setRefInputValue } from '../utilities/setRefInputValue';
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

export const SearchInput = React.forwardRef((
    props: SearchInputProps & React.InputHTMLAttributes<HTMLInputElement>,
    ref: Ref<HTMLInputElement>
) => {

    // Properties

    const {

        loading, // eslint-disable-line @typescript-eslint/no-unused-vars
        loadingError, // eslint-disable-line @typescript-eslint/no-unused-vars

        start,
        end,

        ...inputProps

    } = props;

    // State

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    // Handlers

    const handleClearMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setRefInputValue(inputRef, '');
    };

    // Render

    return (
        <Input
            ref={inputRef}
            {...inputProps}
            start={
                <>
                    <SearchIcon className="pointer-events-none" />
                    {start}
                </>
            }
            end={
                <>
                    {end}
                    <CircleCrossIcon onMouseDown={handleClearMouseDown} className="cursor-pointer" />
                </>
            }
        />
    );

});
