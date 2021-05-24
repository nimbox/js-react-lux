import classnames from "classnames";
import React, { FC, useRef, useState } from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { Input, InputProps } from "../controls/Input";


export interface SwatchPickerProps extends InputProps {

    swatches: string[];
    popperClassName: string;

}

export const SwatchPicker: FC<SwatchPickerProps> = ({ swatches, popperClassName, ...props }) => {

    const [visible, setVisible] = useState(false);
    const [target, popper] = useOutsideClick<HTMLInputElement, HTMLDivElement>(() => setVisible(!visible));

    return (
        <div className="relative inline-block w-full">
            <input type="text" ref={target} {...props} onFocus={() => setVisible(true)} />
            {visible &&
                <div ref={popper} className={classnames(
                    'absolute border border-control-border rounded',
                    'bg-white w-full mt-2 cursor-pointer', popperClassName)}>
                    {swatches.map(s =>
                        <div onClick={() => target.current!.value = s} style={{ backgroundColor: s }}>&nbsp;</div>
                    )}
                </div>
            }
        </div>
    );

};