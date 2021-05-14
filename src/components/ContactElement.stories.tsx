import { useState } from 'react'
import { ContactElement, ContactElementProps } from './ContactElement'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ContactElementList } from './ContactElementList';

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


export const ContactElements = ({ scale, isDraggable, ...props }: ContactElementProps) => {

    const [contactElements, setContactElements] = useState([
        { value: 1, text: 'kalzuro@nimbox.com' },
        { value: 2, text: 'rmarimom@nimbox.com' },
        { value: 3, text: 'jmeza@nimbox.com' },
        { value: 4, text: 'phernandez@nimbox.com' },
        { value: 5, text: 'uncorreo@blablablablablaba.com' },
        { value: 6, text: 'otrocorreo@otraempresa.com' }
    ])

    const onChange =
        (dragIndex: number, hoverIndex: number) => {
            const dragContactElement = contactElements[dragIndex]
            if (dragContactElement) {
                setContactElements((prevState => {
                    const coppiedStateArray = [...prevState];
                    const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragContactElement);
                    coppiedStateArray.splice(dragIndex, 1, prevItem[0]);
                    return coppiedStateArray;
                }))
            }
        }


        const contactElementsRender = (values: any[], onChange: (dragIndex: number, hoverIndex: number) => void, isDraggable: boolean) => {
            return values
            .map((item, index) => (
                <ContactElement
                    index={index}
                    value={item.value}
                    render={item.text}
                    isDraggable={isDraggable}
                    onChange={onChange}
                    scale={scale}
                />
            ))
        }

    return (
        <ContactElementList values={contactElements} onChange={onChange} renderList={contactElementsRender} isDraggable={true} />
       
    )
};
ContactElements.args = { scale: 'base', isDraggable: true };
