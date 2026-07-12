import React, { Children, type InputHTMLAttributes, type Ref, useMemo } from 'react';
import { Choose, type ChooseProps } from '../choose/Choose';
import { type OptionProps } from './Option';


//
// Select
//

type SelectOption = { value: string, display: React.ReactNode };

export interface SelectProps extends Omit<ChooseProps<SelectOption>, 'supplier' | 'identifier' | 'extractor' | 'ref'> {

    ref?: Ref<HTMLInputElement>;

    children: React.ReactElement<OptionProps>[];

}

export function Select(props: SelectProps & InputHTMLAttributes<HTMLInputElement>) {

    // Properties

    const {

        ref,

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

            ref={ref}

            supplier={options}
            identifier={(option) => option.value}

            renderChosen={(o) => o.option.display}
            renderOption={(o) => o.option.display}

            {...chooseProps}

        />

    );

}
