/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { TextAreaMarkup } from './TextAreaMarkup';


// definition

export default {
    title: 'Component/Controls/TextAreaMarkup',
    component: TextAreaMarkup,
};

//  parameterized

export const Parameterized = () => {

    const [value, setValue] = useState("The first text");

    return (
        <div className="p-64">
            <TextAreaMarkup value={value} onChange={e => setValue(e.target.value)} />
        </div>
    );

};

