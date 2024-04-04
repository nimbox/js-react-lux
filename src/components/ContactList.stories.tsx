import type { Meta, StoryObj } from '@storybook/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Contact } from './Contact';
import { ContactElement } from './ContactElement';
import { Sortable } from './Sortable';


// Definition

const meta: Meta = {
};

export default meta;
type Story = StoryObj;

// Templates

const ContactListTemplate: Story = {
    decorators: [(Story) => <DndProvider backend={HTML5Backend}><Story /></DndProvider>]
};

// Stories

export const Basic: Story = {

    ...ContactListTemplate,

    render: () => {
        const contacts = [
            {
                value: 1, text: 'Karla Alzuro', locus: 'work', type: 'email', elements: [
                    { value: 1, text: 'kalzuro@nimbox.com', locus: 'work', type: 'email' },
                    { value: 2, text: 'rmarimom@nimbox.com', locus: 'work', type: 'email' },
                    { value: 3, text: 'jmeza@nimbox.com', locus: 'skype', type: 'email' },
                    { value: 4, text: 'phernandez@nimbox.com', locus: 'work', type: 'email' },
                    { value: 5, text: '04129335187', locus: 'mobile', type: 'phone' },
                    { value: 6, text: '02123456872', locus: 'work', type: 'phone' }
                ]
            },
            {
                value: 2, text: 'Ricardo Marimon', locus: 'work', type: 'email', elements: [
                    { value: 1, text: 'kalzuro@nimbox.com', locus: 'work', type: 'email' },
                    { value: 2, text: 'rmarimom@nimbox.com', locus: 'work', type: 'email' },
                    { value: 3, text: 'jmeza@nimbox.com', locus: 'skype', type: 'email' },
                    { value: 4, text: 'phernandez@nimbox.com', locus: 'work', type: 'email' },
                    { value: 5, text: '04129335187', locus: 'mobile', type: 'phone' },
                    { value: 6, text: '02123456872', locus: 'work', type: 'phone' }
                ]
            },
            {
                value: 3, text: 'Jonathan Meza', locus: 'skype', type: 'email', elements: [
                    { value: 1, text: 'kalzuro@nimbox.com', locus: 'work', type: 'email' },
                    { value: 2, text: 'rmarimom@nimbox.com', locus: 'work', type: 'email' },
                    { value: 3, text: 'jmeza@nimbox.com', locus: 'skype', type: 'email' },
                    { value: 4, text: 'phernandez@nimbox.com', locus: 'work', type: 'email' },
                    { value: 5, text: '04129335187', locus: 'mobile', type: 'phone' },
                    { value: 6, text: '02123456872', locus: 'work', type: 'phone' }
                ]
            }
        ];

        const onChange = (source: number, target: number) => {
            console.log(source, target);
        };

        return (
            <div>
                <Sortable onChange={onChange}>
                    {contacts
                        .map((item) => (
                            <Contact
                                render={item.text}>
                                <Sortable onChange={onChange}>
                                    {item.elements
                                        .map(item => (
                                            <ContactElement
                                                type={item.type}
                                                render={item.text}
                                                locus={item.locus}
                                            />
                                        ))}
                                </Sortable>
                            </Contact>
                        ))}
                </Sortable>
            </div>

        );

    }
};
