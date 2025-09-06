import React, { Children, type Dispatch, type ReactNode, type SetStateAction, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/inputs/Input';
import { CrossIcon, SendIcon } from '../../../icons/components';
import { type ReplyProps } from '../reply/ReplyProvider';
import type { MessageData } from '../types/MessageData';
import { MessageComposerContext } from './MessageComposerContext';


export interface MessageComposerSubmitData {
    value: string;
}

export interface MessageComposerProps {

    start?: ReactNode;
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
    end?: ReactNode;

    replyTo?: MessageData;
    renderReplyTo?: (props: ReplyProps) => ReactNode;
    onClearReplyTo?: () => void;

    onSubmit: (data: MessageComposerSubmitData) => Promise<void>;

    className?: string;
    children?: ReactNode;

}

export function MessageComposer(props: MessageComposerProps) {

    // State

    const { start, value, onChange, end, replyTo, renderReplyTo, onClearReplyTo, onSubmit, className, children } = props;
    const { t } = useTranslation();

    const expanded = Children.toArray(children).some(Boolean);

    // Shared Submit Handlers

    const submits = useRef(new Map<string, () => Promise<void>>());
    const registerSubmit = useCallback((panel: string, fn: () => Promise<void>) => {
        submits.current.set(panel, fn);
        return () => {
            if (submits.current.get(panel) === fn) {
                submits.current.delete(panel);
            }
        };
    }, []);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Handlers

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value ?? '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setIsSubmitting(true);
            if (submits.current.size > 0) {
                const fns = Array.from(submits.current.values());
                await Promise.allSettled(fns.map(fn => fn()));
            } else {
                await onSubmit({ value });
            }
        } finally {
            setIsSubmitting(false);
        }
    };


    // Render

    return (
        <MessageComposerContext.Provider value={{ registerSubmit }}>
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
                                renderReplyTo={renderReplyTo}
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

                                <Button type='submit' semantic="primary" rounded={true} disabled={isSubmitting} className="flex-none">
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

interface ReplyToMessageProps {

    replyTo?: MessageData;
    renderReplyTo?: (props: ReplyProps) => ReactNode;
    onClearReplyTo?: () => void;

}

function ReplyToMessage(props: ReplyToMessageProps) {

    // State

    const { replyTo, renderReplyTo: RenderReplyTo, onClearReplyTo } = props;

    // Render

    if (!replyTo || !RenderReplyTo) {
        return null;
    }

    return (
        <div className="px-4 py-2 flex items-center justify-between gap-2 border-b border-gray-200">
            {RenderReplyTo && (
                <div className="flex-1">
                    <RenderReplyTo message={replyTo} />
                </div>
            )}
            <div className="flex-none">
                <Button type="button" semantic="muted" rounded={true} onClick={onClearReplyTo}>
                    <CrossIcon />
                </Button>
            </div>
        </div>
    );

}
