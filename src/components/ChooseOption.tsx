import classnames from 'classnames';
import _debounce from 'lodash/debounce';
import _isFunction from 'lodash/isFunction';
import React, { Ref, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Delay, Loading } from '..';
import { useKeyboardNavigator } from '../hooks/useKeyboardNavigator';
import { SearchIcon, WarningIcon } from '../icons';
import { ChooseOptionList, ChooseOptionListProps, defaultGetOptions, defaultRenderGroupLabel, defaultRenderNoOptions, defaultRenderOption } from './ChooseOptionList';
import { Input } from './controls/Input';


//
// ChooseOption
//

export interface ChooseOptionNoOptionsProps {

    value?: string | ReadonlyArray<string> | number | undefined;

}

export interface ChooseOptionFooterProps<G, O> extends Pick<ChooseOptionListProps<G, O>, 'options' | 'selected'> {

    value?: string | ReadonlyArray<string> | number | undefined;

}

export interface ChooseOptionProps<G, O> extends Omit<ChooseOptionListProps<G, O>, 'error' | 'options' | 'selected' | 'renderNoOptions'> {

    /**
     * Add a search bar at the top. When this option is set you need to control
     * the `value` and provide the `onChange` handler in order to provide the
     * filtered options.
     */
    withSearch?: boolean;

    //

    /**
     * Function to provide options given a search query. This function
     * can return the options or a promise that resolves to the
     * options.
     */
    options: G[] | Promise<G[]> | ((search: string) => (G[] | Promise<G[]>));

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
    containerRef?: React.Ref<HTMLDivElement>;

    /**
     * Classname of the container.
     */
    containerClassName?: string;

}

/**
 * ChooseOption is a controlled or uncontrolled input that automatically calls
 * the options promise and manages the loading and error state. Assume this
 * elements acts as an `input`. If you need access to the `div` container use
 * `containerRef` and `containerClassName`.
 */
export const ChooseOption = React.forwardRef(<G, O>(
    props: ChooseOptionProps<G, O> & React.InputHTMLAttributes<HTMLInputElement>,
    ref: Ref<HTMLInputElement & { handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void }>
) => {

    // properties

    const {

        withSearch = false,

        loading,
        options,

        getOptions = defaultGetOptions,

        renderNoOptions = defaultRenderNoOptions,
        renderGroupLabel = defaultRenderGroupLabel,
        renderOption = defaultRenderOption,
        renderFooter,

        defaultValue,
        value,
        onChange,

        onKeyDown,

        onHide,
        onChoose,

        containerRef,
        containerClassName,

        ...inputProps


    } = props;

    // assertions

    if (process.env.NODE_ENV !== 'production') {
        if (withSearch && !_isFunction(options)) {
            console.error('Provided withSearch parameter without providing an option provider function.  Try setting options to (search ) => [[ ... ]]');
        }
    }

    // configuration

    const [searching, setSearching] = useState(false);
    const [error, setError] = useState<boolean>(false);

    const searchRef = useRef<{ cancel: (() => void) } | null>(null);
    const [searchValue, setSearchValue] = useState('');
    const [searchedOptions, setSearchedOptions] = useState<G[]>([]);

    // search logic

    const doSearch = useCallback((search) => {

        let working = true;
        (async () => {
            try {
                const promisedOptions = await Promise.resolve(_isFunction(options) ? options(search) : options);
                if (working) {
                    setSearchedOptions(promisedOptions);
                }
            } catch (e) {
                if (working) {
                    setError(e != null);
                }
            } finally {
                if (working) {
                    searchRef.current = null;
                    setSearching(false);
                }
            }
        })();

        return ({ cancel: () => { working = false; } });

    }, [options]);

    const handleSearch = useCallback(_debounce((search) => { // eslint-disable-line react-hooks/exhaustive-deps

        if (searchRef.current) {
            searchRef.current.cancel();
        }

        setSearching(true);
        setError(false);
        searchRef.current = doSearch(search);

    }, 150), [doSearch]);

    useEffect(() => {
        const search = String(value != null ? value : (defaultValue || ''));
        setSearchValue(search);
        handleSearch(search);
    }, [handleSearch, defaultValue, value]);

    //

    const optionsLengths = useMemo(() => searchedOptions.map(group => getOptions(group).length), [searchedOptions, getOptions]);
    const { selected, handleKeyDown: navigatorHandleKeyDown } = useKeyboardNavigator(optionsLengths);

    // handlers

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (value != null) {
            onChange!(e);
        } else {
            setSearchValue(e.target.value);
            handleSearch(e.target.value);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        switch (e.key) {

            case 'Escape':
                if (onHide) {
                    onHide();
                }
                break;

            case 'Tab':
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

    const handleChoose = (selected: [number, number]) => {
        const group = searchedOptions[selected[0]];
        onChoose(getOptions(group)[selected[1]]);
    };

    // prepare the input reference to the parent element

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => ({ ...inputRef.current!, handleKeyDown }));

    // render 

    const footer = renderFooter ? renderFooter({ value, options: searchedOptions, selected }) : null;

    return (
        <div
            ref={containerRef}
            className={classnames(
                'relative max-h-96 flex flex-col divide-y divide-control-border overflow-y-auto',
                containerClassName
            )}
        >

            {withSearch &&
                <div className="flex-none lux-p-2em">
                    <Input

                        ref={inputRef}

                        type="text"
                        autoFocus

                        value={searchValue}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}

                        {...inputProps}

                        end={
                            <>
                                {loading || searching ? <Delay><Loading /></Delay> : null}
                                {error ? <WarningIcon className="text-danger-500" /> : <SearchIcon />}
                            </>
                        }

                    />
                </div>
            }

            <ChooseOptionList

                loading={loading || searching}
                error={error}
                options={searchedOptions}
                selected={selected}

                getOptions={getOptions}

                renderNoOptions={() => renderNoOptions({ value })}
                renderGroupLabel={renderGroupLabel}
                renderOption={renderOption}

                onChoose={onChoose}

                className="flex-1 min-h-0 lux-py-2em overflow-y-auto"

            />

            {footer &&
                <div className="flex-none">
                    {footer}
                </div>
            }

        </div >
    );

});
