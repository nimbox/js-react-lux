import { type ChangeEvent, type ChangeEventHandler, useCallback, useState } from 'react';


/**
 * Take back control of a controlled or uncontrolled input. This is usefull when
 * you want to make a controlled input behave as controlled or uncontrolled for
 * the calling element.
 * 
 * @param defaultValue 
 * @param value 
 * @param onChange 
 * @returns 
 */
export const useInternalizeValue = <T extends HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement > (
    initialValue: string,
    defaultValue: string | undefined,
    value: string | undefined,
    onChange: ChangeEventHandler<T> | undefined
): [string, ChangeEventHandler<T>] => {

    const [internalValue, setInternalValue] = useState<string>(defaultValue != null ? defaultValue : initialValue);
    const handleChange = useCallback((e: ChangeEvent<T>) => {
        onChange?.(e);
        if (value == null) {
            setInternalValue(e.target.value);
        }
    }, [onChange, value]);

    return [value != null ? value : internalValue, handleChange];

};
