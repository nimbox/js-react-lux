import React, { FC } from 'react';
import classnames from 'classnames';


//
// cards
//

interface CardComponent extends FC<{ className?: string }> {
    Header: FC<{ className?: string }>,
    Body: FC<{ className?: string }>,
    Footer: FC<{ className?: string }>
}

export const Card: CardComponent = ({ className, children }) => (
    <div className={classnames('bg-content-fg border border-content-border rounded', className)}>{children}</div>
);

Card.Header = ({ className, children }) => (
    <div className={classnames('border-b border-content-border', className)}>{children}</div>
);

Card.Body = ({ className, children }) => (
    <div className={className}>{children}</div>
);

Card.Footer = ({ className, children }) => (
    <div className={classnames('border-t border-content-border', className)}>{children}</div>
);
