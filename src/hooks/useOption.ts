/* eslint-disable @typescript-eslint/no-unused-vars */
import { useCallback, useRef, useState } from 'react';


//
// useOption
//

/**
 * A function that given a value, returns an option or `Promise` that resolves
 * to an option.
 */
export type UseOptionChooser<O> = (value?: string | ReadonlyArray<string> | number | undefined) => O | undefined | Promise<O | undefined>;

export interface UseOptionProps<O> {

}

export interface UseOptionReturn<O> {

    // Variables

    /**
     * The option returned by the provider.
     */
    option: O | undefined;

    /**
     * A flag to indicate if the option is loading.
     */
    loading: boolean;

    /**
     * The error if there was an problem loading the option.
     */
    error: any;

    // Methods

    /**
     * Get the identified option. Cancels any previous gets.
     */
    get: (value?: string | ReadonlyArray<string> | number | undefined) => void,

    /**
     * Cancel the current execution of the async promise.
     */
    cancel: () => void;

}

export const useOption = <O>(chooser: UseOptionChooser<O> | undefined, props?: UseOptionProps<O>): UseOptionReturn<O> => {

    // State

    const [option, setOption] = useState<O | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const execution = useRef<{ cancel: (() => void) } | null>(null);

    // Load logic

    const load = useCallback((value?: string | ReadonlyArray<string> | number | undefined) => {

        let working = true;
        (async () => {
            try {
                const promisedOptions = await Promise.resolve(chooser!(value));
                if (working) {
                    setOption(promisedOptions);
                }
            } catch (e) {
                if (working) {
                    setOption(undefined);
                    setError(e);
                }
            } finally {
                if (working) {
                    execution.current = null;
                    setLoading(false);
                }
            }
        })();

        return ({ cancel: () => { working = false; } });

    }, [chooser]);

    const cancel = useCallback(() => {

        if (execution.current) {
            setLoading(false);
            setError(new Error('Cancelled'));
            execution.current.cancel();
        }

    }, []);

    // Get 

    const get = useCallback((value?: string | ReadonlyArray<string> | number | undefined) => {

        if (chooser) {

            cancel();

            setLoading(true);
            setError(null);
            execution.current = load(value);

        } else {
            setOption(undefined);
        }

    }, [chooser, load, cancel]);

    // Return

    return {

        option,
        loading,
        error,

        get,
        cancel,

    };

};
