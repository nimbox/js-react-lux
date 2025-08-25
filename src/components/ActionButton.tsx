import { useState } from 'react';
import { useOnOutsideClick } from '../hooks/useOnOutsideClick';
import { VerticalDotsIcon } from '../icons/components';
import { Button } from './Button';
import { Popper } from './floating/Popper';


export interface ActionButtonProps {

    className?: string;
    popperClassName?: string;

    children?: (close: (fn?: () => void) => () => void) => React.ReactNode;

}

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
                semantic="muted"
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
