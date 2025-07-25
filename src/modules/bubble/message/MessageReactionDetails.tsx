import classNames from 'classnames';
import { useContext } from 'react';
import { Loading } from '../../../components/Loading';
import { WarningIcon } from '../../../icons/components';
import { useReactionDetails } from '../hooks/useReactionDetails';
import { MessageContext } from './Message';


export interface MessageReactionDetailsProps {
    onRemoveReaction?: (messageId: string, emoji: string) => void;
    className?: string;
}

export function MessageReactionDetails(props: MessageReactionDetailsProps) {

    const { onRemoveReaction, className = 'w-72 p-3' } = props;
    const { message } = useContext(MessageContext)!;

    const { details, loading, error } = useReactionDetails(message.id);

    // Handlers

    const handleRemoveReaction = (emoji: string) => {
        onRemoveReaction?.(message.id || '', emoji);
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
                        <div className="flex-grow">
                            {detail.self ?

                                <button onClick={() => handleRemoveReaction(detail.emoji)} className="text-left">
                                    <div>
                                        {detail.author.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Click to remove
                                    </div>
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
        </div >
    );

}
