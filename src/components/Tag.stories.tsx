import React from 'react';
import { Tag, TagProps } from './Tag';



// definition

const definition = {
    title: 'Component/Tag',
    component: Tag,
    argTypes: {
        size: { control: { type: 'select', options: ['sm', 'base', 'lg'] } },
    }
};
export default definition;

// parameterized

export const Parameterized = ({ size, ...props }: TagProps) => {
    const [show, setShow] = React.useState(true);
    return (
        <div className="">
            <span onClick={() => setShow(true)} className="text-2xl">Mostrar etiqueta</span>
            { show && <Tag size={size} onDelete={() => setShow(!show)} >
                Etiqueta jefjwennwekdwkmnkcncnwienipqnwdijdojwopdjojdopqjdoqjwdoqwjdoqwjdqowjdopqwjdoqwjdoqwjdopqwjdoqwjdowjdoqwdoqwjdoqjwdojqwdojqwdoqwjdoqwjdoqwjdpoj
             </Tag> } 

        </div>
    );
} 

Parameterized.args = { size: 'base', className: 'text-secondary-500' };