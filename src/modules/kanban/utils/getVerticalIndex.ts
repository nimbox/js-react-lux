import { XYCoord } from 'react-dnd';


export const getVerticalIndex = (cardId: string, cards: HTMLElement, offset: XYCoord, placeholder?: HTMLElement) => {

    const cardsRect = cards.getBoundingClientRect();
    const pointerY = offset.y - cardsRect.top;

    // find the index to drop the card

    let i = 0;
    let index: number | null = 0;
    while (i < cards.children.length) {
        const child = cards.children[i];
        if (child !== placeholder) {
            const childRect = child.getBoundingClientRect();
            const childY = childRect.top + childRect.height / 2 - cardsRect.top;
            if (pointerY < childY) {
                break;
            }
            index = index + 1;
        }
        i = i + 1;
    }

    // if the index is on top the same card that is dragging
    // then make the index null

    if (isCardId(cardId, cards, index - 1) || isCardId(cardId, cards, i)) {
        index = null;
    }

    // return the index

    return index;

};

// utilities

const isCardId = (cardId: string, cards: HTMLElement, index: number) => {
    return index >= 0 && index < cards.children.length && cards.children[index].getAttribute('data-kanban-card-id') === cardId;
};
