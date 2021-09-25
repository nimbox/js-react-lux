import { XYCoord } from 'react-dnd';

export const getHorizontalIndex = (cardId: string, columns: HTMLElement, offset: XYCoord, placeholder?: HTMLElement) => {

    const columnsRect = columns.getBoundingClientRect();
    const pointerX = offset.x - columnsRect.left;

    // find the index to drop the column

    let i = 0;
    let index: number | null = 0;
    while (i < columns.children.length) {
        const child = columns.children[i];
        if (child !== placeholder) {
            const childRect = child.getBoundingClientRect();
            const childX = childRect.left + childRect.width / 2 - columnsRect.left;
            if (pointerX < childX) {
                break;
            }
            index = index + 1;
        }
        i = i + 1;
    }

    // if the index is on top the same column that is dragging
    // then make the index null

    if (isColumnId(cardId, columns, index - 1) || isColumnId(cardId, columns, i)) {
        index = null;
    }

    // return the index

    return index;

}

// utilities

const isColumnId = (columnId: string, columns: HTMLElement, index: number) => {
    return index >= 0 && index < columns.children.length && columns.children[index].getAttribute('data-kanban-column-id') === columnId;
}
