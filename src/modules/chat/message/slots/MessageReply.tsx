import { Reply } from '../../reply/Reply';
import { useMessage } from '../MessageContext';


export function MessageReply() {

    const { message: { replyTo: message } } = useMessage();

    if (!message) {
        return null;
    }

    // Render

    return (
        <Reply message={message} />
    );

}
