import { ClockIcon } from '@nimbox/icons-react';
import { type InputHTMLAttributes, type ReactElement, type ReactNode, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInternalizeValue } from '../../hooks/useInternalizeValue';
import { useObservableValueRef } from '../../hooks/useObservableValueRef';
import { InputPopper, type InputPopperProps } from '../inputs/InputPopper';
import { cn } from '../utilities/cn';
import { consumeEvent } from '../utilities/consumeEvent';
import { setRefInputValue } from '../utilities/setRefInputValue';


//
// TimePicker1
//

export interface TimePicker1Props extends Omit<InputPopperProps, 'show' | 'onShowChange' | 'renderPopper'> {

    // Field

    /**
     * Ornament to place at the end of the field. Left out, the field carries
     * a clock; `null` leaves the field bare, and any other node takes the
     * clock's place.
     */
    end?: ReactNode;

    // TimePicker1

    /**
     * Parse time function defaults to parsing `hh:mm ampm` into `[hh, mm]`.
     */
    parseTime?: (s: string) => [number, number] | null;

    /**
     * Format time function defaults to formatting `[hh, mm]` into
     * `hh:mm ampm` (12 hour based).
     */
    formatTime?: (time: [number, number]) => string;

    /**
     * Minutes between the columns of the grid, so `15` gives a column for
     * `15`, `30` and `45` past each hour. The top of the hour is not a column
     * of its own — the hour is what you click for it.
     *
     * @default `15`
     */
    minuteStep?: number;

    /**
     * First hour of the working day. The grid opens here when nothing is
     * selected, and hours before it are dimmed.
     *
     * @default `8`
     */
    dayStartHour?: number;

    /**
     * Hour at which the working day ends (exclusive). Hours from here on are
     * dimmed.
     *
     * @default `19`
     */
    dayEndHour?: number;

    /**
     * Keep the panel open after a time has been picked.
     *
     * By default it closes — picking is the errand. Set this where picking
     * several times in a row is the normal case, such as both ends of a
     * window. Clicking outside, tabbing away and `Escape` still close it
     * either way.
     *
     * @default `false`
     */
    withKeepOpen?: boolean;

}

// Constants

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

/**
 * TimePicker1. Select a time with one click.
 *
 * The panel is a grid: one row per hour of the day, one column per minute
 * past it. A single click picks the hour and the minute at once, the same way
 * a day cell in `DatePicker` picks a whole date — the hour itself is the top
 * of the hour. A row fills from the hour across to whatever is picked, so
 * `12:45` reads as one bar running from a large `12` out to the `45` that
 * closes it. Typing into the field stays available for everything the grid
 * does not offer.
 */
export function TimePicker1(props: TimePicker1Props & InputHTMLAttributes<HTMLInputElement>) {

    // Properties

    const {

        ref,

        // Field

        end,

        // InputPopper

        onChange,

        // TimePicker1

        parseTime = internalParseTime,
        formatTime = internalFormatTime,

        minuteStep = 15,
        dayStartHour = 8,
        dayEndHour = 19,

        withKeepOpen = false,

        // Rest goes to InputPopper

        ...inputPopperProps

    } = props;

    // State

    const [show, setShow] = useState(false);

    const [internalValue, handleChangeInternalValue] = useInternalizeValue('', props.defaultValue, props.value, onChange);
    const internalInputRef = useObservableValueRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => internalInputRef.current!);

    const handleChange = (time: [number, number]) => {
        setRefInputValue(internalInputRef, formatTime(time));
        internalInputRef.current?.select();
        if (!withKeepOpen) { setShow(false); }
    };

    const handleFinalize = (): string | null => {
        const time = parseTime(internalValue);
        return time != null ? formatTime(time) : null;
    };

    // Grid State

    // Selected is the current time shown in the input as long as it is
    // parsable with `parseTime`. It is `null` otherwise.

    const selected = useMemo(() => {
        return parseTime(internalValue);
    }, [parseTime, internalValue]);

    // Ornament

    // The clock is what the field carries when the caller says nothing about
    // it. Anything passed in takes its place, `null` included.

    const fieldEnd = end === undefined
        ? <ClockIcon onMouseDown={consumeEvent} className="cursor-pointer" />
        : end;

    // Grid

    const renderTimeGrid = () => (
        <TimeGrid
            time={selected}
            onTimeChange={handleChange}
            formatTime={formatTime}
            minuteStep={minuteStep}
            dayStartHour={dayStartHour}
            dayEndHour={dayEndHour}
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

            renderPopper={renderTimeGrid}

            onChange={handleChangeInternalValue}
            onFinalize={handleFinalize}

            {...inputPopperProps}

        />

    );

}

//
// TimeGrid
//

interface TimeGridProps extends Required<Pick<TimePicker1Props, 'minuteStep' | 'dayStartHour' | 'dayEndHour'>> {

    // Value

    /**
     * The time to show as selected.
     */
    time?: [number, number] | null;

    /**
     * Handler to change the time.
     */
    onTimeChange: (time: [number, number]) => void;

    /**
     * Format used for the preview shown in the header.
     */
    formatTime: (time: [number, number]) => string;

    // Styling

    /**
     * The class names to apply to the grid.
     */
    className?: string;

}

const TimeGrid = (props: TimeGridProps): ReactElement => {

    // Properties

    const {

        time,
        onTimeChange,

        formatTime,

        minuteStep,
        dayStartHour,
        dayEndHour,

        className

    } = props;

    // Translations

    const { t } = useTranslation(['lux']);

    // State

    // Hovered is the cell under the pointer. It draws the bar and the reading
    // in the header, so the time being committed is legible before the click
    // lands.

    const [hovered, setHovered] = useState<[number, number] | null>(null);

    // The top of the hour has no column of its own: the hour itself is what
    // you click for it, which is also where every bar starts.

    const minutes = useMemo(() => {
        const step = Math.min(60, Math.max(1, Math.floor(minuteStep)));
        const columns: number[] = [];
        for (let minute = step; minute < 60; minute += step) { columns.push(minute); }
        return columns;
    }, [minuteStep]);

    const columns = useMemo(() => ({
        gridTemplateColumns: minutes.length > 0
            ? `3rem repeat(${minutes.length}, minmax(0, 1fr))`
            : '3rem'
    }), [minutes.length]);

    // Scrolling

    // Rows are laid out inside `rowsRef`, which is static, so a row's
    // `offsetTop` is measured against the positioned scroll container and can
    // be assigned to `scrollTop` directly.

    const scrollRef = useRef<HTMLDivElement>(null);
    const rowsRef = useRef<HTMLDivElement>(null);

    const scrollToHour = (hour: number, align: 'start' | 'center') => {
        const container = scrollRef.current;
        const row = rowsRef.current?.children[hour] as HTMLElement | undefined;
        if (container == null || row == null) { return; }
        const top = align === 'center'
            ? row.offsetTop - (container.clientHeight - row.offsetHeight) / 2
            : row.offsetTop;
        container.scrollTop = Math.max(0, top);
    };

    // Position the grid once, when the panel opens. Picking a time must not
    // scroll the grid out from under the pointer, which matters when
    // `withKeepOpen` leaves the panel up for a second pick.

    useEffect(() => {
        if (time != null) {
            scrollToHour(time[0], 'center');
        } else {
            scrollToHour(dayStartHour, 'start');
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Classes

    const isOffHour = (hour: number): boolean => {
        return hour < dayStartHour || hour >= dayEndHour;
    };

    // A row carries at most one bar. It runs from the hour across to the mark,
    // in the hover colour while the pointer is on the row and in the selection
    // colour otherwise, so moving the pointer previews the exact shape the
    // pick will leave behind.

    const markOf = (hour: number): { minute: number; tone: string } | null => {

        if (hovered && hour === hovered[0]) { return { minute: hovered[1], tone: 'bg-secondary-500' }; }
        if (time && hour === time[0]) { return { minute: time[1], tone: 'bg-primary-500' }; }

        return null;

    };

    const hourClasses = (hour: number): string => {

        const mark = markOf(hour);
        if (mark) { return `px-2 py-1 text-right cursor-pointer text-white ${mark.tone}`; }

        return cn('px-2 py-1 text-right cursor-pointer', isOffHour(hour) ? 'text-muted' : 'text-content');

    };

    const minuteClasses = (hour: number, minute: number): string => {

        const base = 'py-1 text-center text-[0.75em] cursor-pointer';

        // Inside the bar the numbers go transparent so the whole run reads as
        // one stretch of time labelled by the minute it ends on.

        const mark = markOf(hour);
        if (mark && minute <= mark.minute) {
            return `${base} ${mark.tone} ${minute === mark.minute ? 'text-white' : 'text-transparent'}`;
        }

        return `${base} text-muted`;

    };

    // Preview

    const preview = hovered ?? time;

    // Render

    return (
        <div
            onMouseDown={consumeEvent}
            onMouseLeave={() => setHovered(null)}
            className={cn('w-52 rounded overflow-hidden', className)}
        >

            <div className="px-2 py-2 text-center font-bold tabular-nums border-b border-control-border">
                {preview != null ? formatTime(preview) : t('time', { defaultValue: 'Time' })}
            </div>

            <div ref={scrollRef} className="relative h-64 overflow-auto">
                <div ref={rowsRef}>
                    {hours.map(hour =>
                        <div
                            key={hour}
                            style={columns}
                            className={cn('grid', isOffHour(hour) && 'bg-calendar-weekend')}
                        >

                            <div
                                onClick={() => onTimeChange([hour, 0])}
                                onMouseEnter={() => setHovered([hour, 0])}
                                className={hourClasses(hour)}
                            >
                                {internalFormatHour(hour)}<span className="text-[0.75em] opacity-60">{hour < 12 ? 'am' : 'pm'}</span>
                            </div>

                            {minutes.map(minute =>
                                <div
                                    key={minute}
                                    onClick={() => onTimeChange([hour, minute])}
                                    onMouseEnter={() => setHovered([hour, minute])}
                                    className={minuteClasses(hour, minute)}
                                >
                                    {internalPad(minute)}
                                </div>
                            )}

                        </div>
                    )}
                </div>
            </div>

        </div>
    );

};

//
// Default parse and format
//

/**
 * Parses a time written the way it is usually typed: `8`, `830`, `8:30`,
 * `8:30pm`, `20:30`. A bare hour between 1 and 7 is read as the afternoon,
 * since a working day that starts at 8 makes `3` mean `3pm`.
 *
 * @param s - The string to parse
 * @returns The time as `[hour, minute]` on a 24 hour clock, or `null`
 */
function internalParseTime(s: string): [number, number] | null {

    const parse = /^\s*(\d{1,2})(?::?(\d{2}))?\s*(?:([ap])\.?m?\.?)?\s*$/i.exec(s);
    if (parse == null) { return null; }

    let hour = +parse[1];
    const minute = parse[2] ? +parse[2] : 0;
    if (minute > 59) { return null; }

    if (parse[3]) {
        if (hour < 1 || hour > 12) { return null; }
        if (parse[3].match(/p/i)) {
            hour = hour === 12 ? 12 : hour + 12;
        } else {
            hour = hour === 12 ? 0 : hour;
        }
    } else {
        if (hour > 23) { return null; }
        if (hour >= 1 && hour < 8) { hour += 12; }
    }

    return [hour, minute];

}

/**
 * Formats the hour of a 24 hour clock as its 12 hour label, without the
 * meridiem.
 */
function internalFormatHour(hour: number): string {

    return String(hour % 12 === 0 ? 12 : hour % 12);

}

/**
 * Formats a time in the simple format `hh:mmam`.
 *
 * @param time - The time as `[hour, minute]` on a 24 hour clock
 * @returns The formatted string
 */
function internalFormatTime(time: [number, number]): string {

    const [hour, minute] = time;
    const meridiem = hour < 12 ? 'am' : 'pm';
    return `${internalPad(hour % 12 === 0 ? 12 : hour % 12)}:${internalPad(minute)}${meridiem}`;

}

/**
 * Pads a number below ten with a leading zero.
 */
function internalPad(n: number): string {

    return n < 10 ? `0${n}` : String(n);

}
