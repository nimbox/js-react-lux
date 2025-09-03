import classNames from 'classnames';
import { Loading } from '../../../../components/Loading';
import type { MessageData } from '../../types/MessageData';
import { useMessage } from '../MessageContext';


export interface MessageImageProps {
    onClick?: (message: MessageData) => void;
    className?: string;
}

export function MessageImage(props: MessageImageProps) {

    const { onClick, className } = props;
    const { message, message: { attachments } } = useMessage();

    if (!attachments || attachments.length === 0) {
        return null;
    }

    const url = attachments[0].thumbnailUrl;

    const handleOnClick = () => {
        onClick?.(message);
    };

    // Render

    return (
        <div className="relative my-2 min-w-16 min-h-16">
            {url
                ? <img
                    src={url}
                    alt={attachments[0].filename || 'image'}
                    onClick={handleOnClick}
                    className={classNames('max-w-64 max-h-64 rounded shadow', className)}
                />
                : <Loading />
            }
        </div>
    );

}
