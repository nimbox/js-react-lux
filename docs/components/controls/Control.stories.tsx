import { CheckBox } from './CheckBox';
import { Control, ControlProps } from './Control';
import { SearchInput } from './SearchInput';
import { Input } from './Input';
import { Radio } from './Radio';
import { Select } from './Select';


// definition

const definition = {
    title: 'Component/Controls/Control',
    component: Control,
    argTypes: {
        scale: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
        error: { control: { type: 'boolean' } }
    }
};
export default definition;

//  parameterized

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
                        <Select>
                            <Select.Option value="1">Option one</Select.Option>
                            <Select.Option value="2">Option two</Select.Option>
                        </Select>
                    </Control>
                </div>
                <div>
                    <Control >
                        <Control.Label >LABEL DISABLED</Control.Label>
                        <Select disabled>
                            <Select.Option value="1">Option one</Select.Option>
                            <Select.Option value="2">Option two</Select.Option>
                        </Select>
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