import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';


// Definition

const meta: Meta<typeof Modal> = {
    component: Modal
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Stories

export const Simple: Story = {
    render: () => {

        const [visible, setVisible] = useState(false);

        return (
            <div>
                <Button onClick={() => setVisible(true)}>modal</Button>
                <Modal show={visible}>
                    <div className="w-full h-full flex flex-row justify-center items-center bg-red-100">
                        <div className="w-64 h-32 p-3 flex flex-row justify-end items-end bg-white">
                            <Button type="button" onClick={() => setVisible(false)}>Cancel</Button>
                        </div>
                    </div>
                </Modal>
            </div>
        );

    }
};
