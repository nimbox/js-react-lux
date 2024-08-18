import classNames from 'classnames';
import React, { FC } from 'react';
import { ChatDirectionContext } from './ChatDirectionContext';


export interface ChatGroupProps {

    user: React.ReactNode;
    direction?: 'received' | 'sent';

    className?: string;
    children?: React.ReactNode;

}

export const ChatGroup: FC<ChatGroupProps> = (props) => {

    const { user, direction = 'received', className, children } = props;

    return (
        <ChatDirectionContext.Provider value={direction}>
            <div className={classNames('w-100 flex flex-row items-end', className)}>
                <div className={classNames('flex-grow flex flex-col gap-1', {
                    'order-1 items-end': direction === 'sent',
                    'order-2 items-start': direction === 'received'
                })}>
                    {children}
                </div>
                <div className={classNames('px-2',{
                    'order-2': direction === 'sent',
                    'order-1': direction === 'received'
                })}>
                    <span>{user}</span>
                </div>
            </div>
        </ChatDirectionContext.Provider>
    );

};
