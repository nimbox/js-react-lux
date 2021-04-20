import React from 'react';
import { Tag, TagProps } from './Tag';
import { Button } from './Buttons';


// definition

const definition = {
    title: 'Component/Tag',
    component: Tag,
    argTypes: {
        size: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
        color:{ control: { type: 'color' } },
        children: { control: { type: 'text' } }
    }
};
export default definition;

// parameterized

export const Parameterized = ({ size, color, children, ...props }: TagProps & { children: string }) => {
    const [del, setDelete] = React.useState(true);
    return (
        <div className="">
            { del && <Tag size={size} color={color} >
                {children}
             </Tag> }
             {!del && <Button link onClick={() => setDelete(true)} className="text-lg m-2">Ver etiqueta</Button>}
        </div>
    );
}

Parameterized.args = { children: 'Etiqueta', size: 'base', color: '#daedef'};

export const TagExtraSmall = ({ size, ...props }: TagProps) => ( <div><Tag size="xs">Etiqueta</Tag> <Tag size="xs" onDelete={() => true}>Etiqueta</Tag></div>);

export const TagSmall = ({ size, ...props }: TagProps) => ( <div><Tag size="sm">Etiqueta</Tag> <Tag size="sm" onDelete={() => true}>Etiqueta</Tag></div> );

export const TagBase = ({ size, ...props }: TagProps) => ( <div><Tag size="base">Etiqueta</Tag> <Tag size="base" onDelete={() => true}>Etiqueta</Tag></div> );

export const TagLarge = ({ size, ...props }: TagProps) => ( <div><Tag size="lg">Etiqueta</Tag> <Tag size="lg" onDelete={() => true}>Etiqueta</Tag></div> );

export const TagLong = ({ size, ...props }: TagProps) => ( 
    <div>
        <Tag size="lg" className="mb-1">Etiqueta muy muy largaaaaaaaaaaaaaaaaaaannnjwfawdaweafknkwgnfkwenfkwndkwnfknwefknweka sm,c awklefnklwenfkdansckawebnkfnw cljw lefbdlqjw flqjwdj qwdq</Tag> 
        <Tag size="lg" onDelete={() => true}>Etiqueta  muy muy largaaaaaaaaaaaaaaaaaaannnjwfawdaweafknkwgnfkwenfkwndkwnfknwefknweka sm,c awklefnklwenfkdansckawebnkfnw cljw lefbdlqjw flqjwdj qwdq</Tag>
    </div> 
    ); 

export const DiferentTextSizes = () => (
    <div className="">
        <span className="text-2xl">Letra grande</span>
        <Tag size="xs" onDelete={() => true} >Etiqueta</Tag>
        <span className="text-xs">Letra pequeña</span>
        <Tag size="lg"> Otra etiqueta</Tag>
    </div>
)

export const SameTextSizes = ({ size, ...props }: TagProps) => (
    <div className="">
        <span>Texto primero</span>
        <Tag size={size} onDelete={() => true}> Etiqueta</Tag>
        <span>Texto después</span>
        <Tag size={size}>Otra etiqueta</Tag>
    </div>
)
