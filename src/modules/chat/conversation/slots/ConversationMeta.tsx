import classNames from 'classnames';
import { useConversation } from '../ConversationContext';


// ConversationMeta

export interface ConversationMetaProps {
    className?: string;
}

export function ConversationMeta({ className }: ConversationMetaProps) {

    const { conversation, menu } = useConversation();

    return (
        <div className={classNames('flex flex-row items-center gap-2', className)}>

            {conversation.unread != null && conversation.unread > 0 &&
                <span className="rounded-full bg-red-600 text-white px-2 py-1 text-xs">
                    {conversation.unread}
                </span>
            }

            {menu}

        </div >
    );

}
