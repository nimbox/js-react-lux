import _debounce from 'lodash/debounce';
import { useMemo, useState } from 'react';
import { useOptions, UseOptionsProps, UseOptionsProvider, UseOptionsReturn } from './useOptions';


//
// useSearchOptions
//

export type UseSearchOptionsProvider<G> = (search?: string) => UseOptionsProvider<G>;

export interface UseSearchOptionsProps<G, O> extends UseOptionsProps<G, O> {

    /**
     * Milliseconds to debounce the search. Default is `0`.
     */
    debounce?: number;

}

export interface UseSearchOptionsReturn<G, O> extends UseOptionsReturn<G, O> {

    /**
     * The function to redo a search with the provided search string.
     */
    search: (query?: string) => void;

}

/**
 * Searches the provider for options and return a series values to manage
 * asyncrhonous calls. Provider must be a function that returns an array of
 * groups or a promise that returns an array of groups. If there is an error
 * while resolving the promise the error will be available in the `error`
 * property and the `options` will be `undefined`.
 *
 * The provider must be a constant between calls using equals. So make sure to
 * memoize it.
 *
 * The initial options are obtained by calling `provider(undefined)`. Take care
 * to either return all the options or no options, depending on your intended
 * use.
 *
 * @param provider 
 * @param props 
 * @returns {UseSearchOptionsReturn} the values and utilities to use inside your
 * components
 */
export const useSearchOptions = <G, O>(provider: UseSearchOptionsProvider<G>, props?: UseSearchOptionsProps<G, O>): UseSearchOptionsReturn<G, O> => {

    // Properties

    const {
        debounce = 0,
    } = props || {};

    // State

    const [currentProvider, setCurrentProvider] = useState(provider(undefined));
    const { options, loading, error, cancel } = useOptions(currentProvider);

    // Load logic

    const search = useMemo(() => {
        return _debounce((search) => setCurrentProvider(provider(search)), debounce);
    }, [provider, debounce]);

    // Return

    return {

        options,
        loading,
        error,

        cancel,
        search

    };

};
