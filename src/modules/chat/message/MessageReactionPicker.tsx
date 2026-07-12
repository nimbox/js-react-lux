import { SmileyIcon } from '@nimbox/icons-react';
import { useState } from 'react';
import { Popper } from '../../../components/floating/Popper';
import { EmojiPicker } from '../../../components/pickers/EmojiPicker';
import { cn } from '../../../components/utilities/cn';
import { useOnOutsideClick } from '../../../hooks/useOnOutsideClick';
import { useChat } from '../ChatContext';
import { CHAT_ICON_TRIGGER } from '../utils/iconTrigger';
import { useMessage } from './MessageContext';


export function MessageReactionPicker() {

    const { message } = useMessage();
    const { onCreateReaction } = useChat();

    const [show, setShow] = useState(false);
    const [referenceRef, setReferenceRef] = useState<HTMLButtonElement | null>(null);
    const [floatingRef, setFloatingRef] = useState<HTMLDivElement | null>(null);

    useOnOutsideClick(show, () => setShow(false), referenceRef, floatingRef);

    // Handlers

    const handleSelect = (emoji: string) => {
        onCreateReaction?.(message, emoji);
        setShow(false);
    };

    // Render

    return (
        <>

            <button
                ref={setReferenceRef}
                onClick={() => setShow(!show)}
                className={cn(CHAT_ICON_TRIGGER, {
                    'invisible group-hover:visible': !show,
                    'visible': show
                })}
            >
                <SmileyIcon className="w-5 h-5" />
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
