import classNames from 'classnames';
import { useChat } from '../../ChatContext';
import { useConversation } from '../ConversationContext';


// ConversationProperties

export interface ConversationPropertiesProps {
    className?: string;
}

export function ConversationProperties({ className }: ConversationPropertiesProps) {

    const { formatCalendar } = useChat();
    const { conversation } = useConversation();

    return (
        <div className={classNames('shrink-0 text-sm text-gray-500', className)}>
            {formatCalendar(conversation.timestamp)}
        </div>
    );

}
