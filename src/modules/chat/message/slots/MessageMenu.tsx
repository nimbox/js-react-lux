import classNames from 'classnames';
import { useState } from 'react';
import { Button } from '../../../../components/Button';
import { Popper } from '../../../../components/Popper';
import { useOnOutsideClick } from '../../../../hooks/useOnOutsideClick';
import { AngleDownIcon, ForwardIcon, ReplyIcon } from '../../../../icons/components';


export function MessageMenu() {

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

            <button
                ref={setButtonRef}
                onClick={() => setShow(!show)}
                className={classNames('p-0 absolute top-3 right-2 bg-white/90 drop-shadow rounded', {
                    'hidden group-hover:block': !show,
                    'block': show
                })}
            >
                <AngleDownIcon className="w-5 h-5 text-gray-500" />
            </button>

            {show && (
                <Popper
                    ref={setPopperRef}
                    reference={buttonRef!}
                    className="bg-control-bg border border-control-border rounded drop-shadow p-2"
                >

                    <Button
                        variant="text"
                        start={<ReplyIcon className="w-5 h-5" />}
                        onClick={close(() => console.log())}
                        className="w-full whitespace-nowrap"
                    >
                        Reply
                    </Button>

                    <Button
                        variant="text"
                        start={<ForwardIcon className="w-5 h-5"/>}
                        onClick={close(() => console.log())}
                        className="w-full whitespace-nowrap"
                    >
                        Forward
                    </Button>

                </Popper>
            )}

        </>
    );

}
