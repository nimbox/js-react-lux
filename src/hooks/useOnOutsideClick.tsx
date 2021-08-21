import { useEffect } from 'react';


export const useOnOutsideClick = (onOutsideClick: () => void, show: boolean, ...elements: (HTMLElement | undefined | null)[]) => {

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

    }, [show, ...elements]);

};
