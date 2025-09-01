import emojiRegex from 'emoji-regex';
import { MessageProvider, type MessageProviderProps } from '../MessageProvider';


export function TextMessage(props: MessageProviderProps) {

    const { message: { body } } = props;

    const safeBody = body?.trim() || '';
    const emojiMatches = safeBody.match(emojiRegex());
    const isSingleEmoji = emojiMatches &&
        emojiMatches.length === 1 &&
        safeBody === emojiMatches[0];

    return (
        <MessageProvider {...props}>
            <MessageProvider.Container>
                {isSingleEmoji && <MessageProvider.FloatingBody className="p-2 text-5xl" />}
                <MessageProvider.Bubble>
                    <MessageProvider.Author />
                    <MessageProvider.Reply />
                    <MessageProvider.Header />
                    {!isSingleEmoji && <MessageProvider.Body />}
                    <MessageProvider.Footer />
                    <MessageProvider.Properties />
                </MessageProvider.Bubble>
            </MessageProvider.Container>
        </MessageProvider>
    );

}
