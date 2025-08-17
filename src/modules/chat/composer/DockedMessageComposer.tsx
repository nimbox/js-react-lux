import classNames from 'classnames';
import { Children } from 'react';
import { MessageComposer, type MessageComposerProps } from './MessageComposer';


export function DockedMessageComposer(props: MessageComposerProps) {

    // Properties

    const { className, children, ...rest } = props;
    const expanded = Children.toArray(children).some(Boolean);

    // Render

    return (
        <MessageComposer
            {...rest}
            className={classNames(
                expanded ? 'absolute inset-0' : 'absolute left-0 right-0 bottom-0',
                className
            )}
        >
            {children}
        </MessageComposer>
    );

}
