import classnames from 'classnames';
import _debounce from 'lodash/debounce';
import _isFunction from 'lodash/isFunction';
import React, { FC, Ref, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { AngleDownIcon, WarningIcon } from '../../icons';
import { consumeEvent } from '../../utilities/consumeEvent';
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
        withFullWidth: withNoFull,

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

        start,
        end,

        error,
        disabled,

        className,
        containerClassName,

        children

    } = props;

    // configuration

    const chooseOptionRef = useRef<HTMLInputElement & { handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void }>(null);

    // popper show and hide

    const [show, setShow] = useState(false);
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

        if (show) {
            chooseOptionRef.current!.handleKeyDown(e);
        }

    }

    console.log('defining handleClick', show);
    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {

        console.log('handleClick', show);

        if (show) {
            console.log('handleClick', show);
            e.preventDefault();
            e.stopPropagation();
            handleShow();
        }


        // if (document.activeElement != null && document.activeElement === wrapperRef) { 


    };

    // handle focus

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        console.log('handleFocus');
        handleShow();
        e.stopPropagation();
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!withSearch && show) {
            setShow(false);
        }
    };

    // handlers

    const handleChoose = (option: O) => {
        onChoose(option);
        handleHide();
    };

    // render

    return (
        <>
            <Wrapper

                ref={setWrapperRef}
                tabIndex={0}

                variant={variant}
                withFullWidth={withNoFull}

                onKeyDown={handleKeyDown}
                onClickCapture={handleClick}

                onFocus={handleFocus}
                onBlur={handleBlur}

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

                    <ChooseOption

                        ref={chooseOptionRef}

                        withSearch={withSearch}

                        onBlur={handleHide}

                        onHide={handleHide}
                        onChoose={handleChoose}

                        searchOptions={searchOptions}
                        getOptions={getOptions}

                        renderGroupLabel={renderGroupLabel}
                        renderOption={renderOption}
                        renderFooter={renderFooter}

                        containerClassName={classnames('border border-control-border rounded', containerClassName)}

                    />

                </Popper>
            }

        </>
    );

});
