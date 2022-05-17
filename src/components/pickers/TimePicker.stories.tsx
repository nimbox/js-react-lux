/* eslint-disable import/no-anonymous-default-export */
import { ComponentMeta } from '@storybook/react';
import { ControlledInputTemplate, HookFormInputTemplate, UncontrolledInputTemplate } from '../../templates/InputTemplate';
import { TimePicker } from './TimePicker';


export default {
    title: 'Components/Pickers/TimePicker',
    component: TimePicker,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof TimePicker>;


// 
// Stories
//

export const Controlled = ControlledInputTemplate({ initial: '8:30am', forced: '2:45pm', component: TimePicker }).bind({});
export const Uncontrolled = UncontrolledInputTemplate({ initial: '8:30am', forced: '2:45pm', component: TimePicker }).bind({});
export const HookForm = HookFormInputTemplate({ initial: '8:30am', forced: '2:45pm', component: TimePicker }).bind({});
