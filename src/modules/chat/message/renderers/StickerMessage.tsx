import { Message } from '../Message';


export function StickerMessageRenderer() {

    return (
        <Message.Container>
            <Message.FloatingAttachments />
            <Message.Bubble>
                <Message.Author />
                <Message.Reply />
                <Message.Header />
                <Message.Body />
                <Message.Footer />
                <Message.Properties />
            </Message.Bubble>
        </Message.Container>
    );

}
