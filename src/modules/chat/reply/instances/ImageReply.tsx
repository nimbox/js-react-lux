import { ReplyProvider, type ReplyProps } from '../ReplyProvider';


export function ImageReply(props: ReplyProps) {

    return (
        <ReplyProvider {...props}>
            <ReplyProvider.Container>
                <ReplyProvider.Content>
                    <ReplyProvider.Author />
                    <ReplyProvider.Body />
                </ReplyProvider.Content>
                <ReplyProvider.Media>
                    <ReplyProvider.Image />
                </ReplyProvider.Media>
            </ReplyProvider.Container>
        </ReplyProvider>
    );

}
