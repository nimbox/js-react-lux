import { useMessage } from '../MessageContext';


export function MessageAudio() {

    const { message: { type, attachments } } = useMessage();

    if (type !== 'audio' || !attachments || attachments.length === 0) {
        return null;
    }

    return (
        <div className="my-2">
            <audio controls className="max-w-xs">
                <source src={attachments[0].url} />
                Your browser does not support the audio element.
            </audio>
        </div>
    );

}
