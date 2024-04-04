import type { Meta, StoryObj } from '@storybook/react';
import { CheckBox } from './CheckBox';
import classnames from 'classnames';
import { CheckButton } from './CheckButton';
import { action } from '@storybook/addon-actions';


// Definition

const meta: Meta<typeof CheckBox> = {
    component: CheckBox
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

// Templates

const Label = (props) => <span className={classnames('border-t border-b', props.className)}>{props.children}</span>;

// Stories

export const Primary: Story = {
    render: () => {

        return (
            <div>
                <div><CheckBox defaultChecked={false} /> <Label>Unchecked</Label></div>
                <div><CheckBox defaultChecked={true} /> <Label>Checked</Label></div>
                <div><CheckBox defaultChecked={false} disabled /> <Label>Unchecked and Disabled</Label></div>
                <div><CheckBox defaultChecked={true} disabled /> <Label>Checked and Disabled</Label></div>
                <div><CheckBox defaultChecked={false} focus /> <Label>Focus Checked and Disabled</Label></div>
                <div><CheckBox defaultChecked={true} focus /> <Label>FOcus Checked and Disabled</Label></div>
            </div >
        );
    }
};

export const CheckedSizes: Story = {
    render: () => {
        return (
            <div className="flex flex-row justify-between">
                <div className="text-xs">
                    <CheckBox checked={true} /> <Label>Checked</Label>
                </div>
                <div className="text-sm">
                    <CheckBox checked={true} /> <Label>Checked</Label>
                </div>
                <div className="text-base">
                    <CheckBox checked={true} /> <Label>Checked</Label>
                </div>
                <div className="text-lg">
                    <CheckBox checked={true} /> <Label>Checked</Label>
                </div>
                <div className="text-xl">
                    <CheckBox checked={true} /> <Label>Checked</Label>
                </div>
            </div>
        );
    }
};

export const InsideInlineFlex: Story = {
    render: () => {
        return (
            <div className="text-base space-y-2">
                Before <span className="inline-flex flex-row items-center space-x-1"><CheckBox checked={true} /><Label className="self-baseline">Checked</Label></span> after
            </div>
        );
    }
};

export const CheckBoxButton: Story = {
    render: () => {
        return (
            <div className="text-base flex flex-row gap-2">
                <CheckBox />
                <CheckButton onFulfill={action('onFullfil')} onReject={action('onReject')} />
            </div>
        );
    }
};
