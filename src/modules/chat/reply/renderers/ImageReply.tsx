import { Reply } from '../Reply';


export function ImageReplyRenderer() {

    return (
        <Reply.Container>
            <Reply.Content>
                <Reply.Author />
                <Reply.Body />
            </Reply.Content>
            <Reply.Media>
                <Reply.Image />
            </Reply.Media>
        </Reply.Container>
    );

}
