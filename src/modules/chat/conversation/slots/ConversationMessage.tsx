import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useMessageRenderer } from '../../message/useMessageRenderer';
import { type BaseMessage } from '../../types/BaseMessage';
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

// The last-message line is a preview host — render it through the message
// registry at the `preview` surface (§6), not a hand-built string.
function ConversationMessageContent({ message }: { message: BaseMessage }) {

    const resolveRenderer = useMessageRenderer();
    const Preview = resolveRenderer(message, 'preview');

    return (
        <div className="text-sm text-gray-700 truncate">
            <Preview message={message} />
        </div>
    );

}
