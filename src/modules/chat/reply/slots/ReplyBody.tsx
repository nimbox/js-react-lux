import { useChat } from '../../ChatContext';
import { useReply } from '../ReplyContext';


export function ReplyBody({ children }: { children?: React.ReactNode }) {

    const { renderText } = useChat();
    const { message: { body, caption } } = useReply();

    return (
        <div className="text-gray-700 line-clamp-2">
            {children || renderText(body || caption || 'Message')}
        </div>
    );

}
