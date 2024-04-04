import { NativeSelect } from './NativeSelect';


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
    render: (args) => (
        <NativeSelect ref={selectRef} {...args}>
            <Option value="one">Uno</Option>
            <Option value="two">Dos</Option>
            <Option value="three">Tres</Option>
        </NativeSelect>
    )
};

// Stories

export const Primary: Story =  {
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
