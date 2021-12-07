import React from 'react';
import { setElementInputValue } from './setElementInputValue';


export const setRefInputValue = (inputElementRef: React.RefObject<HTMLInputElement | HTMLSelectElement>, value: string | ReadonlyArray<string> | number | undefined) => {
    setElementInputValue(inputElementRef.current, value);
};
