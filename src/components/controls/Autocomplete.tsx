import React, { Ref, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useCountOptions } from '../../hooks/useCountOptions';
import { useOptions, UseOptionsProps, UseOptionsSupplier } from '../../hooks/useOptions';
import { useOptionsKeyNavigator } from '../../hooks/useOptionsKeyNavigator';
import { WarningIcon } from '../../icons';
import { consumeEvent } from '../../utilities/consumeEvent';
import { setRefInputValue } from '../../utilities/setRefInputValue';
import { ChooseOptionList, ChooseOptionListProps } from '../choose/ChooseOptionList';
import { EXTRACTOR } from '../choose/options';
import { Delay } from '../Delay';
import { Loading } from '../Loading';
import { PopperProps } from '../Popper';
import { InputProps } from './Input';
import { PlainInput } from './PlainInput';
import { WrapperPopper } from './WrapperPopper';


//
// Autocomplete
//

export interface AutocompleteProps<O, G = O[]> extends
    InputProps,
    Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'>,
    Pick<ChooseOptionListProps<O, G>, 'extractor' | 'renderEmpty' | 'renderGroupLabel' | 'renderOption'> {

    // useSearchOptions

    /**
     * Options supplier function to pass to `useSearchOptions`.
     */
    supplier: UseOptionsSupplier<G>;

    /**
     * Options to pass to the `useSearchOptions`.
     */
    supplierProps?: UseOptionsProps<O, G>;

    // Autocomplete

    /**
     * Call this function when choosing an option.
     */
    onChoose?: (option: O) => void;

    /**
     * Convert the chosen option to a string to use as the inputs content.
     */
    renderChosen?: ({ option }: { option: O }) => string;

}

/**
 * Autocomplete.
 */
export const Autocomplete = React.forwardRef(<O, G = O[]>(
    props: AutocompleteProps<O, G> & React.InputHTMLAttributes<HTMLInputElement>,
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

        // Popper

        withPlacement,
        withArrow,
        withSameWidth,

        // Choose

        extractor = EXTRACTOR,
        onChoose,

        renderEmpty,
        renderGroupLabel,
        renderOption,

        // useSearchOptions

        supplier,
        supplierProps,

        // Input

        defaultValue,
        value: propsValue,
        onChange,

        renderChosen = ({ option }: { option: O }) => String(option),

        onKeyDown,

        ...inputProps

    } = props;

    // State

    const internalInputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(inputRef, () => internalInputRef.current!);

    // Value

    const isControlled = propsValue != null;
    const [internalValue, setInternalValue] = useState<string | ReadonlyArray<string> | number | undefined>(defaultValue ?? '');
    const value = isControlled ? propsValue : internalValue;

    // Options

    const { options, loading, error: loadingError, search } =
        useOptions(supplier, supplierProps);
    const { selected, onKeyDown: onNavigatorKeyDown } =
        useOptionsKeyNavigator(options, { extractor, onChoose: handleChoose })
    const count = useCountOptions(options, extractor);

    // Show

    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(count > 0);
    }, [value, count]);

    // Handlers

    const handleChangeShow = (show: boolean) => {
        if (!show) {
            setShow(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        search(e.target.value);
        if (!isControlled) {
            setInternalValue(e.target.value);
        }
        onChange?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onNavigatorKeyDown(e);
        onKeyDown?.(e);
    };

    // Choose

    function handleChoose(option: O) {
        const v = renderChosen({ option });
        setRefInputValue(internalInputRef, v);
        search();
        setShow(false);
        onChoose?.(option);
    };

    // Popper

    const popper = () => (
        <ChooseOptionList

            options={options}
            loading={loading}
            loadingError={loadingError}
            selected={selected}

            extractor={extractor}
            onChoose={handleChoose}

            renderEmpty={renderEmpty}
            renderGroupLabel={renderGroupLabel}
            renderOption={renderOption}

            onMouseDown={consumeEvent}

            className="divide-y"

        />
    );

    // Render 

    return (
        <WrapperPopper

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
                    {loading ?
                        <Delay>
                            <Loading style={{ marginRight: '0.5em' }} />
                        </Delay> :
                        null
                    }
                    {loadingError ?
                        <WarningIcon className="text-danger-500" style={{ marginRight: '0.5em' }} /> :
                        null
                    }
                </>
            }

            // Popper

            withPlacement={withPlacement}
            withArrow={withArrow}
            withSameWidth={withSameWidth}

            show={show}
            onChangeShow={handleChangeShow}
            renderPopper={popper}

        >

            <PlainInput

                ref={internalInputRef}

                disabled={disabled}
                error={error}

                defaultValue={defaultValue}
                value={propsValue}
                onChange={handleChange}

                onKeyDown={handleKeyDown}

                {...inputProps}

            />

        </WrapperPopper>
    );

});
