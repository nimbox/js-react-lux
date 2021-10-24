/* eslint-disable import/no-anonymous-default-export */
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import { controlScale } from './ComponentScale';
import { RadioBar, RadioBarProps } from './RadioBar';


// definition

export default {
    title: 'Component/RadioBar',
    component: RadioBar,
    argTypes: {
        scale: { control: { type: 'select', options: Object.keys(controlScale) } },
        value: { control: { type: 'array' } },
    }
};

//  parameterized

export const Parameterized = ({ scale, value: initial, options, ...props }: RadioBarProps & { options: string[] }) => {
    const [value, onChange] = useState(+initial);
    return (
        <RadioBar scale={scale} value={value} onChange={onChange}>
            {options.map((o, i) => <RadioBar.Option value={i}>{o}</RadioBar.Option>)}
        </RadioBar>
    );
};
Parameterized.args = { scale: 'base', value: 0, options: ['1', '2', '3', '6', '12 months'] };

// stories

const Template: Story<RadioBarProps> = ({ scale }) => {
    const [value, onChange] = useState(1);
    return (
        <RadioBar scale={scale} value={value} onChange={onChange}>
            <RadioBar.Option value={1}>1</RadioBar.Option>
            <RadioBar.Option value={2}>2</RadioBar.Option>
            <RadioBar.Option value={3}>3</RadioBar.Option>
            <RadioBar.Option value={6}>6</RadioBar.Option>
            <RadioBar.Option value={12}>12 months</RadioBar.Option>
        </RadioBar>
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
