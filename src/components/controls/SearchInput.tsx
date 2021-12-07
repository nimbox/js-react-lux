import React, { Ref, useImperativeHandle, useRef } from 'react';
import { CircleCross, SearchIcon } from '../../icons';
import { setRefInputValue } from '../../utilities/setRefInputValue';
import { Input, InputProps } from './Input';


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
    loadingError?: any;

}

export const SearchInput = React.forwardRef((
    props: SearchInputProps & React.InputHTMLAttributes<HTMLInputElement>,
    ref: Ref<HTMLInputElement>
) => {

    // Properties

    const {

        loading,
        loadingError,

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
                    <SearchIcon
                        className="pointer-events-none"
                        style={{ marginLeft: '0.5em' }}
                    />
                    {start}
                </>
            }
            end={
                <>
                    {end}
                    <CircleCross
                        onMouseDown={handleClearMouseDown}
                        className="cursor-pointer"
                        style={{ marginRight: '0.5em' }}
                    />
                </>
            }
        />
    );

});
