import { useMessage } from '../MessageContext';


export function MessageImage() {

    const { message: { type, attachments } } = useMessage();

    if (type !== 'image' || !attachments || attachments.length === 0) {
        return null;
    }

    return (
        <div className="my-2">
            <img
                src={attachments[0].url}
                alt={attachments[0].name || 'attachment'}
                className="max-w-xs rounded shadow"
            />
        </div>
    );

}
