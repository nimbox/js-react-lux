import { RefObject } from 'react';
export declare const useOutsideClick: <T extends HTMLElement, P extends HTMLElement>(onClickOutside: () => void) => [RefObject<T>, RefObject<P>];
