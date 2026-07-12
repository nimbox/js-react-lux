import { Children } from 'react';
import { cn } from '../../../components/utilities/cn';
import { MessageComposer, type MessageComposerProps } from './MessageComposer';


export function DockedMessageComposer(props: MessageComposerProps) {

    // Properties

    const { className, children, ...rest } = props;
    const expanded = Children.toArray(children).some(Boolean);

    // Render

    return (
        <MessageComposer
            {...rest}
            className={cn(
                expanded ? 'absolute inset-0' : 'absolute left-0 right-0 bottom-0',
                className
            )}
        >
            {children}
        </MessageComposer>
    );

}
