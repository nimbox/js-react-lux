/* eslint-disable import/no-anonymous-default-export */
import { ChooseMultiple } from './ChooseMultiple';
import { default as colors } from '../../data/flat-colors';
import _ from 'lodash';
import { MockStore } from '../../test/MockStore';
import { Input } from './Input';


// definition

export default {
    title: 'Component/Controls/ChooseMultiple',
    component: ChooseMultiple,
    parameters: {
        layout: 'centered'
    }
};

// stories

const color = () => colors[_.random(0, colors.length)];

interface StoryTag {
    id: string;
    description: string;
    color: string;
}

const store = new MockStore<StoryTag>([
    { id: 'id1', description: 'kalzuro', color: color() },
    { id: 'id2', description: 'jmeza', color: color() },
    { id: 'id3', description: 'rmarimon', color: color() },
    { id: 'id4', description: 'jcastellanos', color: color() },
    { id: 'id5', description: 'svegas', color: color() },
    { id: 'id6', description: 'etorres', color: color() },
    { id: 'id7', description: 'phernandez', color: color() },
    { id: 'id8', description: 'llara', color: color() },
    { id: 'id9', description: 'kalvarez', color: color() },
    { id: 'id10', description: 'etiqueta1wfewfwefwfwefnkwenfkwnefkwnfkwe', color: color() },
    { id: 'id11', description: 'etiqueta2', color: color() },
    { id: 'id22', description: 'etiqueta3', color: color() }
],
    (value: string) => (item: StoryTag) => item.id === value,
    (q: string) => {
        const lowerq = q.toLowerCase();
        return (item: StoryTag) => item.description.toLowerCase().includes(lowerq);
    }
);

const initialTags = ['id1', 'id10'];


export const Base = () => {

    return (
        <div className="w-96 grid grid-cols-4 gap-4">
            <Input defaultValue="" />
            <div className="col-span-2">
                <ChooseMultiple<StoryTag[], StoryTag>

                    withMultiple={true}
                    withSearch={true}

                    value={initialTags}

                    option={(values: string[]) => values.map(value => store.get(value))}
                    options={async (search: string) => [await store.search(search)]}

                    renderOption={({ option }) => <>{option.id}</>}

                    onChoose={(e) => console.log(e)}

                />
            </div>
            <Input defaultValue="" />
        </div >
    );

};
