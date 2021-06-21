import classnames from 'classnames';
import React, { useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { Input, InputProps } from '../controls/Input';


export interface SwatchPickerProps extends InputProps {
    swatches: string[];
    popperClassName?: string;
}

export const SwatchPicker = React.forwardRef<HTMLInputElement, SwatchPickerProps>(({ swatches: values, popperClassName, onFocus, onBlur, ...props }, ref) => {

    const [visible, setVisible] = useState(false);
    const [target, popper] = useOutsideClick<HTMLInputElement, HTMLDivElement>(() => setVisible(!visible));
    useImperativeHandle(ref, () => target.current!);

    const [popperElement, setPopperElement] = useState(null);
    const { styles, attributes } = usePopper(target as any, popperElement, {
        modifiers: [],
      });

    function handleOnFocus(event: React.FocusEvent<HTMLInputElement>) {
        if (onFocus) { onFocus(event); }
        setVisible(true);
    }

    function handleOnBlur(event: React.FocusEvent<HTMLInputElement>) {
        setVisible(false);
        if (onBlur) { onBlur(event); }
    }

    function setValue(event: React.MouseEvent<HTMLDivElement, MouseEvent>, element: React.RefObject<HTMLInputElement>, swatch: string) {
        event.preventDefault();
        const inputSetter = Object?.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (inputSetter) {
            inputSetter.call(element.current, swatch);
            var inputEvent = new Event('input', { bubbles: true });
            element.current!.dispatchEvent(inputEvent);
        }
    }

    return (
        <div className="relative inline-block w-full">
            <Input type="text" ref={target as any} {...props} onFocus={handleOnFocus} onBlur={handleOnBlur} />
            
            {ReactDOM.createPortal(
                <div ref={setPopperElement} {...attributes.popper} 
                    className={classnames(
                        'absolute border border-control-border rounded',
                        'bg-white w-full mt-2 cursor-pointer',
                        popperClassName
                    )} 
                    style={styles.popper}>
                    a sldkjas ldkja lsdkjalsdkjalsdk
                </div>, 
                document.querySelector('#root') 
            )}

            {/* {visible &&
                <div ref={popper} className={classnames(
                    'absolute border border-control-border rounded',
                    'bg-white w-full mt-2 cursor-pointer',
                    popperClassName
                )}>
                    {values.map(s =>
                        <div onMouseDown={(e) => setValue(e, target, s)} style={{ backgroundColor: s }}>&nbsp;</div>
                    )}
                </div>
            } */}

        </div>
    );

});
