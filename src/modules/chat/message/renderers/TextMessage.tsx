import { Message } from '../Message';
import emojiRegex from 'emoji-regex';
import { useMessage } from '../MessageContext';


export function TextMessageRenderer() {

    const { message: { body } } = useMessage();

    const safeBody = body?.trim() || '';
    const emojiMatches = safeBody.match(emojiRegex());
    const isSingleEmoji = emojiMatches &&
        emojiMatches.length === 1 &&
        safeBody === emojiMatches[0];

    return (
        <Message.Container>
            {isSingleEmoji && <Message.FloatingBody className="p-2 text-5xl" />}
            <Message.Bubble>
                <Message.Author />
                <Message.Reply />
                <Message.Header />
                {!isSingleEmoji && <Message.Body />}
                <Message.Footer />
                <Message.Properties />
            </Message.Bubble>
        </Message.Container>
    );

}
