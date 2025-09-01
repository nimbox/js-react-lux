import { useReply } from '../ReplyContext';


export function ReplyImage() {

    const { message } = useReply();

    if (!message.attachments || message.attachments.length === 0) {
        return null;
    }

    return (
        <img
            src={message.attachments[0].url}
            alt="image thumbnail"
            className="w-20 h-20 object-cover rounded"
        />
    );

}
