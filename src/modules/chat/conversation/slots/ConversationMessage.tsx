import classNames from 'classnames';
import { useTranslation } from 'react-i18next';


// ConversationMessage

export interface ConversationMessageProps {
    className?: string;
}

export function ConversationMessage({ className }: ConversationMessageProps) {

    const { t } = useTranslation();
    
    return (
        <div className={classNames('text-sm text-gray-700', className)}>
            {t('chat.conversation.message.empty', { defaultValue: 'Nothing yet...' })}
        </div>
    );

}
