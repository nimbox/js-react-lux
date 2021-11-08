import classnames from 'classnames';
import _isFunction from 'lodash/isFunction';
import React, { FC, Ref, useImperativeHandle, useRef, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { usePreviousState } from '../../hooks/usePreviousState';
import { AngleDownIcon, WarningIcon } from '../../icons';
import { Wrapper, WrapperProps } from '../controls/Wrapper';
import { Delay } from '../Delay';
import { Loading } from '../Loading';
import { Popper, PopperProps } from '../Popper';
import { ChooseOption, ChooseOptionProps } from './ChooseOption';
import { defaultGetOptions, defaultRenderGroupLabel, defaultRenderOption } from './ChooseOptionList';


//
// Choose
//

export interface ChooseProps<G, O> extends WrapperProps,
    Pick<PopperProps, 'placement' | 'withArrow' | 'withSameWidth'>,
    Pick<ChooseOptionProps<G, O>, 'withSearch' | 'getOptions' | 'searchOptions' | 'renderGroupLabel' | 'renderOption' | 'renderFooter' | 'onChoose'> {


    loading?: boolean;

    loadingError?: boolean;

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

        searchOptions,
        getOptions = defaultGetOptions,

        loading,
        loadingError,

        placement = 'bottom-start',
        withArrow = false,
        withSameWidth = false,

        renderGroupLabel = defaultRenderGroupLabel,
        renderOption = defaultRenderOption,
        renderFooter,

        onChoose,
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

                    placement={placement}
                    withArrow={withArrow}
                    withSameWidth={withSameWidth}

                    className="bg-control-bg"

                >

                    <div tabIndex={0} onFocus={handleLimitFocus} />

                    <ChooseOption

                        ref={chooseOptionRef}

                        withSearch={withSearch}

                        onHide={handleHide}
                        onChoose={handleChoose}

                        searchOptions={searchOptions}
                        getOptions={getOptions}

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
