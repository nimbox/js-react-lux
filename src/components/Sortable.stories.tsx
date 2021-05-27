import { useCallback, useState } from 'react';
import { ContactElement, ContactElementProps } from './ContactElement';
import { Contact } from './Contact';
import { Sortable } from './Sortable';


// definition

const definition = {
    title: 'Component/Sortable',
    component: Contact,
    parameters: { actions: { argTypesRegex: '^on.*' } },
    argTypes: {
        scale: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
        isDraggable: { control: { type: 'boolean' } }
    }
};
export default definition;


export const SortableList = ({ scale, ...props }: ContactElementProps) => {

    let contactIndex: number;

    const [contacts, setContacts] = useState([
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
    ])
    const onChangeContacts = (dragIndex: number, hoverIndex: number) => {
        const dragItem = contacts[dragIndex];

        if (dragItem) {
            setContacts((prevState => {
                const coppiedStateArray = [...prevState];
                const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
                coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
                return coppiedStateArray;
            }))
        }
    }

    const OnChange = (dragIndex: number, hoverIndex: number) => {

        const [, setContactElements] = useState(contacts[contactIndex].elements);
        const dragItem = contacts[contactIndex].elements[dragIndex];

        if (dragItem) {
            setContactElements((prevState => {
                const coppiedStateArray = [...prevState];
                const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
                coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
                return coppiedStateArray;
            }))
        }
    }
    const initial: { value: number; text: string; locus: string; type: string; }[] = [];
    const [contactElements, setContactElements] = useState(contacts);

    return (
        <div>
            <Sortable onChange={onChangeContacts} scale={scale}>
                {contacts
                    .map((item, contactIndex) => (
                        <Contact
                            render={item.text}
                            scale={scale}
                        >
                            <Sortable scale={scale} onChange={(dragIndex: number, hoverIndex: number) => {
                                const dragItem = contacts[contactIndex].elements[dragIndex];
                                console.log(contactIndex, 'drag ', dragItem);
                                if (dragItem) {
                                    setContactElements((prevState => {
                                        const coppiedStateArray = [...prevState];
                                        const prevItem = coppiedStateArray[contactIndex].elements.splice(hoverIndex, 1, dragItem);
                                        coppiedStateArray[contactIndex].elements.splice(dragIndex, 1, prevItem[0]);
                                        return coppiedStateArray;
                                    }))
                                }
                            }} >
                                {item.elements
                                    .map(item => (
                                        <ContactElement
                                            className=""
                                            type={item.type}
                                            render={item.text}
                                            locus={item.locus}
                                            scale={scale}
                                        />
                                    ))}
                            </Sortable>
                        </Contact>
                    ))}
            </Sortable>
        </div>

    )
};
SortableList.args = { scale: 'base' };
