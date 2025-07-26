import { Message } from '../Message';


export function StickerMessageContainer() {

    return (
        <Message.Container>
            <Message.FloatingAttachments />
            <Message.Bubble>
                <Message.Author />
                <Message.Header />
                <Message.Body />
                <Message.Footer />
                <Message.Properties />
            </Message.Bubble>
        </Message.Container>
    );

}
