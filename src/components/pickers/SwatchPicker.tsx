import { Placement } from '@popperjs/core';
import classnames from 'classnames';
import React, { useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';
import { usePopper } from 'react-popper';
import { useOnOutsideClick } from '../../hooks/useOnOutsideClick';
import { Input, InputProps } from '../controls/Input';
import { sameWidth } from '../../utils/popper-modifiers';
import swatches from '../../utils/flat-colors';


export type SwatchPickerAlign = 'start' | 'stretch' | 'end';

export interface SwatchPickerProps extends InputProps {
    swatches?: string[];
    align?: SwatchPickerAlign;
    popperClassName?: string;
}

const placements: { [key in SwatchPickerAlign]: Placement } = {
    'start': 'bottom-start',
    'stretch': 'bottom',
    'end': 'bottom-end'
};

export const SwatchPicker = React.forwardRef<HTMLInputElement, SwatchPickerProps>(({ swatches: values = swatches, align = 'stretch', popperClassName = 'grid grid-cols-5 w-32 overflow-hidden', onFocus, onBlur, ...props }, ref) => {

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
            setVisible(false);
        }
    }

    return (
        <div className="relative inline-block w-full">

            <Input type="text" ref={setTarget} {...props} maxLength={7} onClick={() => setVisible(true)} onFocus={handleOnFocus} onBlur={handleOnBlur} />

            <div className="m-px absolute inset-y-0 right-0 rounded bg-red-500" style={{ width: '2.5em', backgroundColor: target?.value }}>
                
            </div>

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
                    {values.map((s, i) =>
                        <div key={i} onMouseDown={(e) => setValue(e, target!, s)} style={{ backgroundColor: s }}>&nbsp;</div>
                    )}
                </div>,
                document.querySelector('body')!
            )}

        </div>
    );

});
