import type { Meta, StoryObj } from '@storybook/react';
import { FullSquareIcon } from '../icons/components';
import { Anchor } from './Anchor';


const meta: Meta<typeof Anchor> = {
    component: Anchor
};

export default meta;
type Story = StoryObj<typeof Anchor>;

export const Primary: Story = {
    args: {
        children: 'anchor'
    },
    render: (args) => {
        return (
            <div className="space-x-4">
                <Anchor variant="filled" {...args} />
                <Anchor variant="outlined" {...args} />
                <Anchor variant="text" {...args} />
                <Anchor variant="link" {...args} />
                <Anchor variant="filled" {...args} disabled />
                <Anchor variant="outlined" {...args} disabled />
                <Anchor variant="text" {...args} disabled />
                <Anchor variant="link" {...args} disabled />
            </div>
        );
    }
};

export const StartIcon: Story = {
    ...Primary,
    args: {
        ...Primary.args,
        start: <FullSquareIcon />
    }
};

export const EndIcon: Story = {
    ...Primary,
    args: {
        ...Primary.args,
        end: <FullSquareIcon />
    }
};

export const StartEndIcon: Story = {
    ...Primary,
    args: {
        ...Primary.args,
        start: <FullSquareIcon />,
        end: <FullSquareIcon />
    }
};
