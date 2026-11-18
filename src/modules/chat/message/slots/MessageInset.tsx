import { type ReactNode } from 'react';
import { cn } from '../../../../components/utilities/cn';


export interface MessageInsetProps {
    children?: ReactNode;
    className?: string;
}

// The padding between a bubble's edge and the content that sits inside it.
// `Pill` and `Bubble` are surfaces only, so an instance wraps what it wants
// inset (text, the author line, a caption, the properties) and leaves out
// what runs to the edges (an image). An inset whose slots all render nothing
// takes no room, so an instance never has to ask whether they will.
export function MessageInset({ children, className }: MessageInsetProps) {

    return (
        <div className={cn('px-3 py-1 empty:hidden', className)}>
            {children}
        </div>
    );

}
