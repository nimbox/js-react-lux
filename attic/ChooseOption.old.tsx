import classnames from 'classnames';
import _debounce from 'lodash/debounce';
import _isFunction from 'lodash/isFunction';
import React, { Ref, useCallback, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useOptionsKeyNavigator } from '../src/hooks/useOptionsKeyNavigator';
import { WarningIcon } from '../src/icons';
import { SearchInput } from '../src/components/controls/SearchInput';
import { Delay } from '../src/components/Delay';
import { Loading } from '../src/components/Loading';
import { ChooseOption, ChooseOptionProps, defaultGetOptions, DEFAULT_RENDER_GROUP_LABEL, DEFAULT_RENDER_NO_OPTIONS, DEFAULT_RENDER_OPTION } from '../src/components/choose/ChooseOption';


//
// ChooseOption
//

export interface ChooseOptionNoOptionsProps {

    /**
     * The search input value.
     */
    value?: string;

}

export interface ChooseOptionFooterProps<G, O> extends Pick<ChooseOptionProps<G, O>, 'options' | 'selected'> {

    /**
     * The search input value.
     */
    value?: string;

}

export interface ChooseOptionProps<G, O> extends Omit<ChooseOptionProps<G, O>, 'error' | 'options' | 'selected' | 'renderNoOptions'> {

    /**
     * Add a search bar at the top. When this option is set you need to control
     * the `value` and provide the `onChange` handler in order to provide the
     * filtered options.
     */
    withSearch?: boolean;

    /**
     * Clear the search value when the user clicks an option.
     */
    withClearOnChoose?: boolean

    //

    /**
     * Function to provide options given a search query. This function
     * can return the options or a promise that resolves to the
     * options.
     */
    provider: G[] | Promise<G[]> | ((search: string) => (G[] | Promise<G[]>));

    //

    /**
     * Render this element when there are no options. It there are no options
     * and this function returns null, the component is rendered as null.
     * Defaults to `() => null` 
     */
    renderNoOptions?: (props: ChooseOptionNoOptionsProps) => React.ReactNode;

    /**
     * Render the footer with the given properties.
     */
    renderFooter?: (props: ChooseOptionFooterProps<G, O>) => React.ReactNode;

    /**
     * Callback to call when escape is pressed.
     */
    onHide?: () => void;

    /**
     * Reference to the container.
     */
    inputRef?: React.Ref<HTMLInputElement>;

}

/**
 * ChooseOption is a `div` that internally has an `input` that can be accessed
 * via its `inputRef` (usually to set its focus). The input automatically calls
 * the options promise and manages the loading and error state.
 */
export const ChooseOption = React.forwardRef(<G, O>(
    props: ChooseOptionProps<G, O> & React.InputHTMLAttributes<HTMLDivElement>,
    ref: Ref<HTMLDivElement>
) => {

    // properties

    const {

        withSearch = false,
        withClearOnChoose = true,

        loading,
        provider: searchOptions,

        extractor: getOptions = defaultGetOptions,

        renderNoOptions = DEFAULT_RENDER_NO_OPTIONS,
        renderGroupLabel = DEFAULT_RENDER_GROUP_LABEL,
        renderOption = DEFAULT_RENDER_OPTION,
        renderFooter,

        inputRef,
        // defaultValue,
        // value,
        // onChange,

        onKeyDown,

        onHide,
        onChoose,

        className,

        ...divProps


    } = props;

    // assertions

    if (process.env.NODE_ENV !== 'production') {
        if (withSearch && !_isFunction(searchOptions)) {
            console.error('Provided withSearch parameter without providing an option provider function.  Try setting options to (search ) => [[ ... ]].');
        }
    }

    // configuration

    const [searching, setSearching] = useState(false);
    const [searchingError, setSearchingError] = useState(false);

    const searchRef = useRef<{ cancel: (() => void) } | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchedOptions, setSearchedOptions] = useState<G[]>([]);

    // search logic

    const doSearch = useCallback((search) => {

        let working = true;
        (async () => {
            try {
                const promisedOptions = await Promise.resolve(_isFunction(searchOptions) ? searchOptions(search) : searchOptions);
                if (working) {
                    setSearchedOptions(promisedOptions);
                }
            } catch (e) {
                if (working) {
                    setSearchingError(e != null);
                }
            } finally {
                if (working) {
                    searchRef.current = null;
                    setSearching(false);
                }
            }
        })();

        return ({ cancel: () => { working = false; } });

    }, [searchOptions]);

    const handleSearch = useCallback(_debounce((search) => { // eslint-disable-line react-hooks/exhaustive-deps

        if (searchRef.current) {
            searchRef.current.cancel();
        }

        setSearching(true);
        setSearchingError(false);
        searchRef.current = doSearch(search);

    }, 150), [doSearch]);

    // useEffect(() => {


    //     const search = String(value != null ? value : (defaultValue || ''));

    //     console.log('XXX', 'doing the effect', search);

    //     setSearchValue(search);
    //     handleSearch(search);

    // }, [handleSearch, defaultValue, value, ]);

    //

    const optionsLengths = useMemo(() => {
        return searchedOptions.map(group => getOptions(group).length);
    }, [searchedOptions, getOptions]);
    const { selected, onKeyDown: navigatorHandleKeyDown } = useOptionsKeyNavigator(optionsLengths);

    // handlers

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        switch (e.key) {

            case 'Escape':
                if (onHide) {
                    onHide();
                }
                break;

            // case 'Tab':
            case 'Enter':

                if (selected != null) {
                    e.preventDefault();
                    handleChoose(selected);
                } else {
                    if (onHide) {
                        onHide();
                    }
                }

                break;

        }

        navigatorHandleKeyDown(e);

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        handleSearch(e.target.value);
    };

    const handleChoose = (selected: [number, number]) => {
        const group = searchedOptions[selected[0]];
        onChoose(getOptions(group)[selected[1]]);
        if (withClearOnChoose) {
            setSearchValue('');
            handleSearch('');
        }
    };

    // prepare the input reference to the parent element

    const internalInputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(inputRef, () => ({ ...internalInputRef.current!, handleKeyDown }));

    // render 

    const withFooter = renderFooter ? renderFooter({ value: searchValue, options: searchedOptions, selected }) : null;

    return (
        <div
            ref={ref}
            {...divProps}
            className={classnames(
                'relative max-h-96 flex flex-col divide-y divide-control-border overflow-y-auto',
                'lux-empty-hidden',
                className
            )}
        >

            {withSearch &&
                <div className="flex-none lux-p-2em">
                    <SearchInput

                        ref={internalInputRef}
                        autoFocus

                        value={searchValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}

                        end={
                            <>
                                {loading || searching ? <Delay><Loading /></Delay> : null}
                                {searchingError ? <WarningIcon className="text-danger-500" /> : null}
                            </>
                        }

                    />
                </div>
            }

            <ChooseOption

                loading={loading || searching}
                error={searchingError}

                options={searchedOptions}
                selected={selected}

                extractor={getOptions}

                renderNoOptions={() => renderNoOptions({ value: searchValue })}
                renderGroupLabel={renderGroupLabel}
                renderOption={renderOption}

                onChoose={onChoose}

                className="flex-1 min-h-0 lux-py-2em overflow-y-auto"

            />

            {withFooter &&
                <div className="flex-none">
                    {withFooter}
                </div>
            }

        </div>
    );

});
