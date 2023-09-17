import { CheckBox } from './CheckBox';
import { Control, ControlProps } from './Control';
import { Input } from './Input';
import { NativeSelect } from './NativeSelect';
import { Option } from './Option';
import { Radio } from './Radio';
import { SearchInput } from './SearchInput';
import React from 'react';


// Definition

const definition = {
    title: 'Component/Controls/Control',
    component: Control,
    argTypes: {
        scale: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
        error: { control: { type: 'boolean' } }
    }
};
export default definition;

//  Parameterized

export const Parameterized = ({ error = false, ...props }: ControlProps & { options: string[] }) => {

    return (
        <div className="mt-8 max-w-full">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Control error={error}>
                        <Control.Label badge="1/60">Label</Control.Label>
                        <Input />
                        <Control.Message>Mensaje text</Control.Message>
                        {error && <Control.Error>Error</Control.Error>}
                    </Control>
                </div>
                <div>
                    <Control error={error}>
                        <Control.Label badge="1/60">Label disabled</Control.Label>
                        <Input disabled />
                        <Control.Message>Mensaje text</Control.Message>
                        {error && <Control.Error>Error</Control.Error>}
                    </Control>
                </div>
                <div>
                    <Control error={error}>
                        <SearchInput />
                    </Control>
                </div>
                <div>
                    <Control error={error}>
                        <SearchInput disabled placeholder="disabled" />
                    </Control>
                </div>
                <div>
                    <Control >
                        <Control.Label >LABEL</Control.Label>
                        <NativeSelect>
                            <Option value="1">Option one</Option>
                            <Option value="2">Option two</Option>
                        </NativeSelect>
                    </Control>
                </div>
                <div>
                    <Control >
                        <Control.Label >LABEL DISABLED</Control.Label>
                        <NativeSelect disabled>
                            <Option value="1">Option one</Option>
                            <Option value="2">Option two</Option>
                        </NativeSelect>
                    </Control>
                </div>
                <div>
                    <Control >
                        <CheckBox/>&nbspText text text and more text
                    </Control>
                </div>
                <div>
                    <Control >
                        <CheckBox disabled />&nbsp;Disabled text text text and more text
                    </Control>
                </div>
                <div>
                    <Control >
                        <Radio >Text text text and more text</Radio>
                    </Control>
                </div>
                <div>
                    <Control >
                        <Radio disabled/>&nbsp;Disabled text text text and more text
                    </Control>
                </div>
            </div>
        </div>
    );
};
Parameterized.args = { error: false };