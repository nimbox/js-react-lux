import classNames from 'classnames';
import React, { ReactElement, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { useInternalizeInput } from '../../hooks/useInternalizeInput';
import { useObservableValueRef } from '../../hooks/useObservableValueRef';
import { AngleDownIcon, AngleUpIcon, CircleIcon, ClockIcon } from '../../icons/components';
import { consumeEvent } from '../../utilities/consumeEvent';
import { setRefInputValue } from '../../utilities/setRefInputValue';
import { InputPopper, InputPopperProps } from '../inputs/InputPopper';


//
// TimePicker
//

export interface TimePickerProps extends Omit<InputPopperProps, 'show' | 'onChangeShow' | 'renderPopper'> {

    // TimePicker

    /** 
     * Parse time function defaults to parsing dd:mm ampm into [hh, mm]. 
     */
    parseTime?: (s: string) => [number, number] | null;

    /** 
     * Format time function defaults to formatting [hh, mm] into hh:mm ampm (12 hour based). 
     */
    formatTime?: (time: [number, number]) => string;

}

// Constants

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
const hoursOff = new Set([0, 1, 2, 3, 4, 5, 6, 7, 12, 13, 19, 20, 21, 22, 23]);

const minutes = [15, 30, 45];

/**
 * TimePicker. Select a time with one click.
 */
export const TimePicker = React.forwardRef<HTMLInputElement, TimePickerProps & React.InputHTMLAttributes<HTMLInputElement>>((
    props: TimePickerProps & React.InputHTMLAttributes<HTMLInputElement>,
    inputRef: Ref<HTMLInputElement>
) => {

    // Properties

    const {

        // Field

        end,

        // InputPopper

        onChange,

        // TimePicker

        parseTime = internalParseTime,
        formatTime = internalFormatTime,

        // Rest goes to InputPopper

        ...inputPopperProps

    } = props;

    // State

    const [show, setShow] = useState(false);

    const [internalValue, handleChangeInternalValue] = useInternalizeInput('', props.defaultValue, props.value, onChange);
    const internalInputRef = useObservableValueRef<HTMLInputElement>(null);
    useImperativeHandle(inputRef, () => internalInputRef.current!);

    const handleChange = (time: [number, number] | null) => {
        const value = time != null ? formatTime(time) : '';
        setRefInputValue(internalInputRef, value);
        internalInputRef.current?.select();
        setShow(false);
    };

    const handleFinalize = (value: string): string | null => {
        const time = parseTime(internalValue);
        return time != null ? formatTime(time) : null;
    };

    // Watch State

    const selected = useMemo(() => {
        return parseTime(internalValue);
    }, [parseTime, internalValue]);

    // Adornment

    const adornment = (
        <ClockIcon
            onMouseDown={consumeEvent}
            className="cursor-pointer"
        />
    );

    // Watch

    const renderWatch = () => (
        <Watch
            time={selected}
            onTimeChange={handleChange}
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
            onChangeShow={setShow}

            renderPopper={renderWatch}

            onChange={handleChangeInternalValue}
            onFinalize={handleFinalize}

            {...inputPopperProps}

        />

    );

});

//
// Watch
//

interface WatchProps {

    // Value

    /**
     * The time to show as selected.
     */
    time?: [number, number] | null;

    /**
     * Handler to change the time.
     */
    onTimeChange: (time: [number, number]) => void;

    // Styling

    /** 
     * The class names to apply to the watch.
     */
    className?: string;

}

const Watch = (props: WatchProps): ReactElement => {

    // Properties

    const {

        time,
        onTimeChange,

        className

    } = props;

    // State

    const selected = useMemo(() => time, [time]);

    // Times is the first hour to display at the top of the clock. The timesRef
    // is a reference to the watch to be able to scroll the face watch and show 
    // the appropdiate time.

    const times = useRef({ watch: 8 });
    const timesRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (selected) {
            times.current.watch = selected[0];
        }
        scroll();
    }, [selected]);

    // Navigation Handlers

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

    const scroll = () => {
        if (timesRef.current) {
            const t = timesRef.current;
            let h = t.scrollHeight / 24;
            t.scrollTop = times.current.watch * h;
        }
    };

    // Classes

    const hourClasses = (hour: number): string => {
        if (selected && hour === selected[0]) {
            return 'bg-primary-500';
        };
        return hoursOff.has(hour) ? 'bg-gray-100' : '';
    };

    const minuteClasses = (hour: number, minute: number): string => {
        if (selected) {
            if (hour === selected[0]) {
                if (minute < selected[1]) {
                    return 'bg-primary-500 !text-transparent';
                }
                if (minute === selected[1]) {
                    return 'bg-primary-500 text-inherit text-[1em]';
                }
                return 'bg-primary-100';
            };
        }
        return hoursOff.has(hour) ? 'bg-gray-100' : '';
    };

    // Render

    return (
        <div onMouseDown={consumeEvent} className={className}>

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
                        {hours.map(h =>
                            <tr key={h} className="group">
                                <th className={classNames('group-hover:bg-secondary-500 peer', hourClasses(h))} onClick={e => onTimeChange([h, 0])}>{internalFormatHour(h)}</th>
                                {minutes.map(m =>
                                    <td key={m}
                                        onClick={e => onTimeChange([h, m])}
                                        className={classNames(
                                            "group-hover:text-transparent group-hover:bg-secondary-500",
                                            "peer peer-hover:!text-muted peer-hover:bg-secondary-200 peer-hover:!text-[0.75em]",
                                            "text-muted text-[0.75em]",
                                            "hover:!text-inherit hover:!text-[1em]",
                                            minuteClasses(h, m)
                                        )}
                                    >
                                        {m}
                                    </td>
                                )}
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

        </div >
    );

}

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
