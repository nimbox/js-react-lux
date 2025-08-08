import classNames from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../../components/inputs/Input';
import { Message } from '../../message/Message';
import { MessageGroup } from '../../message/MessageGroup';
import { MessageData } from '../../types/MessageData';
import { TemplateContextBlock, TemplateContextBlockType, TemplateContextData } from '../../types/TemplateContextData';
import { TemplateData } from '../../types/TemplateData';
import { MessageComposerDraft, useMessageComposer } from '../MessageComposerContext';
import { ComposerPanel } from './ComposerPanel';


export interface ComposerTemplatePanelDraft {
    type: 'template';
    template: TemplateData;
    context: TemplateContextData;
}

export interface ComposerTemplatePanelProps {

    templates: TemplateData[];
    renderTemplate: (template: TemplateData, context: TemplateContextData) => MessageData;

    onClose: () => void;

    chatBackground?: string;

}

export function ComposerTemplatePanel(props: ComposerTemplatePanelProps) {

    // Props

    const { templates, renderTemplate, chatBackground: chatBackground, onClose } = props;
    const { updateDraft } = useMessageComposer<MessageComposerDraft & ComposerTemplatePanelDraft>();
    const { t } = useTranslation();

    // State

    const [selectedIndex, setSelectedIndex] = useState<number | null>(templates.length ? 0 : null);
    const template = selectedIndex !== null ? templates[selectedIndex] : null;
    const [context, setContext] = useState<TemplateContextData>({ header: {}, body: {}, footer: {} });

    // Whenever a new template is selected, 
    // initialise context for its variables

    useEffect(() => {

        if (!template) {
            return;
        }

        const data: TemplateContextData = { header: {}, body: {}, footer: {} };
        TemplateContextBlock.forEach(b => {
            const block = template[b as keyof TemplateData] as TemplateData['header'] | undefined;
            if (block?.type === 'text') {
                for (const k of Object.keys(block.content.context ?? {})) {
                    data[b][k] = '';
                }
            }
        });
        setContext(data);

    }, [template]);

    // Update draft whenever template or context changes

    useEffect(() => {

        if (!template) {
            return;
        }

        updateDraft(prev => ({ ...prev, type: 'template', template: template, context: context }));

    }, [template, context, updateDraft]);

    // Render

    return (
        <ComposerPanel onClose={onClose}>

            <ComposerPanel.Header
                title={t('chat.composer.template.attach')}
                onClose={onClose}
            />

            <ComposerPanel.Body className="min-w-0 flex flex-row items-stretch border border-control-border rounded-lg overflow-hidden">

                <TemplateList
                    templates={templates}
                    selectedIndex={selectedIndex}
                    onSelect={setSelectedIndex}
                    className="w-1/4 flex-shrink-0"
                />

                <TemplateContext
                    template={template}
                    contextValues={context}
                    setContextValues={setContext}
                    className="w-1/4 flex-shrink-0"
                />

                <TemplatePreview
                    template={template}
                    context={context}
                    renderTemplate={renderTemplate}
                    backgroundImage={chatBackground}
                    className="w-1/2 flex-shrink-0"
                />

            </ComposerPanel.Body>

        </ComposerPanel>
    );

}

// Template List

interface TemplateListProps {

    templates: TemplateData[];
    selectedIndex: number | null;
    onSelect: (idx: number) => void;

    className?: string;

}

function TemplateList({ templates, selectedIndex, onSelect, className }: TemplateListProps) {

    const { t } = useTranslation();

    return (
        <div className={classNames(
            'flex flex-col border-r border-control-border',
            className)}
        >

            <div className="border-b border-control-border">
                <div className="p-2 text-center font-medium truncate">{t('chat.composer.template.templates')}</div>
            </div>

            <div className="max-h-full flex-1 overflow-y-auto">
                {templates.map((tpl, idx) => (
                    <button
                        key={tpl.name + idx}
                        onClick={() => onSelect(idx)}
                        className={classNames(
                            'w-full h-14 text-left px-4 py-2 hover:bg-primary-50 focus:outline-none',
                            {
                                'text-primary-500 bg-primary-100': idx === selectedIndex
                            }
                        )}
                    >

                        <div className="font-medium truncate">{tpl.name}</div>
                        {tpl.description && (
                            <div className="text-xs text-gray-500 truncate">{tpl.description || '...'}</div>
                        )}

                    </button>
                ))}

            </div>

        </div>
    );

}

// Template Context

interface TemplateContextProps {
    template: TemplateData | null;
    contextValues: TemplateContextData;
    setContextValues: React.Dispatch<React.SetStateAction<TemplateContextData>>;
    className?: string;
}

function TemplateContext({ template, contextValues, setContextValues, className }: TemplateContextProps) {

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
    renderTemplate: (template: TemplateData, context: TemplateContextData) => MessageData;
    backgroundImage?: string;
    className?: string;
}

function TemplatePreview({ template, context: context, renderTemplate, backgroundImage, className }: TemplatePreviewProps) {

    const preview = useMemo(() => {
        if (!template) return null;
        return renderTemplate(template, context);
    }, [template, context, renderTemplate]);

    // Render

    return (
        <div className={classNames(
            'relative py-8 bg-chat-message-list-bg overflow-y-auto',
            className)}
        >

            {backgroundImage && (
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${backgroundImage})` }} />
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
