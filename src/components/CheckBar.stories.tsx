/* eslint-disable import/no-anonymous-default-export */
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import { CheckBar, CheckBarProps } from './CheckBar';
import { paddings } from './ComponentSize';


// definition

export default  {
    title: 'Component/CheckBar',
    component: CheckBar,
    argTypes: {
        size: { control: { type: 'select', options: Object.keys(paddings) } },
        value: { control: { type: 'array' } },
    }
};

//  parameterized

export const Parameterized = ({ size, value: initial, options, ...props }: CheckBarProps & { options: string[] }) => {
    const [value, onChange] = useState(initial.map(i => +i));
    return (
        <CheckBar size={size} value={value} onChange={onChange}>
            {options.map((o, i) => <CheckBar.Option value={i}>{o}</CheckBar.Option>)}
        </CheckBar>
    );
};
Parameterized.args = { size: 'base', value: [1], options: ['1', '2', '3', '6', '12 months'] };

// stories

const Template: Story<CheckBarProps> = ({ size }) => {
    const [value, onChange] = useState([1]);
    return (
        <CheckBar size={size} value={value} onChange={onChange}>
            <CheckBar.Option value={1}>1</CheckBar.Option>
            <CheckBar.Option value={2}>2</CheckBar.Option>
            <CheckBar.Option value={3}>3</CheckBar.Option>
            <CheckBar.Option value={6}>6</CheckBar.Option>
            <CheckBar.Option value={12}>12 months</CheckBar.Option>
        </CheckBar>
    );
};

export const Extra_Small = Template.bind({});
Extra_Small.args = { size: 'xs' };

export const Small = Template.bind({});
Small.args = { size: 'sm' };

export const Base = Template.bind({});
Base.args = { size: 'base' };

export const Large = Template.bind({});
Large.args = { size: 'lg' };
