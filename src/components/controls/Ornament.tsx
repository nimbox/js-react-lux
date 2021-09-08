import classnames from 'classnames';
import React, { FC } from 'react';
import { consumeEvent } from '../../utilities/consumeEvent';


// TODO remove the any in OrnamentProps

export interface OrnamentProps {

    position: 'start' | 'end';

    className?: string;

    children: any;

}

export const Ornament = React.forwardRef<HTMLDivElement, OrnamentProps>(({ position, className, children }, ref) => (
    <div ref={ref}
        onMouseDown={consumeEvent}
        className={classnames(
            'absolute top-0 bottom-0 flex items-center',
            {
                'left-0': position === 'start',
                'right-0': position === 'end'
            },
            className
        )}
    >
        {children}
    </div>
));
