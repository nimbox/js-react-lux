import { RefObject, useMemo } from 'react';


export const useProxyHandler = <T extends object, V = any>(t: RefObject<T>, setProperty: string, onSetProperty: (value: V) => void) => {

    return useMemo(() => ({

        get(target, targetProperty, receiver) {
            console.log('get', targetProperty);
            // if (targetProperty === 'target') {
            //     return target;
            // }
            return Reflect.get(t.current!, targetProperty, receiver);
            // return (t.current as any)[targetProperty];
            // return (target as any)?.[targetProperty];
        },

        set(target, targetProperty, value, receiver) {
            console.log('set', targetProperty, value, receiver);
            // if (targetProperty === setProperty) {
            //     onSetProperty(value as V);
            // }
            // (target as any)[targetProperty] = value;
            Reflect.set(t.current!, targetProperty, value, receiver);
            return true;
            // (t.current as any)[targetProperty] = value;
            // return true;
        },

        // apply(target, thisArg, argArray) {
        //     return Reflect.apply(target, thisArg, argArray);
        // }

    } as ProxyHandler<T>), [t, setProperty, onSetProperty]);

};
