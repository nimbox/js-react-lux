import _, { values } from 'lodash';
import React, { useState } from 'react';
import { CustomMultiSelect, CustomMultiSelectProps } from './CustomMultiSelect';


// definition

const definition = {
    title: 'Component/Controls/CustomMultiSelect',
    component: CustomMultiSelect,
    argTypes: {
        scale: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
        value: { control: { type: 'array' } },
        align: { control: { type: 'radio', options: ['start', 'end', 'stretch'] } }
    }
};
export default definition;

//  parameterized

export const Parameterized = ({ scale, value: initial, options, align, ...props }: CustomMultiSelectProps & { options: string[] }) => {
    const [value, onChange] = useState(initial.map(i => +i));
    //label = _.take(value, 2).reduce((acc: string, val: number) => acc + ' ' + options[val], '') + (_.size(value) > 2 ? ` y ${_.size(value) - 2} más` : '');

    const label = (value: any) => {
        if (value.length > 0 && options.length > 0 && options.length >= value.length) {
            return _.reduce(_.take(value, 2), function (acc: string, val: number) { return acc + ' ' + options[val]; }, '') + (_.size(value) > 2 ? ` y ${_.size(value) - 2} más` : '')
        }
        return 'Ninguna';
    };

    return (
        <CustomMultiSelect scale={scale} value={value} onChange={onChange} className='' align={align} label={label}>
            {options.map((o, i) => <CustomMultiSelect.Option value={i}>{o}</CustomMultiSelect.Option>)}
        </CustomMultiSelect>
    );
};
Parameterized.args = { scale: 'base', label: '', value: [0, 1], align: 'start', options: ['UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO'] };