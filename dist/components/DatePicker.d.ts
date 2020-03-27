import React, { FC } from 'react';
interface Props {
    /** Name used for the input element and returned in the change event. */
    name?: string;
    /** String representation of the date. */
    value: string;
    /** Change event handler. */
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    /** Wether to show the shortcuts menu. */
    shortcuts: boolean;
    /** Input placeholder. */
    placeholder?: string;
}
/**
 * DatePicker. Select a date with one click.
 */
export declare const DatePicker: FC<Props>;
export {};
