import classNames from 'classnames';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Loading } from '../../../components/Loading';
import { WarningIcon } from '@nimbox/icons-react';
import type { ReactionParticipant } from '../types/ReactionParticipant';
import { useChat } from '../ChatContext';
import { MessageContext, useMessage } from './MessageContext';


export interface MessageReactionDetailsProps {
    className?: string;
    // When set, only participants who reacted with this emoji are shown (a
    // per-emoji pill's popover). Omitted → all reactors.
    emoji?: string;
}

export function MessageReactionDetails(props: MessageReactionDetailsProps) {

    const { className = 'w-72 p-3', emoji } = props;
    const { message, onDeleteReaction } = useContext(MessageContext)!;
    const { authorRenderer } = useChat();
    const { t } = useTranslation(['lux']);

    const { loading, error, participants: allParticipants } = useReactionParticipants(message.id);
    const participants = emoji != null ? allParticipants?.filter(p => p.emoji === emoji) ?? null : allParticipants;

    // Handlers

    const handleRemoveReaction = (emoji: string) => {
        onDeleteReaction?.(emoji);
    };

    // Render

    if (loading) {
        return (
            <div className={classNames(className, 'flex flex-row justify-end items-center')}>
                <Loading />
            </div>
        );
    }

    if (error || !participants || participants.length === 0) {
        return (
            <div className={classNames(className, 'flex flex-row justify-end items-center')}>
                <WarningIcon className="text-danger-500" />
            </div>
        );
    }

    return (
        <div className={className}>
            <div className="flex flex-col gap-2">
                {participants.map((participant, index) => (
                    <div key={index} className="flex flex-row items-center gap-2">
                        <div className="grow">
                            {participant.isViewer ?

                                <button onClick={() => handleRemoveReaction(participant.emoji)} className="text-left cursor-pointer">
                                    <div>
                                        {authorRenderer.name(participant.author)}
                                    </div>
                                    {onDeleteReaction && (
                                        <div className="text-xs text-gray-500">
                                            {t('chat.clickToRemove', { defaultValue: 'Click to remove' })}
                                        </div>
                                    )}
                                </button> :

                                <div>
                                    {authorRenderer.name(participant.author)}
                                </div>

                            }
                        </div>
                        <div className="flex-none text-2xl">{participant.emoji}</div>
                    </div>
                ))}
            </div>
        </div>
    );

}

export function useReactionParticipants(messageId: string) {

    const { getReactionParticipants } = useMessage();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [participants, setParticipants] = useState<ReactionParticipant[] | null>(null);

    useEffect(() => {

        if (!messageId) {
            setLoading(false);
            setError('No message ID provided');
            setParticipants(null);
            return;
        }

        const fetchParticipants = async () => {

            setLoading(true);
            setError(null);

            try {
                if (getReactionParticipants) {
                    const data = await getReactionParticipants();
                    setParticipants(data);
                } else {
                    setParticipants([]);
                }
            } catch (err: unknown) {
                const errorMessage = err instanceof Error ? err.message : 'Unknown error';
                setError(errorMessage);
                setParticipants(null);
            } finally {
                setLoading(false);
            }

        };

        fetchParticipants();

    }, [getReactionParticipants, messageId]);

    return { loading, error, participants };

}
