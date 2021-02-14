import React, { useState } from 'react';
import { CheckboxBar, CheckboxBarProps } from './CheckboxBar';


// definition

const definition = {
    title: 'Component/CheckboxBar',
    component: CheckboxBar,
    argTypes: {
        size: { control: { type: 'select', options: ['sm', 'base', 'lg'] } },
        value: { control: { type: 'array' } },
    }
};
export default definition;

//  parameterized

export const Parameterized = ({ size, value: initial, options, ...props }: CheckboxBarProps & { options: string[] }) => {
    const [value, onChange] = useState(initial.map(i => +i));
    return (
        <CheckboxBar size={size} value={value} onChange={onChange}>
            {options.map((o, i) => <CheckboxBar.Option value={i}>{o}</CheckboxBar.Option>)}
        </CheckboxBar>
    );
};
Parameterized.args = { size: 'base', value: [1], options: ['1', '2', '3', '6', '12 months'] };

// stories

export const Base = ({ size }: CheckboxBarProps) => {
    const [value, onChange] = useState([1]);
    return (
        <CheckboxBar size={size} value={value} onChange={onChange}>
            <CheckboxBar.Option value={1}>1</CheckboxBar.Option>
            <CheckboxBar.Option value={2}>2</CheckboxBar.Option>
            <CheckboxBar.Option value={3}>3</CheckboxBar.Option>
            <CheckboxBar.Option value={6}>6</CheckboxBar.Option>
            <CheckboxBar.Option value={12}>12 months</CheckboxBar.Option>
        </CheckboxBar>
    );
};
Base.args = { size: 'base' };

export const Small = ({ size }: CheckboxBarProps) => {
    const [value, onChange] = useState([1]);
    return (
        <CheckboxBar size={size} value={value} onChange={onChange}>
            <CheckboxBar.Option value={1}>1</CheckboxBar.Option>
            <CheckboxBar.Option value={2}>2</CheckboxBar.Option>
            <CheckboxBar.Option value={3}>3</CheckboxBar.Option>
            <CheckboxBar.Option value={6}>6</CheckboxBar.Option>
            <CheckboxBar.Option value={12}>12 months</CheckboxBar.Option>
        </CheckboxBar>
    );
};
Small.args = { size: 'sm' };

export const Large = ({ size }: CheckboxBarProps) => {
    const [value, onChange] = useState([1]);
    return (
        <CheckboxBar size={size} value={value} onChange={onChange}>
            <CheckboxBar.Option value={1}>1</CheckboxBar.Option>
            <CheckboxBar.Option value={2}>2</CheckboxBar.Option>
            <CheckboxBar.Option value={3}>3</CheckboxBar.Option>
            <CheckboxBar.Option value={6}>6</CheckboxBar.Option>
            <CheckboxBar.Option value={12}>12 months</CheckboxBar.Option>
        </CheckboxBar>
    );
};
Large.args = { size: 'lg' };
