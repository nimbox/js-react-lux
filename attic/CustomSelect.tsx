import React, { FC, ReactElement, useRef, useState } from 'react';
import { useOnOutsideClick } from '../src/hooks/useOutsideClick';
import AngleDownIcon from '../src/icons/AngleDownIcon';


//
// Select
// 

interface CustomSelectProps {
    options: any[],
    key?: (option: any) => ReactElement,
    value?: (option: any) => ReactElement,
    onChange?: (option: any) => void
}

export const CustomSelect: FC<CustomSelectProps> = ({ options, key = (option) => option, value = (option) => option, onChange = (option) => null, children }) => {

    const [show, setShow] = useState(false);

    const [target, setTarget] = useState<HTMLDivElement | null>(null);
    const [popper, setPopper] = useState<HTMLDivElement | null>(null);
    useOnOutsideClick(() => { if (show) { setShow(!show); } }, target, popper);

    return (
        <div className="relative">
            <div ref={target} className="pl-4 pr-8 py-2 truncate border rounded-lg" onClick={() => setShow(!show)}>as jkasd lkjasd lkajsd lkasjd laksjd laksjd laskdj alskdjalsdkj d</div>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center justify-center">
                <AngleDownIcon className="text-content h-4 w-4 stroke-current stroke-2" />
            </div>
            {show &&
                <div ref={popper} className="absolute left-0 mt-1 py-1 bg-content-fg border border-conteng-border rounded">
                    {options.map(option =>
                        <div key={key(option)} className="hover:bg-primary-500 hover:text-content-fg px-3" >
                            {key(option)}
                        </div>)
                    }
                </div>
            }
        </div >
    );

};
