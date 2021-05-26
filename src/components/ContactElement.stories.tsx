import { useCallback, useState } from 'react';
import { ContactElement, ContactElementProps } from './ContactElement';
import { Sortable } from './Sortable';
import update from 'immutability-helper';


// definition

const definition = {
    title: 'Component/ContactElement',
    component: ContactElement,
    argTypes: {
        scale: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
        isDraggable: { control: { type: 'boolean' } }
    }
};
export default definition;


export const ContactElements = ({ scale, ...props }: ContactElementProps) => {
   
    const style = {
        border: '1px dashed gray',
        padding: '0.5rem 1rem',
        marginBottom: '.5rem',
        backgroundColor: 'white',
        cursor: 'move',
      }

    const [contactElements, setContactElements] = useState([
        { value: 1, text: 'kalzuro@nimbox.com', locus: 'work', type: 'email' },
        { value: 2, text: 'rmarimom@nimbox.com', locus: 'work', type: 'email'},
        { value: 3, text: 'jmeza@nimbox.com', locus: 'skype', type: 'email' },
        { value: 4, text: 'phernandez@nimbox.com', locus: 'work', type: 'email' },
        { value: 5, text: '04129335187', locus: 'mobile', type: 'phone' },
        { value: 6, text: '02123456872',locus: 'work', type: 'phone' }
    ])

    const onChange = (dragIndex: number, hoverIndex: number) => {
        const dragItem = contactElements[dragIndex];

        if (dragItem) {
            setContactElements((prevState => {
                const coppiedStateArray = [...prevState];
                const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);
                coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
                return coppiedStateArray;
            }))
        }
    }

    return (
        <div>
        <Sortable onChange={onChange} >
            {contactElements
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
        </div>

    )
};
ContactElements.args = { scale: 'base' };
