import classnames from 'classnames';
import _range from 'lodash/range';
import _uniqueId from 'lodash/uniqueId';
import React, { FC, useMemo, useState } from 'react';
import { PlusIcon } from '../../icons';
import { BoardProps } from './Board';
import { KanbanProvider, useKanbanContext } from './Kanban';
import { useCard } from './useCard';
import { useColumn } from './useColumn';


// definition

export default {
    title: 'Module/Kanban',
    component: KanbanProvider,
    parameters: {
        layout: 'fullscreen'
    }
};


const uniqueColumn = () => _uniqueId('column-');
const uniqueCard = () => _uniqueId('card-');

const defaultColumns = [
    {
        id: uniqueColumn(), cards: [
            { id: uniqueCard(), lines: 3 },
            { id: uniqueCard(), lines: 2 }
        ]
    },
    {
        id: uniqueColumn(), cards: [
            { id: uniqueCard(), lines: 3 },
            { id: uniqueCard(), lines: 2 },
            { id: uniqueCard(), lines: 1 },
            { id: uniqueCard(), lines: 2 },
            { id: uniqueCard(), lines: 4 }
        ]
    }
];


export const Simple = () => {

    const [columns, setColumns] = useState(defaultColumns);

    const addColumn = () => {
        setColumns([...columns, { id: uniqueColumn(), cards: [] }]);
    };

    const addCard = (columnId: string) => {
        setColumns(columns.map(column => column.id === columnId ?
            { id: column.id, cards: [...column.cards, { id: uniqueCard(), lines: 2 }] } :
            column)
        );
    };

    const moveCard = (cardId: string, columnId: string, columnPosition: number) => {




    };

    return (
        <div className="w-full h-screen bg-yellow-100">
            <KanbanProvider context={{ addColumn, addCard }}>
                <KanbanBoard columns={columns} />
            </KanbanProvider>
        </div>
    );

};

//

const KanbanBoard: FC<{ columns: { id: string, cards: { id: string, lines: number }[] }[] }> = ({ columns }) => {


    const { context, isActive } = useKanbanContext();

    return (
        <div className={classnames('w-full h-full px-10 py-10 flex flex-row items-start overflow-x-auto space-x-2', isActive ? 'bg-blue-500' : 'bg-blue-400')}>

            {columns.map(column =>
                <KanbanColumn key={column.id} id={column.id} addCard={addCard(column.id)}>
                    {column.cards.map(card =>
                        <KanbanCard key={card.id} columnId={column.id} id={card.id} lines={card.lines} />
                    )}
                </KanbanColumn>
            )}

            <div className="px-3 py-2 flex-none bg-gray-200 rounded">
                <div onClick={context!.addColumn} className="w-48 px-2 py-2 hover:bg-gray-300 rounded cursor-pointer">
                    <PlusIcon className="inline stroke-2" />&nbsp;Add a column
                </div>
            </div>

        </div>

    );

};

const KanbanColumn: FC<{ id: string, addCard: () => void }> = ({ id, addCard, children }) => {



    const [{ isOver, item, clientPosition }, columnRef, placeholderRef] = useColumn(id);

    const childrenArray = React.Children.toArray(children);


    return (
        <div className="max-h-full px-3 py-2 space-y-2 flex flex-col bg-gray-200 rounded">
            <div className="flex-none font-bold">ID: {id}</div>
            <div ref={columnRef} className={classnames('flex-1 w-48 max-h-full px-1 py-1 space-y-2 overflow-y-auto')} style={{ minHeight: '1rem' }}>
                {childrenArray.slice(0, clientPosition).map(c => c)}
                {item && (clientPosition !== null) && <div key="placeholder" ref={placeholderRef} className="w-full bg-gray-300 rounded" style={{ height: item.sourceBoundingClientRect.height }}></div>}
                {childrenArray.slice(clientPosition).map(c => c)}
            </div>

            <div className="flex-none">
                <div onClick={addCard} className="px-2 py-2 hover:bg-gray-300 rounded cursor-pointer" >
                    <PlusIcon className="inline stroke-2" />&nbsp;Add a card
                </div>
            </div>

        </div >
    );

};

const KanbanCard: FC<{ columnId: string, id: string, lines: number }> = ({ columnId, id, lines }) => {

    const [{ item, isDragging }, cardRef] = useCard(id);
    const u = useMemo(() => _uniqueId('card-'), [id]);

    return (
        <div ref={cardRef} className={classnames('w-full px-2 py-1 bg-gray-50 rounded shadow', { 'opacity-20': isDragging })}>
            <div>ID: {id}</div>
            {_range(lines - 1).map((_, i) => <div key={i}>Line</div>)}
        </div>
    );

};
