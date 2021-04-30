import _ from 'lodash';
import React, { useState } from 'react';
import { CustomMultiSelect, CustomMultiSelectProps } from './CustomMultiSelect';


// definition

const definition = {
    title: 'Component/CustomMultiSelect',
    component: CustomMultiSelect,
    argTypes: {
        scale: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
        value: { control: { type: 'array' } },
    }
};
export default definition;

//  parameterized

export const Parameterized = ({ scale, label: label, value: initial, options, ...props }: CustomMultiSelectProps & { options: string[] }) => {
    const [value, onChange] = useState(initial.map(i => +i));
    label = _.take(value, 2).reduce((acc: string, val: number) => acc + ' ' + options[val], '') + (_.size(value) > 2 ? ` y ${_.size(value) - 2} más` : '');

    return (
        <CustomMultiSelect scale={scale} value={value} onChange={onChange} className='' label={label || 'Ninguna'}>
            {options.map((o, i) => <CustomMultiSelect.Option value={i}>{o}</CustomMultiSelect.Option>)}
        </CustomMultiSelect>
    );
};
Parameterized.args = { scale: 'base', label: '', value: [1, 4], options: ['UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO'] };