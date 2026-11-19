import { CrossIcon } from '@nimbox/icons-react';
import { type FC } from 'react';
import { cn } from './utilities/cn';


//
// Close
//

/**
 * An icon-only close control for the corner of dialogs, toasts and panels.
 */
export const Close: FC<{ onClick: () => void, className?: string }> = ({ onClick, className }) => (
    <CrossIcon
        onClick={onClick}
        className={cn('cursor-pointer', className)}
    />
);
