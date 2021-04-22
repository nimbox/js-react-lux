import _ from 'lodash';
import React, { useState } from 'react';
import { CheckSelect, CheckSelectProps } from './CheckSelect';


// definition

const definition = {
    title: 'Component/CheckSelect',
    component: CheckSelect,
    argTypes: {
        scale: { control: { type: 'select', options: ['sm', 'base', 'lg'] } },
        value: { control: { type: 'array' } },
    }
};
export default definition;

//  parameterized

export const Parameterized = ({ scale, label: label, value: initial, options, ...props }: CheckSelectProps & { options: string[] }) => {
    const [value, onChange] = useState(initial.map(i => +i));
    label = _.take(value, 2).reduce((acc: string, val: number) => acc + ' ' + options[val], '') + (_.size(value) > 2 ? ` y ${_.size(value) - 2} más` : '');

    return (
        <CheckSelect scale={scale} value={value} onChange={onChange} className='w-32' label={label || 'Ninguna'}>
            {options.map((o, i) => <CheckSelect.Option value={i}>{o}</CheckSelect.Option>)}
        </CheckSelect>
    );
};
Parameterized.args = { scale: 'base', label: '', value: [1, 4], options: ['UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO'] };