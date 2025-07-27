import { Message } from '../Message';


export function ImageMessageRenderer() {

    return (
        <Message.Container>
            <Message.Bubble>
                <Message.Author />
                <Message.Reply />
                <Message.Header />
                <Message.Image />
                <Message.Body />
                <Message.Footer />
                <Message.Properties />
            </Message.Bubble>
        </Message.Container>
    );

}
