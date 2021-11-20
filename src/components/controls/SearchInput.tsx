import React, { Ref, useImperativeHandle, useRef } from 'react';
import { CircleCross, SearchIcon } from '../../icons';
import { setInputValue } from '../../utilities/setInputValue';
import { Input, InputProps } from './Input';


//
// SearchInput
//

export interface SearchInputProps extends Omit<InputProps, 'start'> {
}

export const SearchInput = React.forwardRef((
    props: SearchInputProps & React.InputHTMLAttributes<HTMLInputElement>,
    ref: Ref<HTMLInputElement>
) => {

    // Properties

    const {
        end,
        ...inputProps
    } = props;

    // State

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    // Handlers

    const handleClearMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setInputValue(inputRef, '');
    };

    // Render

    return (
        <Input
            ref={inputRef}
            {...inputProps}
            start={
                <SearchIcon
                    className="pointer-events-none"
                    style={{ marginLeft: '0.5em' }}
                />
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
