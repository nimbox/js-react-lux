import classnames from 'classnames';
import { useState } from 'react';
import { controlScale } from './ComponentScale';
import { Sortable } from './Sortable';


// definition

const definition = {
    title: 'Component/Sortable',
    component: Sortable
};
export default definition;

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
