import { useEffect, useState } from 'react';
import { PersistentState } from './PersistentState';


export const usePersistentState = <T,>(key: string, defaultValue: T) => {

    const settings = PersistentState.getInstance();
    const [value, setValue] = useState<T>(() => settings.get<T>(key, defaultValue));

    useEffect(() => {

        const unsubscribe = settings.subscribe<T>(key, (newValue) => {
            setValue(newValue);
        });

        return () => {
            unsubscribe();
        };

    }, [key, settings]);

    const updateValue = (newValue: T) => {
        settings.set(key, newValue);
    };

    return [value, updateValue] as const;

};
