import classNames from 'classnames';
import { useState } from 'react';
import { Popper } from '../../../components/floating/Popper';
import { EmojiPicker } from '../../../components/pickers/EmojiPicker';
import { useOnOutsideClick } from '../../../hooks/useOnOutsideClick';
import { SmileyIcon } from '../../../icons/components';
import { useMessage } from './MessageContext';


export function MessageReactionPicker() {

    const { onAddReaction } = useMessage();

    const [show, setShow] = useState(false);
    const [referenceRef, setReferenceRef] = useState<HTMLButtonElement | null>(null);
    const [floatingRef, setFloatingRef] = useState<HTMLDivElement | null>(null);

    useOnOutsideClick(show, () => setShow(false), referenceRef, floatingRef);

    // Handlers

    const handleSelect = (emoji: string) => {
        onAddReaction?.(emoji);
        setShow(false);
    };

    // Render

    return (
        <>

            <button
                ref={setReferenceRef}
                onClick={() => setShow(!show)}
                className={classNames('p-2 bg-white/90 shadow rounded-full cursor-pointer', {
                    'invisible group-hover:visible': !show,
                    'visible': show
                })}
            >
                <SmileyIcon className="w-5 h-5 text-gray-500" />
            </button>

            {show && (
                <Popper
                    ref={setFloatingRef}
                    reference={referenceRef!}
                    withPlacement="top"
                >
                    <EmojiPicker onSelect={handleSelect} />
                </Popper>
            )}

        </>
    );

}
