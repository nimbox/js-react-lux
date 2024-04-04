import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { Close } from './Close';
import { Dialog } from './Dialog';


// Definition

const meta: Meta<typeof Dialog> = {
    component: Dialog
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// Stories

export const Simple: Story = {
    render: () => {

        const [visible, setVisible] = useState(false);

        return (
            <div>
                <Button onClick={() => setVisible(true)}>modal</Button>
                <Dialog show={visible} onHide={() => setVisible(false)} className="bg-gray-100 w-96 rounded">

                    <Dialog.Header className="px-3 py-2 flex flex-row justify-between items-center">
                        <h3 className="text-xl">sss</h3>
                        <Close onClick={() => setVisible(false)} className="text-xl" />
                    </Dialog.Header>

                    <Dialog.Body className="px-3 py-2 flex flex-col justify-between items-center">
                        <div>Some content</div>
                        <div>Some content</div>
                        <div>Some content</div>
                        <div>Some content</div>
                        <div>Some content</div>
                    </Dialog.Body>

                    <Dialog.Footer className="px-3 py-2 flex flex-row justify-end space-x-2 items-center">
                        <Button semantic="secondary" onClick={() => setVisible(false)}>Cancel</Button>
                        <Button onClick={() => setVisible(false)}>Ok</Button>
                    </Dialog.Footer>

                </Dialog>
            </div>
        );

    }

};

