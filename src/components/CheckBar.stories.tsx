import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CheckBar } from './CheckBar';


// Definition

const meta: Meta<typeof CheckBar> = {
    component: CheckBar
};

export default meta;
type Story = StoryObj<typeof CheckBar>;

// Templates

const CheckBarTemplate: Story = {
    render: ({ className }) => {
        const [value, onChange] = useState([1]);
        return (
            <CheckBar value={value} onChange={onChange} className={className}>
                <CheckBar.Option value={1}>1</CheckBar.Option>
                <CheckBar.Option value={2}>2</CheckBar.Option>
                <CheckBar.Option value={3}>3</CheckBar.Option>
                <CheckBar.Option value={6}>6</CheckBar.Option>
                <CheckBar.Option value={12}>12 months</CheckBar.Option>
            </CheckBar>
        );
    }
};

//  Stories

export const Base: Story = {
    ...CheckBarTemplate,
    args: { }
};

export const ExtraSmall: Story = {
    ...CheckBarTemplate,
    args: { className: 'text-xs'}
};

export const Small: Story = {
    ...CheckBarTemplate,
    args: { className: 'text-sm'}
};

export const Large: Story = {
    ...CheckBarTemplate,
    args: { className: 'text-lg'}
};

export const ExtraLarge: Story = {
    ...CheckBarTemplate,
    args: { className: 'text-xl'}
};
