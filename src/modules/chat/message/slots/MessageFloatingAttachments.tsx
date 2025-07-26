import { useMessage } from '../MessageContext';


export function MessageFloatingAttachments() {

    const { message } = useMessage();

    if (!message.attachments || message.attachments.length === 0) {
        return null;
    }

    return (
        <div className="p-2">
            {message.attachments?.map((attachment, index) => {
                return (
                    <img
                        key={index}
                        src={attachment.url}
                        alt={attachment.name || 'sticker'}
                        className="w-24 h-24 object-contain select-none"
                    />
                );
            })}
        </div>
    );

}
