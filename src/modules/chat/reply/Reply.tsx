import { useChat } from '../ChatContext';
import { ReplyContext, type ReplyContextProps } from './ReplyContext';
import { ReplyAuthor } from './slots/ReplyAuthor';
import { ReplyBody } from './slots/ReplyBody';
import { ReplyContainer } from './slots/ReplyContainer';
import { ReplyContent } from './slots/ReplyContent';
import { ReplyImage } from './slots/ReplyImage';
import { ReplyMedia } from './slots/ReplyMedia';


// Reply

export function Reply(props: ReplyContextProps) {

    const { renderReply, renderDefaultReply } = useChat();
    const { message } = props;

    // Try to get a specific renderer for this reply type,
    // fallback to default renderer.

    const replyType = message.type || 'text';
    const specificRenderer = renderReply[replyType];
    const renderer = specificRenderer || renderDefaultReply;

    return (
        <ReplyContext.Provider value={props}>
            {renderer()}
        </ReplyContext.Provider>
    );

}

// Slots

Reply.Container = ReplyContainer;

Reply.Content = ReplyContent;
Reply.Author = ReplyAuthor;
Reply.Body = ReplyBody;

Reply.Media = ReplyMedia;
Reply.Image = ReplyImage;
