import _uniqueId from 'lodash/uniqueId';
import { useState } from 'react';


export const uniqueCard = () => _uniqueId('card-');
export const uniqueColumn = () => _uniqueId('column-');

export type Card<C> = C & { id: string };
export type Column<S, C> = S & { id: string, cards: Card<C>[] };

export function useKanbanStore<S, C>(defaultColumns: Column<S, C>[], createCard: () => C, createColumn: () => S) {

    const [columns, setColumns] = useState(defaultColumns);

    function addCard(columnId: string) {

        const columnIndex = columns.findIndex(column => column.id === columnId);
        const column = columns[columnIndex];

        setColumns([
            ...columns.slice(0, columnIndex),
            { ...column, cards: [...column.cards, { id: uniqueCard(), ...createCard() }] },
            ...columns.slice(columnIndex + 1)
        ]);

    }

    function moveCard(cardId: string, columnId: string, cardIndex: number) {

        const sourceColumnIndex = columns.findIndex(column => column.cards.findIndex(card => card.id === cardId) >= 0);
        const sourceCardIndex = columns[sourceColumnIndex].cards.findIndex(card => card.id === cardId);

        const columnIndex = columns.findIndex(column => column.id === columnId);

        const card = columns[sourceColumnIndex].cards[sourceCardIndex];

        const sourceColumn = columns[sourceColumnIndex];
        const columnsWithoutCard = [
            ...columns.slice(0, sourceColumnIndex),
            {
                ...sourceColumn, cards: [
                    ...sourceColumn.cards.slice(0, sourceCardIndex),
                    ...sourceColumn.cards.slice(sourceCardIndex + 1)
                ]
            },
            ...columns.slice(sourceColumnIndex + 1)
        ];

        const adjustedCardIndex = sourceColumnIndex === columnIndex && sourceCardIndex <= cardIndex ? cardIndex - 1 : cardIndex;

        const column = columnsWithoutCard[columnIndex];
        const columnsWithCard = [
            ...columnsWithoutCard.slice(0, columnIndex),
            {
                ...column, cards: [
                    ...column.cards.slice(0, adjustedCardIndex),
                    card,
                    ...column.cards.slice(adjustedCardIndex)
                ]
            },
            ...columnsWithoutCard.slice(columnIndex + 1)
        ];

        setColumns(columnsWithCard);

    }

    function updateCard(cardId: string, fn: (c: Card<C>) => Partial<C>) {

        const columnIndex = columns.findIndex(column => column.cards.findIndex(card => card.id === cardId) >= 0);
        const column = columns[columnIndex];

        const cardIndex = column.cards.findIndex(card => card.id === cardId);
        const card = column.cards[cardIndex];

        setColumns([
            ...columns.slice(0, columnIndex),
            {
                ...column, cards: [
                    ...column.cards.slice(0, cardIndex),
                    { ...card, ...fn(card) },
                    ...column.cards.slice(cardIndex + 1)
                ]
            },
            ...columns.slice(columnIndex + 1)
        ]);

    }

    function deleteCard(cardId: string) {

        const columnIndex = columns.findIndex(column => column.cards.findIndex(card => card.id === cardId) >= 0);
        const column = columns[columnIndex];

        const cardIndex = column.cards.findIndex(card => card.id === cardId);

        setColumns([
            ...columns.slice(0, columnIndex),
            {
                ...column, cards: [
                    ...column.cards.slice(0, cardIndex),
                    ...column.cards.slice(cardIndex + 1)
                ]
            },
            ...columns.slice(columnIndex + 1)
        ]);

    }

    function addColumn() {
        setColumns([
            ...columns,
            { id: uniqueColumn(), cards: [], ...createColumn() }
        ]);
    }

    function moveColumn(columnId: string, targetColumnIndex: number) {

        const columnIndex = columns.findIndex(column => column.id === columnId);
        const column = columns[columnIndex];

        const columnsWithoutColumn = [...columns.slice(0, columnIndex), ...columns.slice(columnIndex + 1)];

        const adjustedColumnIndex = columnIndex <= targetColumnIndex ? targetColumnIndex - 1 : targetColumnIndex;
        const columnsWithColumn = [
            ...columnsWithoutColumn.slice(0, adjustedColumnIndex),
            column,
            ...columnsWithoutColumn.slice(adjustedColumnIndex)
        ];

        setColumns(columnsWithColumn);

    }

    function deleteColumn(columnId: string) {

        const columnIndex = columns.findIndex(column => column.id === columnId);

        setColumns([
            ...columns.slice(0, columnIndex),
            ...columns.slice(columnIndex + 1)
        ]);

    }

    //

    return [columns, { addCard, moveCard, updateCard, deleteCard, addColumn, moveColumn, deleteColumn }] as const;

}
