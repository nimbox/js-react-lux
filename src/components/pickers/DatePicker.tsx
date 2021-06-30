import React, { FC, LegacyRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { AngleLeftIcon, AngleRightIcon, CircleIcon } from '../../icons';


//
// DatePicker
//

interface DatePickerProps {

    /** Name used for the input element and returned in the change event. */
    name?: string,

    /** String representation of the date. */
    value: string,

    /** Change event handler. */
    onChange: React.ChangeEventHandler<HTMLInputElement>,

    /** Wether to show the shortcuts menu. */
    shortcuts: boolean

    /** Input placeholder. */
    placeholder?: string

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
export const DatePicker: FC<DatePickerProps> = ({ name, value, onChange, shortcuts, placeholder }) => {

    const { t, ready } = useTranslation();

    const [calendar, setCalendar] = useState(firstDate(value));
    useEffect(() => setCalendar(firstDate(value)), [value]);

    const [show, setShow] = useState(false);

    const [target, setTarget] = useState<HTMLDivElement | null>(null);
    const [popper, setPopper] = useState<HTMLDivElement | null>(null);
    useOnOutsideClick(() => { if (show) { setShow(!show); } }, show, target, popper);

    // handlers

    const handleShow = () => { if (!show) { setShow(true); } }
    const handleHide = () => { if (show) { setShow(false); } }
    const handleFocus = handleShow;

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.keyCode) {
            case 9: // tab
            case 13: // enter
                const ymd = parseDate(value);
                if (ymd) { handleFinalChange(ymd); }
                handleHide();
                break;
            default:
                handleShow();
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ target: { name, value: e.target.value.replace(/[^0-9-]/g, '') } } as React.ChangeEvent<HTMLInputElement>);
    }

    const handleFinalChange = (ymd: [number, number, number]) => {
        const value = formatDate(ymd);
        onChange({ target: { name, value } } as React.ChangeEvent<HTMLInputElement>);
        handleHide();
    }

    // navigation

    const handleClickPrevMonth = () => {
        const c = new Date(calendar);
        c.setMonth(c.getMonth() - 1);
        setCalendar(c);
    };

    const handleClickToday = () => {
        const c = new Date();
        c.setHours(12, 0, 0, 0);
        setCalendar(c);
    };

    const handleClickNextMonth = () => {
        const c = new Date(calendar);
        c.setMonth(c.getMonth() + 1);
        setCalendar(c);
    };

    const handleClickDate = (d: Date) => {
        handleFinalChange([d.getFullYear(), d.getMonth(), d.getDate()])
        handleHide();
    };

    // setup

    const today = new Date();
    today.setHours(12, 0, 0, 0);

    const v = parseDate(value);
    const selected = v ? new Date(v[0], v[1], v[2], 12, 0, 0, 0) : null;

    // calculate

    const d = new Date(calendar.getTime());
    d.setDate(1 - d.getDay()); // beginning of week containing beginning of month

    const weeks = [];
    for (let i = 0; i < 6; i++) {
        let dates = [];
        for (let j = 0; j < 7; j++, d.setDate(d.getDate() + 1)) {
            dates.push(new Date(d.getTime()));
        }
        weeks.push(dates);
    }

    // format

    function dayClasses(d: Date): string {

        let c = ['hover:text-white hover:bg-secondary-500'];

        if (d.getMonth() !== calendar.getMonth()) { c.push('text-muted bg-gray-200'); } // off
        if (d.getTime() === today.getTime()) { c.push('text-white bg-info-500'); } // today
        if (selected && d.getTime() === selected.getTime()) { c.push('text-white bg-primary-500'); } //selected

        return c.join(' ');

    }

    // render

    const months = ready ? t('months', { defaultValue: ['Janruary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'], returnObjects: true }) as string[] : null;
    const days = ready ? t('shortDays', { defaultValue: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], returnObjects: true }) as string[] : [];

    return (
        <div className="relative">

            <div>{ready ? 'ready' : 'not-ready'}</div>
            <div>{days}</div>

            <div ref={setTarget as LegacyRef<HTMLDivElement> | undefined}>
                <input key="input"
                    name={name} value={value} onChange={handleChange}
                    onFocus={handleFocus} onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="w-full px-2 py-1 border border-content-border rounded"
                />
            </div>

            {ready && show &&
                <div ref={setPopper as LegacyRef<HTMLDivElement> | undefined} className="absolute left-0 mt-1 bg-content-fg border border-conteng-border rounded overflow-hidden">

                    <div className="flex flex-row">

                        <div>

                            <div className="px-2 py-1 flex flex-row items-center justify-between bg-gray-400">
                                <div className="flex-grow text-center font-bold">
                                    {months![calendar.getMonth()]} {calendar.getFullYear()}
                                </div>
                                <div>
                                    <button className="focus:outline-none" onClick={handleClickPrevMonth}><AngleLeftIcon className="h-4 w-4 text-content stroke-current stroke-2" /></button>
                                    <button className="px-2 focus:outline-none" onClick={handleClickToday}><CircleIcon className="h-4 w-4 text-content stroke-current stroke-2" /></button>
                                    <button className="focus:outline-none" onClick={handleClickNextMonth}><AngleRightIcon className="h-4 w-4 text-content stroke-current stroke-2" /></button>
                                </div>
                            </div>

                            <table className="table-fixed text-center">
                                <thead>
                                    <tr>
                                        {days!.map((d, i) => <th key={i} className="w-10 px-1">{d}</th>)}
                                    </tr>
                                </thead>
                                <tbody className="cursor-pointer">
                                    {weeks.map(w =>
                                        <tr key={w[0].getTime()}>
                                            {w.map(d => <td key={d.getTime()} onClick={() => handleClickDate(d)} className={dayClasses(d)}>{d.getDate()}</td>)}
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>

                        {shortcuts &&
                            <div className="flex flex-col justify-between bg-gray-300 cursor-pointer">
                                {namedDays.map((s, i) => <div key={i} onClick={() => handleClickDate(s.date(new Date(today)))} className="px-2 hover:text-white hover:bg-secondary-500">{t(`namedDays.${s.label}`, { defaultValue: s.label })}</div>)}
                            </div>
                        }

                    </div>
                </div>
            }

        </div>
    );

};


//
// parse and format
//

/**
 * Return a date representing the first date of the parsed value or the first 
 * date of the current month if the parsed value is invalid.
 * 
 * @param {String} s - The string to parse
 */
function firstDate(s: string): Date {

    const ymd = parseDate(s);

    const first = ymd ? new Date(ymd[0], ymd[1], ymd[2]) : new Date();
    first.setHours(12, 0, 0, 0);
    first.setDate(1);

    return first;

}

/**
 * Parses a simple date in the format dd-mm-yyyy.
 * It is very lininent because it parses correctly dd, dd-mm, and dd-mm-yyyy.
 * It assumes the current date's month and year in the cases of an incomplete date.
 *
 * @param {String} s - The string to parse
 * @return {Array [ y, m, d ]} - The date represented as an array with a 0 based month
 */
function parseDate(s: string): [number, number, number] | null {

    var parse = /^\s*([0-3]?\d)(?:-(?:([0-1]?\d)?(?:-(\d{4})?)?)?)?\s*$/i.exec(s);
    if (parse) {

        var now = new Date();
        var d = +parse[1],
            m = parse[2] ? +parse[2] - 1 : now.getMonth(),
            y = parse[3] ? +parse[3] : now.getFullYear(),
            valid = new Date(y, m, d, 12, 0, 0, 0);

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
function formatDate(ymd: [number, number, number]): string {

    var m = ymd[1] + 1;
    return (ymd[2] < 10 ? '0' + ymd[2] : ymd[2]) + '-' + (m < 10 ? '0' + m : m) + '-' + ymd[0];

}
