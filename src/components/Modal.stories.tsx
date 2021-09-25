/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { Button } from './Buttons';
import { Modal } from './Modal';


// definition

export default {
    title: 'Component/Modal',
    component: Modal
};


// stories

export const Simple = () => {

    const [visible, setVisible] = useState(false);

    return (
        <div>
            <Button onClick={() => setVisible(true)}>modal</Button>
            <Modal visible={visible} onHide={() => setVisible(false)}>
                <div className="w-full h-full flex flex-row justify-center items-center">
                    <div className="w-64 h-32 bg-white">
                        <Button type="button" onClick={() => setVisible(false)}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );

}

