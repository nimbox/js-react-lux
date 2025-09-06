import classNames from 'classnames';
import type { ReactNode } from 'react';
import React, { useState } from 'react';
import { useMessage } from '../MessageContext';
import { MessageReactionPicker } from '../MessageReactionPicker';
import { MessageReactions } from './MessageReactions';


export interface MessageContainerProps {
    children: ReactNode;
}

export function MessageContainer({ children }: MessageContainerProps) {

    const { message: { direction }, onAddReaction } = useMessage();
    const { menu, isOver } = useMessage();

    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const handleMenuOpenChange = (open: boolean) => {
        setMenuIsOpen(open);
    };

    return (
        <div className={classNames('relative flex flex-row items-center gap-2', {
            'justify-start': direction === 'inbound',
            'justify-end': direction === 'outbound'
        })}>

            <div className={classNames('relative grow flex flex-col', {
                'items-start': direction === 'inbound',
                'items-end': direction === 'outbound'

            },{
                'order-1': onAddReaction && direction === 'inbound',
                'order-2': onAddReaction && direction === 'outbound'
            })}>

                {children}

                {(isOver || menuIsOpen) &&
                    <div className="absolute top-3 right-2">
                        {menu
                            ? React.cloneElement(menu, { onOpenChange: handleMenuOpenChange })
                            : null
                        }
                    </div>
                }

                <MessageReactions />

            </div>

            {onAddReaction && (
                <div className={classNames('flex-none', {
                    'order-2': direction === 'inbound',
                    'order-1': direction === 'outbound'
                })}>
                    <MessageReactionPicker />
                </div>
            )}

        </div>

    );

}
