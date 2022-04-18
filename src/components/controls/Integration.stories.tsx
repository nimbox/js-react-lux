/* eslint-disable import/no-anonymous-default-export */
import { Button } from '../Button';
import { CheckBox } from './CheckBox';
import { Control, ControlProps } from './Control';
import { Input } from './Input';
import { Radio } from './Radio';
import { Select } from './Select';
import { InputField } from './InputField';
import { ReactElement, useRef, useState } from 'react';


// Definition

export default {
    title: 'Component/Controls/Integration',
};

export const Sizes = () => {

    return (
        <div className="flex justify-center items-center">

            <InputField variant="outlined" label="Label" defaultValue="Value" />
            <InputField variant="filled" label="Label" defaultValue="Value" />

            <Button>GO</Button>
            <Button variant="outlined">GO</Button>
            <Button variant="text">GO</Button>

        </div>
    );

};
