import React from 'react';


export interface ConversationListProps {

    as?: React.ElementType;

    className?: string;
    children?: React.ReactNode;

}

export function ConversationList(props: ConversationListProps) {

    const { as: As = 'div', className, children } = props;

    return (
        <As className={className}>
            {children}
        </As>
    );

}
