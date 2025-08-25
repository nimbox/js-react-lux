import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef } from 'react';
import { NativeSelect } from './NativeSelect';
import { Option } from './Option';


// Definition

const meta: Meta<typeof NativeSelect> = {
    component: NativeSelect,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof NativeSelect>;

// Templates

const NativeSelectTemplate: Story = {
    render: (args) => {
        const selectRef = useRef<HTMLSelectElement>(null);
        return (
            <NativeSelect ref={selectRef} {...args}>
                <Option value="one">Uno</Option>
                <Option value="two">Dos</Option>
                <Option value="three">Tres</Option>
            </NativeSelect>
        );
    }
};

// Stories

export const Default: Story =  {
    ...NativeSelectTemplate
};

// //
// // Stories
// //

// const Template = forwardRef((
//     props: NativeSelectProps & InputHTMLAttributes<HTMLSelectElement>,
//     selectRef: Ref<HTMLSelectElement>
// ) => {
//     return (
//         <NativeSelect ref={selectRef} {...props}>
//             <Option value="one">Uno</Option>
//             <Option value="two">Dos</Option>
//             <Option value="three">Tres</Option>
//         </NativeSelect>
//     );
// });

// export const Controlled = ControlledInputTemplate({ initial: 'two', forced: 'three', component: Template }).bind({});
// export const Uncontrolled = UncontrolledInputTemplate({ initial: 'two', forced: 'three', component: Template }).bind({});
// export const HookForm = HookFormInputTemplate({ initial: 'two', forced: 'three', component: Template }).bind({});
