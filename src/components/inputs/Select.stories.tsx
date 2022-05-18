import { ComponentMeta } from '@storybook/react';
import { forwardRef, InputHTMLAttributes, Ref } from 'react';
import { ControlledInputTemplate, HookFormInputTemplate, UncontrolledInputTemplate } from '../../templates/InputTemplate';
import { Select, SelectProps } from './Select';
import { Option } from './Option';


export default {
    title: 'Components/Inputs/Select',
    component: Select,
    parameters: {
        layout: 'centered',
    }
} as ComponentMeta<typeof Select>


//
// Stories
//

const Template = forwardRef((
    props: SelectProps & InputHTMLAttributes<HTMLInputElement>,
    selectRef: Ref<HTMLInputElement>
) => {
    return (
        <Select ref={selectRef} {...props}>
            <Option value="one">Uno</Option>
            <Option value="two">Dos</Option>
            <Option value="three">Tres</Option>
        </Select>
    );
});

export const Controlled = ControlledInputTemplate({ initial: 'two', forced: 'three', component: Template }).bind({});
export const Uncontrolled = UncontrolledInputTemplate({ initial: 'two', forced: 'three', component: Template }).bind({});
export const HookForm = HookFormInputTemplate({ initial: 'two', forced: 'three', component: Template }).bind({});
