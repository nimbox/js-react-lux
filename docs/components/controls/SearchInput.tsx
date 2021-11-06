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

    const { end, ...inputProps } = props;

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    const handleClickClear = (e: React.MouseEvent) => {
        setInputValue(inputRef, '');
    };

    return (
        <Input ref={inputRef}
            {...inputProps}
            start={<SearchIcon className="pointer-events-none" />}
            end={
                <>
                    {end}
                    <CircleCross
                        onClick={handleClickClear}
                        className="cursor-pointer"
                    />
                </>
            }
        />
    );

});
