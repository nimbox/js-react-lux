import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/Button';
import { Input } from '../../components/inputs/Input';
import { CrossIcon, SendIcon } from '../../icons/components';
import { useChat } from './ChatContext';
import { Reply } from './reply/Reply';


export interface MessageInputProps {

    startButtons?: ReactNode;
    endButtons?: ReactNode;

    onSubmit?: (message: string) => void;
    className?: string;

}

export function MessageInput({ className, onSubmit, startButtons, endButtons }: MessageInputProps) {

    const { replyTo, clearReplyTo: clearReply } = useChat();
    const { t } = useTranslation();
    // State

    const [body, setBody] = useState('');

    // Handlers

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBody(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (body.trim()) {
            onSubmit?.(body.trim());
            setBody('');
            clearReply(); // Clear reply after sending
        }
    };

    // Render

    return (
        <form onSubmit={handleSubmit} className={classNames('mx-8 mb-4', className)}>
            <div className="flex flex-col bg-white/90 rounded-3xl overflow-hidden">

                {replyTo && (
                    <div className="px-4 py-2 flex items-center justify-between gap-2 border-b border-gray-200">
                        <div className="flex-1">
                            <Reply message={replyTo} />
                        </div>
                        <div className="flex-shrink-0">
                            <Button type="button" semantic="muted" rounded={true} onClick={clearReply}>
                                <CrossIcon />
                            </Button>
                        </div>
                    </div>
                )}

                <div className="p-4 flex flex-row items-center gap-2">

                    {startButtons}

                    <Input
                        variant="plain"
                        placeholder={t('chat.messageInput.placeholder', { defaultValue: 'Type a message...' })}
                        value={body}
                        onChange={handleChange}
                        className="text-lg"
                        fieldClassName="px-2"
                    />

                    {endButtons}
                    <Button type='submit' semantic="primary" rounded={true}><SendIcon /></Button>

                </div>

            </div>
        </form>
    );

}
