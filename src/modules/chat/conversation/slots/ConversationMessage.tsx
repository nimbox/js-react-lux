import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { type MessageData } from '../../types/MessageData';
import { useConversation } from '../ConversationContext';


// ConversationMessage

export interface ConversationMessageProps {
    className?: string;
}

export function ConversationMessage({ className }: ConversationMessageProps) {

    const { conversation } = useConversation();
    const { t } = useTranslation();

    return (
        <div className={classNames('min-w-0', className)}>
            {conversation?.lastMessage
                ? <ConversationMessageContent message={conversation.lastMessage} />
                : (
                    <div className="text-sm text-gray-700">
                        {t('chat.conversation.message.empty', { defaultValue: 'Nothing yet...' })}
                    </div>
                )
            }
        </div>
    );

}

function ConversationMessageContent({ message }: { message: MessageData }) {

    return (
        <div className="text-sm text-gray-700 truncate">
            {message.type}: {message.body}
        </div>
    );
}