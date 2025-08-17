import classnames from 'classnames';
import React, { useContext, useState } from 'react';
import { usePopper } from 'react-popper';
import { ControlContext } from './ControlContext';


//
// Inspired from
// https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/
//

export interface TextAreaMarkupProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
    error?: boolean;
}

export const TextAreaMarkup = React.forwardRef<HTMLTextAreaElement, TextAreaMarkupProps>(({ error, className, ...props }) => {

    const context = useContext(ControlContext);

    const [referenceElement, setReferenceElement] = useState<HTMLTextAreaElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'top-start',
        modifiers: [
            { name: 'arrow', options: { element: arrowElement } }
        ]
    });

    return (
        <div>

            <textarea {...props} ref={setReferenceElement} className={classnames(
                'block w-full rounded border border-control-border',
                error || context.error ?
                    'border-danger-500 focus:border-danger-500 focus:ring focus:ring-danger-500' :
                    'focus:border-primary-500 focus:ring focus:ring-primary-500',
                'focus:ring-opacity-50 focus:outline-none disabled:opacity-50',
                className)}
            />

            {/* <div ref={setReferenceElement} className="inline-block bg-yellow-500">Hola</div> */}

            <div ref={setPopperElement} {...attributes.popper} className="p-4 popper-element" style={styles.popper}>
                <div>
                    Popper!!!
                </div>
                <div ref={setArrowElement} className="popper-arrow" style={styles.arrow} />
            </div>

        </div>
    );

});
