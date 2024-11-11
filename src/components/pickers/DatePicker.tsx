import classNames from 'classnames';
import React, { forwardRef, InputHTMLAttributes, ReactElement, Ref, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInternalizeValue } from '../../hooks/useInternalizeValue';
import { useObservableValueRef } from '../../hooks/useObservableValueRef';
import { AngleLeftIcon, AngleRightIcon, CalendarIcon, CircleIcon } from '../../icons/components';
import { consumeEvent } from '../utilities/consumeEvent';
import { setRefInputValue } from '../utilities/setRefInputValue';
import { InputPopper, InputPopperProps } from '../inputs/InputPopper';


//
// DatePicker
//

export interface DatePickerProps extends Omit<InputPopperProps, 'show' | 'onShowChange' | 'renderPopper'> {

    // DatePicker

    /** 
     * The first day of the week to display in the calendar. 
     */
    firstDayOfWeek?: number;

    /** 
    * Parse date function defaults to parsing dd-mm-yyyy into [yyyy, mm, dd]
    * (with zero based month). 
    */
    parseDate?: (s: string) => [number, number, number] | null;

    /** 
     * Format date function defaults to formatting [yyyy, mm, dd] (with zero
     * based month) into dd-mm-yyy. 
     */
    formatDate?: (date: [number, number, number]) => string;

    // Styling

    /**
     * Wether to show the shortcuts menu. 
     */
    withShortcuts?: boolean

}

// Constants

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
export const DatePicker = forwardRef((
    props: DatePickerProps & InputHTMLAttributes<HTMLInputElement>,
    inputRef: Ref<HTMLInputElement>
) => {

    // Properties

    const {

        // Field

        end,

        // InputPopper

        onChange,

        // DatePicker

        firstDayOfWeek = 0,
        parseDate = internalParseDate,
        formatDate = internalFormatDate,

        withShortcuts = false,

        // Rest goes to InputPopper

        ...inputPopperProps

    } = props;

    // State

    const [show, setShow] = useState(false);

    const [internalValue, handleChangeInternalValue] = useInternalizeValue('', props.defaultValue, props.value, onChange);
    const internalInputRef = useObservableValueRef<HTMLInputElement>(null);
    useImperativeHandle(inputRef, () => internalInputRef.current!);

    const handleChange = (date: [number, number, number] | null) => {
        const value = date != null ? formatDate(date) : '';
        setRefInputValue(internalInputRef, value);
        internalInputRef.current?.select();
        setShow(false);
    };

    const handleFinalize = (): string | null => {
        const finalDate = parseDate(internalValue);
        return finalDate != null ? formatDate(finalDate) : null;
    };

    // Calendar State

    // Selected is the current date shown in the input as long as it is parsable
    // with `formatDate`. It is `null` otherwise.

    const selected = useMemo(() => {
        return parseDate(internalValue);
    }, [parseDate, internalValue]);

    // Adornment

    const adornment = (
        <CalendarIcon
            onMouseDown={consumeEvent}
            className="cursor-pointer"
        />
    );

    // Calendar

    const renderCalendar = () => (
        <Calendar
            date={selected}
            onDateChange={handleChange}
            firstDayOfWeek={firstDayOfWeek}
            withShortcuts={withShortcuts}
        />
    );

    // Render

    return (

        <InputPopper

            // Field

            end={<>{end}{adornment}</>}

            // InputPopper 

            ref={internalInputRef}

            show={show}
            onShowChange={setShow}

            renderPopper={renderCalendar}

            onChange={handleChangeInternalValue}
            onFinalize={handleFinalize}

            {...inputPopperProps}

        />

    );

});

//
// Calendar
//

interface CalendarProps extends Pick<DatePickerProps, 'firstDayOfWeek' | 'withShortcuts'> {

    // Value

    /** 
     * The date to show as selected.
     */
    date?: [number, number, number] | null;

    /**
     * Handler to change the date.
     */
    onDateChange: (date: [number, number, number]) => void;

    // Configuration

    /** 
     * The first day of the week to display in the calendar. 
     */
    firstDayOfWeek?: number;

    /** 
     * Parse date function defaults to parsing dd-mm-yyyy into [yyyy, mm, dd]
     * (with zero based month). 
     */
    parseDate?: (s: string) => [number, number, number] | null;

    // Styling

    /** 
     * The class names to apply to the calendar.
     */
    className?: string;

}

const Calendar = (props: CalendarProps): ReactElement => {

    // Properties

    const {

        date,
        onDateChange,

        firstDayOfWeek = 0,

        withShortcuts = false,

        className

    } = props;

    // Translations

    const { t } = useTranslation(['lux']);

    const months = t('months', { defaultValue: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], returnObjects: true }) as string[];
    const days = t('shortDays', { defaultValue: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], returnObjects: true }) as string[];

    // State

    const today = useMemo(() => {
        const d = new Date();
        d.setHours(12, 0, 0, 0);
        return d;
    }, []);

    const selected = useMemo(() => {
        return date != null ? new Date(date[0], date[1], date[2], 12, 0, 0, 0) : null;
    }, [date]);

    // Calendar is the normalized first date having the week of the current date
    // starting at the firstDayOfWeek (has day = 1, hour = 12, minute = 0,
    // second = 0 and millis = 0). Whenever the internalValue changes, the
    // calendar is updated to show such date.

    const [calendar, setCalendar] = useState<Date>(today);
    useEffect(() => {
        const d = date != null ? new Date(date[0], date[1], date[2]) : new Date(today);
        d.setHours(12, 0, 0, 0);
        d.setDate(1);
        setCalendar(d);
    }, [date, today]);

    // Navigation Handlers

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

    const handleClickDate = (d: Date) => {
        onDateChange?.([d.getFullYear(), d.getMonth(), d.getDate()]);
    };

    // Weeks

    const weeks = useMemo(() => {
        const first = new Date(calendar.getTime());
        first.setDate(1 - first.getDay() + firstDayOfWeek); // beginning of week containing beginning of month
        const weeks = [];
        for (let i = 0; i < 6; i++) {
            const dates = [];
            for (let j = 0; j < 7; j++, first.setDate(first.getDate() + 1)) {
                dates.push(new Date(first.getTime()));
            }
            weeks.push(dates);
        }
        return weeks;
    }, [calendar, firstDayOfWeek]);

    // Classes

    const dayClasses = (d: Date): string => {

        const c = ['hover:text-white hover:bg-secondary-500'];

        if (d.getMonth() !== calendar.getMonth()) { c.push('text-muted bg-gray-200'); } // off
        if (d.getTime() === today.getTime()) { c.push('text-white bg-info-500'); } // today
        if (selected && d.getTime() === selected.getTime()) { c.push('text-white bg-primary-500'); } // selected

        return c.join(' ');

    };

    // Render

    return (
        <div onMouseDown={consumeEvent} className={classNames('flex flex-row', className)}>

            <div>

                <div className="px-2 py-1 flex flex-row items-center justify-between border-b border-control-border">
                    <div className="flex-grow text-center font-bold">
                        {months![calendar.getMonth()]} {calendar.getFullYear()}
                    </div>
                    <div className="flex-none space-x-2">
                        <button type="button" className="focus:outline-none" onClick={handleClickPrevMonth}><AngleLeftIcon /></button>
                        <button type="button" className="focus:outline-none" onClick={handleClickToday}><CircleIcon /></button>
                        <button type="button" className="focus:outline-none" onClick={handleClickNextMonth}><AngleRightIcon /></button>
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
                                    <td key={d.getTime()} onClick={() => handleClickDate(d)} className={dayClasses(d)}>
                                        {d.getDate()}
                                    </td>
                                )}
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>

            {withShortcuts &&
                <div className="flex flex-col justify-between items-stretch border-l border-control-border cursor-pointer">
                    {namedDays.map((s, i) =>
                        <div key={i} onClick={() => handleClickDate(s.date(new Date(today)))} className="px-2 truncate hover:text-white hover:bg-secondary-500">
                            {t(`namedDays.${s.label}`, { defaultValue: s.label })}
                        </div>
                    )}
                </div>
            }

        </div>
    );

};

//
// Default parse and format
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

    const parse = /^\s*([0-3]?\d)(?:-(?:([0-1]?\d)?(?:-(\d{4})?)?)?)?\s*$/i.exec(s);
    if (parse) {

        const now = new Date();
        const d = +parse[1];
        const m = parse[2] ? +parse[2] - 1 : now.getMonth();
        const y = parse[3] ? +parse[3] : now.getFullYear();
        const valid = new Date(y, m, d, 12, 0, 0, 0);

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

    const m = ymd[1] + 1;
    return (ymd[2] < 10 ? '0' + ymd[2] : ymd[2]) + '-' + (m < 10 ? '0' + m : m) + '-' + ymd[0];

}
