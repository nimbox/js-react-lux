import { Message } from '../Message';


export function ImageMessageContainer() {

    return (
        <Message.Container>
            <Message.Bubble>
                <Message.Author />
                <Message.Header />
                <Message.Image />
                <Message.Body />
                <Message.Footer />
                <Message.Properties />
            </Message.Bubble>
        </Message.Container>
    );

}
