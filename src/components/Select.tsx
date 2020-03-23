import React, { FC, ReactElement, useRef, useState } from 'react';
import { usePopper } from '../hooks/usePopper';
import { ReactComponent as SelectIcon } from '../icons/select-icon.svg';


//
// Select
// 

interface Props {
    options: any[],
    key?: (option: any) => ReactElement,
    value?: (option: any) => ReactElement,
    onChange?: (option: any) => void
}

export const Select: FC<Props> = ({ options, key = (option) => option, value = (option) => option, onChange = (option) => null, children }) => {

    const [show, setShow] = useState(false);
    const valueRef = useRef<HTMLDivElement>(null);
    const popperRef = useRef<HTMLDivElement>(null);
    usePopper(valueRef, popperRef, () => setShow(false));

    return (
        <div className="relative">
            <div ref={valueRef} className="pl-4 pr-8 py-2 truncate border rounded-lg" onClick={() => setShow(!show)}>as jkasd lkjasd lkajsd lkasjd laksjd laksjd laskdj alskdjalsdkj d</div>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center">
                <SelectIcon className="fill-current text-content h-4 w-4" />
            </div>
            {show &&
                <div ref={popperRef} className="absolute left-0 mt-1 py-1 bg-content-fg border border-conteng-border rounded">
                    {options.map(option =>
                        <div key={key(option)} className="hover:bg-primary-500 hover:text-content-fg px-3" onClick={() => handleOptionClick(option)}>
                            {key(option)}
                        </div>)
                    }
                </div>
            }
        </div >
    );

};
