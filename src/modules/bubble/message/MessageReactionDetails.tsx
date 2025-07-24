import { useContext, useEffect } from 'react';
import { useReactionDetails } from '../hooks/useReactionDetails';
import { MessageContext } from '../Message';


export interface MessageReactionDetailsProps {
    className?: string;
}

export function MessageReactionDetails(props: MessageReactionDetailsProps) {

    const { className = 'w-72 p-3' } = props;
    const mprops = useContext(MessageContext);

    const { details, loading, error, fetchDetails } = useReactionDetails(mprops?.message.id || '');
    useEffect(() => { fetchDetails(); }, [fetchDetails]);

    // Render

    if (loading) {
        return <div className={className}>Loading...</div>;
    }

    if (error) {
        return <div className={className}>Error: {error}</div>;
    }

    if (!details) {
        return <div className={className}>Loading...</div>;
    }

    return (
        <div className={className}>
            <div className="flex flex-col gap-2">
                {details.map((detail, index) => (
                    <div key={index} className="flex flex-row items-center gap-2">
                        <div className="flex-grow">{detail.author.name}</div>
                        <div className="flex-none text-2xl">{detail.emoji}</div>
                    </div>
                ))}
            </div>
        </div>
    );

}
