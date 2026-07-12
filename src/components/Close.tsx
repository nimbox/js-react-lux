import { CrossIcon } from '@nimbox/icons-react';
import { type FC } from 'react';
import { cn } from './utilities/cn';


//
// Close
//

export const Close: FC<{ onClick: () => void, className?: string }> = ({ onClick, className }) => (
    <CrossIcon
        onClick={onClick}
        className={cn('cursor-pointer', className)}
    />
);
