import { useEffect } from 'react';


/**
 * Calls the provided handler whenever the Escape key is pressed. The
 * listener is attached on mount and cleaned up on unmount.
 *
 * @param handler Function to execute on Escape key press. If
 * undefined, no listener is attached.
 */
export function useOnEscape(handler?: () => void): void {
    useEffect(() => {

        if (!handler) return;

        const listener = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handler();
            }
        };

        window.addEventListener('keydown', listener);
        return () => window.removeEventListener('keydown', listener);

    }, [handler]);
}
