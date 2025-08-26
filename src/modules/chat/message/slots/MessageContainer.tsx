import classNames from 'classnames';
import type { ReactNode } from 'react';
import { useMessageGroup } from '../MessageGroupContext';
import { MessageReactions } from './MessageReactions';
import React, { useState } from 'react';
import { useMessage } from '../MessageContext';


export interface MessageContainerProps {
    children: ReactNode;
}

export function MessageContainer({ children }: MessageContainerProps) {

    const { group: { direction } } = useMessageGroup();
    const { menu, isHovered } = useMessage();

    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const handleMenuOpenChange = (open: boolean) => {
        setMenuIsOpen(open);
    };

    return (
        <div className={classNames('relative flex flex-col z-0 group', {
            'order-1 items-start': direction === 'inbound',
            'order-2 items-end': direction === 'outbound'
        })}>

            {children}

            <MessageReactions />

            {(isHovered || menuIsOpen) &&
                <div className="absolute top-3 right-2">
                    {menu
                        ? React.cloneElement(menu, { onOpenChange: handleMenuOpenChange })
                        : null
                    }
                </div>
            }

        </div >

    );

}
