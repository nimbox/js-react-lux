import classNames from 'classnames';
import { useContext, useState } from 'react';
import { EmojiPicker } from '../../../components/pickers/EmojiPicker';
import { Popper } from '../../../components/Popper';
import { useOnOutsideClick } from '../../../hooks/useOnOutsideClick';
import { SmileyIcon } from '../../../icons/components';
import { ChatProviderContext } from '../ChatProvider';
import { MessageGroupContext } from './MessageGroup';
import { MessageContext } from './Message';


export function MessageReact() {

    const { addReaction } = useContext(ChatProviderContext)!;
    const { direction } = useContext(MessageGroupContext)!;
    const { message: { id } } = useContext(MessageContext)!;

    const [show, setShow] = useState(false);

    const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
    const [popperRef, setPopperRef] = useState<HTMLDivElement | null>(null);

    useOnOutsideClick(show, () => setShow(false), buttonRef, popperRef);

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
                className={classNames('p-2 flex-none bg-white/90 drop-shadow rounded-full', {
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
