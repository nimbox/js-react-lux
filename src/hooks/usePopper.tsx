import { useEffect } from 'react';

export const usePopper = (target: React.RefObject<HTMLDivElement>, popper: React.RefObject<HTMLDivElement>, onClickOutside: () => void) => {

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

};