import { ComponentMeta } from '@storybook/react';
import { forwardRef, InputHTMLAttributes, Ref } from 'react';
import { ControlledInputTemplate, HookFormInputTemplate, UncontrolledInputTemplate } from '../../templates/InputTemplate';
import { NativeSelect, NativeSelectProps } from './NativeSelect';
import { Option } from './Option';


export default {
    title: 'Components/Inputs/NativeSelect',
    component: NativeSelect,
    parameters: {
        layout: 'centered',
    }
} as ComponentMeta<typeof NativeSelect>



//
// Stories
//

const Template = forwardRef((
    props: NativeSelectProps & InputHTMLAttributes<HTMLSelectElement>,
    selectRef: Ref<HTMLSelectElement>
) => {
    return (
        <NativeSelect ref={selectRef} {...props}>
            <Option value="one">Uno</Option>
            <Option value="two">Dos</Option>
            <Option value="three">Tres</Option>
        </NativeSelect>
    );
});

export const Controlled = ControlledInputTemplate({ initial: 'two', forced: 'three', component: Template }).bind({});
export const Uncontrolled = UncontrolledInputTemplate({ initial: 'two', forced: 'three', component: Template }).bind({});
export const HookForm = HookFormInputTemplate({ initial: 'two', forced: 'three', component: Template }).bind({});
