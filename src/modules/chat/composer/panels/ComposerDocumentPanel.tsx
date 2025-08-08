import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../components/Button';
import { Loading } from '../../../../components/Loading';
import { FileIcon } from '../../../../icons/components';
import { mediaSize } from '../../utils/mediaSize';
import { MessageComposerDraft, useMessageComposer } from '../MessageComposerContext';
import { ComposerPanel } from './ComposerPanel';


export interface ComposerDocumentPanelDraft {
    type: 'document';
    attachments: { id: string, file: File }[];
}

export interface ComposerDocumentPanelProps {
    uploadDocument: (file: File) => Promise<string>;
    onClose: () => void;
}

export function ComposerDocumentPanel(props: ComposerDocumentPanelProps) {

    // Properties

    const { onClose, uploadDocument } = props;
    const { updateDraft, setBusy } = useMessageComposer<MessageComposerDraft & ComposerDocumentPanelDraft>();
    const { t } = useTranslation();

    // State

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Helpers

    const canPreview = (type: string) => {
        if (type.startsWith('image/')) return 'image';
        if (type === 'application/pdf') return 'pdf';
        return null;
    };

    // Handlers

    const openedRef = useRef<boolean>(false);
    useEffect(() => {

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

    }, []);

    const handleSelect: React.ChangeEventHandler<HTMLInputElement> = async (e) => {

        const f = e.target.files?.[0];
        if (!f) {
            onClose();
            return;
        }

        setFile(f);
        const url = URL.createObjectURL(f);
        setPreviewUrl(url);

        setError(null);
        setUploading(true);
        setBusy(true);
        
        try {
            const id = await uploadDocument(f);
            updateDraft(prev => ({ ...prev, type: 'document', attachments: [{ id, file: f }] }));
        } catch (_err) {
            setError(t('chat.composer.document.uploadError'));
        } finally {
            setBusy(false);
            setUploading(false);
            e.currentTarget.value = '';
        }

    };

    const handleRetry = () => {
        setError(null);
        fileInputRef.current?.click();
    };

    // Render

    const previewType = file ? canPreview(file.type) : null;

    return (
        <ComposerPanel onClose={onClose}>

            <ComposerPanel.Header title={t('chat.composer.document.attach')} onClose={onClose} />

            <input
                ref={fileInputRef}
                type="file"
                accept="*/*"
                className="hidden"
                onChange={handleSelect}
            />

            {file && (
                <div className="text-center text-gray-600 mb-4">
                    <div>
                        <span className="font-medium mr-2">{file.name}</span>
                        <span>({mediaSize(file.size)})</span>
                    </div>
                    {file.type &&
                        <div className="truncate text-sm">
                            {file.type}
                        </div>
                    }
                </div>
            )}

            <ComposerPanel.Body className="relative flex items-center justify-center">

                {previewUrl && previewType === 'image' && (
                    <img
                        src={previewUrl}
                        alt={file?.name ?? 'preview'}
                        className={classNames(
                            'max-w-full max-h-full object-contain rounded-lg shadow',
                            { 'brightness-50': uploading })}
                    />
                )}

                {previewUrl && previewType === 'pdf' && (
                    <embed
                        src={previewUrl}
                        type="application/pdf"
                        className={classNames(
                            'w-full h-full rounded-lg shadow',
                            { 'brightness-50': uploading })}
                    />
                )}

                {previewUrl && !previewType && (
                    <div className="px-12 py-24 flex flex-row items-center gap-4 text-gray-700 bg-gray-400 rounded-lg">
                        <FileIcon className="w-12 h-12" />
                        <div>
                            {t('chat.composer.document.noPreview')}
                        </div>
                    </div>
                )}

                {uploading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loading className="text-6xl" colorClassName="text-white" />
                    </div>
                )}

                {error && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/60 rounded-lg">
                        <div className="text-white text-sm text-center px-4">{error}</div>
                        <Button semantic="primary" onClick={handleRetry}>
                            {t('chat.composer.document.retry')}
                        </Button>
                    </div>
                )}

            </ComposerPanel.Body>

        </ComposerPanel>
    );

}
