import { useCallback, useRef } from 'react';


export function useStableKey<T extends object>() {

    const mapRef = useRef<WeakMap<T, string> | null>(null);
    const counterRef = useRef(0);

    if (mapRef.current == null) {
        mapRef.current = new WeakMap<T, string>();
    }

    const getKey = useCallback((value: T) => {
        const map = mapRef.current!;
        const hit = map.get(value);
        if (hit) return hit;
        const key = `f_${counterRef.current++}`;
        map.set(value, key);
        return key;
    }, []);

    return { getKey };

}
