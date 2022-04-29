/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { CustomSelect, CustomSelectProps } from './CustomSelect';


// definition

export default {
    title: 'Component/Controls/CustomSelect',
    component: CustomSelect,
    argTypes: {
        scale: { control: { type: 'select', options: ['sm', 'base', 'lg'] } },
        value: { control: { type: 'array' } },
        align: { control: { type: 'radio', options: ['start', 'end', 'stretch'] } }
    }
};

//  parameterized

export const Parameterized = ({  value: initial, options, align, ...props }: CustomSelectProps & { options: string[] }) => {

    const [value, onChange] = useState(+initial);
    const label = (value: any) => (options[value]);

    return (
        <CustomSelect label={label} className='' align={align} value={value} onChange={onChange}>
            {options.map((o, i) => <CustomSelect.Option value={i}>{o}</CustomSelect.Option>)}
        </CustomSelect>
    );
};
Parameterized.args = { scale: 'base', value: 0, align: 'start', options: ['VES(1.00)', 'USD(1.895.903,02)', 'DOP(32.338,76)'] };

