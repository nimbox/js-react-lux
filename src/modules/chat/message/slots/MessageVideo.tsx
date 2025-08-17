import { useMessageList } from '../MessageListContext';
import { useMessage } from '../MessageContext';
import { Loading } from '../../../../components/Loading';


export function MessageVideo() {

    const { scrollToBottom } = useMessageList();
    const { message: { type, attachments } } = useMessage();

    if (type !== 'video' || !attachments || attachments.length === 0) {
        return null;
    }

    const url = attachments[0].url;

    return (
        <div className="relative my-2 min-w-16 min-h-16">
            {url
                ? (
                    <video
                        controls
                        onLoad={scrollToBottom}
                        className="max-w-64 max-h-64 rounded shadow"
                    >
                        <source src={attachments[0].url} />
                        Your browser does not support the video tag.
                    </video>
                )
                : <Loading />
            }
        </div>
    );

}
