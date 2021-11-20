import classnames from 'classnames';
import _isFunction from 'lodash/isFunction';
import React, { FC, Ref, useImperativeHandle, useRef, useState } from 'react';
import { useOnOutsideClick } from '../src/hooks/useOnOutsideClick';
import { usePreviousState } from '../src/hooks/usePreviousState';
import { AngleDownIcon, WarningIcon } from '../src/icons';
import { Wrapper, WrapperProps } from '../src/components/controls/Wrapper';
import { Delay } from '../src/components/Delay';
import { Loading } from '../src/components/Loading';
import { Popper, PopperProps } from '../src/components/Popper';
import { SearchableChooseOption, SearchableOptionProps } from '../src/components/choose/SearchableChooseOption';
import { defaultGetOptions, DEFAULT_RENDER_GROUP_LABEL, DEFAULT_RENDER_OPTION } from '../src/components/choose/ChooseOption';


//
// Choose
//

export interface ChooseProps<G, O> extends WrapperProps,
    Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'>,
    Pick<SearchableOptionProps<G, O>, 'withSearch' | 'withClearOnChoose' | 'getOptions' | 'searchOptions' | 'renderGroupLabel' | 'renderOption' | 'renderFooter' | 'onChoose'> {


    loading?: boolean;

    loadingError?: boolean;

    /**
     * Hide the option list the user chooses an option.
     */
     withHideOnChoose?: boolean;

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

        withSearch,

        provider: searchOptions,
        extractor: getOptions = defaultGetOptions,

        loading,
        loadingError,

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

    const chooseOptionRef = useRef<HTMLDivElement>(null);
    const chooseOptionInputRef = useRef<HTMLInputElement & { handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void }>(null);

    // popper show and hide

    const [show, setShow] = useState(false);
    const previousShow = usePreviousState(show);

    const [wrapperRef, setWrapperRef] = useState<HTMLDivElement | null>(null);
    const [popperRef, setPopperRef] = useState<HTMLDivElement | null>(null);
    useOnOutsideClick(show, () => { if (show) { setShow(false); } }, wrapperRef, popperRef);

    useImperativeHandle(ref, () => wrapperRef!);

    const handleShow = () => {
        if (!show) {
            setShow(true);
        }
    };
    const handleHide = () => {
        setShow(false);
        wrapperRef?.focus();
    };

    // handle keyboard and mouse

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

        switch (e.key) {

            case 'Escape':
                handleHide();
                break;

            case 'ArrowUp':
            case 'ArrowDown':
                handleShow();
                break;

        }

        if (show && chooseOptionInputRef.current) {
            chooseOptionInputRef.current.handleKeyDown(e);
        }

    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (document.activeElement === wrapperRef) {
            setShow(!show)
        }
    };

    // handle focus

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!previousShow) {
            handleShow();
        }
    };

    const handleLimitFocus = (e: React.FocusEvent<HTMLDivElement>) => {
        wrapperRef?.focus();
        handleHide();
    };

    // handlers

    const handleChoose = (option: O) => {
        console.log('handleChoose');
        onChoose(option);
        if (withHideOnChoose) {
            handleHide();
        }
    };

    // render

    console.log('render', show, previousShow);

    return (
        <>
            <Wrapper

                ref={setWrapperRef}
                tabIndex={0}

                variant={variant}
                withFullWidth={withFullWidth}

                onKeyDown={handleKeyDown}
                onClick={handleClick}
                onFocus={handleFocus}

                disabled={disabled}
                error={error}

                start={start}
                end={
                    <>
                        {end}
                        {loading && <Delay><Loading colorClassName="text-control-border" /></Delay>}
                        {loadingError ? <WarningIcon className="text-danger-500 stroke-2" /> : <AngleDownIcon className="text-control-border stroke-2" />}
                    </>
                }

                className={className}

            >

                {_isFunction(children) ? children({ show }) : children}

            </Wrapper>

            {show &&
                <Popper

                    ref={setPopperRef}
                    reference={wrapperRef!}

                    withPlacement={placement}
                    withArrow={withArrow}
                    withSameWidth={withSameWidth}

                    className="bg-control-bg"

                >

                    <div tabIndex={0} onFocus={handleLimitFocus} />

                    <SearchableChooseOption

                        ref={chooseOptionRef}

                        withSearch={withSearch}
                        withClearOnChoose={withClearOnChoose}

                        onHide={handleHide}
                        onChoose={handleChoose}

                        provider={searchOptions}
                        extractor={getOptions}

                        renderGroupLabel={renderGroupLabel}
                        renderOption={renderOption}
                        renderFooter={renderFooter}

                        className={classnames('border border-control-border rounded', containerClassName)}

                    />

                    <div tabIndex={0} onFocus={handleLimitFocus} />

                </Popper>
            }

        </>
    );

});
