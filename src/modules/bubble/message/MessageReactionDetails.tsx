import { useContext } from 'react';
import { useReactionDetails } from '../hooks/useReactionDetails';
import { MessageContext } from '../Message';
import { Loading } from '../../../components/Loading';
import classNames from 'classnames';
import { WarningIcon } from '../../../icons/components';


export interface MessageReactionDetailsProps {
    className?: string;
}

export function MessageReactionDetails(props: MessageReactionDetailsProps) {

    const { className = 'w-72 p-3' } = props;
    const mprops = useContext(MessageContext);

    const { details, loading, error } = useReactionDetails(mprops?.message.id || '');

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
                        <div className="flex-grow">{detail.author.name}</div>
                        <div className="flex-none text-2xl">{detail.emoji}</div>
                    </div>
                ))}
            </div>
        </div>
    );

}
