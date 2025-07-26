import { useEffect, useState } from 'react';
import { useChat } from '../ChatContext';
import { ReactionDetailsData } from '../types/ReactionDetailsData';


export function useReactionDetails(messageId: string) {

    const { getReactions } = useChat();

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
                const data = await getReactions(messageId);
                setDetails(data);
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
