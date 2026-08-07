import { AngleLeftIcon, AngleRightIcon, CalendarIcon, CircleIcon } from '@nimbox/icons-react';
import { type InputHTMLAttributes, type ReactElement, type ReactNode, useImperativeHandle, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInternalizeValue } from '../../hooks/useInternalizeValue';
import { useObservableValueRef } from '../../hooks/useObservableValueRef';
import { InputPopper, type InputPopperProps } from '../inputs/InputPopper';
import { cn } from '../utilities/cn';
import { consumeEvent } from '../utilities/consumeEvent';
import { setRefInputValue } from '../utilities/setRefInputValue';


//
// DatePicker2
//

export interface DatePicker2Props extends Omit<InputPopperProps, 'show' | 'onShowChange' | 'renderPopper'> {

    // Field

    /**
     * Ornament to place at the end of the field. Left out, the field
     * carries a calendar; `null` leaves the field bare, and any other
     * node takes the calendar's place.
     */
    end?: ReactNode;

    // DatePicker2

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
     * By default it closes — picking is the errand, and `DatePicker2` selects
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
    { label: 'today', date: function (t: Date) { return t; } },
    { label: 'tomorrow', date: function (t: Date) { t.setDate(t.getDate() + 1); return t; } },
    { label: 'this-friday', date: function (t: Date) { t.setDate(t.getDate() + 5 - t.getDay()); return t; } },
    { label: 'next-monday', date: function (t: Date) { t.setDate(t.getDate() + 8 - t.getDay()); return t; } },
    { label: 'in-two-weeks', date: function (t: Date) { t.setDate(t.getDate() + 15 - t.getDay()); return t; } },
    { label: 'next-month', date: function (t: Date) { t.setDate(1); t.setMonth(t.getMonth() + 1); if (t.getDay() === 6) { t.setDate(t.getDate() + 2); } if (t.getDay() === 0) { t.setDate(t.getDate() + 1); } return t; } }
];

/**
 * DatePicker2. Select a date with one click.
 *
 * The panel is a sheet: a reading of the date at the top, the month in the
 * middle, a row of shortcuts at the foot. The reading is written out in words —
 * `Tuesday / 19 December 1967` — and follows the pointer, so a date is read
 * before it is committed and never has to be decoded from a row of digits.
 *
 * Days are discs on an open field rather than cells in a ruled table. Weekends
 * stand as pale columns running the height of the month, the week under the
 * pointer lifts as a whole, and today keeps a dot under its number, which
 * leaves it legible even when it is also the day picked.
 *
 * The month and the year in the title are the way out of the month: the month
 * opens the twelve months of the year, the year opens twelve years, and picking
 * from either drops back down to the days. Reaching a date years away is three
 * clicks, not a run on the arrows.
 */
export function DatePicker2(props: DatePicker2Props & InputHTMLAttributes<HTMLInputElement>) {

    // Properties

    const {

        ref,

        // Field

        end,

        // InputPopper

        onChange,

        // DatePicker2

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

    // Sheet State

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

    // Sheet

    const renderMonthSheet = () => (
        <MonthSheet
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

            end={fieldEnd}

            // InputPopper

            ref={internalInputRef}

            show={show}
            onShowChange={setShow}

            renderPopper={renderMonthSheet}

            onChange={handleChangeInternalValue}
            onFinalize={handleFinalize}

            {...inputPopperProps}

        />

    );

}

//
// MonthSheet
//

interface MonthSheetProps extends Required<Pick<DatePicker2Props, 'firstDayOfWeek' | 'withShortcuts'>> {

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
     * The class names to apply to the sheet.
     */
    className?: string;

}

/**
 * The three zoom levels of the sheet. Each one fills the same box, so moving
 * between them never resizes the panel under the pointer.
 */
type Zoom = 'days' | 'months' | 'years';

// A page of years is a decade with the year before and the year after it for
// company: twelve cells, the same three by four grid the months fill, and a
// span people already read as one thing.

const yearsPerDecade = 10;

// The three zooms share a box of one fixed height, padding included, so the
// panel never resizes under the pointer. It is what the days need: a row of
// weekday names over six weeks of discs.

const bodyPadding = 'px-2 pb-2';
const bodyClasses = `h-[17rem] ${bodyPadding}`;

const MonthSheet = (props: MonthSheetProps): ReactElement => {

    // Properties

    const {

        date,
        onDateChange,

        firstDayOfWeek,
        withShortcuts,

        className

    } = props;

    // Translations

    const months = useTranslatedList('months', ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
    const shortMonths = useTranslatedList('shortMonths', ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
    const shortDays = useTranslatedList('shortDays', ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    const longDays = useTranslatedList('longDays', ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']);

    const { t } = useTranslation(['lux']);

    // State

    // Every date the sheet works with is normalized to noon, so two of them are
    // the same day exactly when their times match.

    const today = useMemo(() => {
        const d = new Date();
        d.setHours(12, 0, 0, 0);
        return d;
    }, []);

    const selected = useMemo(() => {
        return date != null ? new Date(date[0], date[1], date[2], 12, 0, 0, 0) : null;
    }, [date]);

    const [current, setCurrent] = useState(() => {
        return date != null
            ? { year: date[0], month: date[1] }
            : { year: today.getFullYear(), month: today.getMonth() };
    });

    const [zoom, setZoom] = useState<Zoom>('days');

    // Hovered is the day under the pointer, whether it comes from a disc or
    // from a shortcut. It writes the reading at the top of the sheet, so the
    // date being committed is legible before the click lands.

    const [hovered, setHovered] = useState<Date | null>(null);

    // Weeks

    // The month always shows six weeks, starting on the `firstDayOfWeek` of the
    // week that holds the first of the month.

    const weeks = useMemo(() => {
        const first = new Date(current.year, current.month, 1, 12, 0, 0, 0);
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
    }, [current, firstDayOfWeek]);

    // Years

    const firstYearOfDecade = Math.floor(current.year / yearsPerDecade) * yearsPerDecade;
    const years = useMemo(() => {
        return Array.from({ length: 12 }, (_, index) => firstYearOfDecade - 1 + index);
    }, [firstYearOfDecade]);

    // Shortcuts

    const shortcuts = useMemo(() => {
        return namedDays.map(namedDay => ({
            label: namedDay.label,
            date: namedDay.date(new Date(today))
        }));
    }, [today]);

    // Handlers

    // The arrows step by whatever the sheet is showing: a month, a year, or a
    // page of years.

    const handleClickStep = (direction: number) => {
        setCurrent(previous => {
            if (zoom === 'days') {
                const month = previous.month + direction;
                if (month < 0) { return { year: previous.year - 1, month: 11 }; }
                if (month > 11) { return { year: previous.year + 1, month: 0 }; }
                return { ...previous, month };
            }
            const step = zoom === 'months' ? 1 : yearsPerDecade;
            return { ...previous, year: previous.year + direction * step };
        });
    };

    const handleClickToday = () => {
        setCurrent({ year: today.getFullYear(), month: today.getMonth() });
        setZoom('days');
    };

    // Picking a date brings the month it belongs to into view. Nothing is seen
    // of it when the sheet closes on the pick, but with `withKeepOpen` set the
    // sheet stays on the month it just wrote.

    const handleClickDate = (d: Date) => {
        setCurrent({ year: d.getFullYear(), month: d.getMonth() });
        onDateChange([d.getFullYear(), d.getMonth(), d.getDate()]);
    };

    const handleClickMonth = (month: number) => {
        setCurrent(previous => ({ ...previous, month }));
        setZoom('days');
    };

    const handleClickYear = (year: number) => {
        setCurrent(previous => ({ ...previous, year }));
        setZoom('months');
    };

    // Classes

    const isWeekendColumn = (column: number): boolean => {
        const day = (firstDayOfWeek + column) % 7;
        return day === 0 || day === 6;
    };

    // A disc wears at most one tone. The pointer comes first and the pick
    // second, so moving over the month previews the exact mark the click will
    // leave behind. Today is not a tone but the dot below the number, which is
    // why it survives being picked.

    const dayClasses = (d: Date): string => {

        const base = 'relative size-9 rounded-full flex items-center justify-center tabular-nums transition-colors';

        if (hovered != null && d.getTime() === hovered.getTime()) { return `${base} text-white bg-secondary-500`; }
        if (selected != null && d.getTime() === selected.getTime()) { return `${base} text-white bg-primary-500`; }

        return cn(base, d.getMonth() !== current.month ? 'text-muted' : 'text-content');

    };

    const isFilled = (d: Date): boolean => {
        return (hovered != null && d.getTime() === hovered.getTime()) ||
            (selected != null && d.getTime() === selected.getTime());
    };

    // Months and years answer to the pointer through `hover:` alone: they lead
    // somewhere rather than commit a date, so there is no reading of them to
    // write at the top of the sheet.

    const pageClasses = (isCurrent: boolean, isSelected: boolean, isOff = false): string => {

        const base = 'flex items-center justify-center rounded-item tabular-nums cursor-pointer transition-colors hover:text-white hover:bg-secondary-500';

        if (isSelected) { return `${base} text-white bg-primary-500`; }
        if (isCurrent) { return `${base} text-info-600 font-bold`; }

        return cn(base, isOff ? 'text-muted' : 'text-content');

    };

    const shortcutClasses = (d: Date): string => {

        const base = 'px-2 py-0.5 rounded-full border text-[0.85em] whitespace-nowrap cursor-pointer transition-colors';

        if (hovered != null && d.getTime() === hovered.getTime()) { return `${base} text-white bg-secondary-500 border-secondary-500`; }
        if (selected != null && d.getTime() === selected.getTime()) { return `${base} text-white bg-primary-500 border-primary-500`; }

        return `${base} text-content border-control-border`;

    };

    const stepClasses = 'size-6 rounded-full flex items-center justify-center text-muted hover:text-content hover:bg-control-fill focus:outline-none transition-colors';

    const titleClasses = 'cursor-pointer hover:text-primary-600 focus:outline-none transition-colors';

    // Reading

    const reading = hovered ?? selected;

    // Render

    return (
        <div
            onMouseDown={consumeEvent}
            onMouseLeave={() => setHovered(null)}
            className={cn('w-80 rounded-surface overflow-hidden', className)}
        >

            <div className="px-4 py-2 bg-content-bg border-b border-control-border">
                <div className="text-[0.7em] uppercase tracking-widest text-muted">
                    {reading != null ? longDays[reading.getDay()] : t('date', { defaultValue: 'Date' })}
                </div>
                <div className={cn('text-lg font-bold leading-tight tabular-nums', reading == null && 'text-muted')}>
                    {reading != null
                        ? `${reading.getDate()} ${months[reading.getMonth()]} ${reading.getFullYear()}`
                        : '—'
                    }
                </div>
            </div>

            <div className="px-2 py-2 flex flex-row items-center justify-between">

                <div className="px-1 space-x-1">
                    {zoom === 'days' &&
                        <button type="button" onClick={() => setZoom('months')} className={cn(titleClasses, 'font-bold')}>
                            {months[current.month]}
                        </button>
                    }
                    {zoom !== 'years'
                        ? <button type="button" onClick={() => setZoom('years')} className={cn(titleClasses, 'tabular-nums', zoom !== 'days' && 'font-bold')}>
                            {current.year}
                        </button>
                        : <span className="font-bold tabular-nums">
                            {firstYearOfDecade}–{firstYearOfDecade + yearsPerDecade - 1}
                        </span>
                    }
                </div>

                <div className="flex-none flex flex-row items-center gap-1">
                    <button type="button" onClick={() => handleClickStep(-1)} className={stepClasses}><AngleLeftIcon /></button>
                    <button type="button" onClick={handleClickToday} className={stepClasses}><CircleIcon /></button>
                    <button type="button" onClick={() => handleClickStep(1)} className={stepClasses}><AngleRightIcon /></button>
                </div>

            </div>

            {zoom === 'days' &&
                <div className={cn('relative', bodyClasses)}>

                    <div className={cn('absolute inset-0 pointer-events-none', bodyPadding)}>
                        <div className="grid grid-cols-7 h-full">
                            {weeks[0].map((_, column) =>
                                <div key={column} className={cn('rounded-item', isWeekendColumn(column) && 'bg-calendar-weekend')} />
                            )}
                        </div>
                    </div>

                    <div className="relative grid grid-cols-7 h-6 items-center">
                        {weeks[0].map(d =>
                            <div key={d.getDay()} className="text-center text-[0.75em] text-muted">
                                {shortDays[d.getDay()]}
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        {weeks.map(week =>
                            <div
                                key={week[0].getTime()}
                                className={cn(
                                    'grid grid-cols-7 rounded-item transition-colors',
                                    hovered != null && week.some(d => d.getTime() === hovered.getTime()) && 'bg-control-fill'
                                )}
                            >
                                {week.map(d =>
                                    <div
                                        key={d.getTime()}
                                        onClick={() => handleClickDate(d)}
                                        onMouseEnter={() => setHovered(d)}
                                        className="h-10 flex items-center justify-center cursor-pointer"
                                    >
                                        <div className={dayClasses(d)}>
                                            {d.getDate()}
                                            {d.getTime() === today.getTime() &&
                                                <span className={cn(
                                                    'absolute bottom-1 left-1/2 -translate-x-1/2 size-1 rounded-full',
                                                    isFilled(d) ? 'bg-white' : 'bg-info-500'
                                                )} />
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                </div>
            }

            {zoom === 'months' &&
                <div className={cn(bodyClasses, 'grid grid-cols-3 grid-rows-4 gap-1')}>
                    {shortMonths.map((month, index) =>
                        <div
                            key={month}
                            onClick={() => handleClickMonth(index)}
                            className={pageClasses(
                                current.year === today.getFullYear() && index === today.getMonth(),
                                selected != null && current.year === selected.getFullYear() && index === selected.getMonth()
                            )}
                        >
                            {month}
                        </div>
                    )}
                </div>
            }

            {zoom === 'years' &&
                <div className={cn(bodyClasses, 'grid grid-cols-3 grid-rows-4 gap-1')}>
                    {years.map(year =>
                        <div
                            key={year}
                            onClick={() => handleClickYear(year)}
                            className={pageClasses(
                                year === today.getFullYear(),
                                selected != null && year === selected.getFullYear(),
                                year < firstYearOfDecade || year >= firstYearOfDecade + yearsPerDecade
                            )}
                        >
                            {year}
                        </div>
                    )}
                </div>
            }

            {withShortcuts &&
                <div className="px-2 py-2 bg-content-bg border-t border-control-border flex flex-row flex-wrap gap-1">
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
            }

        </div>
    );

};

//
// Translations
//

/**
 * Reads a list of names out of the `lux` bundle, falling back to the English
 * list when the bundle is missing — `returnObjects` hands back the key itself
 * rather than the default when no instance is loaded, and a string indexes as
 * a run of letters.
 */
function useTranslatedList(key: string, defaultValue: string[]): string[] {

    const { t } = useTranslation(['lux']);
    const value = t(key, { defaultValue, returnObjects: true });

    return Array.isArray(value) ? value as string[] : defaultValue;

}

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
