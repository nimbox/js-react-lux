import { useContext } from 'react';
import { MessageContext } from './Message';


export function MessageAttachments() {

    const mprops = useContext(MessageContext);
    if (!mprops || !mprops.message.attachments || mprops.message.attachments.length === 0) {
        return null;
    }

    if (mprops.message.type === 'sticker') {
        return null;
    }

    return (
        <div className="flex flex-col gap-2 my-2">
            {mprops.message.attachments.map((att, i) => {
                if (att.type === 'image') {
                    return (
                        <img
                            key={i}
                            src={att.url}
                            alt={att.name || 'attachment'}
                            className="max-w-xs rounded shadow"
                        />
                    );
                }
                if (att.type === 'audio') {
                    return (
                        <audio key={i} controls className="w-full max-w-xs">
                            <source src={att.url} />
                            Your browser does not support the audio element.
                        </audio>
                    );
                }
                if (att.type === 'video') {
                    return (
                        <video key={i} controls className="w-full max-w-xs rounded shadow">
                            <source src={att.url} />
                            Your browser does not support the video tag.
                        </video>
                    );
                }
                return null;
            })}
        </div>
    );

}
