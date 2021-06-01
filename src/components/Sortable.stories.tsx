import classnames from 'classnames';
import { controlScale } from './ComponentScale';
import { Sortable } from './Sortable';


// definition

const definition = {
    title: 'Component/Sortable',
    component: Sortable
};
export default definition;

export const SortableList = () => {

    const onChange = (source: number, target: number) => {
        console.log("Sortable story", source, target);
    }

    return (
        <div className='inline-block'>
            <Sortable onChange={onChange} >
                <div className={classnames(controlScale['base'])}> Elemento 0</div>
                <div className={classnames(controlScale['base'])}> Elemento 1</div>
                <div className={classnames(controlScale['base'])}> Elemento 2</div>
                <div className={classnames(controlScale['base'])}> Elemento 3</div>
                <div className={classnames(controlScale['base'])}> Elemento 4</div>
            </Sortable>
        </div>

    )
};
