import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../../components/inputs/Input';
import { useChat } from '../../ChatContext';
import { Message } from '../../message/Message';
import { MessageGroup } from '../../message/MessageGroup';
import { type MessageData } from '../../types/MessageData';
import { TemplateContextBlock, type TemplateContextBlockType, type TemplateContextData } from '../../types/TemplateContextData';
import { type TemplateData } from '../../types/TemplateData';
import { useMessageComposer } from '../MessageComposerContext';
import { ComposerPanel } from './ComposerPanel';


export interface TemplatePanelSubmitData {
    name: string;
    context: TemplateContextData;
    replyToMessageId?: string;
}

export interface ComposerTemplatePanelProps {

    templates: TemplateData[];
    render: (template: TemplateData, context: TemplateContextData) => MessageData;

    onClose: () => void;
    onSubmit: (data: TemplatePanelSubmitData) => Promise<void>;

    chatBackground?: string;

}

export function ComposerTemplatePanel(props: ComposerTemplatePanelProps) {

    // Props

    const { templates, render, chatBackground: chatBackground, onClose, onSubmit } = props;
    const { replyTo } = useChat();
    const { registerSubmit } = useMessageComposer();

    const { t } = useTranslation();

    // State

    const [selectedIndex, setSelectedIndex] = useState<number | null>(templates.length ? 0 : null);
    const [context, setContext] = useState<TemplateContextData>({ header: {}, body: {}, footer: {} });
    const template = useMemo(() => selectedIndex !== null ? templates[selectedIndex] : null, [templates, selectedIndex]);

    // const initializeContext = useCallback(() => {
    //     const data: TemplateContextData = { header: {}, body: {}, footer: {} };
    //     TemplateContextBlock.forEach(b => {
    //         const block = template[b as keyof TemplateData] as TemplateData['header'] | undefined;
    //         if (block?.type === 'text') {
    //             for (const k of Object.keys(block.content.context ?? {})) {
    //                 data[b][k] = '';
    //             }
    //         }
    //     });
    //     setContext(data);
    // }, [template]);

    // Initialize the context whenever the template changes.

    useEffect(() => {
        const data: TemplateContextData = { header: {}, body: {}, footer: {} };
        if (template) {
            TemplateContextBlock.forEach(b => {
                const block = template[b as keyof TemplateData] as TemplateData['header'] | undefined;
                if (block?.type === 'text') {
                    for (const k of Object.keys(block.content.context ?? {})) {
                        data[b][k] = '';
                    }
                }
            });
        }
        setContext(data);
    }, [template]);

    // Register

    const handleSubmit = useCallback(async () => {
        if (template != null) {
            onSubmit({
                name: template.name,
                context,
                ...(replyTo && { replyToMessageId: replyTo.id })
            });
        }
    }, [template, context, replyTo, onSubmit]);
    useEffect(() => registerSubmit('template', handleSubmit), [registerSubmit, handleSubmit]);

    // Render

    return (
        <ComposerPanel onClose={onClose}>

            <ComposerPanel.Header title={t('chat.composer.template.attach')} onClose={onClose} />

            <ComposerPanel.Body className="p-4">

                <div className="h-full flex flex-row items-stretch border border-control-border rounded-lg overflow-hidden">

                    <TemplateList
                        templates={templates}
                        selected={selectedIndex}
                        onSelect={setSelectedIndex}
                        className="w-1/4 shrink-0"
                    />

                    <TemplateContext
                        template={template}
                        context={context}
                        setContext={setContext}
                        className="w-1/4 shrink-0"
                    />

                    <TemplatePreview
                        template={template}
                        context={context}
                        render={render}
                        chatBackground={chatBackground}
                        className="w-1/2 shrink-0"
                    />

                </div>

            </ComposerPanel.Body>

        </ComposerPanel>
    );

}

// Template List

interface TemplateListProps {

    templates: TemplateData[];
    selected: number | null;
    onSelect: (idx: number) => void;

    className?: string;

}

function TemplateList({ templates, selected: selectedIndex, onSelect, className }: TemplateListProps) {

    const { t } = useTranslation();

    return (
        <div className={classNames(
            'flex flex-col border-r border-control-border',
            className)}
        >

            <div className="border-b border-control-border">
                <div className="p-2 text-center font-medium truncate">{t('chat.composer.template.templates')}</div>
            </div>

            <div className="py-2 max-h-full space-y-1 flex-1 overflow-y-auto">
                {templates.map((t, i) => (
                    <div
                        key={t.name + i}
                        onClick={() => onSelect(i)}
                        className="px-2 cursor-pointer"
                    >
                        <div
                            className={classNames(
                                'w-full h-14 text-left px-4 py-2 hover:bg-primary-200 rounded focus:outline-none', {
                                'text-primary-500 bg-primary-100': i === selectedIndex
                            })}>
                            <div className="font-medium truncate">{t.name}</div>
                            {t.description && (
                                <div className="text-xs text-gray-500 truncate">{t.description || '...'}</div>
                            )}
                        </div>
                    </div>
                ))}

            </div>

        </div>
    );

}

// Template Context

interface TemplateContextProps {
    template: TemplateData | null;
    context: TemplateContextData;
    setContext: React.Dispatch<React.SetStateAction<TemplateContextData>>;
    className?: string;
}

function TemplateContext({ template, context: contextValues, setContext: setContextValues, className }: TemplateContextProps) {

    const { t } = useTranslation();

    // Context

    const getVariables = useCallback((blockKey: TemplateContextBlockType) => {
        const block = template ? (template[blockKey as keyof TemplateData] as TemplateData['header'] | undefined) : undefined;
        return block?.type === 'text' ? Object.keys(block.content.context ?? {}) : [];
    }, [template]);

    const isEmpty = useMemo(() => {
        return TemplateContextBlock.every(k => getVariables(k).length === 0);
    }, [getVariables]);

    // Render

    return (

        <div className={classNames(
            'flex flex-col border-r border-control-border',
            className)}
        >

            <div className="border-b border-control-border">
                <div className="p-2 text-center font-medium truncate">{t('chat.composer.template.variables')}</div>
            </div>

            <div className={classNames(
                'w-full flex-1 overflow-y-auto',
                className)}
            >
                {TemplateContextBlock.map(b => {

                    const variables = getVariables(b);
                    if (!variables.length) {
                        return null;
                    }

                    return (
                        <div key={b} className="px-4 py-2">
                            <div className="font-medium mb-1">{t(`chat.composer.template.blocks.${b}`)}</div>
                            <div className="space-y-2">
                                {variables.map(v => (
                                    <div key={v} className="flex flex-col text-sm gap-1">
                                        <label className="text-gray-600" htmlFor={`${b}-${v}`}>{v}</label>
                                        <Input
                                            id={`${b}-${v}`}
                                            value={contextValues[b][v] ?? ''}
                                            onChange={e => setContextValues(prev => ({
                                                ...prev,
                                                [b]: { ...prev[b], [v]: e.target.value }
                                            }))}
                                            className="text-sm"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    );

                })}

                {isEmpty &&
                    <div className="p-8 text-center">
                        {t('chat.composer.template.empty')}
                    </div>
                }

            </div>

        </div>
    );

}

// Template Preview

interface TemplatePreviewProps {
    template: TemplateData | null;
    context: TemplateContextData;
    render: (template: TemplateData, context: TemplateContextData) => MessageData;
    chatBackground?: string;
    className?: string;
}

function TemplatePreview({ template, context: context, render, chatBackground, className }: TemplatePreviewProps) {

    const preview = useMemo(() => {
        if (!template) return null;
        return render(template, context);
    }, [template, context, render]);

    // Render

    return (
        <div className={classNames(
            'relative py-8 bg-chat-message-list-bg overflow-y-auto',
            className)}
        >

            {chatBackground && (
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${chatBackground})` }} />
            )}

            {preview && (
                <div className="relative z-10">
                    <MessageGroup group={{
                        id: 'preview',
                        direction: 'outbound',
                        author: { id: 'preview', type: 'agent', remoteId: '', name: 'You', initials: 'Y', color: 'green' }
                    }}>
                        <MessageGroup.Messages>
                            <Message message={preview} />
                        </MessageGroup.Messages>
                    </MessageGroup>
                </div>
            )}

        </div>

    );

}
