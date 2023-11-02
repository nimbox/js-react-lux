import type { Meta, StoryObj } from '@storybook/react';
import { Anchor } from './Anchor';
import React from 'react';
import { FullSquareIcon } from '../icons/components';


const meta: Meta<typeof Anchor> = {
    component: Anchor
};

export default meta;
type Story = StoryObj<typeof Anchor>;

export const Primary: Story = {
    args: {
        children: 'anchor',
    },
    render: (args) => {
        return (
                <p>Before <Anchor {...args}>{args.children}</Anchor> after</p>
        );
    }
};

export const StartIcon: Story = {
    ...Primary,
    args: {
        ...Primary.args,
        start: <FullSquareIcon />,
    }
};

export const EndIcon: Story = {
    ...Primary,
    args: {
        ...Primary.args,
        end: <FullSquareIcon />,
    }
};

export const StartEndIcon: Story = {
    ...Primary,
    args: {
        ...Primary.args,
        start: <FullSquareIcon />,
        end: <FullSquareIcon />,
    }
};
