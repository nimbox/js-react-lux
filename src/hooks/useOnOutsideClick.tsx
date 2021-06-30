import { useEffect } from 'react';


export const useOnOutsideClick = (onOutsideClick: () => void, enable: boolean, ...elements: (HTMLElement | undefined | null)[]) => {

    useEffect(() => {

        if (enable) {

            const handleMouseDown = (event: MouseEvent) => {

                console.log('UPDATING elements', elements);

                const inside = elements.find(element => element && element.contains(event.target as Node));
                if (!inside) {
                    onOutsideClick();
                }
            };

            document.addEventListener('mousedown', handleMouseDown);
            return () => document.removeEventListener('mousedown', handleMouseDown);

        }

    }, [enable, ...elements]);

};
