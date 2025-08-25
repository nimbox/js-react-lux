import classNames from 'classnames';
import { Avatar } from '../../../../components/displays/Avatar';
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
        <div className={classNames('shrink-0', className)}>
            <Avatar

                color={avatarData.color}
                backgroundColor={avatarData.backgroundColor}

                src={avatarData.src}
                srcSet={avatarData.srcSet}
                alt={avatarData.alt}

            >
                {avatarData.initials || conversation.name?.substring(0, 2).toUpperCase()}
            </Avatar>
        </div>
    );

}
