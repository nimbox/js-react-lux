import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';
import { FC, useState } from 'react';
import { Button } from './Button';
import { Popup } from './Popup';


// Definition

const meta: Meta<typeof Popup> = {
    component: Popup,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof Popup>;

// Templates

const SimplePopup: FC = () => (
    <div className="bg-yellow-100 p-1">Simple</div>
);

const PopupTemplate: Story = {
    render: ({ visible, placement }) => {
        return (
            <div className="grid grid-cols-3 gap-8">
                <div></div>
                <Popup visible={visible} onChangeVisible={action('setVisible')} placement={placement} Component={SimplePopup} >
                    <div className="w-64 h-32 bg-green-200 flex justify-center items-center">element</div>
                </Popup>
                <div></div>
            </div>
        );
    },
    args: {
        visible: true,
        placement: 'bottom'
    }
};

// Stories

export const Basic: Story = {
    ...PopupTemplate
};

export const InSpan: Story = {
    render: () => {
        return (
            <div className="grid grid-cols-4 gap-8">
                <div>
                    This <Popup visible={true} Component={SimplePopup}><span className="bg-green-200">element</span></Popup> in span mode.
                </div>
                <div>
                    This <Popup visible={true} Component={SimplePopup} placement="left"><span className="bg-green-200">element</span></Popup> in span mode.
                </div>
                <div>
                    This <Popup visible={true} Component={SimplePopup} placement="right"><span className="bg-green-200">element</span></Popup> in span mode.
                </div>
                <div>
                    This <Popup visible={true} Component={SimplePopup} placement="top"><span className="bg-green-200">element</span></Popup> in span mode.
                </div>
            </div>
        );
    }
};

export const InDiv: Story = {
    render: () => {
        return (
            <div className="grid grid-cols-4 gap-8">
                <Popup visible={true} Component={SimplePopup}>
                    <div className="bg-green-200">element</div>
                </Popup>
                <Popup visible={true} Component={SimplePopup} placement="left">
                    <div className="bg-green-200">element</div>
                </Popup>
                <Popup visible={true} Component={SimplePopup} placement="right">
                    <div className="bg-green-200">element</div>
                </Popup>
                <Popup visible={true} Component={SimplePopup} placement="bottom">
                    <div className="bg-green-200">element</div>
                </Popup>
            </div>
        );
    }
};

export const InDivHover: Story = {
    render: () => {
        const [visible, setVisible] = useState(false);
        return (
            <div className="grid grid-cols-4 gap-8">
                <div>element</div>
                <Popup Component={SimplePopup} visible={visible}>
                    <div className="bg-green-200" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>element</div>
                </Popup>
                <div>element</div>
                <div>element</div>
            </div>
        );
    }
};

export const InDivOnClick: Story = {
    render: () => {
        const [visible, setVisible] = useState(false);

        return (
            <div className="grid grid-cols-4 gap-8">
                <div>element</div>
                <Popup Component={SimplePopup} visible={visible} onChangeVisible={setVisible}>
                    <div className="bg-green-200" onClick={() => setVisible(true)}>element</div>
                </Popup>
                <div>element</div>
                <div>element</div>
            </div>
        );
    }
};

export const WithFunctionalComponent: Story = {
    render: () => {
        const [visible, setVisible] = useState(false);
        const FunctionPopup = () => <div>function</div>;
        return (
            <div className="grid grid-cols-4 gap-8 align-baseline">
                <div>element</div>
                <Popup Component={FunctionPopup} visible={visible} onChangeVisible={setVisible}>
                    <Button onClick={() => setVisible(true)}>element</Button>
                </Popup>
                <div>element</div>
                <div>element</div>
            </div>
        );
    }
};
