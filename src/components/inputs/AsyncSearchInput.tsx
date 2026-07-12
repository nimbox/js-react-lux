import React from 'react';
import { WarningIcon } from '@nimbox/icons-react';
import { Delay } from '../Delay';
import { Loading } from '../Loading';
import { SearchInput, type SearchInputProps } from './SearchInput';


//
// SearchOptions
//

export interface AsyncSearchInputProps extends SearchInputProps {

    /** 
     * Display a loading indicator as part of the input. The data that needs to
     * be shown is on its way.
     * @default `false`
     */
    loading?: boolean;

    /** 
     * Display an error indicator as part of the list. The data did not load
     * correctly.
     * @default `false`
     */
    error?: boolean;

}

/**
 * 
 */
export function AsyncSearchInput(props: AsyncSearchInputProps & React.InputHTMLAttributes<HTMLInputElement>) {

    // Properties

    const {
        ref,
        loading,
        error,
        end,
        ...inputProps
    } = props;

    // Render

    return (
        <SearchInput
            ref={ref}
            {...inputProps}
            end={
                <>
                    {end}
                    {loading ? <Delay><Loading style={{ marginRight: '0.5em' }} /></Delay> : null}
                    {error ? <WarningIcon className="text-danger-500" style={{ marginRight: '0.5em' }} /> : null}
                </>
            }
        />
    );

}
