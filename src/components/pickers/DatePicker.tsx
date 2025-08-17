import classNames from 'classnames';
import { forwardRef, type InputHTMLAttributes, type ReactElement, type Ref, useImperativeHandle, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInternalizeValue } from '../../hooks/useInternalizeValue';
import { useObservableValueRef } from '../../hooks/useObservableValueRef';
import { AngleLeftIcon, AngleRightIcon, CalendarIcon, CircleIcon } from '../../icons/components';
import { usePersistentState } from '../../persistent/usePersistentState';
import { InputPopper, type InputPopperProps } from '../inputs/InputPopper';
import { consumeEvent } from '../utilities/consumeEvent';
import { setRefInputValue } from '../utilities/setRefInputValue';


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
     * Whether to show the shortcuts menu.
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
    { label: 'next-month', date: function (t: Date) { t.setDate(1); t.setMonth(t.getMonth() + 1); if (t.getDay() === 6) { t.setDate(t.getDate() + 2); } if (t.getDay() === 0) { t.setDate(t.getDate() + 1); } return t; } }
    // { label: 'in-two-months', date: function (t: Date) { t.setDate(1); t.setMonth(t.getMonth() + 2); if (t.getDay() === 6) { t.setDate(t.getDate() + 2); } if (t.getDay() === 0) { t.setDate(t.getDate() + 1); } return t; } }
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

        withShortcuts = true,

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

    const [currentMonth, setCurrentMonth] = useState(() => {
        return date
            ? { year: date[0], month: date[1] }
            : { year: today.getFullYear(), month: today.getMonth() };
    });

    const [showShortcuts, setShowShortcuts] = usePersistentState('date-picker-show-shortcuts', withShortcuts);

    const selected = useMemo(() => {
        return date != null ? new Date(date[0], date[1], date[2], 12, 0, 0, 0) : null;
    }, [date]);

    // Calendar is the normalized first date having the week of the current date
    // starting at the firstDayOfWeek (has day = 1, hour = 12, minute = 0,
    // second = 0 and millis = 0). Whenever the internalValue changes, the
    // calendar is updated to show such date.

    const calendar = useMemo(() => {
        const d = new Date(currentMonth.year, currentMonth.month, 1, 12, 0, 0, 0);
        return d;
    }, [currentMonth]);

    // Navigation Handlers

    const handleClickPrevMonth = () => {
        setCurrentMonth(prev => {
            const month = prev.month - 1;
            if (month < 0) {
                return { year: prev.year - 1, month: 11 };
            }
            return { ...prev, month };
        });
    };

    const handleClickToday = () => {
        setCurrentMonth({ year: today.getFullYear(), month: today.getMonth() });
    };

    const handleClickNextMonth = () => {
        setCurrentMonth(prev => {
            const month = prev.month + 1;
            if (month > 11) {
                return { year: prev.year + 1, month: 0 };
            }
            return { ...prev, month };
        });
    };

    const handleClickDate = (d: Date) => {
        onDateChange?.([d.getFullYear(), d.getMonth(), d.getDate()]);
    };

    const handleShowShortcuts = () => {
        setShowShortcuts(true);
    };

    const handleHideShortcuts = () => {
        setShowShortcuts(false);
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

        const c = ['p-1 text-center hover:text-white hover:bg-secondary-500 cursor-pointer'];

        if (d.getMonth() !== calendar.getMonth()) { c.push('text-muted'); } // off
        if (d.getDay() === 0 || d.getDay() === 6) { c.push('bg-gray-100'); } // weekend
        if (d.getTime() === today.getTime()) { c.push('text-white bg-info-500'); } // today
        if (selected && d.getTime() === selected.getTime()) { c.push('text-white bg-primary-500'); } // selected

        return c.join(' ');

    };

    // Render

    return (
        <div onMouseDown={consumeEvent} className='relative'>

            <div className={classNames('flex flex-row rounded overflow-hidden', className)}>

                <div className="w-72">

                    <div className="h-16 border-b border-control-border">

                        <div className="px-2 py-2 flex flex-row items-center justify-between ">
                            <div className="flex-grow text-center font-bold">
                                {months![calendar.getMonth()]} {calendar.getFullYear()}
                            </div>
                            <div className="flex-none space-x-2">
                                <button type="button" className="focus:outline-none" onClick={handleClickPrevMonth}><AngleLeftIcon /></button>
                                <button type="button" className="focus:outline-none" onClick={handleClickToday}><CircleIcon /></button>
                                <button type="button" className="focus:outline-none" onClick={handleClickNextMonth}><AngleRightIcon /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7">
                            {weeks[0].map((d, i) =>
                                <div key={i} className="text-center">
                                    {days[d.getDay()]}
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="grid grid-cols-7">
                        {weeks.map(week =>
                            week.map(d =>
                                <div
                                    key={d.getTime()}
                                    onClick={() => handleClickDate(d)}
                                    className={dayClasses(d)}
                                >
                                    {d.getDate()}
                                </div>
                            )
                        )}
                    </div>

                </div>

                {withShortcuts && showShortcuts &&
                    <div className="w-48 border-l border-control-border flex flex-col">

                        <div className="h-16 border-b border-control-border flex items-end justify-center">
                            {t('shortcuts', { defaultValue: 'Shortcuts' })}
                        </div>

                        <div className="flex-1 flex flex-col">
                            {namedDays.map((s, i) =>
                                <div
                                    key={i}
                                    onClick={() => handleClickDate(s.date(new Date(today)))}
                                    className="flex-1 flex items-center justify-start px-2 truncate hover:text-white hover:bg-secondary-500 cursor-pointer"
                                >
                                    {t(`namedDays.${s.label}`, { defaultValue: s.label })}
                                </div>
                            )}
                        </div>

                    </div>
                }

            </div>

            {withShortcuts &&
                <div className="absolute w-4 h-8 top-4 -right-4 bg-black text-white rounded-r flex items-center justify-center">
                    {showShortcuts
                        ? <button type="button" onClick={handleHideShortcuts}><AngleLeftIcon /></button>
                        : <button type="button" onClick={handleShowShortcuts}><AngleRightIcon /></button>
                    }
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
