import { Message } from '../Message';


export function VideoMessageRenderer() {

    return (
        <Message.Container>
            <Message.Bubble>
                <Message.Author />
                <Message.Reply />
                <Message.Header />
                <Message.Video />
                <Message.Body />
                <Message.Footer />
                <Message.Properties />
            </Message.Bubble>
        </Message.Container>
    );

}
