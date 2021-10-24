import classNames from 'classnames';
import React, { useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { AngleLeftIcon, AngleRightIcon, CalendarIcon, CircleIcon } from '../../icons';
import { consumeEvent } from '../../utilities/consumeEvent';
import { setInputValue } from '../../utilities/setInputValue';
import { Input, InputProps } from '../controls/Input';
import { Popper, PopperPlacement } from '../Popper';


//
// DatePicker
//

export interface DatePickerProps extends InputProps {

    /** Name used for the input element and returned in the change event. */
    name?: string,

    /** String representation of the date (for uncontrolled). */
    defaultValue?: string,

    /** String representation of the date (for controlled). */
    value?: string,

    /** Change event handler (for controlled). */
    onChange?: React.ChangeEventHandler<HTMLInputElement>,

    /** Wether to show the shortcuts menu. */
    withShortcuts?: boolean

    /** Parse date function defaults to parsing dd-mm-yyyy into [yyyy, mm, dd] (with zero based month). */
    parseDate?: (s: string) => [number, number, number] | null;

    /** Format date function defaults to formatting [yyyy, mm, dd] (with zero based month) into dd-mm-yyy. */
    formatDate?: (date: [number, number, number]) => string;

    /** The first day of the week to display in the calendar. */
    firstDayOfWeek?: 0 | 1;

    /** Popper placement. */
    placement?: PopperPlacement;

    /** Classes to append to the popper element. */
    popperClassName?: string;

}

// constants

const namedDays = [
    { label: 'tomorrow', date: function (t: Date) { t.setDate(t.getDate() + 1); return t; } },
    { label: 'day-after-tomorrow', date: function (t: Date) { t.setDate(t.getDate() + 2); return t; } },
    { label: 'this-friday', date: function (t: Date) { t.setDate(t.getDate() + 5 - t.getDay()); return t; } },
    { label: 'next-monday', date: function (t: Date) { t.setDate(t.getDate() + 8 - t.getDay()); return t; } },
    { label: 'next-friday', date: function (t: Date) { t.setDate(t.getDate() + 8 + 4 - t.getDay()); return t; } },
    { label: 'in-two-weeks', date: function (t: Date) { t.setDate(t.getDate() + 15 - t.getDay()); return t; } },
    { label: 'next-month', date: function (t: Date) { t.setDate(1); t.setMonth(t.getMonth() + 1); if (t.getDay() === 6) { t.setDate(t.getDate() + 2); } if (t.getDay() === 0) { t.setDate(t.getDate() + 1); } return t; } },
    { label: 'in-two-months', date: function (t: Date) { t.setDate(1); t.setMonth(t.getMonth() + 2); if (t.getDay() === 6) { t.setDate(t.getDate() + 2); } if (t.getDay() === 0) { t.setDate(t.getDate() + 1); } return t; } }
];

/**
 * DatePicker. Select a date with one click.
 */
export const DatePicker = React.forwardRef<HTMLInputElement, DatePickerProps & React.InputHTMLAttributes<HTMLInputElement>>((props, ref) => {

    // properties

    const {

        name,
        defaultValue,
        value,
        onChange,

        withShortcuts = false,
        parseDate = internalParseDate,
        formatDate = internalFormatDate,

        firstDayOfWeek = 0,
        placement,
        popperClassName,

        ...inputProps

    } = props;

    // configuration

    const { t } = useTranslation(['lux']);

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current!);

    // Maintain an internalValue to use the internal input as controlled,
    // and only update internalValue only when the DatePicker is controlled.
    const [controlled] = useState(value != null);
    const [internalValue, setInternalValue] = useState<string>(defaultValue || '');
    useEffect(() => { if (controlled) { setInternalValue(value || ''); } }, [controlled, value]);

    // Calendar is the normalized first date having the week of the current date
    // starting at the firstDayOfWeek
    // (has day = 1, hour = 12, minute = 0, second = 0 and millis = 0)
    const [calendar, setCalendar] = useState(startOfMonth(parseDate(defaultValue || '')));
    useEffect(
        () => setCalendar(startOfMonth(parseDate(internalValue))),
        [parseDate, internalValue]
    );

    // Popper states
    const [show, setShow] = useState(false);
    const popperRef = useRef<HTMLInputElement>(null);
    useOnOutsideClick(show, () => { if (show) { setShow(false); } }, inputRef.current, popperRef.current);

    // handlers

    const handleShow = () => { if (!show) { setShow(true); } }
    const handleHide = () => { if (show) { setShow(false); } }

    const handleFocus = handleShow;
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        handleFinalValue();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.keyCode) {
            case 9: // tab
            case 13: // enter
                handleFinalValueDate(parseDate(internalValue));
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
    };

    // navigation

    const handleClickPrevMonth = () => {
        const c = new Date(calendar);
        c.setMonth(c.getMonth() - 1);
        setCalendar(c);
    };

    const handleClickToday = () => {
        const c = new Date();
        c.setDate(1);
        c.setHours(12, 0, 0, 0);
        setCalendar(c);
    };

    const handleClickNextMonth = () => {
        const c = new Date(calendar);
        c.setMonth(c.getMonth() + 1);
        setCalendar(c);
    };

    const handleClickDate = (e: React.MouseEvent<HTMLElement>, d: Date) => {
        handleFinalValueDate([d.getFullYear(), d.getMonth(), d.getDate()]);
        handleHide();
    };

    // handle final values

    const handleFinalValue = () => {
        const finalDate = parseDate(internalValue);
        handleFinalValueDate(finalDate);
    };

    const handleFinalValueDate = (finalDate: [number, number, number] | null) => {
        const finalValue = finalDate != null ? formatDate(finalDate) : '';
        setInputValue(inputRef, finalValue);
        handleHide();
    };

    // setup

    const today = new Date();
    today.setHours(12, 0, 0, 0);

    const v = parseDate(internalValue);
    const selected = v ? new Date(v[0], v[1], v[2], 12, 0, 0, 0) : null;

    // calculate weeks

    const weeks = useMemo(() => {
        const first = new Date(calendar.getTime());
        first.setDate(1 - first.getDay() + firstDayOfWeek); // beginning of week containing beginning of month
        const weeks = [];
        for (let i = 0; i < 6; i++) {
            let dates = [];
            for (let j = 0; j < 7; j++, first.setDate(first.getDate() + 1)) {
                dates.push(new Date(first.getTime()));
            }
            weeks.push(dates);
        }
        return weeks;
    }, [calendar, firstDayOfWeek]);

    // format

    function dayClasses(d: Date): string {

        let c = ['hover:text-white hover:bg-secondary-500'];

        if (d.getMonth() !== calendar.getMonth()) { c.push('text-muted bg-gray-200'); } // off
        if (d.getTime() === today.getTime()) { c.push('text-white bg-info-500'); } // today
        if (selected && d.getTime() === selected.getTime()) { c.push('text-white bg-primary-500'); } //selected

        return c.join(' ');

    }

    // render

    const months = t('months', { defaultValue: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], returnObjects: true }) as string[];
    const days = t('shortDays', { defaultValue: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], returnObjects: true }) as string[];

    return (
        <>
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

                end={<CalendarIcon onClick={handleFocus} className="px-1 cursor-pointer" style={{ fontSize: '1.5em' }} />}

                {...inputProps}
            />

            {show &&
                <Popper ref={popperRef} reference={inputRef.current!}
                    onMouseDown={consumeEvent}
                    placement={placement}
                    className={classNames('flex flex-row bg-content-fg border border-content-border rounded', popperClassName)}
                >

                    <div>

                        <div className="px-2 py-1 flex flex-row items-center justify-between bg-gray-400 rounded-t-sm">
                            <div className="flex-grow text-center font-bold">
                                {months![calendar.getMonth()]} {calendar.getFullYear()}
                            </div>
                            <div className="flex-none space-x-2">
                                <button type="button" className="focus:outline-none" onClick={handleClickPrevMonth}><AngleLeftIcon className="text-content stroke-current stroke-2" /></button>
                                <button type="button" className="focus:outline-none" onClick={handleClickToday}><CircleIcon className="text-content stroke-current stroke-2" /></button>
                                <button type="button" className="focus:outline-none" onClick={handleClickNextMonth}><AngleRightIcon className="text-content stroke-current stroke-2" /></button>
                            </div>
                        </div>

                        <table className="table-fixed text-center" style={{ width: '21em' }}>

                            <thead>
                                <tr>
                                    {weeks[0].map((d, i) =>
                                        <th key={i} className="" style={{ padding: '0 0.5em', width: '3em' }}>
                                            {days[d.getDay()]}
                                        </th>)
                                    }
                                </tr>
                            </thead>

                            <tbody className="cursor-pointer">
                                {weeks.map(w =>
                                    <tr key={w[0].getTime()}>
                                        {w.map(d =>
                                            <td key={d.getTime()} onClick={(e) => handleClickDate(e, d)} className={dayClasses(d)}>
                                                {d.getDate()}
                                            </td>
                                        )}
                                    </tr>
                                )}
                            </tbody>

                        </table>

                    </div>

                    {withShortcuts &&
                        <div className="flex flex-col justify-between items-stretch bg-gray-300 cursor-pointer">
                            {namedDays.map((s, i) => <div key={i} onClick={(e) => handleClickDate(e, s.date(new Date(today)))} className="px-2 truncate hover:text-white hover:bg-secondary-500">{t(`namedDays.${s.label}`, { defaultValue: s.label })}</div>)}
                        </div>
                    }

                </Popper>
            }

        </>
    );

});


//
// utilities
//

/**
 * Return a date representing the first date of the parsed value or the first 
 * date of the current month if the parsed value is invalid.
 * 
 * @param {String} s - The string to parse
 */
function startOfMonth(date: [number, number, number] | null): Date {

    const start = date ? new Date(date[0], date[1], date[2]) : new Date();
    start.setHours(12, 0, 0, 0);
    start.setDate(1);

    return start;

}

//
// default parse and format
//

/**
 * Parses a simple date in the format dd-mm-yyyy.
 * It is very lininent because it parses correctly dd, dd-mm, and dd-mm-yyyy.
 * It assumes the current date's month and year in the cases of an incomplete date.
 *
 * @param {String} s - The string to parse
 * @return {Array [ y, m, d ]} - The date represented as an array with a 0 based month
 */
function internalParseDate(s: string): [number, number, number] | null {

    var parse = /^\s*([0-3]?\d)(?:-(?:([0-1]?\d)?(?:-(\d{4})?)?)?)?\s*$/i.exec(s);
    if (parse) {

        var now = new Date();
        var d = +parse[1];
        var m = parse[2] ? +parse[2] - 1 : now.getMonth();
        var y = parse[3] ? +parse[3] : now.getFullYear();
        var valid = new Date(y, m, d, 12, 0, 0, 0);

        if (valid.getFullYear() === y && valid.getMonth() === m && valid.getDate() === d) {
            return [y, m, d];
        } else {
            return null;
        }

    }

    return null;

}

/**
 * Formats a date in the simple format dd-mm-yyyy.
 *
 * @param {Array [ y, m, d ]} ymd - The date representes as an array with a 0 based month
 * @returns {String} s - The formated string
 */
function internalFormatDate(ymd: [number, number, number]): string {

    var m = ymd[1] + 1;
    return (ymd[2] < 10 ? '0' + ymd[2] : ymd[2]) + '-' + (m < 10 ? '0' + m : m) + '-' + ymd[0];

}
