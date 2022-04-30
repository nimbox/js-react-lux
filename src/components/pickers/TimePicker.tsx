import classNames from 'classnames';
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { AngleDownIcon, AngleUpIcon, CircleIcon, ClockIcon } from '../../icons/components';
import { consumeEvent } from '../../utilities/consumeEvent';
import { setRefInputValue } from '../../utilities/setRefInputValue';
import { FieldPopper } from '../inputs/FieldPopper';
import { InputProps } from '../inputs/Input';
import { PlainInput } from '../inputs/PlainInput';
import { HTMLPopperElement, PopperProps } from '../Popper';


//
// TimePicker
//

interface TimePickerProps extends
    InputProps,
    Pick<PopperProps, 'withPlacement' | 'withArrow' | 'withSameWidth'> {

    // Input

    /** 
     * Name used for the input element and returned in the change event. 
     */
    name?: string,

    /** 
     * String representation of the time (for uncontrolled). 
     */
    defaultValue?: string,

    /** 
     * String representation of the time (for controlled). 
     */
    value?: string,

    /** 
     * Change event handler (for controlled). 
     */
    onChange?: React.ChangeEventHandler<HTMLInputElement>,

    // Configuration

    /** 
     * Parse time function defaults to parsing dd:mm ampm into [hh, mm]. 
     */
    parseTime?: (s: string) => [number, number] | null;

    /** 
     * Format hour function defaults to formatting [hh] into hh (12 hour based). 
     */
    formatHour?: (hour: number) => string;

    /** 
     * Format time function defaults to formatting [hh, mm] into hh:mm ampm (12 hour based). 
     */
    formatTime?: (time: [number, number]) => string;

    // Styling

    /** 
     * Classes to append to the popper element. 
     */
    popperClassName?: string;

}

// Constants

const morning = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const noon = [12];
const afternoon = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

const minutes = [15, 30, 45];

/**
 * TimePicker. Select a time with one click.
 */
export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps & React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {

    // properties

    const {

        name,
        defaultValue,
        value,
        onChange,

        parseTime = internalParseTime,
        formatHour = internalFormatHour,
        formatTime = internalFormatTime,

        // Popper

        withPlacement,
        withArrow,
        withSameWidth,

        popperClassName,

        // Input

        ...inputProps

    } = props;

    // configuration


    const { t } = useTranslation(['lux']);

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    // Maintain an internalValue to use the internal input as controlled,
    // and only update internalValue only when the DatePicker is controlled.
    const [controlled] = useState(value != null);
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    useEffect(() => { if (controlled) { setInternalValue(value || ''); } }, [controlled, value]);

    // State

    const times = useRef({ watch: 8 });
    const timesRef = useRef<HTMLDivElement>(null);
    useEffect(() => { scroll() });

    // Popper states

    const [show, setShow] = useState(false);
    const popperRef = useRef<HTMLPopperElement>(null);
    useOnOutsideClick(show, () => { if (show) { setShow(false); } }, inputRef.current, popperRef.current);

    // Handlers

    const handleShow = () => {
        if (!show) { setShow(true); }
    };
    const handleHide = () => {
        if (show) { setShow(false); }
    };

    const handleFocus = handleShow;
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        handleFinalValue();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {

        switch (e.key) {
            case 'Tab': // tab
            case 'Enter': // enter
                handleFinalValueTime(parseTime(internalValue));
                break;

            default:
                handleShow();
        }

    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e);
        if (value == null) {
            // set internal value if uncontrolled
            setInternalValue(e.target.value);
        }
    }

    // navigation

    const handleClickPrevHour = () => {
        if (times.current.watch > 0) {
            times.current.watch = times.current.watch - 1;
            scroll();
        }
    };

    const handleClickNoon = () => {
        times.current.watch = 8;
        scroll();
    };

    const handleClickNextHour = () => {
        if (times.current.watch < 14) {
            times.current.watch = times.current.watch + 1;
            scroll();
        }
    };

    const handleClickTime = (e: React.MouseEvent<HTMLElement>, time: [number, number]) => {
        handleFinalValueTime(time);
        handleHide();
    };

    const scroll = () => {
        if (timesRef.current) {
            const t = timesRef.current;
            let h = t.scrollHeight / 24;
            t.scrollTop = times.current.watch * h;
        }
    };


    // handle final values

    const handleFinalValue = () => {
        const finalTime = parseTime(internalValue);
        handleFinalValueTime(finalTime);
    }

    const handleFinalValueTime = (finalTime: [number, number] | null) => {
        const finalValue = finalTime != null ? formatTime(finalTime) : '';
        setRefInputValue(inputRef, finalValue);
        handleHide();
    }

    // setup

    const now = new Date();

    now.getHours();

    const v = parseTime(internalValue);
    const selected = v ? v : [-1, -1];

    // format

    function hourClasses(time: number[]) {

        if (time[0] === selected[0]) {
            return 'text-white bg-primary-500 group hover:bg-secondary-300';
        }

        if (time[0] === now.getHours()) {
            return 'text-white bg-info-500 group hover:bg-secondary-300';
        }

        return 'group hover:bg-secondary-300';

    }

    function hourMinuteClasses(time: number[]) {

        if (time[0] === selected[0]) {
            if (time[1] === selected[1]) {
                return 'text-xs text-white group-hover:text-content hover:bg-secondary-500';
            } else {
                return 'text-xs text-primary-500 group-hover:text-content hover:bg-secondary-500';
            }
        }

        if (time[0] === now.getHours()) {
            return 'text-xs text-white group-hover:text-content hover:bg-secondary-500';
        }

        return 'text-xs text-muted group-hover:text-content hover:bg-secondary-500';

    }

    // Render Popper

    const renderTime = () => (
        <div onMouseDown={consumeEvent}>

            <div className="px-2 py-1 flex flex-row items-center justify-between border-b border-control-border">
                <div className="flex-grow text-center font-bold">
                    {/* {t('hour', { defaultValue: 'Hour' })} */}
                </div>
                <div className="flex-none space-x-2">
                    <button type="button" className="focus:outline-none" onClick={handleClickPrevHour}><AngleUpIcon /></button>
                    <button type="button" className="focus:outline-none" onClick={handleClickNoon}><CircleIcon /></button>
                    <button type="button" className="focus:outline-none" onClick={handleClickNextHour}><AngleDownIcon /></button>
                </div>
            </div>

            <div ref={timesRef} className="h-64 overflow-scroll">
                <table className="table-fixed text-center" style={{ width: '12em' }}>

                    <thead>
                        <tr>
                            <th style={{ width: '3em' }}></th>
                            {minutes.map(m => <td key={m} className="w-10" style={{ width: '3em' }}></td>)}
                        </tr>
                    </thead>

                    <tbody className="cursor-pointer">
                        {morning.map(h =>
                            <tr key={h} className={hourClasses([h, 0])}>
                                <th className="text-base group-hover:text-content group-hover:bg-secondary-500" onClick={e => handleClickTime(e, [h, 0])}>{formatHour(h)}</th>
                                {minutes.map(m =>
                                    <td key={m} onClick={e => handleClickTime(e, [h, m])} className={hourMinuteClasses([h, m])}>{m}</td>
                                )}
                            </tr>
                        )}
                    </tbody>

                    <tbody className="bg-gray-200 cursor-pointer">
                        {noon.map(h =>
                            <tr key={h} className={hourClasses([h, 0])}>
                                <th className="text-base group-hover:text-content group-hover:bg-secondary-500" onClick={e => handleClickTime(e, [h, 0])}>{formatHour(h)}</th>
                                {minutes.map(m =>
                                    <td key={m} onClick={e => handleClickTime(e, [h, m])} className={hourMinuteClasses([h, m])}>{m}</td>
                                )}
                            </tr>
                        )}
                    </tbody>

                    <tbody className="cursor-pointer">
                        {afternoon.map(h =>
                            <tr key={h} className={hourClasses([h, 0])}>
                                <th className="text-base group-hover:text-content group-hover:bg-secondary-500" onClick={e => handleClickTime(e, [h, 0])}>{formatHour(h)}</th>
                                {minutes.map(m =>
                                    <td key={m} onClick={e => handleClickTime(e, [h, m])} className={hourMinuteClasses([h, m])}>{m}</td>
                                )}
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

        </div>
    );


    // Render

    return (
        <FieldPopper

            withToggle={false}

            show={show}
            onChangeShow={setShow}

            end={<ClockIcon onClick={handleFocus} className="cursor-pointer" />}

             // Popper

             withPlacement={withPlacement}
             withArrow={withArrow}
             withSameWidth={withSameWidth}

             renderPopper={renderTime}

            popperClassName={popperClassName}

        >

            <PlainInput type="text"

                ref={inputRef}
                name={name}

                defaultValue={defaultValue}
                value={value}
                onChange={handleChange}

                onFocus={handleFocus}
                onBlur={handleBlur}

                onKeyDown={handleKeyDown}

                autoComplete="off"

                {...inputProps}

            />

        </FieldPopper>

    );

});


//
// Default parse and format
//

/**
 * Parses a time in the simple format hh:mm(am|pm).
 *
 * @param {String} s - The string to parse
 * @return {Array[h, m]} - The time represented as an array
 */
function internalParseTime(s: string): [number, number] | null {

    var parse = /^\s*?([0-1]?\d)(?::([0-5]?\d)?)?\s*(AM?|PM?)?\s*$/i.exec(s);
    if (parse) {

        var h = +parse[1];
        if (h === 0 || h > 12) {
            return null;
        }

        var m = parse[2] ? +parse[2] : 0;
        if (parse[3]) {
            if (parse[3].match(/p/)) {
                h = (h === 12 ? 12 : h + 12);
            } else {
                h = (h === 12 ? 0 : h);
            }
        } else {
            if (h < 8) {
                h += 12;
            }
        }

        return [h, m];

    }

    return null;

}

/**
 * Formats an hour.
 *
 * @param Formats a time in
 */
function internalFormatHour(h: number): string {

    return String(h <= 12 ? (h > 0 ? h : 12) : (h - 12));

}

/**
 * Formats a time in the simple format hh:mm(am|pm).
 *
 * @param {Array[h, m]} hm - The time represented as an array
 * @returns {String} s - The formated string
 */
function internalFormatTime(hm: [number, number]): string {

    var h = hm[0], m = hm[1];
    if (h < 12) {
        if (h === 0) {
            h = 12;
        }
        return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + 'am';
    } else {
        if (h > 12) {
            h = h - 12;
        }
        return (h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + 'pm';
    }

}
