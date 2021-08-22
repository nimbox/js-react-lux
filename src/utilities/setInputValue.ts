import React from 'react';


export const setInputValue = (inputRef: React.RefObject<HTMLInputElement>, value: string) => {
    const setter = Object?.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
    if (setter && value !== '') {
        setter.call(inputRef.current, value);
        inputRef.current!.dispatchEvent(new Event('input', { bubbles: true }));
    }
};
