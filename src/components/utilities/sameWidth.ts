import { Modifier, Obj } from '@popperjs/core';

//
// https://popper.js.org/docs/v2/modifiers/community-modifiers/
// https://codesandbox.io/s/bitter-sky-pe3z9?file=/src/index.js:383-394
//

export const sameWidth: Modifier<'sameWidth', Obj> = {
    name: 'sameWidth',
    enabled: true,
    phase: 'beforeWrite',
    requires: ['computeStyles'],
    fn: ({ state }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
    },
    effect: ({ state }) => {
        const reference = state.elements.reference as HTMLElement;
        state.elements.popper.style.width = `${reference.offsetWidth}px`;
    }
};