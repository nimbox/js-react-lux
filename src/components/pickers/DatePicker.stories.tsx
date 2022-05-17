/* eslint-disable import/no-anonymous-default-export */
import { ComponentMeta } from '@storybook/react';
import { ControlledInputTemplate, HookFormInputTemplate, UncontrolledInputTemplate } from '../../templates/InputTemplate';
import { DatePicker } from './DatePicker';


export default {
    title: 'Components/Pickers/DatePicker',
    component: DatePicker,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof DatePicker>;


// 
// Stories
//

export const Controlled = ControlledInputTemplate({ initial: '19-12-1967', forced: '01-02-2022', component: DatePicker }).bind({});
export const Uncontrolled = UncontrolledInputTemplate({ initial: '19-12-1967', forced: '02-02-2022', component: DatePicker }).bind({});
export const HookForm = HookFormInputTemplate({ initial: '19-12-1967', forced: '02-02-2022', component: DatePicker }).bind({});
