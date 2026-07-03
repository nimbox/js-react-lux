import classNames from 'classnames';
import { useChat } from '../../ChatContext';
import { useConversation } from '../ConversationContext';


// ConversationMeta — the row's trailing column: opaque consumer
// indicators and the first-class unread badge. (The option menu is NOT
// here — it is an absolute hover overlay owned by `ConversationContainer`,
// so it reserves no space in this column.)
//
//   indicators — painted by the consumer from the opaque `meta`
//                (`renderConversationMeta`); lux stays blind to
//                pinned/starred/…
//   unread     — first-class: lux owns the badge opinion, like a
//                reaction pill (docs §1).

export interface ConversationMetaProps {
    className?: string;
}

export function ConversationMeta({ className }: ConversationMetaProps) {

    const { renderConversationMeta } = useChat();
    const { conversation } = useConversation();

    return (
        <div className={classNames('flex flex-row items-center gap-2', className)}>

            {renderConversationMeta?.(conversation)}

            {conversation.unread != null && conversation.unread > 0 &&
                <span className="px-2 text-xs text-white bg-red-600 rounded-full">
                    {conversation.unread}
                </span>
            }

        </div>
    );

}
