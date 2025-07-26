import classNames from 'classnames';
import { useState } from 'react';
import { EmojiPicker } from '../../../components/pickers/EmojiPicker';
import { Popper } from '../../../components/Popper';
import { useOnOutsideClick } from '../../../hooks/useOnOutsideClick';
import { SmileyIcon } from '../../../icons/components';
import { useChat } from '../ChatContext';
import { useMessage } from './MessageContext';
import { useMessageGroup } from './MessageGroupContext';


export function MessageReact() {

    const { addReaction } = useChat();
    const { group: { direction } } = useMessageGroup();
    const { message: { id } } = useMessage();

    const [show, setShow] = useState(false);

    const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
    const [popperRef, setPopperRef] = useState<HTMLDivElement | null>(null);

    useOnOutsideClick(show, () => setShow(false), buttonRef, popperRef);

    // Handlers

    const handleSelect = (emoji: string) => {
        addReaction(id, emoji);
        setShow(false);
    };

    // Render

    return (
        <>
            <button
                ref={setButtonRef}
                onClick={() => setShow(!show)}
                className={classNames('p-2 flex-none bg-white/90 shadow rounded-full', {
                    'order-2': direction === 'inbound',
                    'order-1': direction === 'outbound'
                }, {
                    'invisible group-hover:visible': !show,
                    'visible': show
                })}
            >
                <SmileyIcon className="w-5 h-5 text-gray-500" />
            </button>

            {show && (
                <Popper
                    ref={setPopperRef}
                    reference={buttonRef!}
                    withPlacement="top"
                >
                    <EmojiPicker onSelect={handleSelect} />
                </Popper>
            )}

        </>
    );

}
