import { useState } from 'react';
import { useOnOutsideClick } from '../hooks/useOnOutsideClick';
import { VerticalDotsIcon } from '@nimbox/icons-react';
import { Button } from './Button';
import { Popper } from './floating/Popper';


export interface ActionButtonProps {

    className?: string;
    popperClassName?: string;

    children?: (close: (fn?: () => void) => () => void) => React.ReactNode;

}

/**
 * A button that opens a popper of actions. Its children are a function that receives `close`, so an action can dismiss the popper when it runs.
 *
 * Use for a short list of actions on a row or a page.
 */
export const ActionButton = ({ className, popperClassName, children }: ActionButtonProps) => {

    const [show, setShow] = useState(false);

    const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
    const [popperRef, setPopperRef] = useState<HTMLDivElement | null>(null);

    useOnOutsideClick(show, () => setShow(false), buttonRef, popperRef);

    const close = (fn?: () => void) => () => {
        fn?.();
        setShow(false);
    };

    return (
        <>

            <Button
                ref={setButtonRef}
                variant="text"
                semantic="neutral"
                onClick={() => setShow(!show)}
                className={className}
            >
                <VerticalDotsIcon />
            </Button>

            {show && (
                <Popper
                    ref={setPopperRef}
                    reference={buttonRef!}
                    className="bg-control-bg border border-control-border rounded drop-shadow"
                >
                    <div className={popperClassName}>
                        {children?.(close)}
                    </div>
                </Popper>
            )}

        </>
    );

}; 
