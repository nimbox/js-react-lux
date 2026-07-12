import { useEffect, useRef } from 'react';


export const useOnOutsideClick = (show: boolean, onOutsideClick: () => void, ...elements: unknown[]) => {

    // Keep the latest callback and element list in refs so the effect can
    // subscribe to `mousedown` once per `show` toggle. Depending on the rest
    // `elements` array directly re-subscribed the global listener on every
    // render, because a rest parameter is a new array reference each render.

    const onOutsideClickRef = useRef(onOutsideClick);
    onOutsideClickRef.current = onOutsideClick;

    const elementsRef = useRef(elements);
    elementsRef.current = elements;

    useEffect(() => {

        if (!show) {
            return;
        }

        const handleMouseDown = (event: MouseEvent) => {
            const inside = elementsRef.current.some(
                element => element instanceof Element && element.contains(event.target as Node)
            );
            if (!inside) {
                onOutsideClickRef.current();
            }
        };

        document.addEventListener('mousedown', handleMouseDown);
        return () => document.removeEventListener('mousedown', handleMouseDown);

    }, [show]);

};
