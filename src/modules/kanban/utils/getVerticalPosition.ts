import { XYCoord } from 'react-dnd';


export default (cardId: string, cards: HTMLElement, offset: XYCoord, placeholder?: HTMLElement) => {

    const cardsRect = cards.getBoundingClientRect();
    const pointerY = offset.y - cardsRect.top;

    // find the position to drop the card

    let index = 0;
    let position: number | null = 0;
    while (index < cards.children.length) {
        const child = cards.children[index];
        if (child !== placeholder) {
            const childRect = child.getBoundingClientRect();
            const childY = childRect.top + childRect.height / 2 - cardsRect.top;
            if (pointerY < childY) {
                break;
            }
            position = position + 1;
        }
        index = index + 1;
    }

    // if the position is on top the same card that is dragging
    // then make the position null

    if (isCardId(cardId, cards, position - 1)  || isCardId(cardId, cards, index) ) {
        position = null;
    }

    // return the position

    return position;

}

// utilities

const isCardId = (cardId: string, cards: HTMLElement, position: number) => {
    return position >= 0 && position < cards.children.length && cards.children[position].getAttribute('data-kanban-card-id') === cardId;
}
