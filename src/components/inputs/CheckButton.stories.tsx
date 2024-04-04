import type { Meta, StoryObj } from '@storybook/react';
import classnames from 'classnames';
import { CheckButton } from './CheckButton';
import { ReactNode } from 'react';


// Definition

const meta: Meta<typeof CheckButton> = {
    component: CheckButton,
    argTypes: {
        onFulfill: {
            action: 'fulfilled'
        },
        onReject: {
            action: 'rejected'
        }
    }
};

export default meta;
type Story = StoryObj<typeof CheckButton>;

// Templates

const Label = (props: { className?: string, children?: ReactNode }) => <span className={classnames('border-t border-b', props.className)}>{props.children}</span>;

const CheckButtonTemplate: Story = {
    render: (args) => {
        return (
            <span><CheckButton {...args}
                data-tooltip-fulfill="Fulfill"
                data-tooltip-reject="Reject"
            /> <Label>Do this task</Label></span>
        );
    }
};

// Stories

export const Primary: Story = {
    ...CheckButtonTemplate
};
