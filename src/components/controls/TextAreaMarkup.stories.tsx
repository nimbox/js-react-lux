import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { TextAreaMarkup, TextAreaMarkupProps } from './TextAreaMarkup';


// definition

export default {
    title: 'Component/Controls/TextAreaMarkup',
    component: TextAreaMarkup,
};

//  parameterized

export const Parameterized = ({ }) => {

    const [value, setValue] = useState("The first text");

    return (
        <div className="p-64">
            <TextAreaMarkup value={value} onChange={e => setValue(e.target.value)} />
        </div>
    );

};

