import { WarningIcon } from '@nimbox/icons-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loading } from '../../../components/Loading';
import { cn } from '../../../components/utilities/cn';
import { useChat } from '../ChatContext';
import type { ReactionDetail } from '../types/ReactionDetail';
import { useMessage } from './MessageContext';


export interface MessageReactionDetailsProps {
    className?: string;
    // When set, only reactions with this emoji are shown (a per-emoji pill's
    // popover). Omitted → every reactor.
    emoji?: string;
}

export function MessageReactionDetails(props: MessageReactionDetailsProps) {

    const { className = 'w-72 p-3', emoji } = props;
    const { message } = useMessage();
    const { authorRenderer, onDeleteReaction } = useChat();
    const { t } = useTranslation(['lux']);

    const { loading, error, details: allDetails } = useReactionDetails();
    const details = emoji != null ? allDetails?.filter(d => d.emoji === emoji) ?? null : allDetails;

    // Handlers

    const handleRemoveReaction = (emoji: string) => {
        onDeleteReaction?.(message, emoji);
    };

    // Render

    if (loading) {
        return (
            <div className={cn(className, 'flex flex-row justify-end items-center')}>
                <Loading />
            </div>
        );
    }

    if (error || !details || details.length === 0) {
        return (
            <div className={cn(className, 'flex flex-row justify-end items-center')}>
                <WarningIcon className="text-danger-500" />
            </div>
        );
    }

    return (
        <div className={className}>
            <div className="flex flex-col gap-2">
                {details.map((detail, index) => (
                    <div key={index} className="flex flex-row items-center gap-2">
                        <div className="grow">
                            {detail.removable ?

                                <button onClick={() => handleRemoveReaction(detail.emoji)} className="text-left cursor-pointer">
                                    <div>
                                        {authorRenderer.name(detail.author)}
                                    </div>
                                    {onDeleteReaction && (
                                        <div className="text-xs text-gray-500">
                                            {t('chat.clickToRemove', { defaultValue: 'Click to remove' })}
                                        </div>
                                    )}
                                </button> :

                                <div>
                                    {authorRenderer.name(detail.author)}
                                </div>

                            }
                        </div>
                        <div className="flex-none text-2xl">{detail.emoji}</div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export function useReactionDetails() {

    const { message } = useMessage();
    const { getReactionDetails } = useChat();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [details, setDetails] = useState<ReactionDetail[] | null>(null);

    useEffect(() => {

        const fetchDetails = async () => {

            setLoading(true);
            setError(null);

            try {
                if (getReactionDetails) {
                    const data = await getReactionDetails(message);
                    setDetails(data);
                } else {
                    setDetails([]);
                }
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                setError(errorMessage);
                setDetails(null);
            } finally {
                setLoading(false);
            }

        };

        fetchDetails();

        // Keyed by message id: the popover refetches when it opens on a different
        // message (or the chat-level fetcher changes), not on every `message` object
        // identity change.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getReactionDetails, message.id]);

    return { loading, error, details };

}
