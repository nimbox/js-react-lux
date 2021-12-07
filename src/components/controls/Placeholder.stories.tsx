/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { Input } from './Input';
import { Placeholder } from './Placeholder';
import { Wrapper } from './Wrapper';


export default {
    title: 'Component/Controls/Placeholder',
    component: Placeholder,
    parameters: {
        layout: 'centered'
    }
}


// 
// Stories
//

export const Default = () => {
    return (
        <div className="w-96">
            <Wrapper>
                <Placeholder placeholder="Placeholder standalone" />
            </Wrapper>
        </div>
    );
};

export const Shown = () => {
    return (
        <div className="w-96 grid grid-cols-2 gap-2 items-center">
            <Input placeholder="Placeholder in input" />
            <Wrapper>
                <Placeholder placeholder="Placeholder standalone" />
            </Wrapper>
        </div>
    );
};

export const ShownTruncate = () => {
    return (
        <div className="w-64 grid grid-cols-2 gap-2 items-center">
            <Input placeholder="Placeholder in input" />
            <Wrapper>
                <Placeholder placeholder="Placeholder standalone" />
            </Wrapper>
        </div>
    );
};

export const Hidden = () => {
    return (
        <div className="w-96 grid grid-cols-2 gap-2 items-center">
            <Input defaultValue="Hello" placeholder="Placeholder in input" />
            <Wrapper>
                <Placeholder placeholder="Placeholder standalone">Hello</Placeholder>
            </Wrapper>
        </div>
    );
};

export const Error = () => {
    return (
        <div className="w-96 grid grid-cols-2 gap-2 items-center">
            <Input error={true} placeholder="Placeholder in input" />
            <Wrapper error={true}>
                <Placeholder error={true} placeholder="Placeholder standalone" />
            </Wrapper>
        </div>
    );
};
