import classNames from 'classnames';
import { useConversation } from '../ConversationContext';


// ConversationContainer

export interface ConversationContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function ConversationContainer({ children, className }: ConversationContainerProps) {

    const { selected } = useConversation();

    return (
        <div className={classNames('p-3 flex flex-row items-center gap-2 rounded-lg',
            'hover:bg-gray-100', {
            'bg-gray-50': selected
        }, className)}>
            {children}
        </div>
    );

}
