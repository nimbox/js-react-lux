
import type { Meta, StoryObj } from '@storybook/react';
import { CustomSelect } from './CustomSelect';
import { useState } from 'react';


// Definition

const meta: Meta<typeof CustomSelect> = {
    component: CustomSelect
};

export default meta;
type Story = StoryObj<typeof CustomSelect>;

// Templates

const options = ['VES(1.00)', 'USD(1.895.903,02)', 'DOP(32.338,76)'];

const CustomSelectTemplate: Story = {
    render: (args) => {
        const [value, onChange] = useState(0);
        const label = (value: string | number) => JSON.stringify(value);
        return (
            <CustomSelect {...args} value={value} label={label} onChange={onChange}>
                {options.map((o, i) => <CustomSelect.Option value={i}>{o}</CustomSelect.Option>)}
            </CustomSelect>
        );
    }
};

// Story

export const Primary: Story = {
    ...CustomSelectTemplate
};
