import { useContext, useState } from 'react';
import { useCallback } from 'react';
import { ChatProviderContext } from '../ChatProvider';
import { ReactionDetailData } from '../types/ReactionDetailData';


export function useReactionDetails(messageId: string) {

    const service = useContext(ChatProviderContext);
    const [details, setDetails] = useState<ReactionDetailData[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchDetails = useCallback(async () => {

        setLoading(true);
        setError(null);

        try {
            const data = await service.fetchReactionDetails(messageId);
            setDetails(data);
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'Unknown error';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }

    }, [service, messageId]);

    return { details, loading, error, fetchDetails };

}