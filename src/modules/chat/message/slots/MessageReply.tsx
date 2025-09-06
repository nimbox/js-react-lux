import { useMessage } from '../MessageContext';


export function MessageReply() {

    const { message: { replyTo }, renderReplyTo: RenderReplyTo } = useMessage();

    if (!replyTo || !RenderReplyTo) {
        return null;
    }

    return (
        <RenderReplyTo message={replyTo} />
    );

}
