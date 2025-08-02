import classNames from 'classnames';
import React from 'react';
import { Message } from '../Message';
import { useMessage } from '../MessageContext';
import { useMessageGroup } from '../MessageGroupContext';


export interface MessageContainerProps {
    children: React.ReactNode;
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
            <Message.Reactions />
            {menu && React.cloneElement(menu, {
                className: 'absolute top-3 right-2'
            })}
        </div>
    );

}
