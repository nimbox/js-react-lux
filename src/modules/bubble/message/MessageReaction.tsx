import classNames from 'classnames';
import { useCallback, useContext, useState } from 'react';
import { Popup } from '../../../components/Popup';
import { MessageContext } from '../Message';
import { MessageGroupContext } from '../MessageGroup';
import { MessageReactionDetails } from './MessageReactionDetails';


export function MessageReactions() {

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

    // Render

    return (
        <Popup visible={visible} placement="top" onChangeVisible={setVisible} Component={MessageReactionDetails} >
            <button
                onClick={handleClick}
                className={classNames('flex -mt-2', {
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
