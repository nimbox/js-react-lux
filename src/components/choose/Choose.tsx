import classnames from 'classnames';
import _isFunction from 'lodash/isFunction';
import React, { Ref, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useObservableValueRef } from '../../hooks/useObservableValueRef';
import { UseOptionChooser } from '../../hooks/useOption';
import { UseOptionsSupplier } from '../../hooks/useOptions';
import { useOptionsKeyNavigator } from '../../hooks/useOptionsKeyNavigator';
import { AngleDownIcon, CircleCross, WarningIcon } from '../../icons';
import { consumeEvent } from '../../utilities/consumeEvent';
import { setRefInputValue } from '../../utilities/setRefInputValue';
import { Placeholder } from '../controls/Placeholder';
import { SearchInput } from '../controls/SearchInput';
import { WrapperProps } from '../controls/Wrapper';
import { WrapperPopper } from '../controls/WrapperPopper';
import { Delay } from '../Delay';
import { Loading } from '../Loading';
import { PopperProps } from '../Popper';
import { ChooseOptionList, ChooseOptionListProps } from './ChooseOptionList';
import { DEFAULT_RENDER_OPTION, EXTRACTOR } from './options';


//
// Choose
//

export interface ChooseProps<O, G = O[]> extends
    WrapperProps,
    Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'>,
    Pick<ChooseOptionListProps<O, G>, 'extractor' | 'renderEmpty' | 'renderGroupLabel' | 'renderOption'> {

    //

    /**
     * Add a search input. An exception is thrown at development time if this
     * option is set to true and the supplier is not a function.
     * @default `false`
     */
    withSearch?: boolean,

    /**
     * Hide the popper after the user has selected an option.
     * @default `true`
     */
    withHideOnChoose?: boolean;

    /**
     * Add a clear adornment to clear the currently selected option.
     * @default `false`
     */
    withClear?: boolean;

    //

    /**
     * A function that searches for an option where `value` equals
     * `extractor(option)`. If no option is found it shall return `undefined.
     * This function is only used when no option is found in the ones provided
     * by the `supplier`. Promises are allowed since this parameter is used via
     * `Promise.resolve(chooser)`.
     */
    chooser?: UseOptionChooser<O>;

    /**
     * A value for groups of options or a function that takes a query string and
     * returns a group of options. Promises are allowed since this parameter is
     * used via `Promise.resolve(supplier)`.
     */
    supplier: UseOptionsSupplier<G>

    //

    /**
     * Function to extract the id from an option.
     */
    identifier: (option: O) => string | number | undefined;

    /**
     * Render the chosen option.
     */
    renderChosen?: ({ option }: { option: O }) => React.ReactNode;

    // Styling

    /**
     * Class name to pass to the wrapper.
     */
    wrapperClassName?: string;

    /**
     * Class name to pass to the popper.
     */
    popperClassName?: string;

}

export const Choose = React.forwardRef(<O, G = O[]>(
    props: ChooseProps<O, G> & React.InputHTMLAttributes<HTMLInputElement>,
    inputRef: Ref<HTMLInputElement>
) => {

    // Properties

    const {

        // Wrapper

        variant,
        disabled,
        error,

        start,
        end,

        tabIndex = 0,

        wrapperClassName,

        // Popper

        withPlacement,
        withArrow,
        withSameWidth,

        popperClassName,

        // Choose

        withSearch = false,
        withHideOnChoose = true,
        withClear = false,

        chooser,
        supplier,

        identifier,
        extractor = EXTRACTOR,

        renderEmpty,
        renderGroupLabel,
        renderOption,
        renderChosen = DEFAULT_RENDER_OPTION,

        placeholder,
        className,

        // Input

        defaultValue: propsDefaultValue,
        value: propsValue,
        onChange,

        ...inputProps

    } = props;

    // Assertions

    if (process.env.NODE_ENV !== 'production') {
        if (withSearch && !_isFunction(supplier)) {
            console.error('Provided withSearch parameter without providing an option supplier function.  Try setting options to `(query) => [[ ... ]]`.');
        }
    }

    // State

    const wrapperRef = useRef<HTMLDivElement>(null);

    const [show, setShow] = useState(false);
    const [query, setQuery] = useState<string>('');

    const isControlled = propsValue != null;
    const [chosenValue, setChosenValue] = useState<string | ReadonlyArray<string> | number | undefined>(isControlled ? propsValue : propsDefaultValue);
    const [chosenOption, setChosenOption] = useState<O | undefined>(undefined);

    // Make sure the `chosenValue` is set to whatever the current `value` is.
    const value = isControlled ? propsValue : chosenValue;
    if (value !== chosenValue) {
        setChosenValue(value);
    }

    // References

    const internalInputRef = useObservableValueRef<HTMLInputElement>(null);
    useImperativeHandle(inputRef, () => internalInputRef.current!);

    // Options

    const [options, setOptions] = useState<G[]>([]);
    const [loading, setLoading] = useState(0);
    const [loadingError, setLoadingError] = useState<any>(null);

    // Search for the given query in the supplier. Set the loaded options to the
    // returned value or set the loadingError accordingly.
    const searchOptions = useCallback(async (query?: string) => {
        try {
            setLoading(l => l + 1);
            const isSearchable = _isFunction(supplier);
            setLoadingError(null);
            setOptions(await Promise.resolve(isSearchable ? supplier(query) : supplier));
        } catch (error) {
            setOptions([]);
            setLoadingError(error);
        } finally {
            setLoading(l => l - 1);
        }
    }, [supplier]);

    // Load the options from the supplier upon mounting. Remember that
    // `loadedOptions` can be the options or an error.
    useEffect(() => {
        searchOptions();
    }, [searchOptions]);

    // Find the `chosenOption` based on the `chosenValue`. Be careful to do
    // the search with the least number of requests as possible.
    useEffect(() => {

        // We need to know if the effect has gone stale. If it it has, then do
        // nothing with the responses and do not change the state because new
        // data is available.
        let working = true;

        async function doEffect() {

            // If `chosenValue` is not present, then reset the
            // `chosenOption` to `undefined`.
            if (chosenValue == null) {
                if (chosenOption != null) {
                    if (working) {
                        setChosenOption(undefined);
                        return;
                    }
                }
            }

            // If `chosenValue` represents the current `chosenOption`,
            // then do nothing.
            if (chosenOption != null && chosenValue === identifier(chosenOption)) {
                return;
            }

            // If there is a `loadedOptions` promise, then wait for it to
            // complete (it might already have) and try to find the
            // `chosenValue` in the the resulting options.
            try {
                setLoading(l => l + 1);
                if (options != null) {
                    setLoadingError(null);
                    const promisedOptions = await options;
                    if (working) {
                        const option = promisedOptions
                            .map(group => extractor(group).find(o => identifier(o) === chosenValue))
                            .find(o => o != null);
                        if (option != null) {
                            setChosenOption(option);
                            return;
                        }
                    }
                }
            } catch (e) {
                setLoadingError(e);
            } finally {
                setLoading(l => l - 1);
            }

            // It `chosenValue` was not found on `loadedOptions`, then use the
            // `chooser` (it it is available) to load the option.
            try {
                setLoading(l => l + 1);
                if (chooser) {
                    setLoadingError(null);
                    const promisedOption = await Promise.resolve(chooser(chosenValue));
                    if (working) {
                        if (promisedOption) {
                            setChosenOption(promisedOption);
                            return;
                        }
                    }
                }
            } catch (e) {
                setLoadingError(e);
            } finally {
                setLoading(l => l - 1);
            }

            // If still nothing is found then we have a `chosenValue` that does
            // not correspond to an option. Reset the `chosenValue` and the
            // `chosenOption` to `undefined` and register a loading error.
            if (working) {
                setChosenValue(undefined);
                setChosenOption(undefined);
            }

        }

        doEffect();

        return () => { working = false; };

    }, [chosenValue, chosenOption, options, chooser, supplier, identifier, extractor])

    // Handle Choose

    const handleChoose = useCallback(async (option: O) => {

        const value = identifier(option);

        // Set the internal value/chosenOption state and the input value.
        if (!isControlled) {
            setChosenValue(value);
        }
        setChosenOption(option);
        setRefInputValue(internalInputRef, value);

        // Reset the query.
        setQuery('');
        searchOptions();

        // Hide de popper if necessary.
        if (withHideOnChoose) {
            setShow(false);
        }

    }, [identifier, isControlled, internalInputRef, withHideOnChoose, searchOptions]);

    // Options

    const { selected, onKeyDown: onNavigatorKeyDown } = useOptionsKeyNavigator(options, { extractor, onChoose: handleChoose })

    // Action Handlers

    const handleClearQuery = () => {

        // Clear the chosen value and option.
        if (!isControlled) {
            setChosenValue('');
        }
        setChosenOption(undefined);
        setRefInputValue(internalInputRef, '');

        // Reset the query.
        setQuery('');
        searchOptions();

    };

    const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;
        setQuery(value);
        searchOptions(value);

    };

    const handleClearClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent wrapper click.
        handleClearQuery();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChosenValue(e.target.value);
        onChange?.(e);
    };

    // Popper

    const handlePopperBlur = () => {

        // Reset the query.
        setQuery('');
        searchOptions();

        // Focus the wrapper to continue tabbing.
        wrapperRef.current?.focus();

    };

    // Render Chosen Option

    const option = () => (
        <Placeholder error={error} placeholder={placeholder}>
            {chosenOption ? renderChosen({ option: chosenOption }) : <>&nbsp;</>}
        </Placeholder>
    );

    // Render Popper

    const popper = () => (
        <div className="divide-y divide-control-border">

            {withSearch &&
                <div className="lux-p-2em">
                    <SearchInput
                        autoFocus
                        loading={loading > 0}
                        loadingError={loadingError}
                        value={query}
                        onChange={handleChangeQuery}
                        onKeyDown={onNavigatorKeyDown}
                    />
                </div>
            }

            <ChooseOptionList

                options={options}
                selected={selected}

                extractor={extractor}
                onChoose={handleChoose}

                renderEmpty={renderEmpty}
                renderGroupLabel={renderGroupLabel}
                renderOption={renderOption}

                onMouseDown={consumeEvent}

                className="divide-y divide-control-border"

            />

        </div>
    );

    // Render

    return (
        <WrapperPopper

            tabIndex={tabIndex}
            ref={wrapperRef}

            // Wrapper

            variant={variant}
            error={error}
            disabled={disabled}

            start={start}
            end={
                <>
                    {end}
                    {loading ? <Delay><Loading style={{ marginRight: '0.5em' }} /></Delay> : null}
                    {loadingError ? <WarningIcon className="text-danger-500" style={{ marginRight: '0.5em' }} /> : null}
                    {withClear &&
                        <CircleCross
                            onClick={handleClearClick}
                            style={{ marginRight: '0.5em' }}
                        />
                    }
                    <AngleDownIcon className="stroke-2" style={{ ...((variant !== 'plain') && { marginRight: '0.5em' }) }} />
                </>
            }

            onKeyDown={onNavigatorKeyDown}
            onPopperBlur={handlePopperBlur}

            className={classnames('cursor-pointer', wrapperClassName)}

            // Popper

            withPlacement={withPlacement}
            withArrow={withArrow}
            withSameWidth={withSameWidth}

            show={show}
            onChangeShow={setShow}
            renderPopper={popper}

            popperClassName={popperClassName}

        >

            {option()}

            <input

                ref={internalInputRef}

                type="text"
                tabIndex={-1}

                defaultValue={propsDefaultValue}
                value={propsValue}
                onChange={handleChange}

                className="absolute inset-0 w-full text-black text-center opacity-0 pointer-events-none"

                {...inputProps}

            />

        </WrapperPopper>
    );

});

