import React from 'react';
import { Tag, TagProps } from './Tag';
import { Button } from './Buttons';


// definition

const definition = {
    title: 'Component/Tag',
    component: Tag,
    argTypes: {
        scale: { control: { type: 'select', options: ['xs', 'sm', 'base', 'lg'] } },
        color:{ control: { type: 'color' } },
        children: { control: { type: 'text' } }
    }
};
export default definition;

// parameterized

export const Parameterized = ({ scale, color, children, ...props }: TagProps & { children: string }) => {
    const [del, setDelete] = React.useState(true);
    return (
        <div className="">
            { del && <Tag scale={scale} color={color} >
                {children}
             </Tag> }
             {!del && <Button link onClick={() => setDelete(true)} className="text-lg m-2">Ver etiqueta</Button>}
        </div>
    );
}

Parameterized.args = { scale: 'base', color: '#daedef', children: 'Etiqueta' };

export const TagExtraSmall = ({ scale, ...props }: TagProps) => ( <div><Tag scale="xs">Etiqueta</Tag> <Tag scale="xs" onDelete={() => true}>Etiqueta</Tag></div>);

export const TagSmall = ({ scale, ...props }: TagProps) => ( <div><Tag scale="sm">Etiqueta</Tag> <Tag scale="sm" onDelete={() => true}>Etiqueta</Tag></div> );

export const TagBase = ({ scale, ...props }: TagProps) => ( <div><Tag scale="base">Etiqueta</Tag> <Tag scale="base" onDelete={() => true}>Etiqueta</Tag></div> );

export const TagLarge = ({ scale, ...props }: TagProps) => ( <div><Tag scale="lg">Etiqueta</Tag> <Tag scale="lg" onDelete={() => true}>Etiqueta</Tag></div> );

export const TagLong = ({ scale, ...props }: TagProps) => ( 
    <div>
        <Tag scale="lg" className="mb-1">Etiqueta muy muy largaaaaaaaaaaaaaaaaaaannnjwfawdaweafknkwgnfkwenfkwndkwnfknwefknweka sm,c awklefnklwenfkdansckawebnkfnw cljw lefbdlqjw flqjwdj qwdq</Tag> 
        <Tag scale="lg" onDelete={() => true}>Etiqueta  muy muy largaaaaaaaaaaaaaaaaaaannnjwfawdaweafknkwgnfkwenfkwndkwnfknwefknweka sm,c awklefnklwenfkdansckawebnkfnw cljw lefbdlqjw flqjwdj qwdq</Tag>
    </div> 
    ); 

export const DiferentTextscales = () => (
    <div className="">
        <span className="text-2xl">Letra grande</span>
        <Tag scale="xs" onDelete={() => true} >Etiqueta</Tag>
        <span className="text-xs">Letra pequeña</span>
        <Tag scale="lg"> Otra etiqueta</Tag>
    </div>
)

export const SameTextscales = ({ scale, ...props }: TagProps) => (
    <div className="">
        <span>Texto primero</span>
        <Tag scale={scale} onDelete={() => true}> Etiqueta</Tag>
        <span>Texto después</span>
        <Tag scale={scale}>Otra etiqueta</Tag>
    </div>
)
