import { CheckBox } from './CheckBox';
import { Control, ControlProps } from './Control';
import { Input } from './Input';
import { Radio } from './Radio';
import { Select } from './Select';


// definition

const definition = {
    title: 'Component/Controls/Control',
    component: Control,
    argTypes: {
        scale: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
        error: { control: { type: 'boolean'} }
    }
};
export default definition;

//  parameterized

export const Parameterized = ({ scale = 'base', error = false,  ...props }: ControlProps & { options: string[] }) => {

    return (
        <div className="mt-8 max-w-full">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Control scale={scale} error={error}>
                        <Control.Label badge="1/60">Label</Control.Label>
                        <Input scale={scale} />
                        <Control.Message>Mensaje text</Control.Message>
                    </Control>
                </div>
                <div>
                <Control scale={scale}>
                        <Control.Label >LABEL</Control.Label>
                        <Select>
                            <Select.Option value="1">Option one</Select.Option>
                            <Select.Option value="2">Option two</Select.Option>
                        </Select>
                    </Control>
                </div>
                <div>
                    <Control scale={scale}>
                        <CheckBox scale={scale}>Text text text and more text</CheckBox>
                    </Control>
                </div>
                <div>
                <Control scale={scale}>
                    <Radio scale={scale}>Text text text and more text</Radio>
                </Control>
                </div>
            </div>
        </div>
    );
};
Parameterized.args = { scale: 'base', error: false };