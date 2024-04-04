import classnames from 'classnames';
import React, { FC, useLayoutEffect, useRef, useState } from 'react';
import { usePopper } from 'react-popper';

// popper

interface PopperProps {
    reference: any;
    boundary: any;
    className?: string
    children: any;
}

const Popper: FC<PopperProps> = ({ reference: referenceElement, boundary, className, children }) => {

    // For some odd reason this does not work when using useRef
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);

    const { styles, attributes } = usePopper(referenceElement.current, popperElement, {
        placement: 'top',
        modifiers: [
            { name: 'flip', enabled: true },
            { name: 'preventOverflow', options: { padding: 4, boundary: boundary.current } },
            { name: 'arrow', options: { padding: 4, element: arrowElement } },
            { name: 'offset', enabled: true, options: { offset: [0, 6] } }
        ]
    });

    return (
        <div ref={setPopperElement} {...attributes.popper} className={classnames('popper-element', className)} style={styles.popper} >
            {children}
            <div ref={setArrowElement} {...attributes.arrow} className="popper-arrow" style={styles.arrow} />
        </div>
    );

};


// definition

const definition = {
    title: 'Libraries/Popper',
};
export default definition;

// parameterized

export const Parameterized = () => {

    const scrollable = useRef(null);
    const popper = useRef<HTMLDivElement>(null);

    const [show, setShow] = useState(false);
    const reference = useRef(null);

    useLayoutEffect(() => { popper.current!.scrollIntoView({ block: "center", inline: "center" }) }, []);

    return (
        <div className="w-full h-96 p-10 bg-gray-50">
            <input type="checkbox" checked={show} onChange={e => setShow(!show)} />
            <div ref={scrollable} className="w-full h-full bg-gray-200 overflow-scroll overscroll-none">
                <div className="flex flex-col justify-center items-center" style={{ width: '250%', height: '250%' }}>

                    <div ref={popper}>
                        <button type="button" ref={reference} className="w-90 bg-red-500 p-5 rounded-xl" >Reference element</button>
                        {show && <Popper boundary={scrollable} reference={reference} className="p-2 rounded"><div className="p-1 rounded">Hola</div></Popper>}
                    </div>

                </div>
            </div>
        </div>
    );

};
// Parameterized.args = { size: 'base', className: 'text-secondary-500' };

// stories


