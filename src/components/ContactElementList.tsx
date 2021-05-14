import { FC, useState } from 'react'
import { ContactElement, ContactElementProps } from './ContactElement'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { ComponentScale } from './ComponentScale';

export interface ContactElementListProps {
    values: any[];
    onChange: (dragIndex: number, hoverIndex: number) => void;
    renderList: (values: any[], onChange: (dragIndex: number, hoverIndex: number) => void, isDraggable: boolean) => JSX.Element[];
    isDraggable: boolean;
    className?: string;
}

export const ContactElementList: FC<ContactElementListProps> = ( ({ values, onChange, renderList, isDraggable, ...props }) => {

    
    return (
            <DndProvider backend={HTML5Backend}>
                    {renderList(values, onChange, isDraggable)}
            </DndProvider>
        );

        });

