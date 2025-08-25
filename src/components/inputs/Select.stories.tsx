import { type Meta, type StoryObj } from '@storybook/react-vite';
import { forwardRef, type InputHTMLAttributes, type Ref } from 'react';
import { ControlledTemplate, HookFormTemplate, UncontrolledTemplate } from '../../templates/InputTemplates';
import { Option } from './Option';
import { Select, type SelectProps } from './Select';


// Definition

const meta: Meta<typeof Select> = {
    component: Select,
    parameters: {
        layout: 'centered'
    }
};

export default meta;
type Story = StoryObj<typeof Select>;

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


// Stories

export const Primary: Story = {
    render: (args) => <Template {...args} />,
    args: {
        variant: 'filled',
        label: 'Label'
    }
};

export const Controlled: Story = {
    render: (args) => <ControlledTemplate component={Template} componentProps={args} initial="two" forced="three" />
};

export const Uncontrolled: Story = {
    render: (args) => <UncontrolledTemplate component={Template} componentProps={args} initial="two" forced="three" />
};

export const HookForm: Story = {
    render: (args) => <HookFormTemplate component={Template} componentProps={args} initial="two" forced="three" />
};
