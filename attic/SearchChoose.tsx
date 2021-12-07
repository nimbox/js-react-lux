import classnames from 'classnames';
import React, { Ref, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useOptionsKeyNavigator } from '../../hooks/useOptionsKeyNavigator';
import { useSearchOptions, UseSearchOptionsProps, UseSearchOptionsProvider } from '../../hooks/useSearchOptions';
import { AngleDownIcon, WarningIcon } from '../../icons';
import { consumeEvent } from '../../utilities/consumeEvent';
import { setInputValue } from '../../utilities/setInputValue';
import { Context } from '../controls/Control';
import { SearchInput } from '../controls/SearchInput';
import { WrapperPopper, WrapperPopperProps } from '../controls/WrapperPopper';
import { Delay } from '../Delay';
import { Loading } from '../Loading';
import { ChooseOption, ChooseOptionProps } from './ChooseOption';
import { DEFAULT_RENDER_OPTION, EXTRACTOR } from './options';


export interface SearchChooseProps<G, O> extends Omit<WrapperPopperProps, 'show' | 'onChangeShow' | 'renderPopper'>,
    Pick<ChooseOptionProps<G, O>, 'extractor' | 'onChoose' | 'renderEmpty' | 'renderGroupLabel' | 'renderOption'> {

    //

    /**
     * Hide the popper after the user has selected an option.
     * @default true
     */
    withHideOnChoose?: boolean;

    provider: UseSearchOptionsProvider<G>;
    providerProps?: UseSearchOptionsProps<G, O>;
    identifier: (option: O) => string | number | undefined;

    /**
     * Render the chosen option.
     */
    renderChosen?: ({ option }: { option: O }) => React.ReactNode;

}

export const SearchChoose = React.forwardRef(<G, O>(
    props: SearchChooseProps<G, O> & React.InputHTMLAttributes<HTMLInputElement>,
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

        withHideOnChoose = true,

        provider,
        providerProps,
        identifier,

        extractor = EXTRACTOR,

        renderEmpty,
        renderGroupLabel,
        renderOption,
        renderChosen: renderChoosen = DEFAULT_RENDER_OPTION,

        placeholder,
        className,

        // Input

        defaultValue,
        value: propsValue,
        onChange,

        ...inputProps

    } = props;

    // State

    const internalInputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(inputRef, () => internalInputRef.current!);

    const [show, setShow] = useState(false);

    const isControlled = propsValue != null;
    const [internalValue, setInternalValue] = useState<string | ReadonlyArray<string> | number | undefined>(defaultValue ?? '');
    const value = isControlled ? propsValue : internalValue;

    const [searchValue, setSearchValue] = useState<string>('');

    // Options

    const { options, loading, loadingError: loadingError, search } = useSearchOptions(provider, providerProps);
    const { selected, onKeyDown: onNavigatorKeyDown } = useOptionsKeyNavigator(options, { extractor, onChoose: handleChoose })

    // Find the option in the provider everytime the value changes.
    const [chosen, setChosen] = useState<O | undefined>(undefined);
    useEffect(() => {
        if (options) {
            const option = options.map(group => extractor(group).find(o => identifier(o) === value)).find(o => o != null);
            if (option != null) {
                setChosen(option);
            }
        }
    }, [options, extractor, identifier, value]);

    // Handlers

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        if (!isControlled) {
            setInternalValue(e.target.value);
        }
    };

    // 

    const context = useContext(Context);
    const isError = error || context.error;

    function handleChoose(option: O) {
        if (!isControlled) {
            setInternalValue(identifier(option));
        }
        setInputValue(internalInputRef, identifier(option));
        if (withHideOnChoose) {
            setShow(false);
        }
    };

    const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        setSearchValue(v);
        search(v);
    };

    // Choosen

    const option = () => (
        <div className={classnames(isError && 'placeholder-danger-500')}>
            {chosen ?
                renderChoosen({ option: chosen }) :
                (placeholder ?? <>&nbsp;</>)
            }
        </div>
    );

    // Popper

    const popper = () => (
        <>

            <div className="lux-p-2em">
                <SearchInput
                    autoFocus
                    loading={loading}
                    loadingError={loadingError}
                    value={searchValue}
                    onChange={handleChangeSearchValue}
                    onKeyDown={onNavigatorKeyDown}
                />
            </div>

            <ChooseOption

                options={options}
                selected={selected}

                extractor={extractor}
                onChoose={handleChoose}

                renderEmpty={renderEmpty}
                renderGroupLabel={renderGroupLabel}
                renderOption={renderOption}

                onMouseDown={consumeEvent}

                className="divide-y-2"

            />

        </>
    );

    // Render

    return (
        <WrapperPopper

            tabIndex={0}

            variant={variant}
            withFullWidth={withFullWidth}

            error={error}
            disabled={disabled}

            start={start}
            end={
                <>
                    {end}
                    {loading ? <Delay><Loading style={{ marginRight: '0.5em' }} /></Delay> : null}
                    {loadingError ? <WarningIcon className="text-danger-500" style={{ marginRight: '0.5em' }} /> : null}
                    <AngleDownIcon className="stroke-2" style={{ marginRight: '0.5em' }} />
                </>
            }

            show={show}
            onChangeShow={setShow}
            renderPopper={popper}

            onKeyDown={onNavigatorKeyDown}

            className="cursor-pointer"

        >

            {option()}

            <input

                ref={internalInputRef}

                type="text"
                tabIndex={-1}
                disabled={true}

                defaultValue={defaultValue}
                value={propsValue}
                onChange={handleChange}

                {...inputProps}

                className="absolute inset-0 w-full text-center opacity-20 pointer-events-none"

            />

        </WrapperPopper>
    );

});
