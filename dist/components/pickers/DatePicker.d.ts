import React from 'react';
import { InputProps } from '../controls/Input';
import { PopperPlacement } from '../Popper';
export interface DatePickerProps extends InputProps {
    /** Name used for the input element and returned in the change event. */
    name?: string;
    /** String representation of the date (for uncontrolled). */
    defaultValue?: string;
    /** String representation of the date (for controlled). */
    value?: string;
    /** Change event handler (for controlled). */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /** Wether to show the shortcuts menu. */
    withShortcuts?: boolean;
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
/**
 * DatePicker. Select a date with one click.
 */
export declare const DatePicker: React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<HTMLInputElement>>;
