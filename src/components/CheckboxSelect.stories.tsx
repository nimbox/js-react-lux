import React, { useState } from 'react';
import { CheckboxSelect, CheckboxSelectProps } from './CheckboxSelect';
import _ from 'lodash';


// definition

const definition = {
    title: 'Component/CheckboxSelect',
    component: CheckboxSelect,
    argTypes: {
        size: { control: { type: 'select', options: ['sm', 'base', 'lg'] } },
        value: { control: { type: 'array' } },
    }
};
export default definition;

//  parameterized

export const Parameterized = ({ size, label: label, value: initial, options, ...props }: CheckboxSelectProps & { options: string[] }) => {
    const [value, onChange] = useState(initial.map(i => +i));
    label = _.take(value,2).reduce((acc, val) => acc + ' ' + options[val], '') + (_.size(value) > 2 ? ` y ${_.size(value) - 2} más` : '');
    
    return (
        <CheckboxSelect size={size} value={value} onChange={onChange} className='w-32' label={label || 'Ninguna'}>
            {options.map((o, i) =>  <CheckboxSelect.Option value={i}>{o}</CheckboxSelect.Option>)}
        </CheckboxSelect>
    );
};
Parameterized.args = { size: 'base', label: '', value: [1,4], options: ['UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO'] };