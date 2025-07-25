import classNames from 'classnames';
import React, { FC } from 'react';
import { ChatDirectionContext } from './ChatDirectionContext';


export interface ChatGroupProps {

    user: React.ReactNode;
    direction?: 'in' | 'out';

    className?: string;
    children?: React.ReactNode;

}

export const ChatGroup: FC<ChatGroupProps> = (props) => {

    const { user, direction = 'in', className, children } = props;

    return (
        <ChatDirectionContext.Provider value={direction}>
            <div className={classNames('w-100 flex flex-row items-end', className)}>
                <div className={classNames('flex-grow flex flex-col gap-1', {
                    'order-1 items-end': direction === 'out',
                    'order-2 items-start': direction === 'in'
                })}>
                    {children}
                </div>
                <div className={classNames('px-2',{
                    'order-2': direction === 'out',
                    'order-1': direction === 'in'
                })}>
                    <span className="drop-shadow">{user}</span>
                </div>
            </div>
        </ChatDirectionContext.Provider>
    );

};
