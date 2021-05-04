import React, { useState } from 'react';
import { CustomSelect, RadioSelectProps } from './CustomSelect';


// definition

const definition = {
    title: 'Component/Controls/CustomSelect',
    component: CustomSelect,
    argTypes: {
        scale: { control: { type: 'select', options: ['sm', 'base', 'lg'] } },
        value: { control: { type: 'array' } },
        align: { control: { type: 'radio', options: ['start', 'end', 'stretch'] } }
    }
};
export default definition;

//  parameterized

export const Parameterized = ({ scale, value: initial, options, align, ...props }: RadioSelectProps & { options: string[] }) => {
    
    const [value, onChange] = useState(+initial);
    const label = (value: any) => ( options[value] );
    
    return (
        <CustomSelect scale={scale} label={label} className='' align={align} value={value} onChange={onChange}>
            {options.map((o, i) => <CustomSelect.Option value={i}>{o}</CustomSelect.Option>)}
        </CustomSelect>
    );
};
Parameterized.args = { scale: 'base', value: 0, align: 'start', options: ['VES(1.00)', 'USD(1.895.903,02)', 'DOP(32.338,76)'] };

