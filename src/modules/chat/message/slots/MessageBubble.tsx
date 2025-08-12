import classNames from 'classnames';
import { useMessage } from '../MessageContext';
import { useMessageGroup } from '../MessageGroupContext';


export interface MessageBubbleProps {
    children: React.ReactNode;
}

export function MessageBubble({ children }: MessageBubbleProps) {

    const { group: { direction } } = useMessageGroup();
    const { isFirst } = useMessage();

    return (
        <div className={classNames('p-3 rounded-xl shadow', {
            'bg-chat-message-out text-gray-800 ': direction === 'outbound',
            'bg-chat-message-in text-gray-800': direction === 'inbound'
        })}>
            {children}
            {isFirst && <MessageArrow position={'top'} />}
        </div>
    );

}


export function MessageArrow({ position }: { position: 'top' | 'bottom' }) {

    const { group: { direction } } = useMessageGroup();

    return (
        <div className={classNames('absolute bottom-[2px]', {
            'top-[14px]': position === 'top',
            'bottom-[2px]': position === 'bottom'
        }, {
            'right-[-6px] w-0 h-0 transform -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[6px] border-l-chat-message-out': direction === 'outbound',
            'left-[-6px] w-0 h-0 transform -translate-y-1/2 border-y-[6px] border-y-transparent border-r-[6px] border-r-chat-message-in': direction === 'inbound'
        })}
        />
    );

}
