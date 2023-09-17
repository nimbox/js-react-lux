/* eslint-disable import/no-anonymous-default-export */
import { Meta } from '@storybook/react';
import { ControlledInputTemplate, HookFormInputTemplate, UncontrolledInputTemplate } from '../../templates/InputTemplate';
import { Input } from './Input';


export default {
    title: 'Components/Inputs/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    }
} as Meta<typeof Input>


//
// Stories
//

export const Controlled = ControlledInputTemplate({ initial: 'Hello', forced: 'Bye', component: Input }).bind({});
export const Uncontrolled = UncontrolledInputTemplate({ initial: 'Hello', forced: 'Bye', component: Input }).bind({});
export const HookForm = HookFormInputTemplate({ initial: 'Hello', forced: 'Bye', component: Input }).bind({});
