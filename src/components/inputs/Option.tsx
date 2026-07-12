import React, { type InputHTMLAttributes, type Ref } from 'react';

export interface OptionProps {

    ref?: Ref<HTMLOptionElement>;

    /**
     * Option value to be used in the parent select.
     */
    value?: string;

    /**
     * Option display text.
     */
    children: React.ReactNode;

}

export function Option(props: OptionProps & InputHTMLAttributes<HTMLOptionElement>) {

    const { ref, children, ...optionProps } = props;

    return (
        <option ref={ref} {...optionProps}>{children}</option>
    );

}
