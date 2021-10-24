/* eslint-disable import/no-anonymous-default-export */
import { useState } from 'react';
import { Sortable } from './Sortable';


// definition

export default {
    title: 'Component/Sortable',
    component: Sortable
};


export const SortableList = () => {

    const [lines, setLines] = useState(["uno", "dos", "tres", "cuatro"]);

    const onChange = (source: number, target: number) => {
        setLines(xx => {
            const changed = [...xx];
            const removed = changed.splice(source, 1);
            changed.splice(target, 0, removed[0]);
            return changed;
        });
    }

    return (
        <div className='inline-block'>
            <Sortable onChange={onChange}>
                {lines.map(l => <div>{l}</div>)}
            </Sortable>
        </div>
    )

};
