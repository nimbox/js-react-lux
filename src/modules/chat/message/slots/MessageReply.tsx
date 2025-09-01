import { useMessage } from '../MessageContext';


export function MessageReply() {

    const { message: { replyTo }, renderReply } = useMessage();

    if (!replyTo || !renderReply) {
        return null;
    }

    // Render

    return (
        renderReply(replyTo)
    );

}
