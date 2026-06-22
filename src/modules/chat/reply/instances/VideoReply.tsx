import { VideoIcon } from '@nimbox/icons-react';
import { type ReplyProps } from '../ReplyProvider';
import { TimedReply } from './TimedReply';


export function VideoReply(props: ReplyProps) {

    return (
        <TimedReply {...props} icon={<VideoIcon />} label="Video" />
    );

}
