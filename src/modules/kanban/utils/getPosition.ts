import { XYCoord } from "react-dnd";

export default (cardId: string, column: HTMLElement, offset: XYCoord, placeholder?: HTMLElement) => {

    const columnRect = column.getBoundingClientRect();
    const pointerY = offset.y - columnRect.top;

    // find the position to drop the card

    let index = 0;
    let position: number | null = 0;
    while (index < column.children.length) {
        const child = column.children[index];
        if (child !== placeholder) {
            const childRect = child.getBoundingClientRect();
            const childY = childRect.top + childRect.height / 2 - columnRect.top;
            if (pointerY < childY) {
                break;
            }
            position = position + 1;
        }
        index = index + 1;
    }

    // if the position is on top the same card that is dragging
    // then make the position null

    if (isCardId(cardId, column, position - 1)  || isCardId(cardId, column, index) ) {
        position = null;
    }

    // return the position

    return position;

}

// utilities

const isCardId = (cardId: string, column: HTMLElement, position: number) => {
    return position >= 0 && position < column.children.length && column.children[position].getAttribute('data-kanban-card-id') === cardId;
}
