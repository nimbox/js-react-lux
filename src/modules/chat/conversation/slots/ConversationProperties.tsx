import { cn } from '../../../../components/utilities/cn';
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
        <div className={cn('shrink-0 text-sm text-gray-500', className)}>
            {formatCalendar(conversation.timestamp)}
        </div>
    );

}
