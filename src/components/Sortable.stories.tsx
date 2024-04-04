import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sortable } from './Sortable';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


// Definition

const meta: Meta<typeof Sortable> = {
    component: Sortable
};

export default meta;
type Story = StoryObj<typeof Sortable>;

// Templates

const SortableTemplate: Story = {
    decorators: [(Story) => <DndProvider backend={HTML5Backend}><Story /></DndProvider>]
};

// Stories

export const Basic: Story = {
    ...SortableTemplate,
    render: () => {

        const [lines, setLines] = useState(['uno', 'dos', 'tres', 'cuatro']);

        const onChange = (source: number, target: number) => {
            setLines(xx => {
                const changed = [...xx];
                const removed = changed.splice(source, 1);
                changed.splice(target, 0, removed[0]);
                return changed;
            });
        };

        return (
            <div className='inline-block'>
                <Sortable onChange={onChange}>
                    {lines.map(l => <div>{l}</div>)}
                </Sortable>
            </div>
        );

    }
};
