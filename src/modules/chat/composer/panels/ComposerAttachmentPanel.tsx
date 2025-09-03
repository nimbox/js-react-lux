import classNames from 'classnames';
import { type ChangeEvent, type ChangeEventHandler, type Dispatch, type MouseEventHandler, type ReactNode, type SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Input } from '../../../../components/inputs/Input';
import { CrossIcon, FileIcon, PlusIcon } from '../../../../icons/components';
import { useStableKey } from '../../hooks/useStableKey';
import { mediaSize } from '../../utils/mediaSize';
import { useMessageComposer } from '../MessageComposerContext';
import { ComposerPanel } from './ComposerPanel';


export interface Attachment {
    file: File;
    caption?: string;
}

export interface AttachmentPanelSubmitData {
    attachments: Attachment[];
}

export interface ComposerAttachmentPanelProps {

    type: 'image' | 'document';

    attachments?: Attachment[];
    onAttachmentsChange: Dispatch<SetStateAction<Attachment[]>>;

    autoOpen?: boolean;

    onClose: () => void;
    onSubmit: (data: AttachmentPanelSubmitData) => Promise<void>;

}

export function ComposerAttachmentPanel(props: ComposerAttachmentPanelProps) {

    // Props

    const { type, attachments = [], onAttachmentsChange, autoOpen, onClose, onSubmit } = props;
    const { getKey } = useStableKey<File>();

    const { registerSubmit } = useMessageComposer();
    const { t } = useTranslation();

    // State

    const [selected, setSelected] = useState<number | null>(null);
    const attachment = selected != null && attachments[selected] != null
        ? attachments[selected]
        : null;
    const attachmentType = getPreviewType(attachment?.file);

    // Auto Open Handlers

    const fileInputRef = useRef<HTMLInputElement>(null);
    const openedRef = useRef<boolean>(false);

    useEffect(() => {
        if (autoOpen) {

            // Guard against React 18 StrictMode double-effect 
            // and ensure same-file reselection works.

            const input = fileInputRef.current;
            if (!input || openedRef.current) {
                return;
            }
            openedRef.current = true;

            // Fire the click event with an empty value so that
            // we can reselect the same file twice.

            input.value = '';
            input.click();

        }
    }, [autoOpen]);


    // Handlers

    const handleSelectAttachment = useCallback((i: number) => {
        setSelected(i);
    }, []);

    const handleAddAttachment = useCallback(() => {
        const input = fileInputRef.current;
        if (!input) return;
        input.value = '';
        input.click();
    }, []);

    const handleRemoveAttachment = useCallback((i: number) => {
        onAttachmentsChange(prev => prev.filter((_, j) => j !== i));
        setSelected((current) => {
            if (current == null) return current;
            if (current === i) {
                if (attachments.length - 1 === 0) return null;
                if (i >= attachments.length - 1) return attachments.length - 2;
                return i;
            }
            if (current > i) return current - 1;
            return current;
        });
    }, [attachments, onAttachmentsChange]);

    //

    const handleCaptionChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const caption = e.target.value ?? '';
        if (selected == null) return;
        onAttachmentsChange(prev => {
            const next = prev.map((v, i) => i === selected ? { ...v, caption } : v);
            return next;
        });
    }, [selected, onAttachmentsChange]);

    const handleMediaSelect: ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
        const list = e.target.files;
        if (!list || list.length === 0) return;
        const selected = Array.from(list);
        onAttachmentsChange(prev => {
            const next = [...prev, ...selected.map(file => ({ file, caption: '' }))];
            setSelected(prev.length);
            return next;
        });
        e.currentTarget.value = '';
    }, [attachments, onAttachmentsChange]);

    // Register

    const handleSubmit = useCallback(async () => {
        try {
            await onSubmit({ attachments: attachments });
        } catch {
            console.error('Error submitting media panel');
        }
    }, [attachments, onSubmit]);
    useEffect(() => registerSubmit('media', handleSubmit), [registerSubmit, handleSubmit]);

    // Render

    return (
        <ComposerPanel onClose={onClose}>

            <ComposerPanel.Header title={t('chat.composer.media.attach')} onClose={onClose} />

            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={type === 'image' ? 'image/*' : '*/*'}
                className="hidden"
                onClick={(e) => { (e.currentTarget as HTMLInputElement).value = ''; }}
                onChange={handleMediaSelect}
            />

            <ComposerPanel.Body className="relative flex flex-col items-center">

                <div className="flex-1 w-full min-h-0 p-4 flex flex-col items-center gap-4">

                    {attachment && (
                        attachmentType
                            ? <MediaPreview file={attachment.file} className="flex-1 min-w-0 min-h-0 object-contain rounded-xl shadow" />
                            : <div className="flex-1 min-w-0 min-h-0 flex justify-center items-center">
                                <MediaNoPreview file={attachment.file} />
                            </div>
                    )}

                    {attachment && (
                        <div className="flex-none w-2/3">
                            <Input
                                variant="filled"
                                value={attachment.caption}
                                onChange={handleCaptionChange}
                                placeholder="Add a caption"
                            />
                        </div>
                    )}

                </div>

                <div className="w-full p-4 flex-none border-t">
                    <div className="flex flex-row justify-center gap-2">

                        <div className="grow-0 flex flex-row justify-center gap-2 overflow-x-auto">
                            {attachments.map((v, i) =>
                                <MediaTile
                                    key={getKey(v.file)}
                                    onClick={() => handleSelectAttachment(i)}
                                    className={classNames('relative group', { 'border-4 border-primary-500': i === selected })}
                                >
                                    <MediaTileDelete onClick={(e) => { e.stopPropagation(); handleRemoveAttachment(i); }} />
                                    <MediaPreview file={v.file} className="w-full h-full object-cover" />
                                </MediaTile>
                            )}
                        </div>

                        <MediaTile onClick={handleAddAttachment}>
                            <PlusIcon className="text-xl" />
                        </MediaTile>

                    </div>
                </div>

            </ComposerPanel.Body>

        </ComposerPanel>
    );

}

// Internal Components

function MediaPreview({ file, className }: {
    file: File,
    className?: string
}) {

    const url = useMemo(() => URL.createObjectURL(file), [file]);
    const previewType = getPreviewType(file);

    if (previewType === 'image') {
        return (
            <img
                src={url}
                alt={file?.name ?? 'preview'}
                className={className}
            />
        );
    }

    if (previewType === 'pdf') {
        return (
            <embed
                src={`${url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                type="application/pdf"
                className={className}
            />
        );
    }

    return (
        <FileIcon className="text-4xl text-muted" />
    );

}

function MediaNoPreview({ file, className }: {
    file: File,
    className?: string
}) {

    return (
        <div className={className}>
            <div className="px-16 py-8 flex flex-col justify-center items-center gap-2 text-muted bg-gray-100 rounded-xl shadow">
                <MediaPreview file={file} />
                <div>No preview available</div>
                <div>{file.name} - {mediaSize(file.size)}</div>
            </div>
        </div>
    );

}

function MediaTile({ onClick, className, children }: {
    onClick: MouseEventHandler<HTMLDivElement>,
    className?: string,
    children: ReactNode
}) {

    return (
        <div
            onClick={onClick}
            className={classNames(
                'flex-none w-16 h-16 border border-control-border rounded overflow-hidden',
                'flex justify-center items-center',
                'cursor-pointer',
                className
            )}
        >
            {children}
        </div>
    );

}

function MediaTileDelete({ onClick }: {
    onClick: MouseEventHandler<HTMLButtonElement>
}) {

    return (
        <>
            <span className="hidden group-hover:block absolute inset-0 bg-linear-to-bl from-black/50 to-50% to-transparent" />
            <button
                type="button"
                onClick={onClick}
                className="absolute right-0 top-0 hidden group-hover:flex w-6 h-6 items-center justify-center text-white cursor-pointer"
            >
                <CrossIcon className="text-xl" />
            </button>
        </>

    );
}

// Utils

function getPreviewType(file: File | null | undefined) {

    if (file == null) {
        return null;
    }

    const type = file.type;
    if (type == null) {
        return null;
    }

    if (type.startsWith('image/')) return 'image';
    if (type === 'application/pdf') return 'pdf';

    return null;

}
