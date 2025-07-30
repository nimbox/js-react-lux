import { useChat } from '../../ChatContext';
import { useMessage } from '../MessageContext';


export function MessageProperties() {

    const { timeFormatter, statusFormatter } = useChat();
    const { message: { timestamp, status } } = useMessage();

    if (!timestamp && !status) {
        return null;
    }

    return (
        <div className="flex flex-row gap-1 justify-end items-center text-xs text-gray-500">
            {timestamp && <span>{timeFormatter(timestamp)}</span>}
            {status && <span>{statusFormatter(status)}</span>}
        </div>
    );

}
