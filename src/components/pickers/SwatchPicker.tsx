import { Placement } from '@popperjs/core';
import classnames from 'classnames';
import React, { useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { Input, InputProps } from '../controls/Input';
import { sameWidth } from '../../utils/popper-modifiers';


export type SwatchPickerAlign = 'start' | 'stretch' | 'end';

export interface SwatchPickerProps extends InputProps {
    swatches: string[];
    align?: SwatchPickerAlign;
    popperClassName?: string;
}

const placements: { [key in SwatchPickerAlign]: Placement } = {
    'start': 'bottom-start',
    'stretch': 'bottom',
    'end': 'bottom-end'
};

export const SwatchPicker = React.forwardRef<HTMLInputElement, SwatchPickerProps>(({ swatches: values, align = 'stretch', popperClassName, onFocus, onBlur, ref: oldRef, ...props }, ref) => {

    const [visible, setVisible] = useState(false);

    const [target, setTarget] = useState<HTMLInputElement | null>(null);
    const [popper, setPopper] = useState<HTMLDivElement | null>(null);
    useOnOutsideClick(() => visible && setVisible(false), visible, target, popper);

    useImperativeHandle(ref, () => target!);

    const { styles, attributes } = usePopper(target, popper, {
        placement: placements[align!],
        modifiers: [
            { name: 'offset', options: { offset: [0, 4] } },
            ...(align === 'stretch' ? [sameWidth] : [])
        ]
    });

    function handleOnFocus(event: React.FocusEvent<HTMLInputElement>) {
        if (onFocus) { onFocus(event); }
        setVisible(true);
    }

    function handleOnBlur(event: React.FocusEvent<HTMLInputElement>) {
        setVisible(false);
        if (onBlur) { onBlur(event); }
    }

    function setValue(event: React.MouseEvent<HTMLDivElement, MouseEvent>, element: HTMLInputElement, swatch: string) {
        event.preventDefault();
        event.stopPropagation();
        const inputSetter = Object?.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
        if (inputSetter) {
            inputSetter.call(element, swatch);
            var inputEvent = new Event('input', { bubbles: true });
            element.dispatchEvent(inputEvent);
            element.select();
        }
    }

    return (
        <div className="relative inline-block w-full">

            <Input type="text" ref={setTarget} {...props} onFocus={handleOnFocus} onBlur={handleOnBlur} />

            {visible && ReactDOM.createPortal(
                <div ref={setPopper} 
                    {...attributes.popper}
                    className={classnames(
                        'border border-control-border rounded',
                        'bg-white cursor-pointer',
                        popperClassName
                    )}
                    style={styles.popper}
                >
                    {values.map(s =>
                        <div onMouseDown={(e) => setValue(e, target!, s)} style={{ backgroundColor: s }}>&nbsp;</div>
                    )}
                </div>,
                document.querySelector('body')!
            )}

        </div>
    );

});
