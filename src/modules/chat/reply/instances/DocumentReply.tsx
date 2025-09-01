import { FileIcon } from '../../../../icons/components';
import { mediaSize } from '../../utils/mediaSize';
import { useReply } from '../ReplyContext';
import { ReplyProvider, type ReplyProps } from '../ReplyProvider';


export function DocumentReply(props: ReplyProps) {

    return (
        <ReplyProvider {...props}>
            <ReplyProvider.Container>
                <ReplyProvider.Content>
                    <ReplyProvider.Author />
                    <DocumentReplyBody />
                </ReplyProvider.Content>
            </ReplyProvider.Container>
        </ReplyProvider>
    );

}

function DocumentReplyBody() {

    const { message: { attachments } } = useReply();

    if (!attachments || attachments.length === 0) {
        return null;
    }

    return (
        <ReplyProvider.Body>
            <div className="inline-flex flex-row gap-1 items-center">
                <span><FileIcon /></span>
                {attachments[0].filename || 'Document'}
                {attachments[0].size && <span>{mediaSize(attachments[0].size)}</span>}
            </div>
        </ReplyProvider.Body>
    );

}
