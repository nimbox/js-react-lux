import classnames from 'classnames';
import React, { FC } from 'react';
import { PlusIcon } from '../../icons/components';
import { Card, Column, uniqueCard, uniqueColumn, useKanbanStore } from '../../test/useKanbanStore';
import { KanbanProvider } from './Kanban';
import { useKanbanContext } from './useKanbanContext';
import { MoveCardCallback, MoveColumnCallback } from './types';
import { useCard } from './useCard';
import { useCardDrop } from './useCardDrop';
import { useCards } from './useCards';
import { useColumn } from './useColumn';
import { useColumnDrop } from './useColumnDrop';
import { useColumns } from './useColumns';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { Meta, StoryObj } from '@storybook/react-vite';


// Definition

const meta: Meta = {
    parameters: {
        layout: 'fullscreen'
    },
    decorators: [(Story) => <DndProvider backend={HTML5Backend}><Story /></DndProvider>]
};

export default meta;
type Story = StoryObj;


const renders: { [key: string]: number } = {
    card: 0,
    cards: 0,
    column: 0,
    columns: 0,
    board: 0
};

const countRender = (c: string) => {
    renders[c]++;
    console.log(renders);
};

// definition

// export default {
//     component: KanbanProvider,
//     parameters: {
//         layout: 'fullscreen'
//     },
//     decorators: [(Story) => <DndProvider backend={HTML5Backend}><Story /></DndProvider>]
// };

interface StoryCard { lines: number }
interface StoryColumn { }

const defaultColumns: Column<StoryColumn, StoryCard>[] = [
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

type UpdateStoryCardCallback = (cardId: string, fn: (c: Card<StoryCard>) => Partial<StoryCard>) => void;
type DeleteStoryCardCallback = (cardId: string) => void;

type DeleteStoryColumnCallback = (columnId: string) => void;

//

export const Primary: Story = {
    render: () => {

        const [columns, actions] = useKanbanStore(defaultColumns, () => ({ lines: 2 }), () => ({}));

        return (
            <div className="w-full h-screen">
                <KanbanProvider>
                    <KanbanBoard columns={columns} actions={actions} />
                </KanbanProvider>
            </div>
        );
    }
};

//

interface KanbanBoardActions {

    addCard: (columnId: string) => void;
    moveCard: MoveCardCallback;
    updateCard: UpdateStoryCardCallback;
    deleteCard: DeleteStoryCardCallback;

    addColumn: () => void;
    moveColumn: MoveColumnCallback;
    deleteColumn: DeleteStoryColumnCallback;

}

const KanbanBoard: FC<{ columns: { id: string, cards: { id: string, lines: number }[] }[], actions: KanbanBoardActions }> = ({ columns, actions }) => {

    const { isDraggingCard, isDraggingColumn } = useKanbanContext();

    countRender('board');

    return (
        <div className="relative w-full h-full">

            <div className={classnames(
                'w-full h-full px-10 py-10 flex flex-row items-start overflow-x-auto space-x-2',
                (isDraggingColumn || isDraggingCard) ? (isDraggingColumn ? 'bg-blue-400' : 'bg-blue-400') : 'bg-blue-400'
            )}>

                <KanbanColumns moveColumn={actions.moveColumn}>
                    {columns.map(column =>
                        <KanbanColumn key={column.id} id={column.id} addCard={actions.addCard} moveCard={actions.moveCard} >
                            {column.cards.map(card =>
                                <KanbanCard key={card.id} id={card.id} lines={card.lines} />
                            )}
                        </KanbanColumn>
                    )}
                </KanbanColumns>

                <div className="px-3 py-2 flex-none bg-gray-200 rounded">
                    <div onClick={() => actions.addColumn()} className="w-48 px-2 py-2 hover:bg-gray-300 rounded cursor-pointer">
                        <PlusIcon className="inline stroke-2" />&nbsp;Add a column
                    </div>
                </div>

            </div>

            {isDraggingCard &&
                <div className="absolute inset-x-0 bottom-0 px-3 py-2 flex flex-row justify-between bg-white bg-opacity-30">
                    <div className="flex flex-row space-x-2">
                        <KanbanCardDropUpdate title="add" updateCard={actions.updateCard} fn={({ lines }) => ({ lines: lines + 1 })} />
                        <KanbanCardDropUpdate title="subtract" updateCard={actions.updateCard} fn={({ lines }) => ({ lines: Math.max(lines - 1, 1) })} />
                    </div>
                    <KanbanCardDropDelete title="delete" deleteCard={actions.deleteCard} />
                </div>
            }

            {isDraggingColumn &&
                <div className="absolute inset-x-0 bottom-0 px-3 py-2 flex flex-row justify-end bg-white bg-opacity-30">
                    <KanbanColumnDropDelete title="delete" deleteColumn={actions.deleteColumn} />
                </div>
            }

        </div>
    );

};

const KanbanCardDropUpdate: FC<{ title: string, updateCard: UpdateStoryCardCallback, fn: ({ id, lines }: Card<StoryCard>) => Partial<StoryCard> }> = ({ title, updateCard, fn }) => {

    const [cardDropRef, { isOver }] = useCardDrop<HTMLDivElement>({
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

const KanbanCardDropDelete: FC<{ title: string, deleteCard: DeleteStoryCardCallback }> = ({ title, deleteCard }) => {

    const [cardDropRef, { isOver }] = useCardDrop<HTMLDivElement>({
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

const KanbanColumnDropDelete: FC<{ title: string, deleteColumn: DeleteStoryColumnCallback }> = ({ title, deleteColumn }) => {

    const [cardDropRef, { isOver }] = useColumnDrop<HTMLDivElement>({
        onDrop: (item) => deleteColumn(item.id)
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

const KanbanColumns: FC<{ moveColumn: MoveColumnCallback, children?: React.ReactNode }> = ({ moveColumn, children }) => {

    const [columnsRef, placeholderRef, { isOver, canDrop, item, placeholderIndex }] = useColumns<HTMLDivElement, HTMLDivElement>({ moveColumn });

    // inserting into the childrenArray dramatically reduces
    // the number of renders

    const childrenArray = React.Children.toArray(children);
    if (canDrop && placeholderIndex != null) {
        const Placeholder = () =>
            <div
                ref={placeholderRef}
                className="w-52 bg-gray-300 rounded shadow-inner"
                style={{ height: item.sourceBoundingClientRect.height }}
            />;
        childrenArray.splice(placeholderIndex, 0, <Placeholder key="placeholder" />);
    }

    countRender('columns');

    return (
        <div ref={columnsRef} className={classnames(
            'h-full flex flex-row items-start space-x-2',
            { '': isOver }
        )}>
            {childrenArray.map(c => c)}
        </div>
    );

};

const KanbanColumn: FC<{ id: string, addCard: (id: string) => void, moveCard: MoveCardCallback, children?: React.ReactNode }> = ({ id, addCard, moveCard, children }) => {

    const [columnRef, { isDragging }] = useColumn<HTMLDivElement>(id);

    countRender('column');

    return (
        <div ref={columnRef} className={classnames(
            'max-h-full px-3 py-2 flex flex-col space-y-2 bg-gray-200 rounded shadow',
            { 'opacity-20': isDragging }
        )}>

            <div className="flex-none font-bold">ID: {id}</div>

            <KanbanCards columnId={id} moveCard={moveCard}>
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

const KanbanCards: FC<{ columnId: string, moveCard: MoveCardCallback, children?: React.ReactNode }> = ({ columnId, moveCard, children }) => {

    const [cardsRef, placeholderRef, { isOver, canDrop, placeholderIndex, item }] = useCards<HTMLDivElement, HTMLDivElement>(columnId, { moveCard });

    // inserting into the childrenArray dramatically reduces
    // the number of renders

    const childrenArray = React.Children.toArray(children);
    if (canDrop && placeholderIndex != null) {
        const Placeholder = () =>
            <div key="placeholder"
                ref={placeholderRef}
                className="w-full bg-gray-300 rounded shadow-inner"
                style={{ height: item.sourceBoundingClientRect.height }}
            />;
        childrenArray.splice(placeholderIndex, 0, <Placeholder key="placeholder" />);
    }

    countRender('cards');

    return (
        <div ref={cardsRef} className={classnames(
            'w-48 min-h-0 px-1 py-1 -mx-1 space-y-2 overflow-y-auto',
            { '': isOver }
        )} style={{ minHeight: '2rem' }}>
            {childrenArray.map(c => c)}
        </div>
    );

};

const KanbanCard: FC<{ id: string, lines: number }> = ({ id, lines }) => {

    const [cardRef, { isDragging }] = useCard<HTMLDivElement>(id);

    countRender('card');

    return (
        <div ref={cardRef} className={classnames(
            'w-full px-2 py-1 bg-gray-50 rounded shadow',
            { 'opacity-20': isDragging }
        )}>
            <div>ID: {id}</div>
            {Array.from(Array(lines - 1).keys()).map((_, i) => <div key={i}>Line</div>)}
        </div>
    );

};
