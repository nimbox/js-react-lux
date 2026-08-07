import { AngleLeftIcon, AngleRightIcon, CalendarIcon, CircleIcon } from '@nimbox/icons-react';
import { type InputHTMLAttributes, type ReactElement, type ReactNode, useImperativeHandle, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInternalizeValue } from '../../hooks/useInternalizeValue';
import { useObservableValueRef } from '../../hooks/useObservableValueRef';
import { usePersistentState } from '../../persistent/usePersistentState';
import { InputPopper, type InputPopperProps } from '../inputs/InputPopper';
import { cn } from '../utilities/cn';
import { consumeEvent } from '../utilities/consumeEvent';
import { setRefInputValue } from '../utilities/setRefInputValue';


//
// DatePicker1
//

export interface DatePicker1Props extends Omit<InputPopperProps, 'show' | 'onShowChange' | 'renderPopper'> {

    // Field

    /**
     * Ornament to place at the end of the field. Left out, the field
     * carries a calendar; `null` leaves the field bare, and any other
     * node takes the calendar's place.
     */
    end?: ReactNode;

    // DatePicker1

    /**
     * The first day of the week to display in the calendar.
     */
    firstDayOfWeek?: number;

    /**
     * Parse date function defaults to parsing `dd-mm-yyyy` into
     * `[yyyy, mm, dd]` (with zero based month).
     */
    parseDate?: (s: string) => [number, number, number] | null;

    /**
     * Format date function defaults to formatting `[yyyy, mm, dd]` (with zero
     * based month) into `dd-mm-yyyy`.
     */
    formatDate?: (date: [number, number, number]) => string;

    /**
     * Keep the calendar open after a date has been picked.
     *
     * By default it closes — picking is the errand, and `DatePicker1` selects
     * the input text so the date can be typed over. Set this where picking
     * several dates in a row is the normal case, such as filling both ends of a
     * range. Clicking outside, tabbing away and `Escape` still close it either
     * way.
     *
     * @default `false`
     */
    withKeepOpen?: boolean;

    // Styling

    /**
     * Whether to show the shortcuts menu.
     */
    withShortcuts?: boolean;

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
];

/**
 * DatePicker1. Select a date with one click.
 *
 * The panel is a month of days under a reading of the date they stand for, the
 * same bar `TimePicker1` puts above its grid: whatever the pointer rests on is
 * spelled out there before the click lands, so a cell and a shortcut are
 * committed to on the same terms. Weekends carry the tint that marks the hours
 * outside the working day, days of the neighbouring months are dimmed the way
 * those hours are, and the pick itself reads in the selection colour with the
 * pointer trailing behind it in the hover colour.
 */
export function DatePicker1(props: DatePicker1Props & InputHTMLAttributes<HTMLInputElement>) {

    // Properties

    const {

        ref,

        // Field

        end,

        // InputPopper

        onChange,

        // DatePicker1

        firstDayOfWeek = 0,
        parseDate = internalParseDate,
        formatDate = internalFormatDate,

        withKeepOpen = false,
        withShortcuts = true,

        // Rest goes to InputPopper

        ...inputPopperProps

    } = props;

    // State

    const [show, setShow] = useState(false);

    const [internalValue, handleChangeInternalValue] = useInternalizeValue('', props.defaultValue, props.value, onChange);
    const internalInputRef = useObservableValueRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => internalInputRef.current!);

    const handleChange = (date: [number, number, number]) => {
        setRefInputValue(internalInputRef, formatDate(date));
        internalInputRef.current?.select();
        if (!withKeepOpen) { setShow(false); }
    };

    const handleFinalize = (): string | null => {
        const date = parseDate(internalValue);
        return date != null ? formatDate(date) : null;
    };

    // Calendar State

    // Selected is the current date shown in the input as long as it is parsable
    // with `parseDate`. It is `null` otherwise.

    const selected = useMemo(() => {
        return parseDate(internalValue);
    }, [parseDate, internalValue]);

    // Ornament

    // The calendar is what the field carries when the caller says nothing about
    // it. Anything passed in takes its place, `null` included.

    const fieldEnd = end === undefined
        ? <CalendarIcon onMouseDown={consumeEvent} className="cursor-pointer" />
        : end;

    // Calendar

    const renderMonthGrid = () => (
        <MonthGrid
            date={selected}
            onDateChange={handleChange}
            formatDate={formatDate}
            firstDayOfWeek={firstDayOfWeek}
            withShortcuts={withShortcuts}
        />
    );

    // Render

    return (

        <InputPopper

            // Field

            end={fieldEnd}

            // InputPopper

            ref={internalInputRef}

            show={show}
            onShowChange={setShow}

            renderPopper={renderMonthGrid}

            onChange={handleChangeInternalValue}
            onFinalize={handleFinalize}

            {...inputPopperProps}

        />

    );

}

//
// MonthGrid
//

interface MonthGridProps extends Required<Pick<DatePicker1Props, 'firstDayOfWeek' | 'withShortcuts'>> {

    // Value

    /**
     * The date to show as selected.
     */
    date?: [number, number, number] | null;

    /**
     * Handler to change the date.
     */
    onDateChange: (date: [number, number, number]) => void;

    /**
     * Format used for the reading shown in the header.
     */
    formatDate: (date: [number, number, number]) => string;

    // Styling

    /**
     * The class names to apply to the grid.
     */
    className?: string;

}

const MonthGrid = (props: MonthGridProps): ReactElement => {

    // Properties

    const {

        date,
        onDateChange,

        formatDate,

        firstDayOfWeek,
        withShortcuts,

        className

    } = props;

    // Translations

    const { t } = useTranslation(['lux']);

    const months = t('months', { defaultValue: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], returnObjects: true }) as string[];
    const days = t('shortDays', { defaultValue: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], returnObjects: true }) as string[];

    // State

    // Every date the grid works with is normalized to noon, so two of them are
    // the same day exactly when their times match.

    const today = useMemo(() => {
        const d = new Date();
        d.setHours(12, 0, 0, 0);
        return d;
    }, []);

    const selected = useMemo(() => {
        return date != null ? new Date(date[0], date[1], date[2], 12, 0, 0, 0) : null;
    }, [date]);

    const [currentMonth, setCurrentMonth] = useState(() => {
        return date != null
            ? { year: date[0], month: date[1] }
            : { year: today.getFullYear(), month: today.getMonth() };
    });

    const [showShortcuts, setShowShortcuts] = usePersistentState('date-picker-1-show-shortcuts', withShortcuts);

    // Hovered is the day under the pointer, whether it comes from a cell or
    // from a shortcut. It lights the day and drives the reading in the header,
    // so the date being committed is legible before the click lands.

    const [hovered, setHovered] = useState<Date | null>(null);

    // Weeks

    // The grid always shows six weeks, starting on the `firstDayOfWeek` of the
    // week that holds the first of the month.

    const weeks = useMemo(() => {
        const first = new Date(currentMonth.year, currentMonth.month, 1, 12, 0, 0, 0);
        first.setDate(1 - ((first.getDay() - firstDayOfWeek + 7) % 7));
        const weeks: Date[][] = [];
        for (let week = 0; week < 6; week++) {
            const dates: Date[] = [];
            for (let day = 0; day < 7; day++, first.setDate(first.getDate() + 1)) {
                dates.push(new Date(first.getTime()));
            }
            weeks.push(dates);
        }
        return weeks;
    }, [currentMonth, firstDayOfWeek]);

    // Shortcuts

    const shortcuts = useMemo(() => {
        return namedDays.map(namedDay => ({
            label: namedDay.label,
            date: namedDay.date(new Date(today))
        }));
    }, [today]);

    // Navigation Handlers

    const handleClickPreviousMonth = () => {
        setCurrentMonth(previous => previous.month > 0
            ? { ...previous, month: previous.month - 1 }
            : { year: previous.year - 1, month: 11 }
        );
    };

    const handleClickToday = () => {
        setCurrentMonth({ year: today.getFullYear(), month: today.getMonth() });
    };

    const handleClickNextMonth = () => {
        setCurrentMonth(previous => previous.month < 11
            ? { ...previous, month: previous.month + 1 }
            : { year: previous.year + 1, month: 0 }
        );
    };

    const handleClickDate = (d: Date) => {
        onDateChange([d.getFullYear(), d.getMonth(), d.getDate()]);
    };

    // Classes

    const isWeekend = (d: Date): boolean => {
        return d.getDay() === 0 || d.getDay() === 6;
    };

    const isOffMonth = (d: Date): boolean => {
        return d.getMonth() !== currentMonth.month;
    };

    // A day wears at most one tone. The pointer comes first, then the pick,
    // then today, so moving over the grid previews the exact mark the click
    // will leave behind.

    const toneOf = (d: Date): string | null => {

        if (hovered != null && d.getTime() === hovered.getTime()) { return 'bg-secondary-500'; }
        if (selected != null && d.getTime() === selected.getTime()) { return 'bg-primary-500'; }
        if (d.getTime() === today.getTime()) { return 'bg-info-500'; }

        return null;

    };

    const dayClasses = (d: Date): string => {

        const base = 'py-1 text-center tabular-nums cursor-pointer';

        const tone = toneOf(d);
        if (tone != null) { return `${base} text-white ${tone}`; }

        return cn(base, isWeekend(d) && 'bg-calendar-weekend', isOffMonth(d) ? 'text-muted' : 'text-content');

    };

    const shortcutClasses = (d: Date): string => {

        const base = 'flex-1 flex items-center px-2 truncate cursor-pointer';

        // Today is left alone here: a shortcut names a day ahead, and tinting
        // the list from the calendar's own mark would say the row is picked.

        if (hovered != null && d.getTime() === hovered.getTime()) { return `${base} text-white bg-secondary-500`; }
        if (selected != null && d.getTime() === selected.getTime()) { return `${base} text-white bg-primary-500`; }

        return `${base} text-content`;

    };

    // Reading

    const reading = hovered ?? selected;

    // Render

    return (
        <div onMouseDown={consumeEvent} onMouseLeave={() => setHovered(null)} className="relative">

            <div className={cn('rounded-surface overflow-hidden', className)}>

                <div className="px-2 py-2 text-center font-bold tabular-nums border-b border-control-border">
                    {reading != null
                        ? formatDate([reading.getFullYear(), reading.getMonth(), reading.getDate()])
                        : t('date', { defaultValue: 'Date' })
                    }
                </div>

                <div className="flex flex-row">

                    <div className="w-72">

                        <div className="px-2 py-2 flex flex-row items-center justify-between">
                            <div className="grow text-center font-bold">
                                {months[currentMonth.month]}<span className="text-[0.75em] opacity-60"> {currentMonth.year}</span>
                            </div>
                            <div className="flex-none space-x-2">
                                <button type="button" className="focus:outline-none" onClick={handleClickPreviousMonth}><AngleLeftIcon /></button>
                                <button type="button" className="focus:outline-none" onClick={handleClickToday}><CircleIcon /></button>
                                <button type="button" className="focus:outline-none" onClick={handleClickNextMonth}><AngleRightIcon /></button>
                            </div>
                        </div>

                        <div className="grid grid-cols-7">
                            {weeks[0].map(d =>
                                <div key={d.getDay()} className="py-1 text-center text-[0.75em] text-muted">
                                    {days[d.getDay()]}
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-7">
                            {weeks.map(week =>
                                week.map(d =>
                                    <div
                                        key={d.getTime()}
                                        onClick={() => handleClickDate(d)}
                                        onMouseEnter={() => setHovered(d)}
                                        className={dayClasses(d)}
                                    >
                                        {d.getDate()}
                                    </div>
                                )
                            )}
                        </div>

                    </div>

                    {withShortcuts && showShortcuts &&
                        <div className="w-44 border-l border-control-border flex flex-col">

                            <div className="px-2 py-2 text-center font-bold">
                                {t('shortcuts', { defaultValue: 'Shortcuts' })}
                            </div>

                            <div className="flex-1 flex flex-col">
                                {shortcuts.map(shortcut =>
                                    <div
                                        key={shortcut.label}
                                        onClick={() => handleClickDate(shortcut.date)}
                                        onMouseEnter={() => setHovered(shortcut.date)}
                                        className={shortcutClasses(shortcut.date)}
                                    >
                                        {t(`namedDays.${shortcut.label}`, { defaultValue: shortcut.label })}
                                    </div>
                                )}
                            </div>

                        </div>
                    }

                </div>

            </div>

            {withShortcuts &&
                <div className="absolute w-4 h-8 top-4 -right-4 bg-content text-white rounded-r flex items-center justify-center">
                    {showShortcuts
                        ? <button type="button" onClick={() => setShowShortcuts(false)}><AngleLeftIcon /></button>
                        : <button type="button" onClick={() => setShowShortcuts(true)}><AngleRightIcon /></button>
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
 * Parses a date written the way it is usually typed: `19`, `19-12`,
 * `19-12-1967`. A date left incomplete is filled in from the current month and
 * year.
 *
 * @param s - The string to parse
 * @returns The date as `[year, month, day]` with a zero based month, or `null`
 */
function internalParseDate(s: string): [number, number, number] | null {

    const parse = /^\s*([0-3]?\d)(?:-(?:([0-1]?\d)?(?:-(\d{4})?)?)?)?\s*$/i.exec(s);
    if (parse == null) { return null; }

    const now = new Date();
    const day = +parse[1];
    const month = parse[2] ? +parse[2] - 1 : now.getMonth();
    const year = parse[3] ? +parse[3] : now.getFullYear();

    // A date that rolls over — the 31st of a month of thirty days — comes back
    // from `Date` as the next month, so it is only valid when it survives the
    // round trip untouched.

    const valid = new Date(year, month, day, 12, 0, 0, 0);
    if (valid.getFullYear() !== year || valid.getMonth() !== month || valid.getDate() !== day) { return null; }

    return [year, month, day];

}

/**
 * Formats a date in the simple format `dd-mm-yyyy`.
 *
 * @param date - The date as `[year, month, day]` with a zero based month
 * @returns The formatted string
 */
function internalFormatDate(date: [number, number, number]): string {

    const [year, month, day] = date;
    return `${internalPad(day)}-${internalPad(month + 1)}-${year}`;

}

/**
 * Pads a number below ten with a leading zero.
 */
function internalPad(n: number): string {

    return n < 10 ? `0${n}` : String(n);

}
