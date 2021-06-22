import { RefObject } from 'react';
export declare const useOutsideClick: <T extends HTMLElement, P extends HTMLElement>(onClickOutside: () => void) => [RefObject<T>, RefObject<P>];
export declare const useOnOutsideClick: (onOutsideClick: () => void, ...elements: (HTMLElement | undefined | null)[]) => void;
