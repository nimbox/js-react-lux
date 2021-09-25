import { useEffect } from 'react';


export const useOnOutsideClick = (show: boolean, onOutsideClick: () => void, ...elements: (HTMLElement | undefined | null)[]) => {

    useEffect(() => {

        if (show) {

            const handleMouseDown = (event: MouseEvent) => {
                const inside = elements.find(element => element && element.contains(event.target as Node));
                if (!inside) {
                    onOutsideClick();
                }
            };

            document.addEventListener('mousedown', handleMouseDown);
            return () => document.removeEventListener('mousedown', handleMouseDown);

        }

    }, [show, onOutsideClick, ...elements]); // eslint-disable-line react-hooks/exhaustive-deps

};
