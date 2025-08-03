import classNames from 'classnames';
import { useConversation } from '../ConversationContext';
import { HeartIcon, ThumbTackIcon } from '../../../../icons/components';


// ConversationMeta

export interface ConversationMetaProps {
    className?: string;
}

export function ConversationMeta({ className }: ConversationMetaProps) {

    const { conversation, menu } = useConversation();

    return (
        <div className={classNames('flex flex-row items-center gap-2', className)}>

            {conversation.favorited &&
                <span className="text-md">
                    <HeartIcon />
                </span>
            }

            {conversation.pinned &&
                <span className="text-md">
                    <ThumbTackIcon />
                </span>
            }

            {conversation.unread != null && conversation.unread > 0 &&
                <span className="rounded-full bg-red-600 text-white px-2 py-1 text-xs">
                    {conversation.unread}
                </span>
            }

            {menu}

        </div >
    );

}
