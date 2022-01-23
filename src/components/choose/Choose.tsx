import classnames from 'classnames';
import _isFunction from 'lodash/isFunction';
import React, { Ref, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react';
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

    // This is the real value.
    const value = isControlled ? propsValue : chosenValue;

    // Make sure the `chosenValue` is set to whatever the real `value` is.
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

    // Memoize the `supplier` response as a promise, when the `query` changes.
    
    const getPromisedOptions = useMemo(async () => {

        const isSearchable = _isFunction(supplier);
        return Promise.resolve(isSearchable ? supplier(query) : supplier)

    }, [query, supplier]);

    // Instead of memoizing the `chooser`, make it a callable function that can
    // be invoked whenever it is necessary. The `chosenOption` only changes when
    // the `chosenValue` changes, but we need to fire this only when necessary
    // to reduce backend searches.
    const getPromisedChosenOption = useCallback(async (chosenValue: string) => {

        // Check that the `chosenValue` is not already one of
        // the promised options.
        const promisedOptions = await getPromisedOptions;
        const option = promisedOptions
            .map(group => extractor(group).find(o => identifier(o) === chosenValue))
            .find(o => o != null);
        if (option != null) {
            return option;
        }

        // Get the `chosenValue` from the chooser, if one is present.
        if (chooser) {
            return Promise.resolve(chooser(chosenValue));
        }

        // The `chosenValue` can not be found.
        return undefined;

    }, [getPromisedOptions, chooser, extractor, identifier]);

    // Wait for the `getPromisedOptions` to settle to display the optiopn list.
    useEffect(() => {

        let working = true;
        async function doEffect() {

            setLoading(l => l + 1);
            setLoadingError(undefined);
            try {
                const promisedOptions = await getPromisedOptions;
                if (working) {
                    setOptions(promisedOptions);
                }
            } catch (e) {
                setOptions([]);
                setLoadingError(e);
            } finally {
                setLoading(l => l - 1);
            }
        }

        doEffect();
        return () => { working = false; };

    }, [getPromisedOptions]);

    // Wait for the `getPromisedChosenOption` to settle to display the chosen
    // option.
    useEffect(() => {

        let working = true;
        async function doEffect() {

            // If `chosenValue` is not present, then reset the
            // `chosenOption` to `undefined`.
            if (chosenValue == null) {
                if (working) {
                    setChosenOption(undefined);
                    return;
                }
            }

            // If `chosenValue` represents the current `chosenOption`,
            // then do nothing.
            if (chosenOption != null && chosenValue === identifier(chosenOption)) {
                return;
            }

            // Wait for the promisedChosenOption to settle.
            setLoading(l => l + 1);
            setLoadingError(undefined);
            try {
                const promisedChosenOption = await getPromisedChosenOption(chosenValue as string);
                if (working) {
                    if (promisedChosenOption) {
                        setChosenOption(promisedChosenOption);
                    }
                }
            } catch (e) {
                setLoadingError(e);
                setChosenOption(undefined);
            } finally {
                setLoading(l => l - 1);
            }

        }

        doEffect();
        return () => { working = false; };

    }, [chosenValue, chosenOption, getPromisedChosenOption, chooser, supplier, identifier, extractor])

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

        // Hide de popper if necessary.
        if (withHideOnChoose) {
            internalInputRef.current!.focus();
            setShow(false);
        }

    }, [identifier, isControlled, internalInputRef, withHideOnChoose]);

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

    };

    const handleChangeQuery = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;
        setQuery(value);

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

                className="absolute inset-0 w-full text-black text-center opacity-10 pointer-events-none"

                {...inputProps}

            />

        </WrapperPopper>
    );

});

