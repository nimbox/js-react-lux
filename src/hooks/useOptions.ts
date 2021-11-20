import { useCallback, useEffect, useRef, useState } from 'react';


//
// useOptions
//

export type UseOptionsProvider<G> = G[] | Promise<G[]>;

export interface UseOptionsProps<G, O> {

}

export interface UseOptionsReturn<G, O> {

    /**
     * The options returned by the provider.
     */
    options?: G[];

    /**
     * A flag to indicate if the options are loading.
     */
    loading: boolean;

    /**
     * The error if there was an problem loading the options.
     */
    error: any;

    //

    /**
     * Cancel the current execution of the async promise.
     */
    cancel: () => void;

}

/**
 * Loads the options and returns a series of values to manage asyncrhonous
 * calls. Provider must be an array of groups, a promise that returns an array
 * of groups.  If there is an error while resolving the promise the error will
 * be available in the `error` property and the `options` will be `undefined`.
 *
 * The provider must be a constant between calls using equals. So make sure to
 * memoize it. 
 *
 * @param provider 
 * @param props 
 * @returns {UseOptionsReturn} the values to use inside your components.
 */
export const useOptions = <G, O>(provider: G[] | Promise<G[]>, props?: UseOptionsProps<G, O>): UseOptionsReturn<G, O> => {

    // State

    const [options, setOptions] = useState<G[] | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>(null);

    const searchRef = useRef<{ cancel: (() => void) } | null>(null);

    // Load logic

    const doSearch = useCallback(() => {

        let working = true;
        (async () => {
            try {
                const promisedOptions = await Promise.resolve(provider);
                if (working) {
                    setOptions(promisedOptions);
                }
            } catch (e) {
                if (working) {
                    setOptions(undefined);
                    setError(e);
                }
            } finally {
                if (working) {
                    searchRef.current = null;
                    setLoading(false);
                }
            }
        })();

        return ({ cancel: () => { working = false; } });

    }, [provider]);

    const cancel = useCallback(() => {

        if (searchRef.current) {
            setLoading(false);
            setError(new Error('Cancelled'));
            searchRef.current.cancel();
        }

    }, []);

    const handleSearch = useCallback(() => {

        cancel();

        setLoading(true);
        setError(null);
        searchRef.current = doSearch();

    }, [doSearch, cancel]);

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);

    // Return

    return {

        options,
        loading,
        error,

        cancel

    };

};
