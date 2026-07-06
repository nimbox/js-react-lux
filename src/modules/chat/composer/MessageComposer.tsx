import { CrossIcon, SendIcon } from '@nimbox/icons-react';
import React, { Children, type Dispatch, type ReactNode, type SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/inputs/Input';
import { MessageReplyQuote } from '../message/MessageReplyQuote';
import type { BaseMessage } from '../types/BaseMessage';


export interface MessageComposerProps {

    start?: ReactNode;
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
    end?: ReactNode;

    replyTo?: BaseMessage;
    onClearReplyTo?: () => void;

    canSubmit?: boolean;
    onSubmit: () => void | Promise<void>;

    className?: string;
    children?: ReactNode;

}

export function MessageComposer(props: MessageComposerProps) {

    // State

    const { start, value, onChange, end, replyTo, onClearReplyTo, canSubmit, onSubmit, className, children } = props;
    const { t } = useTranslation();

    const expanded = Children.toArray(children).some(Boolean);

    const submittable = canSubmit ?? true;
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Handlers

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value ?? '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!submittable || isSubmitting) {
            return;
        }
        try {
            setIsSubmitting(true);
            await onSubmit();
        } finally {
            setIsSubmitting(false);
        }
    };


    // Render

    return (
        <div className={className}>
            <form onSubmit={handleSubmit} className="h-full">
                <div className="h-full flex flex-col bg-white rounded-3xl overflow-hidden">

                    {expanded &&
                        <div className="relative min-h-0 flex-1 border-b border-gray-200">
                            {children}
                        </div>
                    }

                    <div className="shrink-0 flex flex-col">

                        <ReplyToMessage
                            replyTo={replyTo}
                            onClearReplyTo={onClearReplyTo}
                        />

                        <div className="p-4 flex flex-row justify-end items-center gap-2">
                            {!expanded && (
                                <>
                                    {start}
                                    <Input
                                        variant="plain"
                                        placeholder={t('chat.composer.placeholder', { defaultValue: 'Type a message...' })}
                                        value={value}
                                        onChange={handleValueChange}
                                        className="text-lg"
                                        fieldClassName="px-2"
                                    />
                                    {end}
                                </>
                            )}

                            <Button type='submit' semantic="primary" rounded={true} disabled={isSubmitting || !submittable} className="flex-none">
                                <SendIcon />
                            </Button>

                        </div>

                    </div>

                </div>
            </form>
        </div>
    );

}

interface ReplyToMessageProps {

    replyTo?: BaseMessage;
    onClearReplyTo?: () => void;

}

function ReplyToMessage(props: ReplyToMessageProps) {

    // State

    const { replyTo, onClearReplyTo } = props;

    // Render

    if (!replyTo) {
        return null;
    }

    // The replied-to message renders through the shared `MessageReplyQuote` chrome —
    // coloured bar + author name + the `preview` — the exact content the timeline
    // reply-quote shows, so the banner and the timeline can't drift. The composer owns
    // only the dismiss affordance.
    return (
        <div className="px-4 py-2 flex items-center justify-between gap-2 border-b border-gray-200">
            <MessageReplyQuote message={replyTo} className="flex-1 min-w-0" />
            <div className="flex-none">
                <Button type="button" semantic="muted" rounded={true} onClick={onClearReplyTo}>
                    <CrossIcon />
                </Button>
            </div>
        </div>
    );

}
