import React, { Children, ReactElement, ReactNode, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/inputs/Input';
import { CrossIcon, SendIcon } from '../../../icons/components';
import { useChat } from '../ChatContext';
import { Reply } from '../reply/Reply';
import { MessageComposerContext, MessageComposerContextProps, MessageComposerDraft } from './MessageComposerContext';


export interface MessageComposerProps<D extends MessageComposerDraft> {

    start?: ReactElement;
    end?: ReactElement;

    onCollapse?: () => void;
    onSubmit?: (draft: D) => void;

    className?: string;
    children?: ReactNode;

}

export function MessageComposer<D extends MessageComposerDraft>(props: MessageComposerProps<D>) {

    // Properties

    const { clearReplyTo } = useChat();
    const { className, onSubmit, start, end, children } = props;

    // State

    const { t } = useTranslation();

    // Draft

    const [draft, setDraft] = useState<D>({ body: '' } as unknown as D);
    const [busy, setBusy] = useState(false);

    const updateDraft = useCallback(
        (patch: Partial<D> | ((prev: D) => Partial<D>)) => {
            setDraft(prev =>
                typeof patch === 'function'
                    ? (patch as (p: D) => D)(prev)
                    : { ...prev, ...patch }
            );
        }, [setDraft]) as MessageComposerContextProps<MessageComposerDraft>['updateDraft'];

    // Widen the signature so it fits the base context type

    const clearDraft = useCallback(() => {
        setDraft({ body: '' } as unknown as D);
    }, []);

    // Handlers

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateDraft(prev => ({ ...prev, body: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('handleSubmit', draft);
        onSubmit?.(draft);
        clearReplyTo();
        clearDraft();
    };

    const expanded = Children.toArray(children).some(Boolean);

    // Render

    return (
        <MessageComposerContext.Provider value={{ draft, updateDraft, clearDraft, setBusy }}>
            <div className={className}>
                <form onSubmit={handleSubmit} className="h-full">
                    <div className="h-full flex flex-col bg-white rounded-3xl overflow-hidden">

                        {expanded &&
                            <div className="relative min-h-0 flex-1 border-b border-gray-200">
                                {children}
                            </div>
                        }

                        <div className="flex-shrink-0 flex flex-col">

                            <MessageInputReply />

                            <div className="p-4 flex flex-row items-center gap-2">

                                {!expanded && start}

                                <Input
                                    variant="plain"
                                    placeholder={t('chat.composer.placeholder', { defaultValue: 'Type a message...' })}
                                    value={draft.body}
                                    onChange={handleChange}
                                    className="text-lg"
                                    fieldClassName="px-2"
                                />

                                {!expanded && end}

                                <Button type='submit' semantic="primary" rounded={true} disabled={busy}><SendIcon /></Button>

                            </div>

                        </div>

                    </div>
                </form>
            </div>
        </MessageComposerContext.Provider>
    );

}

function MessageInputReply() {

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
            <div className="flex-shrink-0">
                <Button type="button" semantic="muted" rounded={true} onClick={clearReplyTo}>
                    <CrossIcon />
                </Button>
            </div>
        </div>
    );

}
