import classNames from 'classnames';
import { useCallback, useEffect, useMemo, type Dispatch, type ReactNode, type SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../../components/inputs/Input';
import { type MessageData } from '../../types/MessageData';
import { TemplateContextBlock, type TemplateContextBlockType, type TemplateContextData } from '../../types/TemplateContextData';
import { type TemplateData } from '../../types/TemplateData';
import { useMessageComposer } from '../MessageComposerContext';
import { ComposerPanel } from './ComposerPanel';


export interface TemplatePanelSubmitData {
    name: string;
    context: TemplateContextData;
}

export interface ComposerTemplatePanelProps {

    templates: TemplateData[];

    name?: string;
    onNameChange: Dispatch<SetStateAction<string | undefined>>;

    context: TemplateContextData;
    onContextChange: Dispatch<SetStateAction<TemplateContextData>>;

    onClose: () => void;
    onSubmit: (data: TemplatePanelSubmitData) => Promise<void>;

    transform: (template: TemplateData, context: TemplateContextData) => MessageData;
    render: ({ message }: { message: MessageData }) => ReactNode;
    background?: string;

}

export function ComposerTemplatePanel(props: ComposerTemplatePanelProps) {

    // Props

    const {
        templates,
        name, onNameChange,
        context, onContextChange,
        onClose, onSubmit,
        transform, render, background
    } = props;

    const { registerSubmit } = useMessageComposer();
    const { t } = useTranslation();

    // State

    const template = useMemo(() => templates.find(t => t.name === name), [templates, name]);

    const handleNameChange = useCallback((name: string) => {
        onNameChange(name);
        const t = templates.find(t => t.name === name);
        if (!t) return;
        onContextChange(initialize(t));
    }, [templates, onNameChange, onContextChange]);

    // Register

    const handleSubmit = useCallback(async () => {
        if (template != null && name != null && context != null) {
            onSubmit({ name, context });
        }
    }, [template, name, context, onSubmit]);
    useEffect(() => registerSubmit('template', handleSubmit), [registerSubmit, handleSubmit]);

    // Render

    return (
        <ComposerPanel onClose={onClose}>

            <ComposerPanel.Header title={t('chat.composer.template.attach')} onClose={onClose} />

            <ComposerPanel.Body className="p-4">

                <div className="h-full flex flex-row items-stretch border border-control-border rounded-lg overflow-hidden">

                    <TemplateList
                        templates={templates}
                        name={name}
                        onNameChange={handleNameChange}
                        className="w-1/4 shrink-0"
                    />

                    <TemplateContext
                        template={template}
                        context={context}
                        onContextChange={onContextChange}
                        className="w-1/4 shrink-0"
                    />

                    <TemplatePreview
                        template={template}
                        context={context}
                        transform={transform}
                        render={render}
                        background={background}
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

    name?: string | null;
    onNameChange: (name: string) => void;

    className?: string;

}

function TemplateList(props: TemplateListProps) {

    const { templates, name, onNameChange, className } = props;
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
                {templates.map((t) => (
                    <div
                        key={t.name}
                        onClick={() => onNameChange(t.name)}
                        className="px-2 cursor-pointer"
                    >
                        <div
                            className={classNames(
                                'w-full h-14 text-left px-4 py-2 hover:bg-primary-200 rounded focus:outline-none', {
                                'text-primary-500 bg-primary-100': t.name === name
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

    template?: TemplateData;

    context: TemplateContextData;
    onContextChange: (context: TemplateContextData) => void;

    className?: string;

}

function TemplateContext(props: TemplateContextProps) {

    const { template, context, onContextChange, className } = props;
    const { t } = useTranslation();

    // Context

    const getVariables = useCallback((blockKey: TemplateContextBlockType) => {
        const block = template ? (template[blockKey as keyof TemplateData] as TemplateData['header'] | undefined) : undefined;
        return block?.type === 'text' ? Object.keys(block.content.context ?? {}) : [];
    }, [template]);

    const isEmpty = useMemo(() => {
        return TemplateContextBlock.every(k => getVariables(k).length === 0);
    }, [getVariables]);

    // Handlers

    const handleContextChange = useCallback((b: TemplateContextBlockType, k: string, v: string) => {
        onContextChange({ ...context, [b]: { ...context[b], [k]: v } });
    }, [context, onContextChange]);

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
                                            value={context[b][v] ?? ''}
                                            onChange={e => handleContextChange(b, v, e.target.value)}
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

    template?: TemplateData;
    context?: TemplateContextData;

    transform: (template: TemplateData, context: TemplateContextData) => MessageData;
    render: ({ message }: { message: MessageData }) => ReactNode;

    background?: string;
    className?: string;

}

function TemplatePreview({ template, context, transform, render: Message, background, className }: TemplatePreviewProps) {

    const preview = useMemo(() => {
        if (!template) return null;
        return transform(template, context ?? { header: {}, body: {}, footer: {} });
    }, [template, context, transform]);

    // Render

    return (
        <div className={classNames(
            'relative py-8 bg-chat-message-list-bg overflow-y-auto',
            className)}
        >

            {background && (
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(${background})` }} />
            )}

            {preview && (
                <div className="h-full flex justify-center items-center">
                    <Message message={preview} />
                </div>
            )}

        </div>

    );

}

// Utils

function initialize(template: TemplateData) {

    const context: TemplateContextData = { header: {}, body: {}, footer: {} };
    if (!template) return context;

    TemplateContextBlock.forEach(b => {
        const block = template[b as keyof TemplateData] as TemplateData['header'] | undefined;
        if (block?.type === 'text') {
            for (const k of Object.keys(block.content.context ?? {})) {
                context[b][k] = '';
            }
        }
    });

    return context;

}
