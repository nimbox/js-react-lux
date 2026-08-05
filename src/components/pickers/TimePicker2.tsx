import { ClockIcon } from '@nimbox/icons-react';
import { type InputHTMLAttributes, type ReactElement, type ReactNode, useImperativeHandle, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useInternalizeValue } from '../../hooks/useInternalizeValue';
import { useObservableValueRef } from '../../hooks/useObservableValueRef';
import { InputPopper, type InputPopperProps } from '../inputs/InputPopper';
import { cn } from '../utilities/cn';
import { consumeEvent } from '../utilities/consumeEvent';
import { setRefInputValue } from '../utilities/setRefInputValue';


//
// TimePicker2
//

export interface TimePicker2Props extends Omit<InputPopperProps, 'show' | 'onShowChange' | 'renderPopper'> {

    // Field

    /**
     * Ornament to place at the end of the field. Left out, the field carries
     * a clock; `null` leaves the field bare, and any other node takes the
     * clock's place.
     */
    end?: ReactNode;

    // TimePicker2

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
     * Minutes covered by each slice of a dial. `15` cuts every hour into
     * quarters, `30` into halves, `5` into the twelve marks of a watch.
     *
     * @default `15`
     */
    minuteStep?: number;

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

/**
 * TimePicker2. Select a time with one click.
 *
 * The whole day fits in the panel as twenty four dials, twelve under `AM` and
 * twelve under `PM`, six to a row. Each dial is an hour cut into slices the
 * way a watch face is, and every slice sits where its minute hand would point,
 * so the slice you click carries both the hour and the minute: click the
 * bottom of the `9` under `AM` and you have picked `09:30am`. Nothing scrolls
 * and nothing is picked in two steps, exactly like clicking a day in a month.
 */
export function TimePicker2(props: TimePicker2Props & InputHTMLAttributes<HTMLInputElement>) {

    // Properties

    const {

        ref,

        // Field

        end,

        // InputPopper

        onChange,

        // TimePicker2

        parseTime = internalParseTime,
        formatTime = internalFormatTime,

        minuteStep = 15,

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

    // Dials State

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

    // Dials

    const renderDials = () => (
        <DayDials
            time={selected}
            onTimeChange={handleChange}
            formatTime={formatTime}
            minuteStep={minuteStep}
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

            renderPopper={renderDials}

            onChange={handleChangeInternalValue}
            onFinalize={handleFinalize}

            {...inputPopperProps}

        />

    );

}

//
// DayDials
//

interface DayDialsProps extends Required<Pick<TimePicker2Props, 'minuteStep'>> {

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
     * Format used for the reading shown in the header.
     */
    formatTime: (time: [number, number]) => string;

    // Styling

    /**
     * The class names to apply to the dials.
     */
    className?: string;

}

// Constants

// The day is split in two blocks of twelve hours, six to a row. The block a
// dial sits in is the only thing that tells morning from evening, which is why
// the dials themselves carry no meridiem.

const meridiems = [
    { label: 'AM', rows: [[0, 1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11]] },
    { label: 'PM', rows: [[12, 13, 14, 15, 16, 17], [18, 19, 20, 21, 22, 23]] }
];

const innerRadius = 0.5;

const DayDials = (props: DayDialsProps): ReactElement => {

    // Properties

    const {

        time,
        onTimeChange,

        formatTime,

        minuteStep,

        className

    } = props;

    // Translations

    const { t } = useTranslation(['lux']);

    // State

    // Hovered is the slice under the pointer. It lights the slice and drives
    // the reading in the header, so the time being committed is legible before
    // the click lands.

    const [hovered, setHovered] = useState<[number, number] | null>(null);

    // Slices

    // Every slice is centred on the mark its minute hand points at, so each
    // one starts half a sweep before its own angle: the `:00` slice straddles
    // twelve o'clock, `:15` sits at three, `:30` at six.

    const slices = useMemo(() => {
        const count = Math.max(2, Math.min(60, Math.round(60 / minuteStep)));
        const sweep = (2 * Math.PI) / count;
        const list = [];
        for (let index = 0; index < count; index++) {
            list.push({
                minute: Math.round((index * 60) / count),
                path: sectorPath(index * sweep - sweep / 2, index * sweep + sweep / 2, innerRadius)
            });
        }
        return list;
    }, [minuteStep]);

    // Classes

    const sliceClasses = (hour: number, minute: number): string => {

        if (hovered && hour === hovered[0] && minute === hovered[1]) { return 'fill-secondary-500'; }
        if (time && hour === time[0] && minute === time[1]) { return 'fill-primary-500'; }

        // The rest of the hour is tinted so a dial reads as a whole, the way a
        // week reads as a whole in a month.

        if (hovered && hour === hovered[0]) { return 'fill-secondary-100'; }
        if (time && hour === time[0]) { return 'fill-primary-100'; }

        return 'fill-control-fill';

    };

    const hourClasses = (hour: number): string => {

        return time && hour === time[0] ? 'font-bold' : 'text-muted';

    };

    // Reading

    const reading = hovered ?? time;

    // Render

    return (
        <div
            onMouseDown={consumeEvent}
            onMouseLeave={() => setHovered(null)}
            className={cn('rounded overflow-hidden', className)}
        >

            <div className="px-2 py-2 text-center font-bold tabular-nums border-b border-control-border">
                {reading != null ? formatTime(reading) : t('time', { defaultValue: 'Time' })}
            </div>

            <div className="p-2 space-y-2">
                {meridiems.map(meridiem =>
                    <div key={meridiem.label} className="flex flex-row items-center gap-2">

                        <div className="w-6 text-right text-[0.7em] font-bold tracking-wide text-muted">
                            {meridiem.label}
                        </div>

                        <div className="space-y-1">
                            {meridiem.rows.map(row =>
                                <div key={row[0]} className="flex flex-row gap-1">
                                    {row.map(hour =>
                                        <div key={hour} className="relative w-11 h-11">

                                            <svg viewBox="-1.02 -1.02 2.04 2.04" className="absolute inset-0 w-full h-full">
                                                {slices.map(slice =>
                                                    <path
                                                        key={slice.minute}
                                                        d={slice.path}
                                                        onClick={() => onTimeChange([hour, slice.minute])}
                                                        onMouseEnter={() => setHovered([hour, slice.minute])}
                                                        vectorEffect="non-scaling-stroke"
                                                        className={cn('stroke-control-bg cursor-pointer', sliceClasses(hour, slice.minute))}
                                                    >
                                                        <title>{formatTime([hour, slice.minute])}</title>
                                                    </path>
                                                )}
                                                <circle
                                                    cx={0}
                                                    cy={0}
                                                    r={innerRadius}
                                                    onClick={() => onTimeChange([hour, 0])}
                                                    onMouseEnter={() => setHovered([hour, 0])}
                                                    className="fill-transparent cursor-pointer"
                                                />
                                            </svg>

                                            <div className={cn('absolute inset-0 flex items-center justify-center pointer-events-none tabular-nums', hourClasses(hour))}>
                                                {internalFormatHour(hour)}
                                            </div>

                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>
                )}
            </div>

        </div>
    );

};

//
// Geometry
//

/**
 * Builds the path of one slice of a dial: a ring sector on the unit circle
 * centred at the origin, with angles measured clockwise from twelve o'clock so
 * that an angle is read off the dial the way the minute hand is.
 *
 * @param fromAngle - Angle where the slice starts, in radians
 * @param toAngle - Angle where the slice ends, in radians
 * @param inner - Radius of the hole left for the hour, as a fraction of one
 */
function sectorPath(fromAngle: number, toAngle: number, inner: number): string {

    const point = (angle: number, radius: number) =>
        `${(radius * Math.sin(angle)).toFixed(4)} ${(-radius * Math.cos(angle)).toFixed(4)}`;

    const largeArc = toAngle - fromAngle > Math.PI ? 1 : 0;

    return [
        `M ${point(fromAngle, 1)}`,
        `A 1 1 0 ${largeArc} 1 ${point(toAngle, 1)}`,
        `L ${point(toAngle, inner)}`,
        `A ${inner} ${inner} 0 ${largeArc} 0 ${point(fromAngle, inner)}`,
        'Z'
    ].join(' ');

}

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
 * meridiem, which the band of the dial already carries.
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
