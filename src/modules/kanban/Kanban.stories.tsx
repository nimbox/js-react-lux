import classnames from 'classnames';
import _range from 'lodash/range';
import React, { FC } from 'react';
import { PlusIcon } from '../../icons';
import { Column, uniqueCard, uniqueColumn, useKanbanStore } from '../../test/useKanbanStore';
import { KanbanProvider, useKanbanContext } from './Kanban';
import { useCard } from './useCard';
import { useCardDrop } from './useCardDrop';
import { useCards } from './useCards';
import { useColumn } from './useColumn';
import { useColumns } from './useColumns';


// definition

export default {
    title: 'Module/Kanban',
    component: KanbanProvider,
    parameters: {
        layout: 'fullscreen'
    }
};

const defaultColumns: Column<{}, { lines: number }>[] = [
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

    const [columns, actions] = useKanbanStore(defaultColumns, () => ({ lines: 2 }), () => ({}));
    const { addCard, moveCard, updateCard, deleteCard, addColumn, moveColumn } = actions;

    return (
        <div className="w-full h-screen">
            <KanbanProvider context={{ addColumn, moveColumn, addCard, updateCard, deleteCard, moveCard }}>
                <KanbanBoard columns={columns} />
            </KanbanProvider>
        </div>
    );

};

//

const KanbanBoard: FC<{ columns: { id: string, cards: { id: string, lines: number }[] }[] }> = ({ columns }) => {

    const { context: { addColumn }, isDraggingColumn, isDraggingCard } = useKanbanContext();

    return (
        <div className="relative w-full h-full">

            <div className={classnames(
                'w-full h-full px-10 py-10 flex flex-row items-start overflow-x-auto space-x-2',
                (isDraggingColumn || isDraggingCard) ? (isDraggingColumn ? 'bg-blue-400' : 'bg-blue-400') : 'bg-blue-400',
            )}>

                <KanbanColumns>
                    {columns.map(column =>
                        <KanbanColumn key={column.id} id={column.id}>
                            {column.cards.map(card =>
                                <KanbanCard key={card.id} columnId={column.id} id={card.id} lines={card.lines} />
                            )}
                        </KanbanColumn>
                    )}
                </KanbanColumns>

                <div className="px-3 py-2 flex-none bg-gray-200 rounded">
                    <div onClick={addColumn} className="w-48 px-2 py-2 hover:bg-gray-300 rounded cursor-pointer">
                        <PlusIcon className="inline stroke-2" />&nbsp;Add a column
                    </div>
                </div>

            </div>

            {(isDraggingCard) &&
                <div className="absolute inset-x-0 bottom-0 px-3 py-2 flex flex-row justify-between bg-white bg-opacity-30">
                    <div className="flex flex-row space-x-2">
                        <KanbanCardDropUpdate title="add" fn={({ lines }) => ({ lines: lines + 1 })} />
                        <KanbanCardDropUpdate title="subtract" fn={({ lines }) => ({ lines: Math.max(lines - 1, 1) })} />
                    </div>
                    <KanbanCardDropDelete title="delete" />
                </div>
            }

        </div>
    );

};

const KanbanCardDropUpdate: FC<{ title: string, fn: ({ id, lines }: { id: string, lines: number }) => { lines?: number } }> = ({ title, fn }) => {

    const { context: { updateCard } } = useKanbanContext();
    const [cardDropRef, { item, isOver }] = useCardDrop<HTMLDivElement>({
        onDrop: (item) => updateCard(item.id, fn)
    });

    return (
        <div ref={cardDropRef} className={classnames(
            'w-48 h-16 flex justify-center items-center',
            isOver ? 'bg-white border-green-400' : '',
            'border-dashed border-2 rounded'
        )}>
            {title}
        </div>
    );

};

const KanbanCardDropDelete: FC<{ title: string }> = ({ title }) => {

    const { context: { deleteCard } } = useKanbanContext();
    const [cardDropRef, { item, isOver }] = useCardDrop<HTMLDivElement>({
        onDrop: (item) => deleteCard(item.id)
    });

    return (
        <div ref={cardDropRef} className={classnames(
            'w-48 h-16 flex justify-center items-center',
            isOver ? 'bg-white border-red-400' : '',
            'border-dashed border-2 rounded'
        )}>
            {title}
        </div>
    );

};

const KanbanColumns: FC<{}> = ({ children }) => {

    const [{ isOver, canDrop, item, clientPosition }, columnsRef, placeholderRef] = useColumns<HTMLDivElement, HTMLDivElement>();
    const childrenArray = React.Children.toArray(children);

    return (
        <div ref={columnsRef} className={classnames('h-full flex flex-row items-start space-x-2', { '': isOver })}>
            {childrenArray.slice(0, clientPosition || 0).map(c => c)}
            {isOver && canDrop && (clientPosition !== null) && <div key="placeholder" ref={placeholderRef} className="w-52 bg-gray-300 rounded shadow-inner" style={{ height: item.sourceBoundingClientRect.height }}></div>}
            {childrenArray.slice(clientPosition || 0).map(c => c)}
        </div>
    );

}

const KanbanColumn: FC<{ id: string }> = ({ id, children }) => {

    const { context: { addCard }, isDraggingCard: isActive } = useKanbanContext();
    const [{ isDragging }, columnRef] = useColumn<HTMLDivElement>(id);


    return (
        <div ref={columnRef} className={classnames('max-h-full px-3 py-2 flex flex-col space-y-2 bg-gray-200 rounded shadow', { 'opacity-20': isDragging })}>

            <div className="flex-none font-bold">ID: {id}</div>

            <KanbanCards columnId={id}>
                {children}
            </KanbanCards>

            <div className="flex-none">
                <div onClick={() => addCard(id)} className="px-2 py-2 hover:bg-gray-300 rounded cursor-pointer" >
                    <PlusIcon className="inline stroke-2" />&nbsp;Add a card
                </div>
            </div>

        </div>
    );

};


const KanbanCards: FC<{ columnId: string }> = ({ columnId, children }) => {

    const [{ isOver, canDrop, item, clientPosition }, cardsRef, placeholderRef] = useCards<HTMLDivElement, HTMLDivElement>(columnId);
    const childrenArray = React.Children.toArray(children);

    return (
        <div ref={cardsRef} className={classnames('w-48 min-h-0 px-1 py-1 -mx-1 space-y-2 overflow-y-auto', { '': isOver })} style={{ minHeight: '2rem' }}>
            {childrenArray.slice(0, clientPosition || 0).map(c => c)}
            {isOver && canDrop && <div key="placeholder" ref={placeholderRef} className="w-full bg-gray-300 rounded shadow-inner" style={{ height: item.sourceBoundingClientRect.height }}></div>}
            {childrenArray.slice(clientPosition || 0).map(c => c)}
        </div>
    );

};

const KanbanCard: FC<{ columnId: string, id: string, lines: number }> = ({ columnId, id, lines }) => {

    const [{ isDragging }, cardRef] = useCard<HTMLDivElement>(id);

    return (
        <div ref={cardRef} className={classnames('w-full px-2 py-1 bg-gray-50 rounded shadow', { 'opacity-20': isDragging })}>
            <div>ID: {id}</div>
            {_range(lines - 1).map((_, i) => <div key={i}>Line</div>)}
        </div>
    );

};
