import { type RefObject, useMemo, useRef } from 'react';
import { setRefInputValue } from '../components/utilities/setRefInputValue';


//
// useObservableValueRef
//

export interface UseObservableValueRefProps {

    onSet?: (value: string | ReadonlyArray<string> | number | undefined) => void;

}


/**
 * `useObservableValueRef` returns a mutable ref object whose `.current`
 * property is initialized to the passed argument (`initialValue`). The returned
 * object will persist for the full lifetime of the component. When
 * `current.value` is set, the underlying element's `value` is chaged, an
 * `input` event is fired that triggers the `onChange` event, and the `onSet`
 * callback is called if it is provided.
 *
 *
 * @param initialValue 
 * @param props
 * @returns 
 */
export const useObservableValueRef = <T extends HTMLInputElement | HTMLSelectElement>(initialValue: T | null, { onSet }: (UseObservableValueRefProps | undefined) = {}): RefObject<T> => {

    const internal = useRef<T | null>(initialValue);

    return useMemo((): RefObject<T> => ({

        get current() {
            return internal.current;
        },

        set current(current: T | null) {
            internal.current = (current != null) ? Object.defineProperty(current, 'value', {
                set: (value: string | readonly string[] | number | undefined) => {
                    setRefInputValue(internal, value);
                    onSet?.(value);
                }
            }) : null;
        }

    }), [onSet]);

};
