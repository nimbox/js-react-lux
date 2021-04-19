import { useEffect, useRef } from 'react';


export const useOutsideClick = (onClickOutside: () => void): [React.RefObject<HTMLDivElement>, React.RefObject<HTMLDivElement>] => {

    const target = useRef<HTMLDivElement>(null);
    const popper = useRef<HTMLDivElement>(null);

    const handleDocumentClick = (event: MouseEvent) => {
        if (popper.current && !popper.current!.contains(event.target as Node)) {
            if (target.current && !target.current!.contains(event.target as Node)) {
                onClickOutside();
            }
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleDocumentClick);
        return () => {
            document.removeEventListener("mousedown", handleDocumentClick);
        };
    });

    return [target, popper];

};