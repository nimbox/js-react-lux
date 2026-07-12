import React from 'react';
import { cn } from '../utilities/cn';


export interface RadioProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    error?: boolean;
}

export function Radio({ ref, className, children, ...props }: RadioProps) {

    return children ?
        (
            <div className="flex flex-row items-center">
                <input type="radio" ref={ref} {...props} className={cn(className,
                    'border border-control-border checked:border-control-border text-primary-500',
                    'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50',
                    'focus:ring-offset-0 disabled:opacity-50')}
                />
                <span className={cn('ml-2', className)}>{children}</span>
            </div>
        )
        :
        (
            <input type="radio" ref={ref} {...props} className={cn(className,
                'border border-control-border checked:border-control-border text-primary-500',
                'focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50',
                'focus:ring-offset-0 disabled:opacity-50')}
            />
        );

}
