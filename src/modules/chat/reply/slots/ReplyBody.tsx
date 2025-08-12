import { useChat } from '../../ChatContext';
import { useReply } from '../ReplyContext';


export function ReplyBody() {

    const { renderText } = useChat();
    const { message: { body} } = useReply();

    return (
        <div className="text-gray-700 line-clamp-2">
            {renderText(body || 'Message')}
        </div>
    );

}
