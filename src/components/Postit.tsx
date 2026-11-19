import React from 'react';
import { cn } from './utilities/cn';


interface PostitProps {
    className?: string;
    children?: React.ReactNode
}

/**
 * A sticky-note surface.
 */
export function Postit({ className, children }: PostitProps) {

    return (
        <div className="postit-container">
            <div className={cn('postit', className)}>
                {children}
            </div >
        </div>
    );

};
