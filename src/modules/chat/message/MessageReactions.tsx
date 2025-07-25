import { Placement } from '@popperjs/core';
import classNames from 'classnames';
import { useCallback, useContext, useState } from 'react';
import { Popup } from '../../../components/Popup';
import { MessageContext } from './Message';
import { MessageGroupContext } from './MessageGroup';
import { MessageReactionDetails } from './MessageReactionDetails';
import { ChatProviderContext } from '../ChatProvider';


export function MessageReactions() {

    const { removeReaction } = useContext(ChatProviderContext)!;
    const gprops = useContext(MessageGroupContext)!;
    const mprops = useContext(MessageContext)!;

    const [visible, setVisible] = useState(false);
    const handleClick = useCallback(async () => {
        setVisible(!visible);
    }, [visible]);

    // Return if no reactions

    if (!mprops || !mprops.message.reactions || mprops.message.reactions.length === 0) {
        return null;
    }

    // Sort reactions by count

    const reactions = [...mprops.message.reactions].sort((a, b) => b.count - a.count);
    const count = reactions.reduce((sum, r) => sum + r.count, 0);

    // Handlers

    const handleRemoveReaction = (messageId: string, emoji: string) => {
        removeReaction(messageId, emoji);
        setVisible(false);
    };

    // Render

    return (
        <Popup
            visible={visible}
            placement={PLACEMENT[gprops.direction] || 'top'}
            onChangeVisible={setVisible}
            Component={() => <MessageReactionDetails onRemoveReaction={handleRemoveReaction} />}
        >
            <button
                onClick={handleClick}
                className={classNames('flex -mt-2 z-10', {
                    'justify-self-end mr-3': gprops.direction === 'outbound',
                    'justify-self-start ml-3': gprops.direction === 'inbound'
                })}
            >
                <span
                    className="bg-white rounded-full shadow-md flex items-center justify-center min-w-6 h-6 text-base border border-gray-200 p-3 gap-0.5"
                >
                    {reactions.map(reaction => (
                        <span key={reaction.emoji} className="mx-0.5 text-base">
                            {reaction.emoji}
                        </span>
                    ))}
                    <span className="ml-0.5 text-xs">{count}</span>
                </span>
            </button>
        </Popup>
    );

}

const PLACEMENT: Record<'inbound' | 'outbound', Placement> = {
    'inbound': 'top-start',
    'outbound': 'top-end'
};
