import { Loading } from '../../../../components/Loading';
import { useChat } from '../../ChatContext';
import { useMessage } from '../MessageContext';
import { useMessageList } from '../MessageListContext';


export function MessageImage() {

    const { setPreview } = useChat();
    const { message, message: { type, attachments } } = useMessage();
    const { scrollToBottom } = useMessageList();

    if (type !== 'image' || !attachments || attachments.length === 0) {
        return null;
    }

    const url = attachments[0].thumbnailUrl;

    const handlePreview = () => {
        setPreview?.(message);
    };

    // Render

    return (
        <div className="relative my-2 min-w-16 min-h-16">
            {url
                ? <img
                    src={url}
                    alt={attachments[0].filename || 'image'}
                    onLoad={scrollToBottom}
                    onClick={handlePreview}
                    className="max-w-64 max-h-64 rounded shadow cursor-zoom-in"
                />
                : <Loading />
            }
        </div>
    );

}
