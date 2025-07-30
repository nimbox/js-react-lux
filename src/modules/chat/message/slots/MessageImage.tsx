import { Loading } from '../../../..';
import { useMessageList } from '../../MessageListContext';
import { useMessage } from '../MessageContext';


export function MessageImage() {

    const { message: { type, attachments } } = useMessage();
    const { scrollToBottom } = useMessageList();

    if (type !== 'image' || !attachments || attachments.length === 0) {
        return null;
    }

    const url = attachments[0].thumbnailUrl;

    // Render

    return (
        <div className="relative my-2 min-w-16 min-h-16">
            {url
                ? <img
                    src={url}
                    alt={attachments[0].filename || 'image'}
                    className="max-w-64 max-h-64 rounded shadow"
                    onLoad={scrollToBottom}
                />
                : <Loading />
            }
        </div>
    );

}
