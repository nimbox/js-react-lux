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
        <div className={
            classNames(
                'p-3 flex flex-row items-center gap-2 rounded-lg group',
                'hover:bg-secondary-100', {
                'bg-primary-100': selected
            }, className)
        }>
            {children}
        </div>
    );

}
