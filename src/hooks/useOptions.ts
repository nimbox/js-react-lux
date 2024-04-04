/* eslint-disable @typescript-eslint/no-unused-vars */
import { debounce as _debounce } from 'lodash';
import { isFunction as _isFunction } from 'lodash';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';


//
// useOptions
//


/**
 * Supplier for a group of options or a function that returns a group of
 * options.
 */
export type UseOptionsSupplier<G> = (G[] | Promise<G[]>) | ((query?: string) => G[] | Promise<G[]>);

export interface UseOptionsProps<O, G> {

    /**
     * Milliseconds to debounce the search. Default is `0`.
     */
    debounce?: number;

}


export interface UseOptionsReturn<O, G> {

    /**
     * The options returned by the supplier.
     */
    options: G[] | undefined;

    /**
     * A flag to indicate if the options are loading.
     */
    loading: boolean;

    /**
     * The error if there was an problem loading the options.
     */
    error: unknown;

    //

    /**
     * Cancel the current execution of the async promise.
     */
    cancel: () => void;

    /**
     * The function to redo a search with the provided search string.
     */
    search: (query?: string) => void;

}

/**
 * Returns the options from the `supplier` which can take on two possible
 * structures:
 *
 * * It can be a `G[]` or a `Promise<G[]>`
 * * It can be a function that, given a query, returns a `G[]` or a
 *   `Promise<G[]>`.
 *
 * The hook returns a set of variables `options`, `loading` and `error` with the
 * options from the `supplier` and a function `cancel` cancel the `Promise`. The
 * variables `loading`, `error` and the function `cancel` only make sense when
 * using a `Promise`. When the `cancel` method is called, the `Promise` is let
 * to complete, but the `options` will be `undefined`, `loading` will be `false'
 * and `error` will be an `Error` signaling the cancellation, regardles of the
 * outcome of the `Promise`.
 *
 * When the `supplier` is a function the hook also returns a `search` function
 * that can be used invoke a new search and update the `options`, `loading`, and
 * `error` variables.
 *
 * The `supplier` must be a constant between calls using equals. So make sure to
 * memoize it.
 *
 * The initial options are obtained directly from the provided by `G[]` or a
 * `Promise<G[]>` or by calling `supplier()`. Take care to either return all the
 * options or no options, depending on your intended use.
 *
 * @param supplier 
 * @param props 
 * @returns 
 */
export const useOptions = <O, G>(supplier: UseOptionsSupplier<G>, props?: UseOptionsProps<O, G>): UseOptionsReturn<O, G> => {

    // Properties

    const {
        debounce = 0
    } = props || {};

    // State

    const [options, setOptions] = useState<G[] | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<unknown>(null);

    const execution = useRef<{ cancel: (() => void) } | null>(null);

    // Load logic

    const load = useCallback((query?: string) => {

        let working = true;
        (async () => {
            try {
                const isSearchable = _isFunction(supplier);
                const promisedOptions = await Promise.resolve(isSearchable ? supplier(query) : supplier);
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
                    execution.current = null;
                    setLoading(false);
                }
            }
        })();

        return ({ cancel: () => { working = false; } });

    }, [supplier]);

    const cancel = useCallback(() => {

        if (execution.current) {
            setLoading(false);
            setError(new Error('Cancelled'));
            execution.current.cancel();
        }

    }, []);

    // Search

    const handleSearch = useCallback((query?: string) => {

        cancel();

        setLoading(true);
        setError(null);
        execution.current = load(query);

    }, [load, cancel]);

    const search = useMemo(() => {
        return _debounce((search) => handleSearch(search), debounce);
    }, [handleSearch, debounce]);

    // Initialization

    useEffect(() => {
        handleSearch();
    }, [handleSearch]);

    // Return

    return {

        options,
        loading,
        error,

        search,
        cancel

    };

};
