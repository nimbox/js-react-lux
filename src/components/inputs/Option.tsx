import React, { forwardRef, InputHTMLAttributes, Ref } from 'react';

export interface OptionProps {

    /** 
     * Option value to be used in the parent select.
     */
    value?: string;

    /**
     * Option display text.
     */
    children: React.ReactNode;

}

export const Option = forwardRef((
    props: OptionProps & InputHTMLAttributes<HTMLOptionElement>,
    optionRef: Ref<HTMLOptionElement>
) => {

    const { children, ...optionProps } = props;

    return (
        <option ref={optionRef} {...optionProps}>{children}</option>
    );

});
