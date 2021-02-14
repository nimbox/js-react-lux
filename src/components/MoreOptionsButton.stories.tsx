import React, { useState } from 'react';
import { MoreOptionsButton, MoreOptionsButtonProps } from './Buttons';


// definition

const definition = {
    title: 'Component/MoreOptionsButton',
    component: MoreOptionsButton,
    argTypes: {
        size: { control: { type: 'select', options: ['sm', 'base', 'lg'] } },
        value: { control: { type: 'boolean' } },
    }
};
export default definition;

type BaseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & MoreOptionsButtonProps;

//  buttons

export const Base = ({ children, value: initial, ...props }: BaseProps) => {
    const [value, onChange] = useState<boolean>(initial);
    return (
        <>
            <div>Before</div>
            <MoreOptionsButton {...props} value={value} onChange={onChange}>
                <div>Extra</div>
            </MoreOptionsButton>
            <div>After</div>
        </>
    );
};
Base.args = { size: 'base', value: false };
