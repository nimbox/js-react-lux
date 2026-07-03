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

// The last-message line is a summary host — render it through the message
// registry at the `summary` surface (a dense one-line digest, §6), not a
// hand-built string. `summary` has no fallback: a type that authored none
// resolves to `null`, and the line renders nothing (better empty than a
// mis-shaped preview dragged into the row).
function ConversationMessageContent({ message }: { message: BaseMessage }) {

    const resolveRenderer = useMessageRenderer();
    const Summary = resolveRenderer(message, 'summary');

    if (!Summary) {
        return null;
    }

    return (
        <div className="text-sm text-gray-700 truncate">
            <Summary message={message} />
        </div>
    );

}
