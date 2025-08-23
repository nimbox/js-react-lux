import { useEffect } from 'react';


export const useOnOutsideClick = (show: boolean, onOutsideClick: () => void, ...elements: (Element | undefined | null | any)[]) => {

    useEffect(() => {

        if (show) {

            const handleMouseDown = (event: MouseEvent) => {
                const inside = elements.find(element => element instanceof Element && element.contains(event.target as Node));
                if (!inside) {
                    onOutsideClick();
                }
            };

            document.addEventListener('mousedown', handleMouseDown);
            return () => document.removeEventListener('mousedown', handleMouseDown);

        }

    }, [show, onOutsideClick, ...elements]); 

};
