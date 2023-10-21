import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { FullSquareIcon } from '../icons/components';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
    component: Button
};

export default meta;
type Story = StoryObj<typeof Button>;

const ButtonTemplate: Story = {
    render: (args) => {
        return (
            <div className="flex flex-row justify-between">
                <div className="space-x-4">
                    <Button variant="filled" {...args} />
                    <Button variant="outlined" {...args} />
                    <Button variant="text" {...args} />
                    <Button variant="link" {...args} />
                </div>
                <div className="space-x-4">
                    <Button variant="filled" {...args} disabled />
                    <Button variant="outlined" {...args} disabled />
                    <Button variant="text" {...args} disabled />
                    <Button variant="link" {...args} disabled />
                </div>
            </div>
        );
    }
};

export const Primary: Story = {
    ...ButtonTemplate,
    args: {
        semantic: 'primary',
        children: 'Button',
    }
};

export const Secondary: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        semantic: 'secondary',
    }
};

export const Danger: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        semantic: 'danger',
    }
};

export const Muted: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        semantic: 'muted',
    }
};

export const StartIcon: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        start: <FullSquareIcon />,
    }
};

export const EndIcon: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        end: <FullSquareIcon />,
    }
};

export const StartEndIcon: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        start: <FullSquareIcon />,
        end: <FullSquareIcon />,
    }
};

export const StartEndIconWidth: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        children: 'B',
        start: <FullSquareIcon />,
        end: <FullSquareIcon />,
        className:'w-24'
    }
};

export const StartEndIconHeight: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        start: <FullSquareIcon />,
        end: <FullSquareIcon />,
        className:'h-24'
    }
};

export const StartIconNoText: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        children: null,
        start: <FullSquareIcon />,
    }
};

export const EndIconNoText: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        children: null,
        end: <FullSquareIcon />,
    }
};

export const StartEndIconNoText: Story = {
    ...ButtonTemplate,
    args: {
        ...Primary.args,
        children: null,
        start: <FullSquareIcon />,
        end: <FullSquareIcon />,
    }
};
