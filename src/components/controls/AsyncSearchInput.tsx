import React, { Ref } from 'react';
import { Delay, Loading, SearchInput, SearchInputProps } from '../..';
import { WarningIcon } from '../../icons/components';


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
    error?: any;

}

/**
 * 
 */
export const AsyncSearchInput = React.forwardRef((
    props: AsyncSearchInputProps & React.InputHTMLAttributes<HTMLInputElement>,
    ref: Ref<HTMLInputElement>
) => {

    // Properties

    const {
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

});
