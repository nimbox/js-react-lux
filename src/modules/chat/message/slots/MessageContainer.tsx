import classNames from 'classnames';
import { Message } from '../Message';
import { useMessageGroup } from '../MessageGroupContext';


export interface MessageContainerProps {
    children: React.ReactNode;
}

export function MessageContainer({ children }: MessageContainerProps) {

    const { group: { direction } } = useMessageGroup();

    return (
        <div className={classNames('relative flex flex-col z-0 group', {
            'order-1 items-start': direction === 'inbound',
            'order-2 items-end': direction === 'outbound'
        })}>
            {children}
            <Message.Reactions />
            <Message.Menu />
        </div>
    );

}
