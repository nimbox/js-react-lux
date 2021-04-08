/// <reference types="react" />
export default function useOutsideClick(initialIsVisible: any): {
    ref: import("react").RefObject<HTMLDivElement>;
    isComponentVisible: any;
    setIsComponentVisible: import("react").Dispatch<any>;
};
