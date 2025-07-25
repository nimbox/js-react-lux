import { useContext, useEffect, useState } from 'react';
import { ChatProviderContext } from '../ChatProvider';
import { ReactionDetailData } from '../types/ReactionDetailData';


export function useReactionDetails(messageId: string) {

    const service = useContext(ChatProviderContext);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [details, setDetails] = useState<ReactionDetailData[] | null>(null);

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
                const data = await service.fetchReactionDetails(messageId);
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

    }, [service, messageId]);

    return { loading, error, details };

}
