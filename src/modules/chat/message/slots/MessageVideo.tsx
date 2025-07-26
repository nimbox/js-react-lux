import { useMessage } from '../MessageContext';


export function MessageVideo() {

    const { message: { type, attachments } } = useMessage();

    if (type !== 'video' || !attachments || attachments.length === 0) {
        return null;
    }

    return (
        <div className="my-2">
            <video controls className="w-full max-w-xs rounded shadow">
                <source src={attachments[0].url} />
                Your browser does not support the video tag.
            </video>
        </div>
    );

}
