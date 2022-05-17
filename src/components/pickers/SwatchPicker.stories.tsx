/* eslint-disable import/no-anonymous-default-export */
import { ComponentMeta } from '@storybook/react';
import { ControlledInputTemplate, HookFormInputTemplate, UncontrolledInputTemplate } from '../../templates/InputTemplate';
import { SwatchPicker } from './SwatchPicker';


export default {
    title: 'Components/Pickers/SwatchPicker',
    component: SwatchPicker,
    parameters: {
        layout: 'centered'
    }
} as ComponentMeta<typeof SwatchPicker>;


// 
// Stories
//

export const Controlled = ControlledInputTemplate({ initial: '#906090', forced: '#EA9317', component: SwatchPicker }).bind({});
export const Uncontrolled = UncontrolledInputTemplate({ initial: '#906090', forced: '#EA9317', component: SwatchPicker }).bind({});
export const HookForm = HookFormInputTemplate({ initial: '#906090', forced: '#EA9317', component: SwatchPicker }).bind({});
