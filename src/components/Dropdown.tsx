import React, { FC, useState, useEffect, useRef, ReactElement } from 'react';

interface DropdownProps {
    options: any[],
    key?: (option: any) => ReactElement,
    value?: (option: any) => ReactElement,
    onChange?: (option: any) => void
}

export const Dropdown: FC<DropdownProps> = ({ options, key = (option) => option, value = (option) => option, onChange = (option) => null, children }) => {

    const valueRef = useRef<HTMLDivElement>(null);
    const optionsRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    const handleDocumentClick = (event: MouseEvent) => {
        if (optionsRef.current && !optionsRef.current!.contains(event.target as Node)) {
            if (valueRef.current && !valueRef.current!.contains(event.target as Node)) {
                setVisible(false);
            }
        }
    };

    const handleOptionClick = (option: any) => {
        onChange(option);
        setVisible(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleDocumentClick);
        return () => {
            document.removeEventListener("mousedown", handleDocumentClick);
        };
    });



    return (
        <div className="relative inline">
            <div ref={valueRef} className="flex flex-row justify-between border rounded px-3" onClick={() => setVisible(!visible)}>
                <div>s</div>
                <div>s</div>
            </div>
            {visible &&
                <div ref={optionsRef} className="absolute border rounded bg-white mt-1 left-0 py-1">
                    {options.map(option =>
                        <div key={key(option)} className="hover:bg-primary hover:text-content-fg px-3" onClick={() => handleOptionClick(option)}>
                            {key(option)}
                        </div>)
                    }
                </div>
            }
        </div >
    );

};
