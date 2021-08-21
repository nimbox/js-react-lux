import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { AngleDownIcon, AngleUpIcon, CircleIcon } from '../../icons';
import { Input } from '../controls/Input';
import { useTranslation } from 'react-i18next';


//
// TimePicker
//

interface TimePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {

    /** Name used for the input element and returned in the change event. */
    name?: string,

    /** String representation of the time (for uncontrolled). */
    defaultValue?: string,

    /** String representation of the time (for controlled). */
    value?: string,

    /** Change event handler (for controlled). */
    onChange?: React.ChangeEventHandler<HTMLInputElement>,

    /** Parse time function defaults to parsing dd:mm ampm into [hh, mm]. */
    parseTime?: (s: string) => [number, number] | null;

    /** Format hour function defaults to formatting [hh] into hh (12 hour based). */
    formatHour?: (hour: number) => string;

    /** Format time function defaults to formatting [hh, mm] into hh:mm ampm (12 hour based). */
    formatTime?: (time: [number, number]) => string;

}

// constants

const morning = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const noon = [12];
const afternoon = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

const minutes = [15, 30, 45];

/**
 * TimePicker. Select a time with one click.
 */
export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps>(({ name, defaultValue, value, onChange, parseTime = internalParseTime, formatHour = internalFormatHour, formatTime = internalFormatTime, ...props }, ref) => {

    const { t, ready } = useTranslation();

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    // Maintain an internalValue to use the internal input as controlled,
    // and only update internalValue only when the DatePicker is controlled.
    const [controlled] = useState(value != null);
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    useEffect(() => { if (controlled) { setInternalValue(value || ''); } }, [controlled, value]);

    // 
    const times = useRef({ watch: 8 });
    const timesRef = useRef<HTMLDivElement>(null);
    useEffect(() => { scroll() });

    // Popper states
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState<HTMLDivElement | null>(null);
    const [popper, setPopper] = useState<HTMLDivElement | null>(null);
    useOnOutsideClick(() => { if (show) { setShow(false); } }, show, target, popper);

    // handlers

    const handleShow = () => { if (!show) { setShow(true); } }
    const handleHide = () => { if (show) { setShow(false); } }

    const handleFocus = handleShow;
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        handleFinalValue();
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.keyCode) {
            case 9: // tab
            case 13: // enter
                handleFinalValueTime(parseTime(internalValue));
                break;

            default:
                handleShow();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            // bubble up change event regardless of 
            // controlled or uncontrolled
            onChange(e);
        }
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
        setFinalInputValue(finalValue);
        handleHide();
    }

    const setFinalInputValue = (inputValue: string) => {
        const setter = Object?.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (setter && inputValue !== '') {
            setter.call(inputRef.current, inputValue);
            inputRef.current!.dispatchEvent(new Event('input', { bubbles: true }));
        }
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

    // render

    return (
        <div className="relative">

            <div ref={setTarget}>
                <Input type="text"

                    ref={inputRef}
                    name={name}

                    defaultValue={defaultValue}
                    value={value}
                    onChange={handleChange}

                    onFocus={handleFocus}
                    onBlur={handleBlur}

                    onMouseDown={handleFocus}
                    onKeyDown={handleKeyDown}

                    autoComplete="off"

                    {...props}

                />
            </div>

            {show &&
                <div ref={setPopper} onMouseDown={(e) => { e.preventDefault(); }} className="absolute left-0 mt-1 bg-content-fg border border-content-border rounded overflow-hidden z-10">

                    <div className="px-2 py-1 flex flex-row items-center justify-between bg-gray-400">
                        <div className="flex-grow text-center font-bold">
                            {t('hour', { defaultValue: 'Hour' })}
                        </div>
                        <div className=" flex-none space-x-2">
                            <button type="button" className="focus:outline-none" onClick={handleClickPrevHour}><AngleUpIcon className="text-content stroke-current stroke-2" /></button>
                            <button type="button" className="focus:outline-none" onClick={handleClickNoon}><CircleIcon className="text-content stroke-current stroke-2" /></button>
                            <button type="button" className="focus:outline-none" onClick={handleClickNextHour}><AngleDownIcon className="text-content stroke-current stroke-2" /></button>
                        </div>
                    </div>

                    <div ref={timesRef} className="h-64 overflow-scroll">
                        <table className="table-fixed text-center" style={{ width: '12em' }}>

                            <thead>
                                <tr>
                                    <th style={{ width: '3em' }}></th>
                                    {minutes.map(m => <td className="w-10" style={{ width: '3em' }}></td>)}
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
            }

        </div>
    );

});


//
// default parse and format
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
