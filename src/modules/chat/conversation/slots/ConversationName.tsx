import { cn } from '../../../../components/utilities/cn';
import { useConversation } from '../ConversationContext';


// ConversationName

export interface ConversationNameProps {
    className?: string;
}

export function ConversationName({ className }: ConversationNameProps) {

    const { conversation } = useConversation();

    return (
        <div className={cn('font-bold text-gray-900 truncate', className)}>
            {conversation.name}
        </div>
    );

}
