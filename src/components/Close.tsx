import classnames from 'classnames';
import React, { FC } from 'react';
import { CrossIcon } from '../icons/components';


//
// Close
//

export const Close: FC<{ onClick: () => void, className: string }> = ({ onClick, className }) => (
    <CrossIcon
        onClick={onClick}
        className={classnames("cursor-pointer", className)}
    />
);
