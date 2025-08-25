import React from 'react';
import { setElementInputValue } from './setElementInputValue';


export const setRefInputValue = (
    inputElementRef: React.RefObject<HTMLInputElement | HTMLSelectElement | null>,
    value: string | ReadonlyArray<string> | number | undefined
) => {
    if (inputElementRef.current) {
        setElementInputValue(inputElementRef.current, value);
    }
};
