import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';


export function useElementHeight<T extends HTMLElement>(initialHeight: number = 0) {

    const ref = useRef<T | null>(null);
    const [height, setHeight] = useState(initialHeight);

    const updateHeight = useCallback(() => {
        if (ref.current) {
            setHeight(ref.current.clientHeight);
        }
    }, []);

    useLayoutEffect(() => {
        updateHeight();
    }, [updateHeight]);

    useEffect(() => {
        window.addEventListener('resize', updateHeight);
        return () => window.removeEventListener('resize', updateHeight);
    }, [updateHeight]);

    return { ref, height };

}
