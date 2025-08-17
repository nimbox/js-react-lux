import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RadioBar } from './RadioBar';


// Definition

const meta: Meta<typeof RadioBar> = {
    component: RadioBar
};

export default meta;
type Story = StoryObj<typeof RadioBar>;

// Templates

const RadioBarTemplate: Story = {
    render: ({ className }) => {
        const [value, onChange] = useState([1]);
        return (
            <RadioBar value={value} onChange={onChange} className={className}>
                <RadioBar.Option value={1}>1</RadioBar.Option>
                <RadioBar.Option value={2}>2</RadioBar.Option>
                <RadioBar.Option value={3}>3</RadioBar.Option>
                <RadioBar.Option value={6}>6</RadioBar.Option>
                <RadioBar.Option value={12}>12 months</RadioBar.Option>
            </RadioBar>
        );
    }
};

//  Stories

export const Base: Story = {
    ...RadioBarTemplate,
    args: { }
};

export const ExtraSmall: Story = {
    ...RadioBarTemplate,
    args: { className: 'text-xs'}
};

export const Small: Story = {
    ...RadioBarTemplate,
    args: { className: 'text-sm'}
};

export const Large: Story = {
    ...RadioBarTemplate,
    args: { className: 'text-lg'}
};

export const ExtraLarge: Story = {
    ...RadioBarTemplate,
    args: { className: 'text-xl'}
};
