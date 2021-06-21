import { RefObject, useEffect, useRef } from 'react';


export const useOutsideClick = <T extends HTMLElement, P extends HTMLElement>(onClickOutside: () => void): [RefObject<T>, RefObject<P>] => {

    const target = useRef<T>(null);
    const popper = useRef<P>(null);

    const handleDocumentClick = (event: MouseEvent) => {
        if (popper.current && !popper.current!.contains(event.target as Node)) {
            if (target.current && !target.current!.contains(event.target as Node)) {
                onClickOutside();
            }
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleDocumentClick);
        return () => document.removeEventListener('mousedown', handleDocumentClick);
    });

    return [target, popper];

};


export const useOnOutsideClick = (onOutsideClick: () => void, ...elements: (HTMLElement | undefined | null)[]) => {

    const handleMouseDown = (event: MouseEvent) => {
        const inside = elements.find(element => element && element.contains(event.target as Node));
        console.log('inside', inside);
        if (!inside) {
            console.log('trigger');
            onOutsideClick();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown);
        return () => document.removeEventListener('mousedown', handleMouseDown);
    }, elements);

};
