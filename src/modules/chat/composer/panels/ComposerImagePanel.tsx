import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../../../components/Button';
import { Loading } from '../../../../components/Loading';
import { MessageComposerDraft, useMessageComposer } from '../MessageComposerContext';
import { ComposerPanel } from './ComposerPanel';


export interface ComposerImagePanelDraft {
    type: 'image';
    attachments: { id: string, file: File }[];
}

export interface ComposerImagePanelProps {
    uploadImage: (file: File) => Promise<string>;
    onClose: () => void;
}

export function ComposerImagePanel(props: ComposerImagePanelProps) {

    // Properties

    const { onClose, uploadImage } = props;
    const { updateDraft, setBusy } = useMessageComposer<MessageComposerDraft & ComposerImagePanelDraft>();
    const { t } = useTranslation();

    // State

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

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

        const url = URL.createObjectURL(f);
        setPreviewUrl(url);

        setError(null);
        setUploading(true);
        setBusy(true);
        try {
            const id = await uploadImage(f);
            updateDraft(prev => ({ ...prev, type: 'image', attachments: [{ id, file: f }] }));
        } catch (_error) {
            setError(t('chat.composer.image.uploadError'));
        } finally {
            setBusy(false);
            setUploading(false);
            e.currentTarget.value = '';
        }

    };

    const handleRetry = () => {
        setError(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.click();
        }
    };

    // Render

    return (
        <ComposerPanel onClose={onClose}>

            <ComposerPanel.Header
                title={t('chat.composer.image.attach')}
                onClose={onClose}
            />

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onClick={(e) => { (e.currentTarget as HTMLInputElement).value = ''; }}
                onChange={handleSelect}
            />

            <ComposerPanel.Body className="relative flex items-center justify-center">

                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="preview"
                        className={classNames(
                            'max-w-full max-h-full object-contain rounded-lg shadow',
                            { 'brightness-50': uploading }
                        )}
                    />
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
                            {t('chat.composer.image.retry')}
                        </Button>
                    </div>
                )}

            </ComposerPanel.Body>

        </ComposerPanel >
    );

}
