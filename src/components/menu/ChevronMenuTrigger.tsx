import { AngleDownIcon } from '@nimbox/icons-react';
import type { ButtonHTMLAttributes, Ref } from 'react';
import { cn } from '../utilities/cn';


export function AngleDownMenuTrigger({ ref, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { ref?: Ref<HTMLButtonElement> }) {

    const { className, ...rest } = props;

    return (
        <button ref={ref} {...rest} className={cn('bg-white/90 rounded shadow cursor-pointer', className)}>
            <AngleDownIcon className="w-5 h-5 text-gray-500" />
        </button>
    );

}
