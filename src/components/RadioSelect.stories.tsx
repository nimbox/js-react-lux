import React, { useState } from 'react';
import { RadioSelect, RadioSelectProps } from './RadioSelect';


// definition

const definition = {
    title: 'Component/RadioSelect',
    component: RadioSelect,
    argTypes: {
        size: { control: { type: 'select', options: ['sm', 'base', 'lg'] } },
        value: { control: { type: 'array' } },
    }
};
export default definition;

//  parameterized

export const Parameterized = ({ size, label, value: initial, options, ...props }: RadioSelectProps & { options: string[] }) => {
    const [value, onChange] = useState(+initial);
    label = options[value];
    return (
        <RadioSelect size={size} label={label} className='w-48' value={value} onChange={onChange}>
            {options.map((o, i) => <RadioSelect.Option value={i}>{o}</RadioSelect.Option>)}
        </RadioSelect>
    );
};
Parameterized.args = { size: 'base', value: 0, options: ['VES(1.00)', 'USD(1.895.903,02)', 'DOP(32.338,76)'] };

