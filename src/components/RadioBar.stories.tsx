import React, { useState } from 'react';
import { RadioBar, RadioBarProps } from './RadioBar';


// definition

const definition = {
    title: 'Component/RadioBar',
    component: RadioBar,
    argTypes: {
        size: { control: { type: 'select', options: ['sm', 'base', 'lg'] } },
        value: { control: { type: 'array' } },
    }
};
export default definition;

//  parameterized

export const Parameterized = ({ size, value: initial, options, ...props }: RadioBarProps & { options: string[] }) => {
    const [value, onChange] = useState(+initial);
    return (
        <RadioBar size={size} value={value} onChange={onChange}>
            {options.map((o, i) => <RadioBar.Option value={i}>{o}</RadioBar.Option>)}
        </RadioBar>
    );
};
Parameterized.args = { size: 'base', value: 0, options: ['1', '2', '3', '6', '12 months'] };

// stories

export const Base = ({ size }: RadioBarProps) => {
    const [value, onChange] = useState(1);
    return (
        <RadioBar size={size} value={value} onChange={onChange}>
            <RadioBar.Option value={1}>1</RadioBar.Option>
            <RadioBar.Option value={2}>2</RadioBar.Option>
            <RadioBar.Option value={3}>3</RadioBar.Option>
            <RadioBar.Option value={6}>6</RadioBar.Option>
            <RadioBar.Option value={12}>12 months</RadioBar.Option>
        </RadioBar>
    );
};
Base.args = { size: 'base' };

export const Small = ({ size }: RadioBarProps) => {
    const [value, onChange] = useState(1);
    return (
        <RadioBar size={size} value={value} onChange={onChange}>
            <RadioBar.Option value={1}>1</RadioBar.Option>
            <RadioBar.Option value={2}>2</RadioBar.Option>
            <RadioBar.Option value={3}>3</RadioBar.Option>
            <RadioBar.Option value={6}>6</RadioBar.Option>
            <RadioBar.Option value={12}>12 months</RadioBar.Option>
        </RadioBar>
    );
};
Small.args = { size: 'sm' };

export const Large = ({ size }: RadioBarProps) => {
    const [value, onChange] = useState(1);
    return (
        <RadioBar size={size} value={value} onChange={onChange}>
            <RadioBar.Option value={1}>1</RadioBar.Option>
            <RadioBar.Option value={2}>2</RadioBar.Option>
            <RadioBar.Option value={3}>3</RadioBar.Option>
            <RadioBar.Option value={6}>6</RadioBar.Option>
            <RadioBar.Option value={12}>12 months</RadioBar.Option>
        </RadioBar>
    );
};
Large.args = { size: 'lg' };
