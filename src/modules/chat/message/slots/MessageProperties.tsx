import { useMessage } from '../MessageContext';


export function MessageProperties() {

    const { message: { timestamp, status } } = useMessage();

    if (!timestamp && !status) {
        return null;
    }

    return (
        <div className="flex flex-row gap-1 justify-end align-center text-xs text-gray-500">
            { timestamp && <span>{timestamp}</span> }
            { status && <span>{status}</span> }
        </div>
    );

}
