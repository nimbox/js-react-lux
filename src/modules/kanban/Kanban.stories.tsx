import classnames from 'classnames';
import _range from 'lodash/range';
import _uniqueId from 'lodash/uniqueId';
import React, { FC, useState } from 'react';
import { PlusIcon } from '../../icons';
import { KanbanProvider, useKanbanContext } from './Kanban';
import { useCard } from './useCard';
import { useCards } from './useCards';
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

interface MyKanbanContext {


}


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

    const moveCard = (cardId: string, columnId: string, cardIndex: number) => {

        const sourceColumnIndex = columns.findIndex(column => column.cards.findIndex(card  => card.id === cardId ) >= 0);
        const sourceCardIndex = columns[sourceColumnIndex].cards.findIndex(card  => card.id === cardId );

        const columnIndex = columns.findIndex(column => column.id === columnId);

        const card = columns[sourceColumnIndex].cards[sourceCardIndex];

        const sourceColumn = columns[sourceColumnIndex];
        const columnsWithoutCard = [
            ...columns.slice(0, sourceColumnIndex),
            { ...sourceColumn, cards: [
                    ...sourceColumn.cards.slice(0, sourceCardIndex),
                    ...sourceColumn.cards.slice(sourceCardIndex + 1)
                ]
            },
            ...columns.slice(sourceColumnIndex + 1)
        ];

        const adjustedColumnIndex = sourceColumnIndex === columnIndex  && sourceCardIndex <= cardIndex ? cardIndex - 1 : cardIndex;
        
        const column = columnsWithoutCard[columnIndex];
        const columnsWithCard = [
            ...columnsWithoutCard.slice(0, columnIndex),
            { ...column, cards: [
                   ...column.cards.slice(0, adjustedColumnIndex),
                    card,
                    ...column.cards.slice(adjustedColumnIndex)
                ]
            },
            ...columnsWithoutCard.slice(columnIndex + 1)
        ]

        setColumns(columnsWithCard);

    };

    return (
        <div className="w-full h-screen bg-yellow-100">
            <KanbanProvider context={{ addColumn, addCard, moveCard }}>
                <KanbanBoard columns={columns} />
            </KanbanProvider>
        </div>
    );

};

//

const KanbanBoard: FC<{ columns: { id: string, cards: { id: string, lines: number }[] }[] }> = ({ columns }) => {

    const { context: { addColumn }, isActive } = useKanbanContext();

    return (
        <div className={classnames('w-full h-full px-10 py-10 flex flex-row items-start space-x-2', isActive ? 'bg-blue-500' : 'bg-blue-400')}>

            <div className="flex flex-row items-start space-x-2">
                {columns.map(column =>
                    <KanbanColumn key={column.id} id={column.id}>
                        {column.cards.map(card =>
                            <KanbanCard key={card.id} columnId={column.id} id={card.id} lines={card.lines} />
                        )}
                    </KanbanColumn>
                )}
            </div>

            <div className="px-3 py-2 flex-none bg-gray-200 rounded">
                <div onClick={addColumn} className="w-48 px-2 py-2 hover:bg-gray-300 rounded cursor-pointer">
                    <PlusIcon className="inline stroke-2" />&nbsp;Add a column
                </div>
            </div>

        </div>

    );

};

const KanbanColumn: FC<{ id: string }> = ({ id, children }) => {

    const { context: { addCard }, isActive } = useKanbanContext();

    const [ , columnRef] = useColumn(id);
    const [{ isOver, item, clientPosition }, cardsRef, placeholderRef] = useCards(id);

    const childrenArray = React.Children.toArray(children);

    return (
        <div ref={columnRef} className="max-h-full px-3 py-2 space-y-2 flex flex-col bg-gray-200 rounded">
            
            <div className="flex-none font-bold">ID: {id}</div>
            
            <div ref={cardsRef} className={classnames('flex-1 w-48 max-h-full px-1 py-1 -mx-1 space-y-2 overflow-y-auto')} style={{ minHeight: '1rem' }}>
                {childrenArray.slice(0, clientPosition).map(c => c)}
                {item && (clientPosition !== null) && <div key="placeholder" ref={placeholderRef} className="w-full bg-gray-300 rounded shadow-inner" style={{ height: item.sourceBoundingClientRect.height }}></div>}
                {childrenArray.slice(clientPosition).map(c => c)}
            </div>

            <div className="flex-none">
                <div onClick={() => addCard(id)} className="px-2 py-2 hover:bg-gray-300 rounded cursor-pointer" >
                    <PlusIcon className="inline stroke-2" />&nbsp;Add a card
                </div>
            </div>

        </div>
    );

};

const KanbanCard: FC<{ columnId: string, id: string, lines: number }> = ({ columnId, id, lines }) => {

    const [{ isDragging }, cardRef] = useCard(id);

    return (
        <div ref={cardRef} className={classnames('w-full px-2 py-1 bg-gray-50 rounded shadow', { 'opacity-20': isDragging })}>
            <div>ID: {id}</div>
            {_range(lines - 1).map((_, i) => <div key={i}>Line</div>)}
        </div>
    );

};
