import { Message } from '../Message';


export function VideoMessageContainer() {

    return (
        <Message.Container>
            <Message.Bubble>
                <Message.Author />
                <Message.Header />
                <Message.Video />
                <Message.Body />
                <Message.Footer />
                <Message.Properties />
            </Message.Bubble>
        </Message.Container>
    );

}
