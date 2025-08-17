import type { Meta, StoryObj } from '@storybook/react-vite';
import { ContactElement } from './ContactElement';


// Definition

const meta: Meta<typeof ContactElement> = {
    component: ContactElement
};

export default meta;
type Story = StoryObj<typeof ContactElement>;

// Template

const ContactElementTemplate: Story = {
    render: (args) => {
        return (
            <ContactElement {...args} />
        );
    },
    args: {
        type: 'email',
        locus: 'work',
        render: 'Kalzuro@nimbox.com'
    }
};

// Stories

export const Email: Story = {
    ...ContactElementTemplate,
    args: {
        ...ContactElementTemplate.args,
        type: 'email'
    }
};

export const Phone: Story = {
    ...ContactElementTemplate,
    args: {
        ...ContactElementTemplate.args,
        type: 'phone'
    }
};

export const Address: Story = {
    ...ContactElementTemplate,
    args: {
        ...ContactElementTemplate.args,
        type: 'address'
    }
};

export const Long: Story = {
    ...ContactElementTemplate,
    args: {
        ...ContactElementTemplate.args,
        render: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras gravida gravida erat, sed sollicitudin elit consectetur ut. Nam fringilla posuere.'
    }
};
