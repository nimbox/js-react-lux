import React, { Children, forwardRef, InputHTMLAttributes, Ref, useMemo } from 'react';
import { Choose, ChooseProps } from '../choose/Choose';


//
// Select
//

export interface SelectProps extends Omit<ChooseProps<any, any>, 'supplier' | 'identifier' | 'extractor'> {

}

export const Select = forwardRef((
    props: SelectProps & InputHTMLAttributes<HTMLInputElement>,
    selectRef: Ref<HTMLInputElement>
) => {

    // Properties

    const {

        children,

        ...chooseProps

    } = props;

    // State

    const options = useMemo(() => {
        return [
            Children
                .map(children, (child: any) => ({
                    value: child?.props?.value,
                    display: child?.props?.children
                })) ?? []
        ];
    }, [children]);

    // Render

    return (

        <Choose<{ value: string, display: string }>

            ref={selectRef}

            supplier={options}
            identifier={(option) => option.value}

            renderChosen={({ option }) => <>{option.display}</>}
            renderOption={({ option }) => <>{option.display}</>}

            {...chooseProps}

        />

    );

});
