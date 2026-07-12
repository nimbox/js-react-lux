import { AngleDownIcon } from '@nimbox/icons-react';
import { forwardRef } from 'react';
import { cn } from '../utilities/cn';


export const AngleDownMenuTrigger = forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<Omit<HTMLButtonElement, 'ref'>>>((props, ref) => {

    const { className, ...rest } = props;

    return (
        <button ref={ref} {...rest} className={cn('bg-white/90 rounded shadow cursor-pointer', className)}>
            <AngleDownIcon className="w-5 h-5 text-gray-500" />
        </button>
    );

});
