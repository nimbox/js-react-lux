import classNames from 'classnames';
import React, { FC, LegacyRef, Ref, useContext, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { AngleDownIcon, AngleUpIcon, CircleIcon } from '../../icons';
import { ComponentScale, controlScale } from '../ComponentScale';
import { Context } from '../controls/Control';
import { Input } from '../controls/Input';


//
// DatePicker
//

interface TimePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {

    /** Name used for the input element and returned in the change event. */
    name?: string,

    /** String representation of the time. */
    value?: string,


    scale?: ComponentScale;

    /** Change event handler. */
    onChange?: React.ChangeEventHandler<HTMLInputElement>,

    /** Input placeholder. */
    placeholder?: string

}

// constants

const morning = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
const noon = [12];
const afternoon = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

const minutes = [15, 30, 45];

/**
 * DatePicker. Select a date with one click.
 */
export const TimePicker =  React.forwardRef<HTMLInputElement, TimePickerProps>(({ name, scale = "base", placeholder, ...props }, ref) => {

    const inputRef = useRef<HTMLInputElement>();
    useImperativeHandle(ref, () => inputRef.current!);

    const [internalValue, setInternalValue] = useState('');

    useEffect(() => { setInternalValue(inputRef?.current?.value as string); }, [inputRef?.current?.value]);

    const { ready } = useTranslation();

    const [show, setShow] = useState(false);
 
    const [target, setTarget] = useState<HTMLDivElement | null>(null);
    const [popper, setPopper] = useState<HTMLDivElement | null>(null);
    useOnOutsideClick(() => { if (show) { setShow(false); } }, show, target, popper);

    const times = useRef({ watch: 8 });
    const timesRef = useRef<HTMLDivElement>(null);
    useEffect(() => { scroll() });

    const context = useContext(Context);

    // handlers

    const handleShow = () => { if (!show) { setShow(true); } }
    const handleHide = () => { if (show) { setShow(false); } }
    const handleFocus = handleShow;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.keyCode) {
            case 9: // tab
            case 13: // enter
                const hm = parseTime(internalValue);
                if (hm) { handleFinalChange(hm); }
                handleHide();
                break;

            default:
                handleShow();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //onChange({ target: { name, value: e.target.value } } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleFinalChange = (hm: [number, number]) => {
        //const value = formatTime(hm);
        //onChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>);
        handleHide();
    };

    function setRefValue(event: React.MouseEvent<HTMLElement, MouseEvent>, element: React.MutableRefObject<HTMLInputElement | undefined>, value: string) {
        event.preventDefault();
        event.stopPropagation();
        const inputSetter = Object?.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (inputSetter) {
            inputSetter.call(element.current, value);
            var inputEvent = new Event('input', { bubbles: true });
            element.current!.dispatchEvent(inputEvent);

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

    const handleClickTime = (e: React.MouseEvent<HTMLElement, MouseEvent>, hm: [number, number]) => {
        const value = formatTime(hm);
        setRefValue(e, inputRef, value);
        handleFinalChange(hm);
        handleHide();
    };

    const scroll = () => {

        if (timesRef.current) {
            const t = timesRef.current;
            let h = t.scrollHeight / 24;
            t.scrollTop = times.current.watch * h;
        }

    };

    // setup

    const v = parseTime(internalValue);
    const selected = v ? v : [-1, -1];

    // format

    function hourClasses(hm: number[]) {
        return hm[0] === selected[0] ? 'bg-info-500 text-white text-xs group hover:text-xs hover:bg-secondary-300' : 'group text-xs hover:text-xs hover:bg-secondary-300';
    }

    function hourMinuteClasses(hm: number[]) {
        if (hm[0] === selected[0]) {
            return hm[0] === selected[0] && hm[1] === selected[1] ?
                'text-white    text-base group-hover:text-content hover:text-base                    hover:bg-secondary-500' :
                'text-info-500           group-hover:text-content hover:text-base                    hover:bg-secondary-500';
        } else {
            return 'text-muted                                    hover:text-base hover:text-content hover:bg-secondary-500';
        }
    }

    // render

    return (
        <div className="relative">

            <div ref={setTarget as LegacyRef<HTMLDivElement> | undefined}>
                <Input key="input" ref={inputRef as Ref<HTMLInputElement> | undefined}
                    name={name} 
                    scale={context.scale ||scale}
                    onFocus={handleFocus} onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    autoComplete="off"
                    {...props}
                />
            </div>

            {ready && show &&
                <div ref={setPopper as LegacyRef<HTMLDivElement> | undefined} className="absolute left-0 mt-1 bg-content-fg border border-content-border rounded overflow-hidden z-10">

                    <div className="px-2 py-1 bg-gray-400">
                        <div className="text-right">
                            <button type="button" className="focus:outline-none" onClick={handleClickPrevHour}><AngleUpIcon className="h-4 w-4 text-content stroke-current stroke-2" /></button>
                            <button type="button" className="px-2 focus:outline-none" onClick={handleClickNoon}><CircleIcon className="h-4 w-4 text-content stroke-current stroke-2" /></button>
                            <button type="button" className="focus:outline-none" onClick={handleClickNextHour}><AngleDownIcon className="h-4 w-4 text-content stroke-current stroke-2" /></button>
                        </div>
                    </div>

                    <div ref={timesRef} className="h-64 overflow-scroll">
                        <table className="table-fixed text-center">

                            <thead>
                                <tr>
                                    <th className="w-10">Hora</th>
                                    {minutes.map(m => <td className="w-10"></td>)}
                                </tr>
                            </thead>

                            <tbody className="cursor-pointer">
                                {morning.map(h =>
                                    <tr key={h} className={hourClasses([h, 0])}>
                                        <th className="text-base group-hover:text-content group-hover:bg-secondary-500" onClick={e => handleClickTime(e, [h, 0])}>{formatHour(h)}</th>
                                        {minutes.map(m =>
                                            <td key={m} onClick={e => handleClickTime(e,[h, m])} className={hourMinuteClasses([h, m])}>{m}</td>
                                        )}
                                    </tr>
                                )}
                            </tbody>

                            <tbody className="bg-gray-200 cursor-pointer">
                                {noon.map(h =>
                                    <tr key={h} className={hourClasses([h, 0])}>
                                        <th className="text-base group-hover:text-content group-hover:bg-secondary-500" onClick={e => handleClickTime(e, [h, 0])}>{formatHour(h)}</th>
                                        {minutes.map(m =>
                                            <td key={m} onClick={e => handleClickTime(e,[h, m])} className={hourMinuteClasses([h, m])}>{m}</td>
                                        )}
                                    </tr>
                                )}
                            </tbody>

                            <tbody className="cursor-pointer">
                                {afternoon.map(h =>
                                    <tr key={h} className={hourClasses([h, 0])}>
                                        <th className="text-base group-hover:text-content group-hover:bg-secondary-500" onClick={e => handleClickTime(e, [h, 0])}>{formatHour(h)}</th>
                                        {minutes.map(m =>
                                            <td key={m} onClick={e => handleClickTime(e,[h, m])} className={hourMinuteClasses([h, m])}>{m}</td>
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
// parse and format
//

/**
 * Parses a time in the simple format hh:mm(am|pm).
 *
 * @param {String} s - The string to parse
 * @return {Array[h, m]} - The time represented as an array
 */
function parseTime(s: string): [number, number] | null {

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
function formatHour(h: number): string {

    return String(h <= 12 ? (h > 0 ? h : 12) : (h - 12));

}

/**
 * Formats a time in the simple format hh:mm(am|pm).
 *
 * @param {Array[h, m]} hm - The time represented as an array
 * @returns {String} s - The formated string
 */
function formatTime(hm: [number, number]): string {

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
