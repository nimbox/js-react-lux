import classNames from 'classnames';
import { useConversation } from '../ConversationContext';
import { HeartIcon, ThumbTackIcon } from '../../../../icons/components';


// ConversationMeta

export interface ConversationMetaProps {
    className?: string;
}

export function ConversationMeta({ className }: ConversationMetaProps) {

    const { conversation, menu, isOver } = useConversation();

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
                <span className=" px-2 text-xs text-white bg-red-600 rounded-full">
                    {conversation.unread}
                </span>
            }

            {isOver && menu}

        </div >
    );

}
