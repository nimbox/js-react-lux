import classnames from 'classnames';
import React, { FC } from 'react';

export const Hamburger: FC<{ className?: string }> = ({ className }) => (
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px" y="0px"
        width="2rem" height="2rem" 
        viewBox="0 0 32 32" enable-background="new 0 0 32 32">
        <path className={classnames('fill-current', className)} d="M4,10h24c1.104,0,2-0.896,2-2s-0.896-2-2-2H4C2.896,6,2,6.896,2,8S2.896,10,4,10z M28,14H4c-1.104,0-2,0.896-2,2  s0.896,2,2,2h24c1.104,0,2-0.896,2-2S29.104,14,28,14z M28,22H4c-1.104,0-2,0.896-2,2s0.896,2,2,2h24c1.104,0,2-0.896,2-2  S29.104,22,28,22z" />
    </svg>
);
