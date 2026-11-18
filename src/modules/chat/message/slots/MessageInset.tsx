import { type ReactNode } from 'react';
import { cn } from '../../../../components/utilities/cn';


export interface MessageInsetProps {
    children?: ReactNode;
    className?: string;
}

// The padding between a bubble's edge and the content that sits inside it.
// `Pill` and `Bubble` are surfaces only, so an instance wraps what it wants
// inset (text, the author line, a caption, the properties) and leaves out
// what runs to the edges (an image).
export function MessageInset({ children, className }: MessageInsetProps) {

    return (
        <div className={cn('px-3 py-1', className)}>
            {children}
        </div>
    );

}
