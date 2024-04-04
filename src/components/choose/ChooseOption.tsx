import { isFunction as _isFunction } from 'lodash';
import React, { Ref, useState } from 'react';
import { useOptions, UseOptionsProps, UseOptionsSupplier } from '../../hooks/useOptions';
import { useOptionsKeyNavigator } from '../../hooks/useOptionsKeyNavigator';
import { consumeEvent } from '../utilities/consumeEvent';
import { SearchInput } from '../inputs/SearchInput';
import { ChooseOptionList, ChooseOptionListProps } from './ChooseOptionList';
import { EXTRACTOR } from './options';


//
// ChooseOption
//

export interface ChooseOptionProps<O, G = O[]> extends
    Pick<ChooseOptionListProps<O, G>, 'extractor' | 'onChoose' | 'renderEmpty' | 'renderGroupLabel' | 'renderOption'> {

    /**
     * Add a search input. An exception is thrown at development time if this
     * option is set to true and the supplier is not a function.
     * @default `false`
     */
    withSearch?: boolean,

    /**
     * Supplier to pass to `useOptions` to get the options.
     */
    supplier: UseOptionsSupplier<G>;

    /**
     * Properties to pass to `useOptions to get the options.
     */
    supplierProps?: UseOptionsProps<O, G>;

    /**
     * Class name of the container div.
     * @default `divide-y divide-control-border`
     */
    className?: string;

}

export const ChooseOption = React.forwardRef(<O, G = O[]>(
    props: ChooseOptionProps<O, G> & React.HTMLAttributes<HTMLDivElement>,
    ref: Ref<HTMLDivElement>
) => {

    // Properties

    const {

        withSearch = false,

        supplier,
        supplierProps,

        extractor = EXTRACTOR,
        onChoose,

        renderEmpty,
        renderGroupLabel,
        renderOption,

        className = 'divide-y divide-control-border'

    } = props;

    // Assertions

    if (process.env.NODE_ENV !== 'production') {
        if (withSearch && !_isFunction(supplier)) {
            console.error('Provided withSearch parameter without providing an option supplier function.  Try setting options to `(query) => [[ ... ]]`.');
        }
    }

    // State

    const [searchValue, setSearchValue] = useState<string>('');

    // Options

    const { options, loading, error, search } = useOptions(supplier, supplierProps);
    const { selected, onKeyDown } = useOptionsKeyNavigator(options, { extractor, onChoose });

    // Handlers

    const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        search(value);
    };

    // Render

    return (
        <div ref={ref} className={className}>

            {withSearch &&
                <div className="lux-p-2em">
                    <SearchInput
                        autoFocus
                        loading={loading}
                        loadingError={error}
                        value={searchValue}
                        onChange={handleChangeSearchValue}
                        onKeyDown={onKeyDown}
                    />
                </div>
            }

            <ChooseOptionList

                options={options}
                selected={selected}

                extractor={extractor}
                onChoose={onChoose}

                renderEmpty={renderEmpty}
                renderGroupLabel={renderGroupLabel}
                renderOption={renderOption}

                onMouseDown={consumeEvent}

                className="divide-y"

            />

        </div>
    );

});
