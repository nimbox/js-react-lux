import { AudioIcon } from '@nimbox/icons-react';
import { type ReplyProps } from '../ReplyProvider';
import { TimedReply } from './TimedReply';


export function AudioReply(props: ReplyProps) {

    return (
        <TimedReply {...props} icon={<AudioIcon />} label="Audio" />
    );

}
