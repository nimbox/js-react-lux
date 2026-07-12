import classNames from 'classnames';
import { type FC } from 'react';
import { CrossIcon } from '@nimbox/icons-react';


//
// Close
//

export const Close: FC<{ onClick: () => void, className?: string }> = ({ onClick, className }) => (
    <CrossIcon
        onClick={onClick}
        className={classNames('cursor-pointer', className)}
    />
);
