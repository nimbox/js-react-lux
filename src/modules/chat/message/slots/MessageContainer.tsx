import classNames from 'classnames';
import type { ReactNode } from 'react';
import { cloneElement } from 'react';
import { useMessage } from '../MessageContext';
import { useMessageGroup } from '../MessageGroupContext';
import { MessageReactions } from './MessageReactions';


export interface MessageContainerProps {
    children: ReactNode;
}

export function MessageContainer({ children }: MessageContainerProps) {

    const { group: { direction } } = useMessageGroup();
    const { menu } = useMessage();

    return (
        <div className={classNames('relative flex flex-col z-0 group', {
            'order-1 items-start': direction === 'inbound',
            'order-2 items-end': direction === 'outbound'
        })}>
            {children}
            <MessageReactions />
            {menu && cloneElement(menu, {
                className: 'absolute top-3 right-2'
            })}
        </div>
    );

}
