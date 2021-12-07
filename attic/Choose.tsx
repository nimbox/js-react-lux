import _isFunction from 'lodash/isFunction';
import React, { FC, Ref, useMemo, useState } from 'react';
import { SearchableOptionsProps, SearchableOptionsProvider, SearchOptionsProvider, useSearchableOptions } from '../src/hooks/useSearchableOptions';
import { AngleDownIcon } from '../src/icons';
import { Input } from '../src/components/controls/Input';
import { SearchInput } from '../src/components/controls/SearchInput';
import { WrapperProps } from '../src/components/controls/Wrapper';
import { WrapperPopper } from '../src/components/controls/WrapperPopper';
import { PopperProps } from '../src/components/Popper';
import { ChooseOption, ChooseOptionProps, DEFAULT_RENDER_GROUP_LABEL, DEFAULT_RENDER_OPTION } from '../src/components/choose/ChooseOption';
import { EXTRACTOR } from '../src/components/choose/options';


//
// Choose
//

export interface ChooseFooterProps<G, O> extends Pick<ChooseOptionProps<G, O>, 'options' | 'selected'> {

    /**
     * The search input value.
     */
    value?: string;

}

export interface ChooseProps<G, O> extends WrapperProps,
    Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'>,
    SearchableOptionsProps<G, O>,
    Omit<ChooseOptionProps<G, O>, 'options' | 'loading' | 'error' | 'selected'> {

    /**
     * Provide a list of options (in groups) to choose from.
     */
    provider: SearchableOptionsProvider<G>;

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

    /**
     * Hide the option list the user chooses an option.
     */
    withHideOnChoose?: boolean;

    // renderes

    /**
     * Render the footer with the given properties.
     */
    renderFooter?: (props: ChooseFooterProps<G, O>) => React.ReactNode;

    // styling

    /**
     * 
     */
    className?: string;

    /**
     * Classes to pass to the ChooseOption container.
     */
    containerClassName?: string;

    /**
     * 
     */
    children: FC<ChooseRenderProps> | React.ReactNode | undefined;

}

export interface ChooseRenderProps {

    show: boolean;

}

export const Choose = React.forwardRef(<G, O>(
    props: ChooseProps<G, O> & React.InputHTMLAttributes<HTMLInputElement>,
    ref: Ref<HTMLDivElement>
) => {

    const {

        variant,
        withFullWidth,

        provider,
        debounce = 0,
        extractor = EXTRACTOR,

        withPlacement: placement = 'bottom-start',
        withArrow = false,
        withSameWidth = false,

        renderGroupLabel = DEFAULT_RENDER_GROUP_LABEL,
        renderOption = DEFAULT_RENDER_OPTION,
        renderFooter,

        onChoose,
        withClearOnChoose = true,
        withHideOnChoose = true,

        start,
        end,

        error,
        disabled,

        className,
        containerClassName,

        children

    } = props;

    // configuration


    const [internalWrapperRef, setInternalWrapperRef] = useState<HTMLDivElement | null>(null);

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleHide = () => setShow(false);

    const [searchValue, setSearchValue] = useState('')

    const { options, loading: searchLoading, error: searchError, search,
        reset, selected, handleKeyDown: handleSearchKeyDown
    } = useSearchableOptions(provider, { debounce, extractor });

    const optionsCount = useMemo(() => options.reduce((a, l) => a + extractor(l).length, 0), [options, extractor])


    // handlers

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        switch (e.key) {

            case 'Escape':

                if (selected != null) {
                    e.preventDefault();
                    reset();
                } else {
                    handleHide();
                }
                break;

            // case 'Tab':
            case 'Enter':

                if (selected != null) {
                    e.preventDefault();
                    const group = options[selected[0]];
                    handleChoose(extractor(group)[selected[1]]);
                } else {
                    handleHide();
                }

                break;

            case 'ArrowUp':
            case 'ArrowDown':
                handleShow();
                break;

        }

        handleSearchKeyDown(e);

    };

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        search(value);
    };

    const handleLimitFocus = (e: React.FocusEvent<HTMLDivElement>) => {
        internalWrapperRef?.focus();
        handleHide();
    };

    // choose

    const handleChoose = (option: O) => {
        console.log('choose', option)
    };

    // popper

    const popper = () => {
        return (
            <div className="xw-96">
                <div tabIndex={0} onFocus={handleLimitFocus} />
                <div className="divide-y">

                    <div className="p-2">
                        <SearchInput

                            type="text"
                            autoFocus

                            value={searchValue}
                            onChange={handleOnChange}

                            onKeyDown={handleKeyDown}

                        />
                    </div>

                    <ChooseOption<G, O>

                        options={options}
                        selected={selected}
                        onChoose={onChoose}

                        renderOption={renderOption}

                        className="py-2"

                    />

                    {(searchValue && !searchLoading && optionsCount === 0) &&
                        <div className="p-2">
                            <Input type="text" value={searchValue} disabled />
                            <Input type="text" defaultValue="asd" onBlur={() => console.log('moving out')} />
                        </div>
                    }

                </div>
                <div tabIndex={0} onFocus={handleLimitFocus} />
            </div>
        );
    };

    // render

    return (
        <WrapperPopper

            ref={setInternalWrapperRef}

            withPlacement={placement}
            withArrow={withArrow}
            withSameWidth={withSameWidth}

            variant="outlined"
            tabIndex={0}

            show={show}
            onChangeShow={setShow}
            popper={popper}

            onKeyDown={handleKeyDown}

            onFocus={handleShow}

            end={<AngleDownIcon className="text-control-border stroke-2" style={{ marginRight: '0.5em' }} />}

        >

            {_isFunction(children) ? children({ show }) : children}

        </WrapperPopper>

    );

});
