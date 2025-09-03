import { FileIcon } from '../../../../icons/components';
import { mediaSize } from '../../utils/mediaSize';
import { useMessage } from '../MessageContext';
import { MessageProvider, type MessageProviderProps } from '../MessageProvider';


export function DocumentMessage(props: MessageProviderProps) {

    return (
        <MessageProvider {...props}>
            <MessageProvider.Container>
                <MessageProvider.Bubble>
                    <MessageProvider.Author />
                    <MessageProvider.Reply />
                    <MessageProvider.Header />
                    <Document />
                    <MessageProvider.Body />
                    <MessageProvider.Footer />
                    <MessageProvider.Properties />
                </MessageProvider.Bubble>
            </MessageProvider.Container>
        </MessageProvider>
    );

}

function Document() {

    const { message: { caption, attachments } } = useMessage();

    if (!attachments || attachments.length === 0) {
        return null;
    }

    const attachment = attachments[0];
    const href = (attachment && attachment.url) ? attachment.url + (attachment.url.includes('?') ? '&download=true' : '?download=true') : undefined;

    // Render

    if (href == null) {
        return (
            <div>
                <div className="my-2 p-2 flex flex-row gap-2 items-center bg-gray-100 rounded-md hover:bg-gray-200">
                    <div>
                        <FileIcon className="w-8 h-8" />
                    </div >
                    <div>
                        <div className="text-sm font-medium">{attachment.filename}</div>
                        <div className="text-xs text-gray-500">{mediaSize(attachment.size)}</div>
                    </div>
                </div >
                {caption && <div>{caption}</div>}
            </div>
        );
    } else {
        return (
            <div>
                <a href={href} className="my-2 p-2 flex flex-row gap-2 items-center bg-gray-100 rounded-md hover:bg-gray-200">
                    <div>
                        <FileIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="text-sm font-medium">{attachment.filename}</div>
                        <div className="text-xs text-gray-500">{mediaSize(attachment.size)}</div>
                    </div>
                </a>
                {caption && <div>{caption}</div>}
            </div>
        );
    }

}
