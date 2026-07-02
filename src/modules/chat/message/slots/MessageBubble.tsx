import classNames from 'classnames';
import { useMessage } from '../MessageContext';


export interface MessageBubbleProps {
    children: React.ReactNode;
    // Reduced vertical padding — for bubbles that wrap only compact content such
    // as a floating message's date/status pill.
    compact?: boolean;
}

export function MessageBubble({ children, compact = false }: MessageBubbleProps) {

    const { message: { alignment } } = useMessage();
    const { isFirst } = useMessage();

    return (
        <div className={classNames('relative rounded-xl shadow', compact ? 'px-3 py-1' : 'p-3', {
            'bg-chat-message-out text-gray-800 ': alignment === 'end',
            'bg-chat-message-in text-gray-800': alignment === 'start'
        })}>
            {children}
            {isFirst && <MessageArrow position={'top'} />}
        </div>
    );

}


export function MessageArrow({ position }: { position: 'top' | 'bottom' }) {

    const { message: { alignment } } = useMessage();

    return (
        <div className={classNames('absolute bottom-[2px]', {
            'top-[14px]': position === 'top',
            'bottom-[2px]': position === 'bottom'
        }, {
            'right-[-6px] w-0 h-0 transform -translate-y-1/2 border-y-[6px] border-y-transparent border-l-[6px] border-l-chat-message-out': alignment === 'end',
            'left-[-6px] w-0 h-0 transform -translate-y-1/2 border-y-[6px] border-y-transparent border-r-[6px] border-r-chat-message-in': alignment === 'start'
        })}
        />
    );

}
