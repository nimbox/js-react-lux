import React from 'react';
interface TimePickerProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Name used for the input element and returned in the change event. */
    name?: string;
    /** String representation of the time (for uncontrolled). */
    defaultValue?: string;
    /** String representation of the time (for controlled). */
    value?: string;
    /** Change event handler (for controlled). */
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    /** Parse time function defaults to parsing dd:mm ampm into [hh, mm]. */
    parseTime?: (s: string) => [number, number] | null;
    /** Format hour function defaults to formatting [hh] into hh (12 hour based). */
    formatHour?: (hour: number) => string;
    /** Format time function defaults to formatting [hh, mm] into hh:mm ampm (12 hour based). */
    formatTime?: (time: [number, number]) => string;
    /** Classes to append to the popper element. */
    popperClassName?: string;
}
/**
 * TimePicker. Select a time with one click.
 */
export declare const TimePicker: React.ForwardRefExoticComponent<TimePickerProps & React.RefAttributes<HTMLInputElement>>;
export {};
