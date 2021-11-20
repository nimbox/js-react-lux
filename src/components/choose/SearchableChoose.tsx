import React, { Ref, useCallback, useRef, useState } from 'react';
import { useOptionsKeyNavigator } from '../../hooks/useOptionsKeyNavigator';
import { UseSearchOptionsProps, UseSearchOptionsProvider, useSearchOptions } from '../../hooks/useSearchOptions';
import { AngleDownIcon } from '../../icons';
import { WrapperPopper } from '../controls/WrapperPopper';
import { OptionsExtractor } from './options';
import { SearchableChooseOption, SearchableChooseOptionProps } from './SearchableChooseOption';


export interface SearchableChooseProps<G, O> extends
    Pick<SearchableChooseOptionProps<G, O>, 'withClearOnChoose' | 'renderEmtpy' | 'renderGroupLabel' | 'renderOption' | 'renderFooter'> {

    withHideOnChoose?: boolean;

    //

    provider: UseSearchOptionsProvider<G>;

    providerProps?: UseSearchOptionsProps<G, O>;

    //

    extractor: OptionsExtractor<G, O>;

    onChoose: (option: O) => void;

}

export const SearchableChoose = React.forwardRef(<G, O>(
    props: SearchableChooseProps<G, O> & React.HTMLAttributes<HTMLDivElement>,
    ref: Ref<HTMLDivElement>
) => {

    // properties

    const {

        withClearOnChoose,
        withHideOnChoose,

        provider,
        providerProps,

        extractor,
        onChoose,

        renderEmtpy,
        renderGroupLabel,
        renderOption,
        renderFooter,

        children,

    } = props;

    // state

    const [show, setShow] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // handlers

    const handleChoose = useCallback((option: O) => {
        onChoose(option);
        if (show && withHideOnChoose) {
            setShow(false);
            wrapperRef.current?.focus();
        }
    }, [show, onChoose, withHideOnChoose]);

    // options

    const { search: search, ...searchable } = useSearchOptions(provider, providerProps);
    const { onKeyDown, ...navigator } = useOptionsKeyNavigator(searchable.options, { extractor, onChoose: handleChoose });

    // show and hide

    const handleShow = useCallback(() => {
        search()
        setShow(true);
    }, []);

    const handleToggle = useCallback(() => {
        setShow(show => !show);
    }, []);

    const handleHide = useCallback(() => {
        setShow(false);
    }, []);

    // show on focus or click

    const isMouseDown = useRef(false);
    const handleMouseDown = useCallback(() => {
        isMouseDown.current = true;
    }, []);

    const handleFocus = useCallback(() => {
        if (!isMouseDown.current) {
            handleShow();
        }
    }, [handleShow]);

    const handleClick = useCallback(() => {
        handleToggle();
    }, [handleToggle]);

    const handleMouseUp = useCallback(() => {
        isMouseDown.current = false;
    }, []);

    //

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {

        switch (e.key) {

            case 'Escape':
                handleHide();
                break;

            case 'ArrowUp':
            case 'ArrowDown':
                handleShow();
                break;

        }

        onKeyDown(e);

    }, [handleShow, handleHide, onKeyDown]);

    // popper

    const popper = () =>
        <SearchableChooseOption

            autoFocus
            withClearOnChoose={withClearOnChoose}

            search={search}
            {...searchable}
            {...navigator}

            extractor={extractor}
            onChoose={handleChoose}

            onKeyDown={onKeyDown}

            renderEmtpy={renderEmtpy}
            renderGroupLabel={renderGroupLabel}
            renderOption={renderOption}
            renderFooter={renderFooter}

            className="divide-y-2"

        />;

    // render

    return (
        <WrapperPopper

            ref={wrapperRef}
            tabIndex={0}

            show={show}
            onHide={handleHide}
            onTabOutside={handleHide}
            popper={popper}

            onKeyDown={show ? onKeyDown : undefined}

            onMouseDown={handleMouseDown}
            onFocus={handleFocus}
            onClick={handleClick}
            onMouseUp={handleMouseUp}

            end={<AngleDownIcon className="text-control-border stroke-2" style={{ marginRight: '0.5em' }} />}

        >
            {children}
        </WrapperPopper>
    );

});