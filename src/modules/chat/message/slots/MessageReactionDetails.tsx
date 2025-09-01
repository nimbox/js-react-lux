import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loading } from '../../../../components/Loading';
import { WarningIcon } from '../../../../icons/components';
import type { ReactionDetailsData } from '../../types/ReactionDetailsData';
import { MessageContext, useMessage } from '../MessageContext';


export interface MessageReactionDetailsProps {
    className?: string;
}

export function MessageReactionDetails(props: MessageReactionDetailsProps) {

    const { className = 'w-72 p-3' } = props;
    const { message, onRemoveReaction } = useContext(MessageContext)!;
    const { t } = useTranslation(['lux']);

    const { loading, error, details } = useReactionDetails(message.id);

    // Handlers

    const handleRemoveReaction = (emoji: string) => {
        onRemoveReaction?.(emoji);
    };

    // Render

    if (loading) {
        return (
            <div className={classNames(className, 'flex flex-row justify-end items-center')}>
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className={classNames(className, 'flex flex-row justify-end items-center')}>
                <WarningIcon className="text-danger-500" />
            </div>
        );
    }

    if (!details || details.length === 0) {
        return (
            <div className={classNames(className, 'flex flex-row justify-end items-center')}>
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
                            {detail.self ?

                                <button onClick={() => handleRemoveReaction(detail.emoji)} className="text-left cursor-pointer">
                                    <div>
                                        {detail.author.name}
                                    </div>
                                    {onRemoveReaction && (
                                        <div className="text-xs text-gray-500">
                                            {t('chat.clickToRemove', { defaultValue: 'Click to remove' })}
                                        </div>
                                    )}
                                </button> :

                                <div>
                                    {detail.author.name}
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

export function useReactionDetails(messageId: string) {

    const { getReactions } = useMessage();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [details, setDetails] = useState<ReactionDetailsData[] | null>(null);

    useEffect(() => {

        if (!messageId) {
            setLoading(false);
            setError('No message ID provided');
            setDetails(null);
            return;
        }

        const fetchDetails = async () => {

            setLoading(true);
            setError(null);

            try {
                if (getReactions) {
                    const data = await getReactions();
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

    }, [getReactions, messageId]);

    return { loading, error, details };

}
