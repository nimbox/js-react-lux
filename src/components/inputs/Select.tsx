import React, { Children, forwardRef, type InputHTMLAttributes, type Ref, useMemo } from 'react';
import { Choose, type ChooseProps } from '../choose/Choose';
import { type OptionProps } from './Option';


//
// Select
//

type SelectOption = { value: string, display: React.ReactNode };

export interface SelectProps extends Omit<ChooseProps<SelectOption>, 'supplier' | 'identifier' | 'extractor'> {

    children: React.ReactElement<OptionProps>[];

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

    const options: SelectOption[][] = useMemo(() => {
        return [
            Children.map(children, (child) => {
                if (React.isValidElement<OptionProps>(child)) {
                    return {
                        value: child?.props?.value,
                        display: child.props?.children
                    };
                }
                return null;
            })
        ] as SelectOption[][];
    }, [children]);

    // Render

    return (

        <Choose<SelectOption>

            ref={selectRef}

            supplier={options}
            identifier={(option) => option.value}

            renderChosen={(o) => o.option.display}
            renderOption={(o) => o.option.display}

            {...chooseProps}

        />

    );

});
