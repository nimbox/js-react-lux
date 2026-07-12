import { cn } from '../../../../components/utilities/cn';
import { ChatAvatar } from '../../atoms';
import { useConversation } from '../ConversationContext';


// ConversationAvatar

export interface ConversationAvatarProps {
    className?: string;
}

export function ConversationAvatar({ className }: ConversationAvatarProps) {

    const { conversation } = useConversation();

    const avatarData = conversation.avatar || {
        color: 'gray',
        initials: conversation.name?.substring(0, 2).toUpperCase()
    };

    return (
        <div className={cn('shrink-0', className)}>
            <ChatAvatar

                url={avatarData.src}

                initials={avatarData.initials || conversation.name?.substring(0, 2).toUpperCase()}

                color={avatarData.color}
                backgroundColor={avatarData.backgroundColor}

            />
        </div>
    );

}
