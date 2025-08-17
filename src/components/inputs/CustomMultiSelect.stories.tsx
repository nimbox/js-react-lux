import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CustomMultiSelect } from './CustomMultiSelect';


// Definition

const meta: Meta<typeof CustomMultiSelect> = {
    component: CustomMultiSelect
};

export default meta;
type Story = StoryObj<typeof CustomMultiSelect>;

// Templates

const CustomMultiSelectTemplate: Story = {
    render: (args) => {
        const [value, onChange] = useState(args.value);
        const label = (value: (string | number)[]) => JSON.stringify(value);
        return (
            <CustomMultiSelect {...args} label={label} value={value} onChange={onChange}>
                <CustomMultiSelect.Option value={'uno'}>uno</CustomMultiSelect.Option>
                <CustomMultiSelect.Option value={'dos'}>dos</CustomMultiSelect.Option>
                <CustomMultiSelect.Option value={'tres'}>tres</CustomMultiSelect.Option>
                <CustomMultiSelect.Option value={'cuatro'}>cuatro</CustomMultiSelect.Option>
            </CustomMultiSelect>
        );
    },
    args: {
        value: ['uno']
    }
};

// Stories

export const Primary: Story = {
    ...CustomMultiSelectTemplate
};
