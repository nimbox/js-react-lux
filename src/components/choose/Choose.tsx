import classnames from 'classnames';
import { isFunction as _isFunction } from 'lodash';
import React, { forwardRef, KeyboardEvent, Ref, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useInternalizeValue } from '../../hooks/useInternalizeValue';
import { useObservableValueRef } from '../../hooks/useObservableValueRef';
import { UseOptionChooser } from '../../hooks/useOption';
import { UseOptionsSupplier } from '../../hooks/useOptions';
import { useOptionsKeyNavigator } from '../../hooks/useOptionsKeyNavigator';
import { AngleDownIcon, CircleCrossIcon, WarningIcon } from '../../icons/components';
import { consumeEvent } from '../../utilities/consumeEvent';
import { setRefInputValue } from '../../utilities/setRefInputValue';
import { Delay } from '../Delay';
import { FieldPopper, FieldPopperProps } from '../inputs/FieldPopper';
import { Placeholder } from '../inputs/Placeholder';
import { SearchInput } from '../inputs/SearchInput';
import { Loading } from '../Loading';
import { ChooseOptionList, ChooseOptionListProps } from './ChooseOptionList';
import { DEFAULT_RENDER_OPTION, EXTRACTOR } from './options';


//
// Choose
//

export interface ChooseProps<O, G = O[]> extends
    Omit<FieldPopperProps, 'show' | 'onShowChange' | 'renderPopper'>,
    Pick<ChooseOptionListProps<O, G>, 'extractor' | 'renderEmpty' | 'renderGroupLabel' | 'renderOption'> {

    // Field

    /**
     * Class name to pass to the wrapper.
     */
    fieldClassName?: string;

    // Popper

    /**
     * Class name to pass to the popper.
     */
    popperClassName?: string;

    // Input

    /** 
     * Default value for the uncontrolled version.
     */
    defaultValue?: string,

    /** 
     * Value for the controlled version.
     */
    value?: string,

    /**
     * Placeholder to show inside the input if it is empty.
     */
    placeholder?: string,

    // ChooseOptionList


    // Choose

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

}

/**
 *
 * The `onBlur` event is fired on two circumstantes: (1) when a full
 * blur occurs, and (2) when the field is blurred and the popper.
 *
 */
export const Choose = forwardRef(<O, G = O[]>(
    props: ChooseProps<O, G> & React.InputHTMLAttributes<HTMLInputElement>,
    inputRef: Ref<HTMLInputElement>
) => {

    // Properties

    const {

        // Field

        variant,

        label,
        start,
        end,

        shrink,
        focus,
        disabled,
        error,

        onBlur,

        withFullWidth,
        withFullHeight,

        tabIndex = 0,
        fieldClassName,

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

        onChange,

        // Rest goes to Input

        ...inputProps

    } = props;

    // Assertions

    if (process.env.NODE_ENV !== 'production') {
        if (withSearch && !_isFunction(supplier)) {
            console.error('Provided withSearch parameter without providing an option supplier function.  Try setting options to `(query) => [[ ... ]]`.');
        }
    }

    // State

    const fieldRef = useRef<HTMLDivElement>(null);

    const [show, setShow] = useState(false);
    const handleShow = () => { if (!show) { setShow(true); } };
    const handleHide = () => { if (show) { setShow(false); } };

    const [query, setQuery] = useState<string>('');
    const queryRef = useRef<HTMLInputElement>(null);

    const [internalValue, handleChangeInternalValue] = useInternalizeValue('', props.defaultValue, props.value, onChange);

    const internalInputRef = useObservableValueRef<HTMLInputElement>(null);
    useImperativeHandle(inputRef, () => internalInputRef.current!);

    const chosenValue = internalValue;
    const [chosenOption, setChosenOption] = useState<O | undefined>(undefined);

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

    // Wait for the `getPromisedOptions` to settle 
    // to display the optiopn list.

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

    // Wait for the `getPromisedChosenOption` to settle 
    // to display the chosen option.

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
        setRefInputValue(internalInputRef, value);
        setChosenOption(option);

        // Reset the query.
        setQuery('');

        // Hide de popper if necessary.
        if (withHideOnChoose) {
            fieldRef.current!.focus();
            setShow(false);
        }

        fieldRef.current?.focus();

    }, [identifier, internalInputRef, withHideOnChoose, fieldRef]);

    // Options

    const { selected, onKeyDown: onNavigatorKeyDown } = useOptionsKeyNavigator(options, { extractor, onChoose: handleChoose })

    // Action Handlers

    const handleClearQuery = () => {

        // Clear the chosen value and option.
        setRefInputValue(internalInputRef, '');
        setChosenOption(undefined);

        // Reset the query.
        setQuery('');

    };

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const value = e.target.value;
        setQuery(value);

    };

    const handleClearClick = (e: React.MouseEvent) => {

        e.stopPropagation(); // Prevent wrapper click.
        handleClearQuery();

    };

    // Handlers

    const handleKeyDown = (e: KeyboardEvent) => {

        switch (e.key) {
            case 'ArrowUp':
            case 'ArrowDown':
                handleShow();
                break;
        }
        onNavigatorKeyDown(e);

    };

    const handleKeyBlur = () => {

        setQuery('');
        handleHide();
        fieldRef.current?.focus();

    };

    const handleFullBlur = () => {

        setQuery('');
        handleHide();

    };

    // Render Chosen Option

    const option = () => (
        <Placeholder error={error} placeholder={placeholder}>
            {chosenOption ? renderChosen({ option: chosenOption }) : undefined}
        </Placeholder>
    );

    // Render Popper

    const renderOptions = () => (
        <div className="divide-y divide-control-border">

            {withSearch &&
                <div className="lux-p-2em">
                    <SearchInput
                        ref={queryRef}
                        withFullWidth
                        loading={loading > 0}
                        loadingError={loadingError}
                        value={query}
                        onChange={handleQueryChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Buscar..."
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

    // Wait for the popper to render and on the next tick focus the search input
    // if there is a reference to it. The `queryRef` will only be populated if
    // the `withSearch` parameter is set.

    useLayoutEffect(() => {
        setTimeout(() => queryRef?.current?.focus(), 0);
    }, [show]);

    // Render

    return (
        <FieldPopper

            ref={fieldRef}
            tabIndex={tabIndex}

            // Field

            variant={variant}

            label={label}
            start={start}
            end={
                <>
                    {end}
                    {loading ? <Delay><Loading /></Delay> : null}
                    {loadingError ? <WarningIcon className="text-danger-500" /> : null}
                    {withClear && <CircleCrossIcon onClick={handleClearClick} />}
                    <AngleDownIcon />
                </>
            }

            shrink={shrink || props.placeholder != null || internalValue.length > 0}
            focus={focus || show}
            disabled={disabled}
            error={error}

            onFocus={handleShow}
            onBlur={onBlur}

            onKeyDown={handleKeyDown}
            onClick={handleShow}

            withFullWidth={withFullWidth}
            withFullHeight={withFullHeight}

            className={classnames('focus:outline-none cursor-pointer', fieldClassName)}

            // Popper

            withPlacement={withPlacement}
            withArrow={withArrow}
            withSameWidth={withSameWidth}

            // FieldPopper

            show={show}
            onKeyBlur={handleKeyBlur}
            onFullBlur={handleFullBlur}

            renderPopper={renderOptions}
            popperClassName={popperClassName}

        >

            {option()}

            <input

                ref={internalInputRef}
                tabIndex={-1}

                type="text"

                onChange={handleChangeInternalValue}

                className="absolute left-0 top-0 text-xs w-full text-black opacity-10 pointer-events-none"

                {...inputProps}

            />

        </FieldPopper>
    );

});

