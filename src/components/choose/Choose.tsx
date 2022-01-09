import classnames from 'classnames';
import _isFunction from 'lodash/isFunction';
import React, { Ref, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { Delay, Loading } from '../..';
import { useObservableValueRef } from '../../hooks/useObservableValueRef';
import { useOption, UseOptionChooser, UseOptionProps } from '../../hooks/useOption';
import { useOptions, UseOptionsProps, UseOptionsSupplier } from '../../hooks/useOptions';
import { useOptionsKeyNavigator } from '../../hooks/useOptionsKeyNavigator';
import { AngleDownIcon, CircleCross, WarningIcon } from '../../icons';
import { consumeEvent } from '../../utilities/consumeEvent';
import { setRefInputValue } from '../../utilities/setRefInputValue';
import { Placeholder } from '../controls/Placeholder';
import { SearchInput } from '../controls/SearchInput';
import { WrapperProps } from '../controls/Wrapper';
import { WrapperPopper } from '../controls/WrapperPopper';
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

    chooser?: UseOptionChooser<O>;

    chooserProps?: UseOptionProps<O>;

    supplier: UseOptionsSupplier<G>;

    supplierProps?: UseOptionsProps<O, G>;

    //

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
        withFullWidth,
        withFullHeight,

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
        chooserProps,

        supplier,
        supplierProps,
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

    const internalInputRef = useObservableValueRef<HTMLInputElement>(null);
    useImperativeHandle(inputRef, () => internalInputRef.current!);

    const isControlled = propsValue != null;
    const [internalValue, setInternalValue] = useState<string | ReadonlyArray<string> | number | undefined>(propsDefaultValue ?? '');
    const value = isControlled ? propsValue : internalValue;

    // Options

    const { option: loadedOption, loading: loadingOption, error: loadingOptionError, get: getOption } = useOption(chooser);
    const { options: loadedOptions, loading: loadingOptions, error: loadingOptionsError, search: searchOptions } = useOptions(supplier, supplierProps);

    // Update `chosenOption` when `loadedOption` changes.
    const [chosenOption, setChosenOption] = useState<O | undefined>(undefined);
    useEffect(() => {
        setChosenOption(loadedOption);
    }, [loadedOption]);

    // Populate the `chosenOption` based on the provided `value`. This method
    // tries to set the `chosenOption` minimizing the number of queries to the
    // backend.
    const populateChosenOption = useCallback((value) => {

        // First, set the `internalValue` to `value`, so that the `chosenOption`
        // is matched to it (via the `identifier` function).
        if (!isControlled) {
            setInternalValue(value);
        }

        // If no `value` is available, set the chosen to `undefined` so that the
        // `placeholder` shows.
        if (value == null) {
            setChosenOption(undefined);
            return;
        }

        // If the the `value` is the current `chosenOption` (via the
        // `identifier` function), then we already have it and there is no need
        // to get it again.
        if (chosenOption != null && identifier(chosenOption) === value) {
            return;
        }

        // If the value is already in the loaded options (via the `identifier`
        // function), then we already have it and there is no need to get it
        // again.
        if (loadedOptions && loadedOptions.length > 0) {
            const option = loadedOptions
                .map(group => extractor(group).find(o => identifier(o) === value))
                .find(o => o != null);
            if (option != null) {
                setChosenOption(option);
                return;
            }
        }

        // Finally, set the `chosenOption` to `undefined`, to rended the
        // placehlder, and dispatch the `get` from the `useOption`. The
        // `getOption` function is a no-op if there is no chooser. 
        setChosenOption(undefined);
        getOption(value);

    }, [isControlled, chosenOption, loadedOptions, extractor, identifier, getOption]);

    // Populate the chosen option if the value changed. This needs to be a
    // `useLayoutEffect` because we need to dispatch the `getOption` before the
    // current render.
    useLayoutEffect(() => {
        populateChosenOption(value);
    }, [populateChosenOption, value]);

    // Handle Choose

    const handleChoose = useCallback((option: O) => {

        const value = identifier(option);

        // Set the internal value/chosenOption state and the input value.
        if (!isControlled) {
            setInternalValue(value);
        }
        setChosenOption(option);
        setRefInputValue(internalInputRef, value);

        // Reset the query and reload the `undefined` options.
        // Hide the popper.
        setQuery('');
        searchOptions();
        if (withHideOnChoose) {
            setShow(false);
        }

    }, [isControlled, identifier, internalInputRef, searchOptions, withHideOnChoose]);

    // Options

    const { selected, onKeyDown: onNavigatorKeyDown } = useOptionsKeyNavigator(loadedOptions, { extractor, onChoose: handleChoose })


    // Action Handlers

    const handleClear = () => {

        // Set the internal value/chosenOption state and the input value.
        if (!isControlled) {
            setInternalValue('');
        }
        setChosenOption(undefined);
        setRefInputValue(internalInputRef, '');

        // Reset the query and reload the `undefined` options.
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
        handleClear();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
            setInternalValue(e.target.value);
        }
        onChange?.(e);
    };

    const handlePopperBlur = () => {

        // Reset and hide the popper.
        setQuery('');
        searchOptions();
        // setShow(false);

        console.log('hiding popper');

        // Focus the wrapper to continue tabbing.
        wrapperRef.current?.focus();

    };

    // Render Chosen Option

    const option = () => (
        <Placeholder error={error} placeholder={placeholder}>
            {chosenOption ? renderChosen({ option: chosenOption }) : null}
        </Placeholder>
    );

    // Render Popper

    const popper = () => (
        <div className="divide-y divide-control-border">

            {withSearch &&
                <div className="lux-p-2em">
                    <SearchInput
                        autoFocus
                        loading={loadingOption || loadingOptions}
                        loadingError={loadingOptionsError}
                        value={query}
                        onChange={handleChangeQuery}
                        onKeyDown={onNavigatorKeyDown}
                    />
                </div>
            }

            <ChooseOptionList

                options={loadedOptions}
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

    console.log('choose', 'render');

    return (
        <WrapperPopper

            tabIndex={tabIndex}
            ref={wrapperRef}

            // Wrapper

            variant={variant}
            withFullWidth={withFullWidth}
            withFullHeight={withFullHeight}

            error={error}
            disabled={disabled}

            start={start}
            end={
                <>
                    {end}
                    {loadingOption || loadingOptions ? <Delay><Loading style={{ marginRight: '0.5em' }} /></Delay> : null}
                    {loadingOptionError || loadingOptionsError ? <WarningIcon className="text-danger-500" style={{ marginRight: '0.5em' }} /> : null}
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

