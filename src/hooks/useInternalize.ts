import { useCallback, useState } from 'react';


/**
 * Take back control of a controlled or uncontrolled boolean. This is usefull
 * when you want to make a controlled input behave as controlled or uncontrolled
 * for the calling element.
 *
 * @param defaultValue 
 * @param value 
 * @param onChange 
 * @returns 
 */
export const useInternalize = <T>(
    initialValue: T,
    defaultValue: T | undefined,
    value: T | undefined,
    onChange: (v: T) => void | undefined
): [T, (v: T) => void] => {

    const [internalValue, setInternalValue] = useState<T>(defaultValue != null ? defaultValue : initialValue);
    const handleChange = useCallback((v: T) => {
        onChange?.(v);
        if (value == null) {
            setInternalValue(v);
        }
    }, [onChange, value]);

    return [value != null ? value : internalValue, handleChange];

};
