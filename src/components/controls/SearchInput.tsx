import React, { Ref } from 'react';
import { SearchIcon } from '../../icons';
import { Input, InputProps } from './Input';


//
// SearchInput
//

export interface SearchInputProps extends InputProps {
}

export const SearchInput = React.forwardRef((
    props: SearchInputProps & React.InputHTMLAttributes<HTMLInputElement>,
    ref: Ref<HTMLInputElement>
) => (
    <Input ref={ref} start={<SearchIcon />} {...props} />
));
