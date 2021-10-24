/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { Button } from './Buttons';
import { Close } from './Close';
import { Dialog } from './Dialog';


// definition

export default {
    title: 'Component/Dialog',
    component: Dialog
};

// stories

export const Simple = () => {

    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Button onClick={() => setVisible(true)}>modal</Button>
            <Dialog visible={visible} onHide={() => setVisible(false)} className="bg-gray-100 w-96 rounded">

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
                    <Button color="secondary" onClick={() => setVisible(false)}>Cancel</Button>
                    <Button onClick={() => setVisible(false)}>Ok</Button>
                </Dialog.Footer>

            </Dialog>
        </div>
    );

};

