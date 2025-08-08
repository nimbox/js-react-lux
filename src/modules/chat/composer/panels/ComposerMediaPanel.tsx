import { useCallback, useEffect, useState } from 'react';
import { ComposerPanel } from './ComposerPanel';
import { mediaSize } from '../../utils/mediaSize';
import classNames from 'classnames';
import { FileIcon } from '../../../../icons/components';
import { useTranslation } from 'react-i18next';
import { Loading } from '../../../../components/Loading';
import { Button } from '../../../../components/Button';
import { MessageComposerDraft, useMessageComposer } from '../MessageComposerContext';


export interface ComposerMediaPanelDraft {

    type: 'image' | 'document';
    attachments: { id: string, file: File }[];

}

export interface ComposerMediaPanelProps {

    title: string;
    files: File[];

    uploadMedia: (file: File) => Promise<string>;
    onClose: () => void;

}

export function ComposerMediaPanel(props: ComposerMediaPanelProps) {

    const { title, files, uploadMedia, onClose } = props;
    const file = files != null && files.length > 0 ? files[0] : null;

    const { t } = useTranslation();

    const { updateDraft, setBusy } = useMessageComposer<MessageComposerDraft & ComposerMediaPanelDraft>();

    // Internal State

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Handlers

    const handleUpload = useCallback(async (file: File) => {

        if (!file) {
            onClose();
            return;
        }

        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        setUploading(true);
        setError(null);
        setBusy(true);
        try {
            const id = await uploadMedia(file);
            updateDraft(prev => ({ ...prev, type: 'document', attachments: [{ id, file }] }));
        } catch (_err) {
            setError(t('chat.composer.document.uploadError'));
        } finally {
            setBusy(false);
            setUploading(false);
        }

    }, []);


    const handleRetry = () => {
        if (file != null) {
            setError(null);
            handleUpload(file);
        }
    };

    useEffect(() => {
        if (file != null) {
            handleUpload(file);
        }
    }, [file, handleUpload]);

    // Render

    const previewType = file ? getPreviewType(file) : null;

    return (
        <ComposerPanel onClose={onClose}>

            <ComposerPanel.Header title={title} onClose={onClose} />

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

                {/* Preview */}

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
                            {t('chat.composer.noPreview')}
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
                            {t('chat.composer.retry')}
                        </Button>
                    </div>
                )}

            </ComposerPanel.Body>

        </ComposerPanel>
    );

}

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
