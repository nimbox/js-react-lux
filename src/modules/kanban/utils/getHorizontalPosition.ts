import { XYCoord } from 'react-dnd';


export default (cardId: string, columns: HTMLElement, offset: XYCoord, placeholder?: HTMLElement) => {

    const columnsRect = columns.getBoundingClientRect();
    const pointerX = offset.x - columnsRect.left;

    // find the position to drop the column

    let index = 0;
    let position: number | null = 0;
    while (index < columns.children.length) {
        const child = columns.children[index];
        if (child !== placeholder) {
            const childRect = child.getBoundingClientRect();
            const childX = childRect.left + childRect.width / 2 - columnsRect.left;
            if (pointerX < childX) {
                break;
            }
            position = position + 1;
        }
        index = index + 1;
    }

    // if the position is on top the same column that is dragging
    // then make the position null

    if (isColumnId(cardId, columns, position - 1)  || isColumnId(cardId, columns, index) ) {
        position = null;
    }

    // return the position

    return position;

}

// utilities

const isColumnId = (columnId: string, columns: HTMLElement, position: number) => {
    return position >= 0 && position < columns.children.length && columns.children[position].getAttribute('data-kanban-column-id') === columnId;
}
