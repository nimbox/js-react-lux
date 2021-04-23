/* eslint-disable import/no-anonymous-default-export */
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import { CheckBar, CheckBarProps } from './CheckBar';
import { controlScale } from './ComponentScale';


// definition

export default {
    title: 'Component/CheckBar',
    component: CheckBar,
    argTypes: {
        scale: { control: { type: 'select', options: Object.keys(controlScale) } },
        value: { control: { type: 'array' } },
    }
};

//  parameterized

export const Parameterized = ({ scale, value: initial, options, ...props }: CheckBarProps & { options: string[] }) => {
    const [value, onChange] = useState(initial.map(i => +i));
    return (
        <CheckBar scale={scale} value={value} onChange={onChange}>
            {options.map((o, i) => <CheckBar.Option value={i}>{o}</CheckBar.Option>)}
        </CheckBar>
    );
};
Parameterized.args = { scale: 'base', value: [1], options: ['1', '2', '3', '6', '12 months'] };

// stories

const Template: Story<CheckBarProps> = ({ scale }) => {
    const [value, onChange] = useState([1]);
    return (
        <CheckBar scale={scale} value={value} onChange={onChange}>
            <CheckBar.Option value={1}>1</CheckBar.Option>
            <CheckBar.Option value={2}>2</CheckBar.Option>
            <CheckBar.Option value={3}>3</CheckBar.Option>
            <CheckBar.Option value={6}>6</CheckBar.Option>
            <CheckBar.Option value={12}>12 months</CheckBar.Option>
        </CheckBar>
    );
};

export const Extra_Small = Template.bind({});
Extra_Small.args = { scale: 'xs' };

export const Small = Template.bind({});
Small.args = { scale: 'sm' };

export const Base = Template.bind({});
Base.args = { scale: 'base' };

export const Large = Template.bind({});
Large.args = { scale: 'lg' };
