import React, { Children, type ReactElement, type ReactNode, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/inputs/Input';
import { CrossIcon, SendIcon } from '../../../icons/components';
import { useChat } from '../ChatContext';
import { Reply } from '../reply/Reply';
import { MessageComposerContext } from './MessageComposerContext';


export interface MessageComposerSubmitData {
    body: string;
    replyToMessageId?: string;
}

export interface MessageComposerProps {

    start?: ReactElement;
    end?: ReactElement;

    onSubmit: (data: MessageComposerSubmitData) => Promise<void>;

    className?: string;
    children?: ReactNode;

}

export function MessageComposer(props: MessageComposerProps) {

    // Properties

    const { replyTo, clearReplyTo } = useChat();
    const { className, onSubmit, start, end, children } = props;
    const expanded = Children.toArray(children).some(Boolean);

    // State

    const { t } = useTranslation();

    // Draft

    const [body, setBody] = useState('');

    const submits = useRef(new Map<string, () => Promise<void>>());
    const registerSubmit = useCallback((panel: string, fn: () => Promise<void>) => {
        submits.current.set(panel, fn);
        return () => {
            if (submits.current.get(panel) === fn) {
                submits.current.delete(panel);
            }
        };
    }, []);

    const [submitting, setSubmitting] = useState<boolean>(false);


    // Handlers

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBody(e.target.value ?? '');
    };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        try {

            setSubmitting(true);

            if (submits.current.size > 0) {
                const fns = Array.from(submits.current.values());
                await Promise.allSettled(fns.map(fn => fn()));
            } else {
                await onSubmit({
                    body,
                    ...(replyTo && { replyToMessageId: replyTo.id })
                });
                setBody('');
            }

            clearReplyTo();

        } finally {
            setSubmitting(false);
        }
    };


    // Render

    const context = { registerSubmit };

    return (
        <MessageComposerContext.Provider value={context}>
            <div className={className}>
                <form onSubmit={handleSubmit} className="h-full">
                    <div className="h-full flex flex-col bg-white rounded-3xl overflow-hidden">

                        {expanded &&
                            <div className="relative min-h-0 flex-1 border-b border-gray-200">
                                {children}
                            </div>
                        }

                        <div className="shrink-0 flex flex-col">

                            <ReplyToMessage />

                            <div className="p-4 flex flex-row justify-end items-center gap-2">
                                {!expanded && (
                                    <>
                                        {start}
                                        <Input
                                            variant="plain"
                                            placeholder={t('chat.composer.placeholder', { defaultValue: 'Type a message...' })}
                                            value={body}
                                            onChange={handleChange}
                                            className="text-lg"
                                            fieldClassName="px-2"
                                        />
                                        {end}
                                    </>
                                )}

                                <Button type='submit' semantic="primary" rounded={true} disabled={submitting} className="flex-none">
                                    <SendIcon />
                                </Button>

                            </div>

                        </div>

                    </div>
                </form>
            </div>
        </MessageComposerContext.Provider>
    );

}

function ReplyToMessage() {

    // Properties

    const { replyTo, clearReplyTo } = useChat();

    // Render

    if (!replyTo) {
        return null;
    }

    return (
        <div className="px-4 py-2 flex items-center justify-between gap-2 border-b border-gray-200">
            <div className="flex-1">
                <Reply message={replyTo} />
            </div>
            <div className="shrink-0">
                <Button type="button" semantic="muted" rounded={true} onClick={clearReplyTo}>
                    <CrossIcon />
                </Button>
            </div>
        </div>
    );

}
